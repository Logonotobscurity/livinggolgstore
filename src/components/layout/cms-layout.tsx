import { ReactNode } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface CmsLayoutProps {
  children: ReactNode;
  breadcrumb?: { text: string; href?: string }[];
}

export default function CmsLayout({ children, breadcrumb }: CmsLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-black cms-page-body with-breadcrumb">
      <Header />
      <main className="flex-grow">
        {breadcrumb && (
          <div className="breadcrumb-wrapper">
            <div className="breadcrumb container mx-auto px-6">
              <ul className="flex items-center text-sm text-gray-400">
                {breadcrumb.map((item, index) => (
                  <li key={index} className="flex items-center">
                    {item.href ? (
                      <Link href={item.href} className="hover:text-primary">
                        {item.text}
                      </Link>
                    ) : (
                      <span className="text-gray-300">{item.text}</span>
                    )}
                    {index < breadcrumb.length - 1 && (
                      <ChevronRight className="h-4 w-4 mx-1" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <div className="py-16 md:py-24">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
