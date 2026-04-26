import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Topbar } from '@/components/layout/Topbar';
import { LoaderScreen } from '@/components/layout/LoaderScreen';
import { CartDrawer } from '@/components/shop/CartDrawer';
import { NewsletterModal } from '@/components/layout/NewsletterModal';
import { SkipToContent } from '@/components/ui/SkipToContent';

export default function PublicLayout({ children }) {
  return (
    <>
      <SkipToContent />
      <LoaderScreen />
      <Topbar />
      <Header />
      <main id="main-content" className="min-h-[60vh] bg-[#262646] text-blanc">{children}</main>
      <Footer />
      <CartDrawer />
      <NewsletterModal />
    </>
  );
}
