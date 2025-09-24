
import type { Metadata } from 'next';
import CmsLayout from '@/components/layout/cms-layout';

export const metadata: Metadata = {
  title: 'Shipping & Returns Policy | Living Gold Nigeria',
  description: 'Review the official shipping and returns policy for Living Gold. Learn about delivery timelines, nationwide coverage in Nigeria, and our process for returns.',
};

export default function ShippingReturnsPage() {
  const breadcrumb = [
    { text: 'Home', href: '/' },
    { text: 'Shipping & Returns' },
  ];

  return (
    <CmsLayout breadcrumb={breadcrumb}>
      <div className="cms-page text-foreground">
        <div className="text-wrapper text-center mb-12 px-4">
          <h1 className="mb-4 text-4xl md:text-5xl">Shipping &amp; Returns</h1>
          <p className="text-base md:text-lg max-w-3xl mx-auto text-muted-foreground">
            We deliver nationwide in Nigeria and to select African hubs. All orders are fully insured and trackable.
          </p>
        </div>

        <div className="text-wrapper align-left">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold text-primary">Delivery</h2>
            </div>
            <div className="md:col-span-2 space-y-4 text-muted-foreground">
              <ul className="list-disc list-inside space-y-2">
                <li>Standard delivery within Nigeria: 3–7 business days after dispatch.</li>
                <li>International/Regional delivery: lead times are provided on your quote.</li>
                <li>All shipments are insured and include tracking details upon dispatch.</li>
                <li>For oversized or bespoke items, our team will coordinate white-glove delivery where available.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-primary/30 my-12" />

        <div className="text-wrapper align-left">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold text-primary">Returns</h2>
            </div>
            <div className="md:col-span-2 space-y-4 text-muted-foreground">
              <p>
                We accept returns on most items within 14 days of delivery, provided they are in original, unused condition with all packaging intact.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Custom, bespoke, or specially sourced items are non-refundable.</li>
                <li>To initiate a return, contact our team with your order number.</li>
                <li>Once approved, return instructions and a return authorization will be provided.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-primary/30 my-12" />

        <div className="text-wrapper align-left">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold text-primary">Support</h2>
            </div>
            <div className="md:col-span-2 space-y-4 text-muted-foreground">
              <p>
                Need help with shipping, delivery updates, or a return? Our team is here to assist and keep your project on schedule.
              </p>
            </div>
          </div>
        </div>
      </div>
    </CmsLayout>
  );
}
