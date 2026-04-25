import { prisma } from '@/lib/prisma';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { PartnerManager } from '@/components/admin/PartnerManager';

export const metadata = { title: 'Partenaires' };

export default async function AdminPartenairesPage() {
  const partners = await prisma.partner.findMany({
    orderBy: [{ tier: 'asc' }, { position: 'asc' }],
  });

  return (
    <div className="space-y-8">
      <AdminPageHeader kicker="Communication" title="Partenaires" />
      <PartnerManager partners={partners} />
    </div>
  );
}
