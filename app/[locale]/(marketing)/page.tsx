import Hero from "@/components/marketing/Hero";
import TechStack from "@/components/marketing/TechStack";
import Testimonials from "@/components/marketing/Testimonials";
import ProblemSection from "@/components/marketing/ProblemSection";
import ServiceCards from "@/components/marketing/ServiceCards";
import LoomGrid from "@/components/marketing/LoomGrid";
import AboutMe from "@/components/marketing/AboutMe";
import FinalCTA from "@/components/marketing/FinalCTA";
import Footer from "@/components/marketing/Footer";

export default function MarketingPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <main className="isolate">
        <Hero />
        <TechStack />
        <Testimonials />
        <ProblemSection />
        <ServiceCards />
        <LoomGrid />
        <AboutMe />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
