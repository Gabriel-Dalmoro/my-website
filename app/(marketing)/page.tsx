import Hero from "@/components/marketing/Hero";
import TechStack from "@/components/marketing/TechStack";
import ServiceCards from "@/components/marketing/ServiceCards";
import LoomGrid from "@/components/marketing/LoomGrid";
import Footer from "@/components/marketing/Footer";

export default function MarketingPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <main className="isolate">
        <Hero />
        <TechStack />
        <ServiceCards />
        <LoomGrid />
      </main>
      <Footer />
    </div>
  );
}
