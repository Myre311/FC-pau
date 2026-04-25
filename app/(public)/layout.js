import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Topbar } from '@/components/layout/Topbar';
import { LoaderScreen } from '@/components/layout/LoaderScreen';
import { CartDrawer } from '@/components/shop/CartDrawer';
import { NewsletterModal } from '@/components/layout/NewsletterModal';

export default function PublicLayout({ children }) {
  return (
    <>
      <LoaderScreen />
      <Topbar />
      <Header />
      <main className="min-h-[60vh] bg-nuit text-blanc">{children}</main>
      <Footer />
      <CartDrawer />
      <NewsletterModal />
    </>
  );
}
