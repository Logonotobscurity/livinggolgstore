
import type { Metadata } from 'next';
import ContactClient from './contact-client';

export const metadata: Metadata = {
  title: 'Contact Us | Living Gold Nigeria Showroom',
  description: 'Get in touch with Living Gold. Visit our showroom in Asaba, Nigeria, call our team, or send an email for help with your luxury lighting needs in Lagos, Asaba, and nationwide.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Living Gold | Asaba Showroom & Nationwide Support',
    description: 'Reach our expert team for lighting consultations, project quotes, and customer support. Visit our showroom or contact us online.',
    url: 'https://livinggold.com/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
