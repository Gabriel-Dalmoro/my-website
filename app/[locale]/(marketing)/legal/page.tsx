import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import LegalPage from "@/components/marketing/LegalPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Legal" });

    return {
        title: t("title"),
        description: t("metaDescription"),
        robots: { index: false, follow: false },
    };
}

export default function Legal() {
    return <LegalPage />;
}
