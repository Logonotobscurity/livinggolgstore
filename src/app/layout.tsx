
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
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: {
    default: 'Living Gold: Top Luxury Lighting & Chandeliers Store in Nigeria',
    template: '%s | Living Gold Nigeria',
  },
  description: 'Living Gold is the top selling luxury lights seller in Nigeria, based in Asaba and serving Lagos and beyond. We curate and import luxury lighting, chandeliers, and exquisite home decor from global artisans.',
  keywords: ['luxury lighting Nigeria', 'chandeliers in Nigeria', 'designer lighting Asaba', 'Living Gold', 'home decor Nigeria', 'interior design Nigeria', 'top selling luxury lights seller in Nigeria', 'Lagos', 'Asaba'],
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Living Gold',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Okpanam Road',
    addressLocality: 'Asaba',
    addressRegion: 'Delta State',
    countryName: 'Nigeria',
  },
  telephone: '+2347011131333',
  url: 'https://www.livinggold.com',
  logo: 'https://www.livinggold.com/logo.png', // Placeholder URL
  image: 'https://www.livinggold.com/showroom.jpg', // Placeholder URL
  description: 'Top selling luxury lights seller in Nigeria, curating luxury lighting, chandeliers, and exquisite home decor from global artisans, based in Asaba.',
  priceRange: '$$$',
  openingHours: 'Mo-Fr 09:00-18:00, Sa 10:00-16:00',
  '@id': 'https://www.livinggold.com',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
      <body className="bg-background">
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
          <CartProvider>
            <WishlistProvider>
                <div className="relative">
                  <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(201,169,97,0.08)_0%,_transparent_50%),radial-gradient(circle_at_80%_20%,_rgba(201,169,97,0.08)_0%,_transparent_50%)]"></div>
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,_transparent_0%,_rgba(201,169,97,0.02)_50%,_transparent_100%),linear-gradient(0deg,_rgba(0,0,0,0.1)_0%,_transparent_30%)] pointer-events-none"></div>
                  <div className="relative z-10">
                    {children}
                  </div>
                  <Toaster />
                  <SessionReminder />
                  <SubscriptionModal />
                </div>
            </WishlistProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
