'use client';

import CmsLayout from "@/components/layout/cms-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useResponsive } from "@/hooks/use-responsive";

const colors = [
  { name: 'Background', var: 'hsl(var(--background))', text: 'hsl(var(--foreground))' },
  { name: 'Foreground', var: 'hsl(var(--foreground))', text: 'hsl(var(--background))' },
  { name: 'Card', var: 'hsl(var(--card))', text: 'hsl(var(--card-foreground))' },
  { name: 'Popover', var: 'hsl(var(--popover))', text: 'hsl(var(--popover-foreground))' },
  { name: 'Primary', var: 'hsl(var(--primary))', text: 'hsl(var(--primary-foreground))' },
  { name: 'Secondary', var: 'hsl(var(--secondary))', text: 'hsl(var(--secondary-foreground))' },
  { name: 'Muted', var: 'hsl(var(--muted))', text: 'hsl(var(--muted-foreground))' },
  { name: 'Accent', var: 'hsl(var(--accent))', text: 'hsl(var(--accent-foreground))' },
  { name: 'Destructive', var: 'hsl(var(--destructive))', text: 'hsl(var(--destructive-foreground))' },
  { name: 'Border', var: 'hsl(var(--border))', text: 'hsl(var(--foreground))' },
  { name: 'Input', var: 'hsl(var(--input))', text: 'hsl(var(--foreground))' },
  { name: 'Ring', var: 'hsl(var(--ring))', text: 'hsl(var(--foreground))' },
];

export default function StyleGuidePage() {
  const { isMobile, isTablet } = useResponsive();
  const breadcrumb = [
    { text: 'Home', href: '/' },
    { text: 'Style Guide' }
  ];

  return (
    <CmsLayout breadcrumb={breadcrumb}>
      <div className="container mx-auto px-4 text-white">
        <h1 className={`font-headline ${isMobile ? 'text-4xl' : 'text-5xl'} font-bold mb-12`}>Style Guide</h1>

        {/* Colors Section */}
        <section className="mb-16">
          <h2 className="font-headline text-3xl font-bold mb-8 border-b border-primary/30 pb-4">Colors</h2>
          <div className={`grid ${isMobile ? 'grid-cols-2' : isTablet ? 'grid-cols-3' : 'grid-cols-4'} gap-4`}>
            {colors.map((color) => (
              <div key={color.name} className="rounded-lg border border-border overflow-hidden">
                <div style={{ backgroundColor: color.var }} className="h-24 w-full"></div>
                <div className="p-4 bg-secondary">
                  <p className="font-semibold">{color.name}</p>
                  <p className="text-xs text-muted-foreground">{color.var.replace('hsl(var(', '').replace('))', '')}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography Section */}
        <section className="mb-16">
          <h2 className="font-headline text-3xl font-bold mb-8 border-b border-primary/30 pb-4">Typography</h2>
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Headline (Playfair Display)</p>
              <h1 className={`font-headline ${isMobile ? 'text-5xl' : 'text-7xl'} font-bold`}>H1 Headline</h1>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Headline (Playfair Display)</p>
              <h2 className={`font-headline ${isMobile ? 'text-4xl' : 'text-5xl'} font-bold`}>H2 Headline</h2>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Headline (Playfair Display)</p>
              <h3 className={`font-headline ${isMobile ? 'text-2xl' : 'text-3xl'} font-bold`}>H3 Headline</h3>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Body (Inter)</p>
              <p className={`${isMobile ? 'text-base' : 'text-lg'}`}>This is a paragraph of body text (text-lg). It's used for introductory paragraphs or stand-out text. The quick brown fox jumps over the lazy dog.</p>
            </div>
             <div>
              <p className="text-sm text-muted-foreground mb-1">Body (Inter)</p>
              <p>This is a standard paragraph of body text. Most of the text in the application will look like this. The quick brown fox jumps over the lazy dog.</p>
            </div>
             <div>
              <p className="text-sm text-muted-foreground mb-1">Muted (Inter)</p>
              <p className="text-muted-foreground">This is muted text, used for secondary information or descriptions.</p>
            </div>
          </div>
        </section>

        {/* Components Section */}
        <section>
          <h2 className="font-headline text-3xl font-bold mb-8 border-b border-primary/30 pb-4">Components</h2>
          <div className="space-y-12">
            {/* Buttons */}
            <div>
              <h3 className="text-xl font-semibold mb-6">Buttons</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button>Default</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button showIcon>With Icon</Button>
              </div>
            </div>

            {/* Inputs */}
            <div>
              <h3 className="text-xl font-semibold mb-6">Inputs</h3>
              <div className="max-w-sm space-y-4">
                 <Input placeholder="Standard Input" />
                 <Input placeholder="Focus state" className="focus-visible:ring-2 focus-visible:ring-ring" />
                 <Input placeholder="Disabled state" disabled />
              </div>
            </div>

            {/* Cards */}
             <div>
              <h3 className="text-xl font-semibold mb-6">Cards</h3>
              <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-8`}>
                <Card>
                  <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>This is the content of the card. It can contain any information you need to display to the user.</p>
                  </CardContent>
                </Card>
                 <Card className="bg-secondary">
                  <CardHeader>
                    <CardTitle>Secondary Card</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>This card uses the secondary background color for a different visual treatment.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </CmsLayout>
  );
}
