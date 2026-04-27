import { prisma } from '@/lib/prisma';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { CouponManager } from '@/components/admin/CouponManager';

export const metadata = { title: 'Codes promo' };

export default async function AdminCouponsPage() {
  const coupons = await prisma.coupon.findMany({
    orderBy: [{ active: 'desc' }, { createdAt: 'desc' }],
  }).catch(() => []);

  return (
    <div className="space-y-8">
      <AdminPageHeader kicker="Catalogue" title="Codes promo" />
      <CouponManager coupons={coupons} />
    </div>
  );
}
