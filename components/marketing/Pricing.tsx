"use client";

import { useTranslations } from "next-intl";
import { Check, ShieldCheck, Zap, ArrowRight, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShineBorder } from "@/components/ui/shine-border";
import { Link } from "@/i18n/routing";

export default function Pricing() {
    const t = useTranslations("Pricing");

    return (
        <section className="py-24 bg-zinc-950 relative overflow-hidden" id="pricing">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.05),transparent_70%)] pointer-events-none" />

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl mb-4">
                        {t("title")}
                    </h2>
                    <p className="text-lg text-zinc-400">
                        {t("subtitle")}
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto mb-20">

                    {/* Card 1: The Efficiency Starter (Pilot) */}
                    <div className="relative rounded-3xl bg-zinc-900/50 border border-primary/30 p-8 flex flex-col backdrop-blur-sm shadow-[0_0_50px_-20px_rgba(234,179,8,0.2)]">
                        {/* Glow & Badge */}
                        <ShineBorder shineColor={["#EAB308"]} duration={8} className="absolute inset-0 size-full pointer-events-none !bg-transparent rounded-3xl" />
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-yellow-400 text-zinc-950 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-yellow-500/20 uppercase tracking-wider z-20">
                            {t("cards.starter.badge")}
                        </div>

                        {/* Hours Reclaimed (Prominent) */}
                        <div className="mb-6 text-center pt-4">
                            <span className="block text-sm text-zinc-400 uppercase tracking-widest mb-2">{t("cards.starter.goal")}</span>
                            <div className="inline-flex items-center justify-center gap-2 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
                                <span className="text-3xl sm:text-4xl font-black tracking-tight">{t("cards.starter.hoursReclaimed")}</span>
                            </div>
                        </div>

                        {/* Title & Price */}
                        <div className="text-center mb-8 border-b border-zinc-800 pb-8">
                            <h3 className="text-xl font-bold text-white mb-2">{t("cards.starter.headline")}</h3>
                            <div className="text-primary font-semibold">{t("cards.starter.price")}</div>
                        </div>

                        {/* Bullets */}
                        <ul className="space-y-4 mb-8 flex-1">
                            {["0", "1", "2"].map((i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                                        <Check className="w-3 h-3 text-primary" />
                                    </div>
                                    <span className="text-zinc-300 text-sm leading-relaxed">
                                        {t(`cards.starter.bullets.${i}`)}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {/* Before/After Micro-Component */}
                        <div className="rounded-xl bg-zinc-950/50 border border-zinc-800 p-4 mb-8 text-center">
                            <div className="grid grid-cols-2 gap-4 divide-x divide-zinc-800">
                                <div>
                                    <div className="text-[10px] uppercase text-zinc-500 font-semibold mb-1">Before</div>
                                    <div className="text-red-400 font-bold text-lg">5h</div>
                                    <div className="text-[10px] text-zinc-600">Manual Work</div>
                                </div>
                                <div>
                                    <div className="text-[10px] uppercase text-zinc-500 font-semibold mb-1">After</div>
                                    <div className="text-green-400 font-bold text-lg">0h</div>
                                    <div className="text-[10px] text-zinc-600">Automated</div>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]">
                            <Link href="/contact?plan=starter">
                                {t("cards.starter.cta")} <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>

                        {/* Trust Elements */}
                        <div className="mt-6 flex items-center justify-center gap-6 opacity-60">
                            <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                                <ShieldCheck className="w-3.5 h-3.5" /> {t("trust.gdpr")}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                                <Zap className="w-3.5 h-3.5" /> {t("trust.instant")}
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Custom Business Engine */}
                    <div className="relative rounded-3xl bg-zinc-900/20 border border-zinc-800 p-8 flex flex-col hover:border-zinc-700 transition-colors">

                        {/* Hours Reclaimed (Prominent) */}
                        <div className="mb-6 text-center pt-8">
                            <span className="block text-sm text-zinc-500 uppercase tracking-widest mb-2">{t("cards.custom.goal")}</span>
                            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                                {t("cards.custom.hoursReclaimed")}
                            </div>
                        </div>

                        {/* Title & Price */}
                        <div className="text-center mb-8 border-b border-zinc-800 pb-8">
                            <h3 className="text-xl font-bold text-white mb-2">{t("cards.custom.headline")}</h3>
                            <div className="text-zinc-400 font-medium">{t("cards.custom.price")}</div>
                        </div>

                        {/* Bullets */}
                        <ul className="space-y-4 mb-8 flex-1">
                            {["0", "1", "2"].map((i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/5 flex items-center justify-center mt-0.5">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                    <span className="text-zinc-300 text-sm leading-relaxed">
                                        {t(`cards.custom.bullets.${i}`)}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {/* Outcome Box */}
                        <div className="rounded-xl bg-white/5 p-4 mb-8 text-center border border-white/5">
                            <p className="text-sm text-zinc-300 italic">
                                "{t("cards.custom.outcome")}"
                            </p>
                        </div>

                        {/* CTA */}
                        <Button asChild variant="outline" size="lg" className="w-full border-zinc-700 hover:bg-zinc-800 text-white font-semibold transition-all">
                            <Link href="/contact?plan=custom">
                                {t("cards.custom.cta")} <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Service Multiplier (Add-on) */}
                <div className="max-w-3xl mx-auto">
                    <div className="rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left shadow-2xl">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                            <Code2Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-lg font-bold text-white mb-2">{t("addon.title")}</h4>
                            <p className="text-sm text-zinc-400 leading-relaxed max-w-xl">
                                {t("addon.description")}
                            </p>
                        </div>
                        <Link
                            href="/contact?addon=website"
                            className="flex-shrink-0 group flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 hover:border-primary/50 hover:bg-zinc-800 transition-all cursor-pointer"
                        >
                            <div className="w-5 h-5 rounded border border-zinc-600 group-hover:border-primary flex items-center justify-center bg-zinc-950 text-transparent group-hover:text-primary transition-colors">
                                <Check className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-sm font-medium text-zinc-300 group-hover:text-white">
                                Select
                            </span>
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
}

function Code2Icon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="m18 16 4-4-4-4" />
            <path d="m6 8-4 4 4 4" />
            <path d="m14.5 4-5 16" />
        </svg>
    )
}
