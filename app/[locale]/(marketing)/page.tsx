import dynamic from "next/dynamic";
import Hero from "@/components/marketing/Hero";
import TechStack from "@/components/marketing/TechStack";
import ProblemSection from "@/components/marketing/ProblemSection";

// Below-fold sections: code-split to reduce initial JS bundle
const ServiceCards = dynamic(() => import("@/components/marketing/ServiceCards"));
const ClientCarousel = dynamic(() => import("@/components/marketing/ClientCarouselLazy"));
const Testimonials = dynamic(() => import("@/components/marketing/Testimonials"));
const GlobalReach = dynamic(() => import("@/components/marketing/GlobalReachLazy"));
const AboutMe = dynamic(() => import("@/components/marketing/AboutMe"));
const FinalCTA = dynamic(() => import("@/components/marketing/FinalCTA"));

export default function MarketingPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <main className="isolate">
        <Hero />
        <TechStack />
        <ProblemSection />
        <ServiceCards />
        <ClientCarousel />
        <Testimonials />
        <GlobalReach />
        <FinalCTA />
      </main>
    </div>
  );
}
