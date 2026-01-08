import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FinalCTA() {
    const t = useTranslations("CTA");

    return (
        <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        {t("headline")}
                    </h2>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Button asChild size="lg" className="rounded-full text-base font-semibold">
                            <Link href="https://calendly.com/" target="_blank">
                                {t("button")}
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
