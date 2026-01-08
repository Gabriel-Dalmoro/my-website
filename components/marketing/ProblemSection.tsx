import { useTranslations } from "next-intl";

export default function ProblemSection() {
    const t = useTranslations("Problem");

    return (
        <div className="bg-zinc-950 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl mb-6">
                        {t("headline")}
                    </h2>
                    <p className="text-lg leading-8 text-zinc-400">
                        {t("subheadline")}
                    </p>
                </div>
            </div>
        </div>
    );
}
