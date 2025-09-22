
'use client';

import { ReactNode, useEffect } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Link from 'next/link';
import { Icons } from '@/components/icons';
import { useResponsive } from '@/hooks/use-responsive';

interface CmsLayoutProps {
  children: ReactNode;
  breadcrumb?: { text: string; href?: string }[];
}

export default function CmsLayout({ children, breadcrumb }: CmsLayoutProps) {
  const { isMobile } = useResponsive();

  useEffect(() => {
    document.body.classList.add('cms-page-body', 'with-breadcrumb');
    return () => {
      document.body.classList.remove('cms-page-body', 'with-breadcrumb');
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {breadcrumb && (
          <div className="breadcrumb-wrapper">
            <div className="breadcrumb container mx-auto px-4 sm:px-6 lg:px-8">
              <ul className="flex items-center text-sm text-muted-foreground">
                {breadcrumb.map((item, index) => (
                  <li key={index} className="flex items-center">
                    {item.href ? (
                      <Link href={item.href} className="hover:text-primary">
                        {item.text}
                      </Link>
                    ) : (
                      <span className="text-foreground">{item.text}</span>
                    )}
                    {index < breadcrumb.length - 1 && (
                      <Icons.chevronRight className="h-4 w-4 mx-1" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <div className={isMobile ? 'py-16' : 'py-24'}>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
