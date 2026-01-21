import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { PulsatingButton } from "@/components/ui/pulsating-button";

export default function FinalCTA() {
    const t = useTranslations("CTA");

    return (
        <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-5xl sm:text-7xl font-black tracking-tight text-white mb-12 drop-shadow-lg">
                        {t("headline")}
                    </h2>
                    <div className="flex items-center justify-center">
                        <Link href="/contact">
                            <PulsatingButton className="px-8 py-4 text-xl font-bold rounded-full" pulseColor="#EAB308">
                                {t("button")}
                            </PulsatingButton>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
