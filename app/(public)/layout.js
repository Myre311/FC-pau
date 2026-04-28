import { HeaderMaquette } from '@/components/layout/HeaderMaquette';
import { FooterMaquette } from '@/components/layout/FooterMaquette';
import { LoaderScreen } from '@/components/layout/LoaderScreen';
import { CartDrawer } from '@/components/shop/CartDrawer';
import { NewsletterModal } from '@/components/layout/NewsletterModal';
import { SkipToContent } from '@/components/ui/SkipToContent';

export default function PublicLayout({ children }) {
  return (
    <>
      <SkipToContent />
      <LoaderScreen />

      {/* Navbar principale - Style refonte */}
      <HeaderMaquette />

      <main id="main-content" className="min-h-[60vh] bg-white text-pau-primary">{children}</main>
      <FooterMaquette />
      <CartDrawer />
      <NewsletterModal />
    </>
  );
}
