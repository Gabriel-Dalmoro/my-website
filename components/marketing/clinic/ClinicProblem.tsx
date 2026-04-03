import { useTranslations } from "next-intl";

export default function ClinicProblem() {
    const t = useTranslations("Clinic.Problem");

    const painPoints = [
        { emoji: t("pain0emoji"), text: t("pain0") },
        { emoji: t("pain1emoji"), text: t("pain1") },
        { emoji: t("pain2emoji"), text: t("pain2") },
        { emoji: t("pain3emoji"), text: t("pain3") },
    ];

    return (
        <div className="bg-zinc-950 pt-20 pb-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <p className="text-base font-semibold leading-7 text-red-500 uppercase tracking-wide">
                        {t("label")}
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        {t("headline")}
                    </h2>
                    <p className="mt-6 text-xl leading-8 text-zinc-400 max-w-2xl mx-auto">
                        {t("subheadline")}
                    </p>
                </div>

                <div className="mx-auto mt-12 max-w-2xl grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {painPoints.map((point) => (
                        <div
                            key={point.text}
                            className="flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"
                        >
                            <span className="text-2xl shrink-0">{point.emoji}</span>
                            <p className="text-zinc-300 text-sm leading-relaxed">{point.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
