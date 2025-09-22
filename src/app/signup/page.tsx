
import CmsLayout from "@/components/layout/cms-layout";
import { SignUpForm } from "@/components/signup-form";

export default function SignUpPage() {
  const breadcrumb = [
    { text: 'Home', href: '/' },
    { text: 'Sign Up' }
  ];

  return (
    <CmsLayout breadcrumb={breadcrumb}>
      <div className="cms-page text-foreground">
        <div className="text-center mb-16 px-4">
          <h1 className="mb-4 text-4xl md:text-5xl">Join Living Gold</h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto">
            Create an account to receive exclusive offers, early access to new arrivals, and a personalized shopping experience.
          </p>
        </div>

        <div className="max-w-md mx-auto px-4">
            <SignUpForm />
        </div>
      </div>
    </CmsLayout>
  );
}
