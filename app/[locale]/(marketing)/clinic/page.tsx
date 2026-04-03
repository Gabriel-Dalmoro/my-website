import { Metadata } from "next";
import dynamic from "next/dynamic";
import ClinicHero from "@/components/marketing/clinic/ClinicHero";
import ClinicToolsStrip from "@/components/marketing/clinic/ClinicToolsStrip";
import ClinicProblem from "@/components/marketing/clinic/ClinicProblem";

const ClinicDayInLife = dynamic(() => import("@/components/marketing/clinic/ClinicDayInLife"));
const ClinicServices = dynamic(() => import("@/components/marketing/clinic/ClinicServices"));
const ClinicHowItWorks = dynamic(() => import("@/components/marketing/clinic/ClinicHowItWorks"));
const ClinicTestimonial = dynamic(() => import("@/components/marketing/clinic/ClinicTestimonial"));
const ClinicROIEstimator = dynamic(() => import("@/components/marketing/clinic/ClinicROIEstimator"));
const ClinicCTA = dynamic(() => import("@/components/marketing/clinic/ClinicCTA"));

export const metadata: Metadata = {
    title: "Automation for Medical Clinics & Healthcare Practices | Gabriel Dalmoro",
    description:
        "Stop losing hours to phone scheduling, paper forms, and billing admin. I build automated systems for clinics and healthcare businesses — so you can focus on patients.",
    openGraph: {
        title: "Less admin. More patient care.",
        description:
            "Automated appointment booking, patient intake, billing, and follow-up systems built specifically for medical clinics and healthcare practices.",
        images: ["/og-image.png"],
    },
};

export default function ClinicLandingPage() {
    return (
        <div className="bg-background text-foreground min-h-screen">
            <main className="isolate">
                <ClinicHero />
                <ClinicToolsStrip />
                <ClinicProblem />
                <ClinicDayInLife />
                <ClinicServices />
                <ClinicHowItWorks />
                <ClinicTestimonial />
                <ClinicROIEstimator />
                <ClinicCTA />
            </main>
        </div>
    );
}
