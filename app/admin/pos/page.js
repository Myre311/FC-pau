import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { POSInterface } from '@/components/admin/POSInterface';

export const metadata = { title: 'Caisse (POS)' };

export default function AdminPOSPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        kicker="Point de vente"
        title="Caisse physique"
        subtitle="Interface de vente pour le magasin du Nouste Camp"
      />

      <POSInterface />
    </div>
  );
}
