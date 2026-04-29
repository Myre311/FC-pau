import { Inter, DM_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { GoogleAnalytics } from '@next/third-parties/google';

import { OrganizationJsonLd } from '@/components/seo/OrganizationJsonLd';

import './globals.css';

// Deglion - Titres (police custom élégante)
const deglion = localFont({
  src: '../public/fonts/Deglion-Regular.ttf',
  variable: '--font-display',
  display: 'swap',
  preload: true,
  weight: '400',
});

// Inter - Corps de texte (moderne, lisible) - remplace Bicyclette
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
});

// DM Mono - Détails techniques, badges, numéros
const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
  preload: false,
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'FC Pau — Club de football professionnel',
    template: '%s · FC Pau',
  },
  description:
    'Site officiel du Pau FC. Boutique, billetterie, actualités, équipe et partenaires.',
  applicationName: 'FC Pau',
  referrer: 'strict-origin-when-cross-origin',
  formatDetection: { email: false, telephone: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'FC Pau',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#04091D',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`${deglion.variable} ${inter.variable} ${dmMono.variable}`}
    >
      <body className="font-sans antialiased">
        {children}
        <OrganizationJsonLd />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
