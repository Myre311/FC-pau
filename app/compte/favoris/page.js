import Link from 'next/link';

import { requireUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ProductCard } from '@/components/shop/ProductCard';
import { Button } from '@/components/ui/Button';

export const metadata = { title: 'Mes favoris' };

export default async function FavorisPage() {
  const { dbUser } = await requireUser();

  const favorites = await prisma.favorite.findMany({
    where: { userId: dbUser.id },
    orderBy: { createdAt: 'desc' },
    include: {
      product: {
        include: {
          category: true,
          variants: { include: { stockItem: true } },
        },
      },
    },
  });

  const products = favorites
    .map((f) => f.product)
    .filter((p) => p.status === 'active');

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs text-pau-yellow uppercase tracking-wider">Mes coups de cœur</p>
        <h1 className="mt-3 font-display text-5xl uppercase leading-crush tracking-tightest text-white md:text-6xl">
          Favoris
        </h1>
        <p className="mt-3 max-w-xl font-sans text-sm text-white/60">
          Vos pièces préférées, retrouvées ici dès que vous vous connectez.
        </p>
      </header>

      {products.length === 0 ? (
        <div className="border border-dashed border-white/15 p-10 text-center">
          <p className="font-sans text-white/60">
            Vous n&apos;avez encore mis aucun produit en favori.
          </p>
          <Link href="/boutique" className="mt-5 inline-block">
            <Button variant="outline" size="md">
              Voir la boutique
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
