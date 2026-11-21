import FeaturesSection from "./_components/FeaturesSection";
import HeroSection from "./_components/HeroSection";
import LandingFooter from "./_components/LandingFooter";
import LandingHeader from "./_components/LandingHeader";
import PricingSection from "./_components/PricingSection";
import TestimonialsSection from "./_components/TestimonialsSection";

export default function Home() {
  return (
    <>
      <LandingHeader />
      <main className="pt-16">
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <TestimonialsSection />
      </main>
      <LandingFooter />
    </>
  );
}
