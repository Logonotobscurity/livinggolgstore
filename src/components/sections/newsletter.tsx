
'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Icons } from '@/components/icons';
import { useResponsive } from '@/hooks/use-responsive';

export default function Newsletter() {
  const { isMobile } = useResponsive();

  return (
    <section className={`text-foreground ${isMobile ? 'py-16' : 'py-24'}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-sm mx-auto text-center">
          <h3 className="text-xl font-bold mb-6">
            Join our community and enjoy 10% off your first Living Gold order
          </h3>
          <form className="flex mb-6">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-background border-muted-foreground border-r-0 rounded-r-none flex-1 placeholder:text-muted-foreground"
            />
            <Button type="submit" size="icon" className="rounded-l-none bg-primary hover:bg-yellow-600">
              <Icons.arrowRight className="h-5 w-5 text-black" />
            </Button>
          </form>
          <p className="text-xs text-muted-foreground">
            By subscribing, you confirm you have read and understood our{" "}
            <Link href="/privacy-policy" className="text-primary underline">
              privacy policy
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
