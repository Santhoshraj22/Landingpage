import Navbar from "@/components/ui/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import Interactive3DSection from "@/components/sections/Interactive3DSection";
import WhySection from "@/components/sections/WhySection";
import PricingSection from "@/components/sections/PricingSection";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <FeaturesSection />
        <Interactive3DSection />
        <WhySection />
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}
