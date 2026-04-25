import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/shop/CartDrawer';

export default function PublicLayout({ children }) {
  return (
    <>
      <Header />
      <main className="min-h-[60vh] bg-nuit text-blanc">{children}</main>
      <Footer />
      <CartDrawer />
    </>
  );
}
