
import type { Metadata } from 'next';
import CmsLayout from '@/components/layout/cms-layout';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const metadata: Metadata = {
  title: 'Projects Portfolio | Living Gold Nigeria',
  description: 'Explore a portfolio of our completed projects. See how our luxury lighting transforms residential and commercial spaces across Nigeria.',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'Projects Portfolio | Living Gold Nigeria',
    description: 'A gallery of inspirational residential and commercial interiors featuring luxury lighting from Living Gold.',
    url: 'https://livinggold.com/projects',
    type: 'website',
  },
};

export default function ProjectsPage() {
  const breadcrumb = [
    { text: 'Home', href: '/' },
    { text: 'Projects' }
  ];

  const projects = PlaceHolderImages.filter(p => p.id.startsWith('room-settings-'));

  return (
    <CmsLayout breadcrumb={breadcrumb}>
      <div className="cms-page text-foreground">
        <div className="text-wrapper text-center mb-16 px-4">
          <h1 className="mb-4 text-4xl md:text-5xl">Our Projects</h1>
          <p className="text-base md:text-lg max-w-3xl mx-auto">
            Discover curated spaces that inspire. See how our lighting has transformed residential and commercial interiors, bringing vision to life with light.
          </p>
        </div>

        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-12">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="group relative aspect-[4/3] block rounded-lg overflow-hidden"
                    >
                        <Image
                            src={project.imageUrl}
                            alt={project.description}
                            fill
                            className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                            data-ai-hint={project.imageHint}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                            <h3 className="text-white text-lg font-bold">{project.title}</h3>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </section>
      </div>
    </CmsLayout>
  );
}
