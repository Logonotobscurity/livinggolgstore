
import CmsLayout from '@/components/layout/cms-layout';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  const breadcrumb = [
    { text: 'Home', href: '/' },
    { text: '404' }
  ];

  return (
    <CmsLayout breadcrumb={breadcrumb}>
      <div className="cms-page text-white text-center">
        <div className="text-wrapper px-4">
          <h1 className="text-7xl md:text-9xl font-bold text-primary font-headline">404</h1>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold font-headline">Page Not Found</h2>
          <p className="mt-6 max-w-xl mx-auto text-lg text-gray-300">
            Sorry, the page you were looking for could not be found. It might have been moved, deleted, or the URL might be incorrect.
          </p>
          <Button asChild size="lg" className="mt-10" showIcon>
            <Link href="/">
              Return to Homepage
            </Link>
          </Button>
        </div>
      </div>
    </CmsLayout>
  );
}
