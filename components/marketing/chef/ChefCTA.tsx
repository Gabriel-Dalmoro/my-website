import Link from "next/link";
import { PulsatingButton } from "@/components/ui/pulsating-button";
import { useTranslations } from "next-intl";

export default function ChefCTA() {
    const t = useTranslations("Chef.CTA");

    return (
        <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-5xl sm:text-7xl font-black tracking-tight text-white mb-6 drop-shadow-lg">
                        {t("headline")}
                    </h2>
                    <p className="text-xl text-zinc-400 mb-12 max-w-xl mx-auto">
                        {t("description")}
                    </p>
                    <div className="flex items-center justify-center">
                        <Link href="/contact">
                            <PulsatingButton className="px-8 py-4 text-xl font-bold" pulseColor="#EAB308">
                                {t("button")}
                            </PulsatingButton>
                        </Link>
                    </div>
                    <p className="mt-6 text-sm text-zinc-600">
                        {t("note")}
                    </p>
                </div>
            </div>
        </div>
    );
}
