import Header from '@/components/layout/header';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Lifestyle from '@/components/sections/lifestyle';
import InstagramFeed from '@/components/sections/instagram-feed';
import Contact from '@/components/sections/contact';
import Footer from '@/components/layout/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <Lifestyle />
        <InstagramFeed />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
