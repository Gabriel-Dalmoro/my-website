import { getTranslations } from "next-intl/server";
import TermsPage from "@/components/marketing/TermsPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Terms" });

    return {
        title: t("title"),
        description: t("metaDescription"),
        robots: { index: false, follow: false },
    };
}

export default function Terms() {
    return <TermsPage />;
}
