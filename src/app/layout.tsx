
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/context/cart-context';
import { WishlistProvider } from '@/context/wishlist-context';
import './globals.css';
import './sun-banner.css';
import './socials.css';
import './new-menu-icon.css';
import { SessionReminder } from '@/components/session-reminder';
import SubscriptionModal from '@/components/subscription-modal';

export const metadata: Metadata = {
  title: 'About Living Gold — Luxury Lighting & Chandeliers (Nigeria)',
  description: 'Living Gold curates and imports luxury lighting and chandeliers from ateliers around the world. Based in Nigeria, we deliver bespoke lighting solutions and trade services for designers, architects, and discerning homeowners.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>
          <WishlistProvider>
              <div>
                {children}
                <Toaster />
                <SessionReminder />
                <SubscriptionModal />
              </div>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
