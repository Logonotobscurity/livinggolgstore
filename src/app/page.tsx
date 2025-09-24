
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
import FeaturedFinds from '@/components/sections/featured-finds';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <section aria-labelledby="product-categories-heading">
          <h2 id="product-categories-heading" className="sr-only">Product Categories</h2>
          <div className="border-t border-primary/30" />
          <ProductCategories />
        </section>
        <section aria-labelledby="featured-finds-heading">
          <h2 id="featured-finds-heading" className="sr-only">Featured Finds</h2>
          <FeaturedFinds />
        </section>
        <section aria-labelledby="lightscapes-heading">
          <h2 id="lightscapes-heading" className="sr-only">Lightscapes</h2>
          <Lightscapes />
        </section>
        <section aria-labelledby="lifestyle-heading">
          <h2 id="lifestyle-heading" className="sr-only">Lifestyle</h2>
          <div className="border-t border-primary/30" />
          <Lifestyle />
        </section>
        <section aria-labelledby="trades-services-heading">
          <h2 id="trades-services-heading" className="sr-only">Trades &amp; Services</h2>
          <TradesAndServices />
        </section>
        <section aria-labelledby="about-heading">
          <h2 id="about-heading" className="sr-only">About Living Gold</h2>
          <About />
        </section>
        <section aria-labelledby="instagram-feed-heading">
          <h2 id="instagram-feed-heading" className="sr-only">Instagram Feed</h2>
          <InstagramFeed />
        </section>
        <section aria-labelledby="contact-heading">
          <h2 id="contact-heading" className="sr-only">Contact</h2>
          <div className="border-t border-primary/30" />
          <Contact />
        </section>
        <section aria-labelledby="newsletter-heading">
          <h2 id="newsletter-heading" className="sr-only">Newsletter</h2>
          <Newsletter />
        </section>
      </main>
      <Footer />
    </div>
  );
}
