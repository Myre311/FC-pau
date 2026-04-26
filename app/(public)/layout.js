import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Topbar } from '@/components/layout/Topbar';
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

      {/* Bandeau livraison */}
      <Topbar />

      {/* Navbar principale sticky */}
      <div className="sticky top-0 z-50">
        <Header />
        <SecondaryNavbar />
      </div>

      <main id="main-content" className="min-h-[60vh] bg-[#262646] text-blanc">{children}</main>
      <Footer />
      <CartDrawer />
      <NewsletterModal />
    </>
  );
}
