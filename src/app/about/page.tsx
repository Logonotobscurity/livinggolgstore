import CmsLayout from "@/components/layout/cms-layout";
import Image from "next/image";

export default function AboutPage() {
  const breadcrumb = [
    { text: 'Home', href: '/' },
    { text: 'About' }
  ];

  return (
    <CmsLayout breadcrumb={breadcrumb}>
      <div className="cms-page text-white">
        <div className="text-wrapper align-left">
          <div className="intro-text">
            <p>Curators of the Unexpected</p>
          </div>
          <h1>About Us</h1>
        </div>

        <div className="default-content-wrapper">
          <Image 
            src="https://picsum.photos/seed/about-main/1200/800"
            alt="Living Gold interior"
            width={1200}
            height={800}
            data-ai-hint="luxury living room"
          />
        </div>

        <div className="text-wrapper align-left">
          <div className="left-border">
            <h2>Heather Smith, the visionary founder of Living Gold, has dedicated her life to the art of interior design.</h2>
            <p>
              With a career spanning over three decades, Heather has established herself as a leading authority in the luxury design space. Her journey began in a small boutique in Charlotte, NC, where her passion for unique, high-quality furnishings and her innate ability to blend styles captured the attention of a discerning clientele.
            </p>
            <p>
              Living Gold is more than just a showroom; it is the culmination of Heather's lifelong passion. It's a place where clients become friends, and homes are transformed into personal sanctuaries.
            </p>
          </div>
        </div>

        <div className="text-wrapper">
          <hr className="section-divider" />
        </div>

        <div className="text-wrapper align-left">
          <h3>Our Philosophy</h3>
          <p>
            We believe that every object in a home should tell a story. That's why we travel the globe, from the bustling markets of Marrakech to the serene workshops of Japanese artisans, to source pieces that are not only beautiful but also rich in history and craftsmanship. Our collection is a testament to the idea that luxury is not just about price, but about the uniqueness, quality, and soul of an item.
          </p>
        </div>
      </div>
    </CmsLayout>
  );
}
