import type { Metadata } from 'next';
import ContactClient from './contact-client';

export const metadata: Metadata = {
  title: 'Contact Us | Living Gold Nigeria',
  description: 'Get in touch with Living Gold. Visit our showroom in Asaba, Nigeria, call us, or send an email. We are here to help with your luxury lighting needs in Lagos, Asaba, and across the country.',
};

export default function ContactPage() {
  return <ContactClient />;
}
