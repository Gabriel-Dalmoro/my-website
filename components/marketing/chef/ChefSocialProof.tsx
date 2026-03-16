import { useTranslations } from "next-intl";

export default function ChefSocialProof() {
    const t = useTranslations("Chef.SocialProof");

    const stats = [
        { value: t("stat0value"), label: t("stat0label") },
        { value: t("stat1value"), label: t("stat1label") },
        { value: t("stat2value"), label: t("stat2label") },
    ];

    return (
        <section className="border-y border-zinc-800 bg-zinc-950 py-10">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 mb-8">
                    {t("label")}
                </p>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
                    {stats.map((stat) => (
                        <div key={stat.label} className="flex flex-col items-center gap-1">
                            <span className="text-4xl font-black text-yellow-400">{stat.value}</span>
                            <span className="text-sm text-zinc-400">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
