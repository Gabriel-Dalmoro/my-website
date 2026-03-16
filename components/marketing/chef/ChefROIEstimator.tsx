"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function ChefROIEstimator() {
    const t = useTranslations("Chef.ROI");

    const [weeklyHours, setWeeklyHours] = useState(10);
    const [rate, setRate] = useState(60);

    const hoursPerYear = weeklyHours * 52;
    const costPerYear = hoursPerYear * rate;

    return (
        <section className="relative bg-zinc-950 py-20 overflow-hidden">
            {/* Subtle amber glow */}
            <div className="absolute top-1/2 left-1/2 -z-10 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/5 blur-[100px]" />

            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-12">
                    <p className="text-base font-semibold uppercase tracking-wide text-yellow-500 mb-2">
                        {t("label")}
                    </p>
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        {t("headline")}
                    </h2>
                    <p className="mt-4 text-lg text-zinc-400">{t("subheadline")}</p>
                </div>

                <div className="mx-auto max-w-3xl">
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 space-y-8">
                        {/* Sliders */}
                        <div className="space-y-6">
                            {/* Weekly hours */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm text-zinc-300">{t("weeklyHoursLabel")}</label>
                                    <span className="text-sm font-bold text-yellow-400 tabular-nums">{weeklyHours}h</span>
                                </div>
                                <input
                                    type="range" min={1} max={40} value={weeklyHours}
                                    onChange={(e) => setWeeklyHours(Number(e.target.value))}
                                    className="w-full h-1.5 rounded-full appearance-none bg-zinc-700 accent-yellow-500 cursor-pointer"
                                />
                                <div className="flex justify-between text-xs text-zinc-600">
                                    <span>1h</span><span>40h</span>
                                </div>
                            </div>

                            {/* Rate */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm text-zinc-300">{t("rateLabel")}</label>
                                    <span className="text-sm font-bold text-yellow-400 tabular-nums">€{rate}</span>
                                </div>
                                <input
                                    type="range" min={20} max={200} step={5} value={rate}
                                    onChange={(e) => setRate(Number(e.target.value))}
                                    className="w-full h-1.5 rounded-full appearance-none bg-zinc-700 accent-yellow-500 cursor-pointer"
                                />
                                <div className="flex justify-between text-xs text-zinc-600">
                                    <span>€20</span><span>€200</span>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-zinc-800" />

                        {/* Results */}
                        <div className="grid grid-cols-2 gap-6 text-center">
                            <div className="space-y-1">
                                <p className="text-5xl font-black text-yellow-400 tabular-nums transition-all duration-300">
                                    {hoursPerYear}
                                </p>
                                <p className="text-sm text-zinc-400">{t("hoursUnit")}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-5xl font-black text-red-400 tabular-nums transition-all duration-300">
                                    €{costPerYear.toLocaleString()}
                                </p>
                                <p className="text-sm text-zinc-400">{t("costUnit")}</p>
                            </div>
                        </div>

                        <p className="text-center text-sm text-zinc-500 italic">{t("resultNote")}</p>

                        <div className="text-center">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-semibold text-sm transition-colors underline underline-offset-4 decoration-yellow-400/40 hover:decoration-yellow-300"
                            >
                                {t("cta")}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
