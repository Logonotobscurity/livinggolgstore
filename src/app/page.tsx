import Header from '@/components/layout/header';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Lifestyle from '@/components/sections/lifestyle';
import InstagramFeed from '@/components/sections/instagram-feed';
import Contact from '@/components/sections/contact';
import Footer from '@/components/layout/footer';
import ProductCategories from '@/components/sections/product-categories';
import Lightscapes from '@/components/sections/lightscapes';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Header />
      <main className="flex-grow">
        <Hero />
        <ProductCategories />
        <Lightscapes />
        <Lifestyle />
        <About />
        <InstagramFeed />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
