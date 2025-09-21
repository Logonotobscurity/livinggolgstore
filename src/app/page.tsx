
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
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <section aria-labelledby="product-categories-heading">
          <div className="border-t border-primary/30" />
          <ProductCategories />
        </section>
        <section aria-labelledby="lightscapes-heading">
          <Lightscapes />
        </section>
        <section aria-labelledby="lifestyle-heading">
          <div className="border-t border-primary/30" />
          <Lifestyle />
        </section>
        <section aria-labelledby="trades-services-heading">
          <TradesAndServices />
        </section>
        <section aria-labelledby="about-heading">
          <About />
        </section>
        <section aria-labelledby="instagram-feed-heading">
          <InstagramFeed />
        </section>
        <section aria-labelledby="contact-heading">
          <div className="border-t border-primary/30" />
          <Contact />
        </section>
        <section aria-labelledby="newsletter-heading">
          <Newsletter />
        </section>
      </main>
      <Footer />
    </div>
  );
}
