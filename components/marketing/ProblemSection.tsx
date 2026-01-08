import { useTranslations } from "next-intl";

export default function ProblemSection() {
    const t = useTranslations("Problem");

    return (
        <div className="bg-zinc-950 pt-20 pb-10">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <p className="text-base font-semibold leading-7 text-red-500 uppercase tracking-wide">{t("label")}</p>
                    <h2 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                        {t("headline")}
                    </h2>
                    <p className="mt-6 text-xl leading-8 text-zinc-400 max-w-2xl mx-auto">
                        {t("subheadline")}
                    </p>
                </div>
            </div>
        </div>
    );
}
