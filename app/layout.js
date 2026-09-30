import { Bodoni_Moda, Libre_Caslon_Display, Prata, Instrument_Sans, Mrs_Saint_Delafield } from 'next/font/google';
import '@/styles/globals.css';
import Header from '@/components/layout/Header';
import Providers from '@/components/layout/Providers';
import CartDrawer from '@/components/cart/CartDrawer';
import Toast from '@/components/ui/Toast';

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-bodoni',
  display: 'swap',
});
const caslon = Libre_Caslon_Display({ subsets: ['latin'], weight: '400', variable: '--font-caslon', display: 'swap' });
const prata = Prata({ subsets: ['latin'], weight: '400', variable: '--font-prata', display: 'swap' });
const instrument = Instrument_Sans({ subsets: ['latin'], variable: '--font-instrument', display: 'swap' });
const script = Mrs_Saint_Delafield({ subsets: ['latin'], weight: '400', variable: '--font-script', display: 'swap' });

export const metadata = {
  metadataBase: new URL('https://aerial-demo.in'),
  title: {
    default: 'AERIAL — Timeless pieces for a more conscious tomorrow',
    template: '%s — AERIAL',
  },
  description:
    'AERIAL is a contemporary luxury fashion house creating timeless, consciously made clothing and accessories for women and men.',
  openGraph: {
    title: 'AERIAL',
    description: 'Timeless pieces for a more conscious tomorrow.',
    images: ['/images/campaign/hero-ivory.jpg'],
  },
};

export const viewport = {
  themeColor: '#fff9f2',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en-IN"
      className={`${bodoni.variable} ${caslon.variable} ${prata.variable} ${instrument.variable} ${script.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Marks JS as available before first paint so reveal animations never flash. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-charcoal focus:px-4 focus:py-2 focus:text-ivory"
        >
          Skip to content
        </a>
        <Providers>
          <Header />
          {children}
          <CartDrawer />
          <Toast />
        </Providers>
      </body>
    </html>
  );
}
