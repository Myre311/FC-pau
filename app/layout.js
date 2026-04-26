import { Poppins, Inter, Roboto_Mono } from 'next/font/google';

import { OrganizationJsonLd } from '@/components/seo/OrganizationJsonLd';

import './globals.css';

// Poppins - Titres modernes sportifs (style Barça)
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
});

// Inter - Corps de texte professionnel
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

// Roboto Mono - Détails techniques
const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-roboto-mono',
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
      className={`${poppins.variable} ${inter.variable} ${robotoMono.variable}`}
    >
      <body>
        {children}
        <OrganizationJsonLd />
      </body>
    </html>
  );
}
