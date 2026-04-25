import { Big_Shoulders_Display, Instrument_Sans, DM_Mono } from 'next/font/google';

import './globals.css';

const bigShoulders = Big_Shoulders_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-big-shoulders',
  display: 'swap',
});

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-instrument-sans',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
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
      className={`${bigShoulders.variable} ${instrumentSans.variable} ${dmMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
