import { requireUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AddressList } from '@/components/account/AddressList';

export const metadata = { title: 'Mes adresses' };

export default async function AdressesPage() {
  const { dbUser } = await requireUser();

  const addresses = await prisma.address.findMany({
    where: { userId: dbUser.id },
    orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
  });

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs text-gray-500 uppercase tracking-wider">Carnet d&apos;adresses</p>
        <h1 className="mt-3 font-display text-5xl uppercase leading-crush tracking-tightest text-white md:text-6xl">
          Mes adresses
        </h1>
        <p className="mt-3 max-w-xl font-sans text-sm text-white/60">
          Adresses de livraison et de facturation. Vos adresses par défaut
          sont pré-remplies au paiement.
        </p>
      </header>

      <AddressList addresses={addresses} />
    </div>
  );
}
