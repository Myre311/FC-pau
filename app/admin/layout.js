import { requireAdmin } from '@/lib/auth';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Logo } from '@/components/ui/Logo';
import Link from 'next/link';

export const metadata = {
  title: { template: '%s · Admin Pau FC', default: 'Admin Pau FC' },
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }) {
  const { dbUser } = await requireAdmin();

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="sticky top-0 z-30 border-b-4 border-pau-yellow bg-pau-night shadow-lg">
        <div className="flex h-16 items-center justify-between gap-4 px-4 lg:px-6">
          <Link href="/admin" className="flex items-center gap-3" aria-label="Admin Pau FC">
            <Logo className="text-xl md:text-2xl" />
            <span className="text-xs font-semibold uppercase tracking-wider text-pau-yellow">
              Admin
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-white/80 md:inline">
              {dbUser.email}
            </span>
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-[260px_1fr]">
        <AdminSidebar user={dbUser} />
        <main className="min-w-0 bg-gray-50 px-4 py-6 lg:px-8 lg:py-10">{children}</main>
      </div>
    </div>
  );
}
