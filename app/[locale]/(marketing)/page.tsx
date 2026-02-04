import Hero from "@/components/marketing/Hero";
import TechStack from "@/components/marketing/TechStack";
import ProblemSection from "@/components/marketing/ProblemSection";
import ServiceCards from "@/components/marketing/ServiceCards";
import Testimonials from "@/components/marketing/Testimonials";
import ClientShowcase from "@/components/marketing/ClientShowcase";
import AboutMe from "@/components/marketing/AboutMe";
import GlobalReach from "@/components/marketing/GlobalReach";
import FinalCTA from "@/components/marketing/FinalCTA";

export default function MarketingPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <main className="isolate">
        <Hero />
        <TechStack />
        <ProblemSection />
        <ServiceCards />
        <ClientShowcase />
        <GlobalReach />
        <FinalCTA />
      </main>
    </div>
  );
}
