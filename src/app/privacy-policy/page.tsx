import type { Metadata } from 'next';
import CmsLayout from '@/components/layout/cms-layout';

export const metadata: Metadata = {
  title: 'Privacy Policy | Living Gold Nigeria',
  description: 'How we collect, use, and protect your information when you interact with Living Gold.',
};

export default function PrivacyPolicyPage() {
  const breadcrumb = [
    { text: 'Home', href: '/' },
    { text: 'Privacy Policy' },
  ];

  return (
    <CmsLayout breadcrumb={breadcrumb}>
      <div className="cms-page text-foreground">
        <div className="text-wrapper text-center mb-12 px-4">
          <h1 className="mb-4 text-4xl md:text-5xl">Privacy Policy</h1>
          <p className="text-base md:text-lg max-w-3xl mx-auto text-muted-foreground">
            We respect your privacy. This page explains what information we collect and how we use it.
          </p>
        </div>

        <div className="text-wrapper align-left">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold text-primary">Information We Collect</h2>
            </div>
            <div className="md:col-span-2 space-y-4 text-muted-foreground">
              <ul className="list-disc list-inside space-y-2">
                <li>Contact details you provide (e.g., name, email, phone) for quotes and customer service.</li>
                <li>Order and quote details to fulfill your requests.</li>
                <li>Basic analytics to improve site performance and experience.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-primary/30 my-12" />

        <div className="text-wrapper align-left">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold text-primary">How We Use Information</h2>
            </div>
            <div className="md:col-span-2 space-y-4 text-muted-foreground">
              <ul className="list-disc list-inside space-y-2">
                <li>To prepare quotes and manage orders.</li>
                <li>To respond to inquiries and provide customer support.</li>
                <li>To improve our services and communications.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-primary/30 my-12" />

        <div className="text-wrapper align-left">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold text-primary">Your Choices</h2>
            </div>
            <div className="md:col-span-2 space-y-4 text-muted-foreground">
              <ul className="list-disc list-inside space-y-2">
                <li>You can request access, correction, or deletion of your personal data.</li>
                <li>You can unsubscribe from marketing communications at any time.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </CmsLayout>
  );
}
