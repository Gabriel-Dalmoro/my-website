import { Metadata } from "next";
import dynamic from "next/dynamic";
import ChefHero from "@/components/marketing/chef/ChefHero";
import ChefSocialProof from "@/components/marketing/chef/ChefSocialProof";
import ChefProblem from "@/components/marketing/chef/ChefProblem";
import CulinaryDivider from "@/components/marketing/chef/CulinaryDivider";

const ChefDayInLife = dynamic(() => import("@/components/marketing/chef/ChefDayInLife"));
const ChefServices = dynamic(() => import("@/components/marketing/chef/ChefServices"));
const ChefHowItWorks = dynamic(() => import("@/components/marketing/chef/ChefHowItWorks"));
const ChefToolsStrip = dynamic(() => import("@/components/marketing/chef/ChefToolsStrip"));
const ChefCaseStudy = dynamic(() => import("@/components/marketing/chef/ChefCaseStudy"));
const ChefTestimonial = dynamic(() => import("@/components/marketing/chef/ChefTestimonial"));
const ChefROIEstimator = dynamic(() => import("@/components/marketing/chef/ChefROIEstimator"));
const ChefCTA = dynamic(() => import("@/components/marketing/chef/ChefCTA"));
const ChefStickyCTA = dynamic(() => import("@/components/marketing/chef/ChefStickyCTA"));

export const metadata: Metadata = {
    title: "Automation for Professional Chefs & Caterers | Gabriel Dalmoro",
    description:
        "Stop spending your evenings on invoices and booking emails. I build automated systems for chefs and caterers — so you can focus on the kitchen.",
    openGraph: {
        title: "Less admin. More cooking.",
        description:
            "Automated booking, invoicing, and back-office systems built specifically for professional chefs and catering businesses.",
        images: ["/og-image.png"],
    },
};

export default function ChefLandingPage() {
    return (
        <div className="bg-background text-foreground min-h-screen">
            <main className="isolate">
                <ChefHero />
                <ChefSocialProof />
                <CulinaryDivider />
                <ChefDayInLife />
                <ChefProblem />
                <ChefServices />
                <CulinaryDivider />
                <ChefHowItWorks />
                <ChefToolsStrip />
                <CulinaryDivider />
                <ChefCaseStudy />
                <ChefTestimonial />
                <ChefROIEstimator />
                <ChefCTA />
            </main>
            <ChefStickyCTA />
        </div>
    );
}
