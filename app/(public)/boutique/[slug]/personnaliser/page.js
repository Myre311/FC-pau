import { notFound } from 'next/navigation';
import Link from 'next/link';

import { prisma } from '@/lib/prisma';
import { JerseyConfigurator } from '@/components/customizer/JerseyConfigurator';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    select: { name: true, customizable: true },
  });
  if (!product || !product.customizable) return { title: 'Personnalisation indisponible' };
  return {
    title: `Personnaliser · ${product.name}`,
    description: `Configurez votre flocage nom + numéro sur le ${product.name}. Aperçu 3D temps réel.`,
  };
}

export default async function PersonnaliserPage({ params }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: {
      variants: {
        include: { stockItem: true },
        orderBy: { createdAt: 'asc' },
      },
    },
  });

  if (!product || product.status !== 'active' || !product.customizable) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container-pau py-8 md:py-12">
      <header className="mb-8">
        <nav className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
          <Link href="/boutique" className="hover:text-pau-yellow">
            Boutique
          </Link>
          {' / '}
          <Link href={`/boutique/${product.slug}`} className="hover:text-pau-yellow">
            {product.name}
          </Link>
          {' / '}
          <span className="text-white">Personnaliser</span>
        </nav>
      </header>

      <JerseyConfigurator product={product} variants={product.variants} />
      </div>
    </div>
  );
}
