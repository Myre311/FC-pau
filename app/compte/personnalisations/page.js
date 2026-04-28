import Link from 'next/link';

import { requireUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/Button';

export const metadata = { title: 'Mes personnalisations' };

export default async function PersonnalisationsPage() {
  const { dbUser } = await requireUser();

  const customizations = await prisma.jerseyCustomization.findMany({
    where: { userId: dbUser.id },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-8">
      <header>
        <p className="badge-mono">Mes maillots</p>
        <h1 className="mt-3 font-display text-5xl uppercase leading-crush tracking-tightest text-white md:text-6xl">
          Personnalisations
        </h1>
        <p className="mt-3 max-w-xl font-sans text-sm text-white/60">
          Vos brouillons de flocage maillot — sauvegardés avant achat,
          retrouvables à tout moment.
        </p>
      </header>

      {customizations.length === 0 ? (
        <div className="border border-dashed border-white/15 p-10 text-center">
          <p className="font-sans text-white/60">
            Aucune personnalisation sauvegardée.
          </p>
          <Link href="/boutique" className="mt-5 inline-block">
            <Button variant="outline" size="md">
              Découvrir le configurateur
            </Button>
          </Link>
        </div>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {customizations.map((c) => (
            <li key={c.id} className="border border-white/10 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-pau-yellow">
                Police {c.font}
              </p>
              <p className="mt-3 font-display text-3xl uppercase leading-crush tracking-tightest text-white">
                {c.name ?? 'SANS NOM'}
              </p>
              {c.number != null && (
                <p className="mt-1 font-display text-5xl leading-none text-white/60">
                  {c.number}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
