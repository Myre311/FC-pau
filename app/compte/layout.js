import { requireUser } from '@/lib/auth';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/shop/CartDrawer';
import { NewsletterModal } from '@/components/layout/NewsletterModal';
import { AccountSidebar } from '@/components/account/AccountSidebar';

// Toutes les routes /compte/* exigent une session — middleware.js
// redirige sinon. requireUser ici sert à charger le User Prisma
// (synchro paresseuse avec auth.users).

export const dynamic = 'force-dynamic';

export default async function AccountLayout({ children }) {
  const { dbUser } = await requireUser();

  return (
    <>
      <Header />
      <main className="bg-nuit text-blanc">
        <div className="container-fc grid gap-6 py-8 lg:grid-cols-[260px_1fr] lg:gap-10 lg:py-12">
          <AccountSidebar user={dbUser} />
          <div className="min-w-0">{children}</div>
        </div>
      </main>
      <Footer />
      <CartDrawer />
      <NewsletterModal />
    </>
  );
}
