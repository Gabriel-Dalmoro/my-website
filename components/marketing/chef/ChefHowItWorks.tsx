import { useTranslations } from "next-intl";

const stepNumbers = ["01", "02", "03"];
const stepEmojis = ["☎️", "🔧", "🍳"];

export default function ChefHowItWorks() {
    const t = useTranslations("Chef.HowItWorks");

    const steps = [
        {
            number: stepNumbers[0],
            emoji: stepEmojis[0],
            title: t("step0title"),
            description: t("step0description"),
        },
        {
            number: stepNumbers[1],
            emoji: stepEmojis[1],
            title: t("step1title"),
            description: t("step1description"),
        },
        {
            number: stepNumbers[2],
            emoji: stepEmojis[2],
            title: t("step2title"),
            description: t("step2description"),
        },
    ];

    return (
        <section className="bg-zinc-950 py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-14">
                    <p className="text-base font-semibold uppercase tracking-wide text-green-500 mb-2">
                        {t("label")}
                    </p>
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        {t("headline")}
                    </h2>
                </div>

                <div className="relative grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8 max-w-5xl mx-auto">
                    {/* Connecting line on desktop */}
                    <div className="hidden md:block absolute top-10 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-zinc-700 via-yellow-500/30 to-zinc-700" />

                    {steps.map((step, i) => (
                        <div key={step.number} className="relative flex flex-col items-center text-center">
                            {/* Number badge */}
                            <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-yellow-500/30 bg-zinc-900 shadow-[0_0_30px_rgba(234,179,8,0.1)] mb-6">
                                <span className="text-3xl">{step.emoji}</span>
                                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500 text-xs font-black text-black">
                                    {i + 1}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
