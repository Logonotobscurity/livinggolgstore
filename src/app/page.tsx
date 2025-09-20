import Header from '@/components/layout/header';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Lifestyle from '@/components/sections/lifestyle';
import InstagramFeed from '@/components/sections/instagram-feed';
import Contact from '@/components/sections/contact';
import Footer from '@/components/layout/footer';
import ProductCategories from '@/components/sections/product-categories';
import Lightscapes from '@/components/sections/lightscapes';
import Newsletter from '@/components/sections/newsletter';
import TradesAndServices from '@/components/sections/trades-and-services';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <div className="border-t border-primary/30" />
        <ProductCategories />
        <Lightscapes />
        <div className="text-wrapper">
          <hr className="section-divider" />
        </div>
        <Lifestyle />
        <TradesAndServices />
        <About />
        <InstagramFeed />
        <div className="text-wrapper">
          <hr className="section-divider" />
        </div>
        <Contact />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
