import Header from '@/components/layout/header';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Lifestyle from '@/components/sections/lifestyle';
import InstagramFeed from '@/components/sections/instagram-feed';
import Contact from '@/components/sections/contact';
import Footer from '@/components/layout/footer';
import ProductCategories from '@/components/sections/product-categories';
import Lightscapes from '@/components/sections/lightscapes';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Icons } from '@/components/icons';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Header />
      <main className="flex-grow">
        <Hero />
        <div className="border-t border-primary/30" />
        <ProductCategories />
        <Lightscapes />
        <Lifestyle />
        <About />
        <InstagramFeed />
        <Contact />
        <section className="bg-secondary text-white py-20 md:py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-sm mx-auto text-center">
              <h3 className="text-lg font-bold mb-6">
                Join our community and enjoy 10% off your first Living Gold order
              </h3>
              <form className="flex mb-6">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-background border-muted-foreground border-r-0 rounded-r-none flex-1 placeholder:text-gray-400"
                />
                <Button type="submit" size="icon" className="rounded-l-none bg-primary hover:bg-yellow-600">
                  <Icons.arrowRight className="h-5 w-5 text-black" />
                </Button>
              </form>
              <p className="text-xs text-gray-400">
                By subscribing, you confirm you have read and understood our{" "}
                <Link href="/privacy-policy" className="text-primary underline">
                  privacy policy
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
