
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/context/cart-context';
import { WishlistProvider } from '@/context/wishlist-context';
import './globals.css';
import './sun-banner.css';
import './socials.css';
import './new-menu-icon.css';
import './new-cta-button.css';
import './theme-toggle.css';
import './text-animations.css';
import './speed-dial.css';

import { ThemeProvider } from '@/components/theme-provider';
import { ClientOnly } from '@/components/client-only';
import EngagementOrchestrator from '@/components/engagement-orchestrator';

export const metadata: Metadata = {
  metadataBase: new URL('https://livinggolgstore.netlify.app'),
  title: {
    default: 'Living Gold: Top Luxury Lighting & Chandeliers Store in Nigeria',
    template: '%s | Living Gold Nigeria',
  },
  description: 'Nigeria\'s top luxury lighting store. Based in Asaba, Living Gold curates and imports exquisite chandeliers, fixtures, and home decor for discerning clients in Lagos and nationwide.',
  keywords: ['luxury lighting Nigeria', 'chandeliers in Nigeria', 'designer lighting Asaba', 'Living Gold', 'home decor Nigeria', 'interior design Nigeria', 'top selling luxury lights seller in Nigeria', 'Lagos', 'Asaba'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Living Gold: Top Luxury Lighting & Chandeliers Store in Nigeria',
    description: 'Nigeria\'s top luxury lighting store. Based in Asaba, Living Gold curates and imports exquisite chandeliers, fixtures, and home decor for discerning clients in Lagos and nationwide.',
    url: 'https://livinggolgstore.netlify.app',
    siteName: 'Living Gold Nigeria',
    images: [
      {
        url: 'https://www.visualcomfort.com/media_15301f7f1a1767bae048266bf4ea27bd8169b7990.jpg',
        width: 1200,
        height: 800,
        alt: 'Elegant dining room with a luxury Living Gold chandelier.',
      },
    ],
    type: 'website',
  },
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
  url: 'https://livinggolgstore.netlify.app',
  logo: 'https://livinggolgstore.netlify.app/logo.png', // Placeholder URL
  image: 'https://livinggolgstore.netlify.app/showroom.jpg', // Placeholder URL
  description: 'Top selling luxury lights seller in Nigeria, curating luxury lighting, chandeliers, and exquisite home decor from global artisans, based in Asaba.',
  priceRange: '$$$',
  openingHours: 'Mo-Fr 09:00-18:00, Sa 10:00-16:00',
  '@id': 'https://livinggolgstore.netlify.app',
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
                  <ClientOnly>
                    <EngagementOrchestrator />
                  </ClientOnly>
                </div>
            </WishlistProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
