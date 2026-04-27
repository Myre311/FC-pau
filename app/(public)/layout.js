import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SecondaryNavbar } from '@/components/layout/SecondaryNavbar';
import { LoaderScreen } from '@/components/layout/LoaderScreen';
import { CartDrawer } from '@/components/shop/CartDrawer';
import { NewsletterModal } from '@/components/layout/NewsletterModal';
import { SkipToContent } from '@/components/ui/SkipToContent';

export default function PublicLayout({ children }) {
  return (
    <>
      <SkipToContent />
      <LoaderScreen />

      {/* Navbar principale sticky (sans topbar) */}
      <div className="sticky top-0 z-50">
        <Header />
        <SecondaryNavbar />
      </div>

      <main id="main-content" className="min-h-[60vh] bg-white text-pau-primary">{children}</main>
      <Footer />
      <CartDrawer />
      <NewsletterModal />
    </>
  );
}
