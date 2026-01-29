import Pricing from "@/components/marketing/Pricing";
import FinalCTA from "@/components/marketing/FinalCTA";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Pricing" });

    return {
        title: t("title"),
        description: t("subtitle"),
    };
}

export default function PricingPage() {
    return (
        <main className="bg-background min-h-screen pt-20">
            <Pricing />
            <FinalCTA />
        </main>
    );
}
