import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SunBanner } from '@/components/sun-banner';

export default function Hero() {
  return (
    <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <SunBanner />
      </div>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-3xl text-center mx-auto">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-primary mb-4">
                FOR THOSE WHO SEEK
            </p>
            <h1 className="font-headline text-7xl font-bold leading-tight text-white mb-10 text-shadow-lg">
                RARE, UNUSUAL, AND EXQUISITE FINDS
            </h1>
            <Button asChild size="lg" className="bg-primary text-black hover:bg-yellow-600">
              <Link href="#">
                Shop Living Gold Finds
              </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
