"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

interface BarData {
    label: string;
    hours: number;
    widthPct: number;
    color: string;
    textColor: string;
}

function BarRow({ bar, delay }: { bar: BarData; delay: number }) {
    return (
        <div className="space-y-1.5">
            <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-300">{bar.label}</span>
                <span className={`text-sm font-bold tabular-nums ${bar.textColor}`}>
                    {bar.hours > 0 ? `${bar.hours}h` : "✓ auto"}
                </span>
            </div>
            <div className="h-3 w-full rounded-full bg-zinc-800 overflow-hidden">
                <motion.div
                    className={`h-full rounded-full ${bar.color}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${bar.widthPct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
                />
            </div>
        </div>
    );
}

export default function ChefDayInLife() {
    const t = useTranslations("Chef.DayInLife");

    const beforeBars: BarData[] = [
        { label: t("adminBefore"), hours: 6, widthPct: 60, color: "bg-red-500/70", textColor: "text-red-400" },
        { label: t("cookingBefore"), hours: 3, widthPct: 30, color: "bg-green-500/60", textColor: "text-green-400" },
        { label: t("otherBefore"), hours: 1, widthPct: 10, color: "bg-zinc-500/60", textColor: "text-zinc-400" },
    ];

    const afterBars: BarData[] = [
        { label: t("cookingAfter"), hours: 9, widthPct: 90, color: "bg-green-500/70", textColor: "text-green-400" },
        { label: t("growthAfter"), hours: 1, widthPct: 10, color: "bg-yellow-500/70", textColor: "text-yellow-400" },
        { label: t("adminAfter"), hours: 0, widthPct: 3, color: "bg-red-500/20", textColor: "text-zinc-600" },
    ];

    return (
        <section className="bg-zinc-950 py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-14">
                    <p className="text-base font-semibold uppercase tracking-wide text-yellow-500 mb-2">
                        {t("label")}
                    </p>
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        {t("headline")}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 max-w-4xl mx-auto">
                    {/* BEFORE */}
                    <div className="space-y-5">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-px flex-1 bg-red-500/20" />
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-red-400">
                                {t("beforeTitle")}
                            </h3>
                            <div className="h-px flex-1 bg-red-500/20" />
                        </div>
                        {beforeBars.map((bar, i) => (
                            <BarRow key={bar.label} bar={bar} delay={i * 0.15} />
                        ))}
                        <p className="text-xs text-red-400/60 text-center pt-2">6h admin · 3h cooking</p>
                    </div>

                    {/* AFTER */}
                    <div className="space-y-5">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-px flex-1 bg-green-500/20" />
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-green-400">
                                {t("afterTitle")}
                            </h3>
                            <div className="h-px flex-1 bg-green-500/20" />
                        </div>
                        {afterBars.map((bar, i) => (
                            <BarRow key={bar.label} bar={bar} delay={i * 0.15 + 0.3} />
                        ))}
                        <p className="text-xs text-green-400/60 text-center pt-2">9h cooking · 0h admin</p>
                    </div>
                </div>

                <p className="text-center text-sm text-zinc-500 italic mt-10">
                    {t("note")}
                </p>
            </div>
        </section>
    );
}
