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
    <div className="min-h-screen bg-nuit text-blanc">
      <header className="sticky top-0 z-30 border-b border-blanc/10 bg-nuit">
        <div className="flex h-14 items-center justify-between gap-4 px-4 lg:px-6">
          <Link href="/admin" className="flex items-center gap-3" aria-label="Admin Pau FC">
            <Logo className="text-xl md:text-2xl" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-jaune">
              Admin
            </span>
          </Link>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/50 md:inline">
            {dbUser.email}
          </span>
        </div>
      </header>

      <div className="grid lg:grid-cols-[260px_1fr]">
        <AdminSidebar user={dbUser} />
        <main className="min-w-0 px-4 py-6 lg:px-8 lg:py-10">{children}</main>
      </div>
    </div>
  );
}
