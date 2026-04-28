import { prisma } from '@/lib/prisma';

// =====================================================================
// Stock unifié POS + en ligne
//
// Source de vérité : table StockMovement (journal append-only).
// StockItem = projection des compteurs (onHand / reserved) pour lecture rapide.
// Toute mutation du stock passe par les helpers de ce module pour rester
// cohérente : on insère un StockMovement ET on met à jour StockItem dans
// la même transaction.
// =====================================================================

const RESERVATION_TTL_MS = 15 * 60 * 1000; // 15 minutes

/**
 * Réserve du stock pour une variante donnée pendant 15 min.
 * Crée une CartReservation + incrémente StockItem.reserved + journalise.
 * Lance si disponible insuffisant.
 */
export async function reserveStock({ variantId, sessionId, userId, quantity }) {
  return prisma.$transaction(async (tx) => {
    const item = await tx.stockItem.findUnique({ where: { variantId } });
    if (!item) {
      throw new Error(`Stock inconnu pour la variante ${variantId}`);
    }
    const available = item.onHand - item.reserved;
    if (available < quantity) {
      throw new Error(
        `Stock insuffisant pour ${variantId} : demande ${quantity}, dispo ${available}`,
      );
    }

    const reservation = await tx.cartReservation.create({
      data: {
        variantId,
        sessionId,
        userId: userId ?? null,
        quantity,
        expiresAt: new Date(Date.now() + RESERVATION_TTL_MS),
      },
    });

    await tx.stockItem.update({
      where: { variantId },
      data: { reserved: { increment: quantity } },
    });

    await tx.stockMovement.create({
      data: {
        variantId,
        type: 'reservation',
        quantity: -quantity,
        source: 'cart',
        sourceRef: reservation.id,
      },
    });

    return reservation;
  });
}

/**
 * Libère une réservation (panier abandonné, expiré, ou commande payée
 * convertie en sale_online via recordOnlineSale).
 */
export async function releaseReservation(reservationId) {
  return prisma.$transaction(async (tx) => {
    const reservation = await tx.cartReservation.findUnique({
      where: { id: reservationId },
    });
    if (!reservation) return null;

    await tx.cartReservation.delete({ where: { id: reservationId } });

    await tx.stockItem.update({
      where: { variantId: reservation.variantId },
      data: { reserved: { decrement: reservation.quantity } },
    });

    await tx.stockMovement.create({
      data: {
        variantId: reservation.variantId,
        type: 'release',
        quantity: reservation.quantity,
        source: 'cart',
        sourceRef: reservation.id,
      },
    });

    return reservation;
  });
}

/**
 * Convertit une réservation en vente confirmée (paiement OK).
 * Décrémente onHand et reserved, journalise sale_online.
 */
export async function recordOnlineSale({ variantId, quantity, orderId, reservationId }) {
  return prisma.$transaction(async (tx) => {
    if (reservationId) {
      const reservation = await tx.cartReservation.findUnique({
        where: { id: reservationId },
      });
      if (reservation) {
        await tx.cartReservation.delete({ where: { id: reservationId } });
        await tx.stockItem.update({
          where: { variantId: reservation.variantId },
          data: { reserved: { decrement: reservation.quantity } },
        });
      }
    }

    await tx.stockItem.update({
      where: { variantId },
      data: { onHand: { decrement: quantity } },
    });

    await tx.stockMovement.create({
      data: {
        variantId,
        type: 'sale_online',
        quantity: -quantity,
        source: 'order',
        sourceRef: orderId,
      },
    });
  });
}

/**
 * Enregistre une vente POS (caisse physique).
 * Décrémente directement onHand sans réservation, journalise sale_pos.
 */
export async function recordPOSSale({ variantId, quantity, orderId }) {
  return prisma.$transaction(async (tx) => {
    const item = await tx.stockItem.findUnique({ where: { variantId } });
    if (!item) {
      throw new Error(`Stock inconnu pour la variante ${variantId}`);
    }
    const available = item.onHand - item.reserved;
    if (available < quantity) {
      throw new Error(
        `Stock insuffisant pour ${variantId} : demande ${quantity}, dispo ${available}`,
      );
    }

    await tx.stockItem.update({
      where: { variantId },
      data: { onHand: { decrement: quantity } },
    });

    await tx.stockMovement.create({
      data: {
        variantId,
        type: 'sale_pos',
        quantity: -quantity,
        source: 'pos',
        sourceRef: orderId,
      },
    });
  });
}

/**
 * Cron — purge les réservations expirées et restaure le stock disponible.
 * À appeler depuis une route cron Vercel (toutes les 5 min).
 */
export async function purgeExpiredReservations() {
  const expired = await prisma.cartReservation.findMany({
    where: { expiresAt: { lt: new Date() } },
  });
  for (const r of expired) {
    await releaseReservation(r.id);
  }
  return expired.length;
}
