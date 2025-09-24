import type { Metadata } from 'next';
import CmsLayout from '@/components/layout/cms-layout';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Living Gold Nigeria',
  description: 'The terms that govern your use of Living Gold’s website, products, and services.',
};

export default function TermsPage() {
  const breadcrumb = [
    { text: 'Home', href: '/' },
    { text: 'Terms & Conditions' },
  ];

  return (
    <CmsLayout breadcrumb={breadcrumb}>
      <div className="cms-page text-foreground">
        <div className="text-wrapper text-center mb-12 px-4">
          <h1 className="mb-4 text-4xl md:text-5xl">Terms &amp; Conditions</h1>
          <p className="text-base md:text-lg max-w-3xl mx-auto text-muted-foreground">
            Please review these terms before using our site or engaging our services.
          </p>
        </div>

        <div className="text-wrapper align-left">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold text-primary">Use of the Site</h2>
            </div>
            <div className="md:col-span-2 space-y-4 text-muted-foreground">
              <p>
                Content is provided for information and inspiration. We aim to ensure accuracy, but details (including availability and pricing) are subject to change.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary/30 my-12" />

        <div className="text-wrapper align-left">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold text-primary">Orders & Quotes</h2>
            </div>
            <div className="md:col-span-2 space-y-4 text-muted-foreground">
              <p>
                Quotes are estimates based on availability and current logistics. An official invoice will confirm final pricing and timelines.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary/30 my-12" />

        <div className="text-wrapper align-left">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold text-primary">Liability</h2>
            </div>
            <div className="md:col-span-2 space-y-4 text-muted-foreground">
              <p>
                To the extent permitted by law, Living Gold is not liable for indirect or consequential losses arising from the use of the site or delays outside our control.
              </p>
            </div>
          </div>
        </div>
      </div>
    </CmsLayout>
  );
}
