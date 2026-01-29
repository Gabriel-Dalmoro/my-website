"use client";

import { useTranslations } from "next-intl";
import { Check, ShieldCheck, Zap, ArrowRight, ArrowDown, UsersIcon, MailIcon, CreditCardIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShineBorder } from "@/components/ui/shine-border";
import { Link } from "@/i18n/routing";
import { MiniIntegrationsBeam } from "./MiniIntegrationsBeam";

export default function Pricing() {
    const t = useTranslations("Pricing");

    return (
        <section className="py-12 sm:py-16 bg-zinc-950 relative overflow-hidden" id="pricing">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.05),transparent_70%)] pointer-events-none" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col justify-center min-h-[80vh]">

                {/* Header */}
                <div className="mx-auto max-w-3xl text-center mb-10 sm:mb-12">
                    <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-br from-white via-white to-zinc-500 bg-clip-text text-transparent drop-shadow-sm">
                        {t("title")}
                    </h2>
                    <p className="text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed">
                        {t("subtitle")}
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto mb-8 w-full">

                    {/* Card 1: The Efficiency Starter (Pilot) */}
                    <div className="relative rounded-2xl bg-zinc-900/50 border border-primary/30 p-6 flex flex-col backdrop-blur-sm shadow-[0_0_50px_-20px_rgba(234,179,8,0.2)] h-full">
                        {/* Glow & Badge */}
                        <ShineBorder shineColor={["#EAB308"]} duration={8} className="absolute inset-0 size-full pointer-events-none !bg-transparent rounded-2xl" />
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-yellow-400 text-zinc-950 text-[10px] font-bold px-3 py-1 rounded-full shadow-lg shadow-yellow-500/20 uppercase tracking-wider z-20 whitespace-nowrap">
                            {t("cards.starter.badge")}
                        </div>

                        {/* Hours Reclaimed (Prominent) */}
                        <div className="mb-4 text-center pt-2">
                            <span className="block text-xs text-zinc-400 uppercase tracking-widest mb-1">{t("cards.starter.goal")}</span>
                            <div className="inline-flex items-center justify-center gap-2 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
                                <span className="text-3xl sm:text-4xl font-black tracking-tight">{t("cards.starter.hoursReclaimed")}</span>
                            </div>
                        </div>

                        {/* Title & Price */}
                        <div className="text-center mb-6 border-b border-zinc-800 pb-4">
                            <h3 className="text-lg font-bold text-white mb-1">{t("cards.starter.headline")}</h3>
                            <div className="text-primary font-semibold text-sm">{t("cards.starter.price")}</div>
                        </div>

                        {/* Bullets */}
                        <ul className="space-y-3 mb-6 flex-1">
                            {["0", "1", "2"].map((i) => (
                                <li key={i} className="flex items-start gap-2.5">
                                    <div className="flex-shrink-0 w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                                        <Check className="w-2.5 h-2.5 text-primary" />
                                    </div>
                                    <span className="text-zinc-300 text-sm leading-snug">
                                        {t(`cards.starter.bullets.${i}`)}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {/* Before/After Micro-Component */}
                        {/* Before/After Micro-Component */}
                        <div className="rounded-xl bg-zinc-950/40 border border-zinc-800/50 p-6 mb-8 text-center flex-1 flex flex-col justify-center">
                            <div className="grid grid-cols-2 gap-4 divide-x divide-zinc-800">
                                <div className="flex flex-col justify-center">
                                    <div className="text-[11px] uppercase text-zinc-500 font-bold tracking-wider mb-2">Before</div>
                                    <div className="text-red-500 font-black text-4xl sm:text-5xl leading-none mb-2">10h</div>
                                    <div className="text-xs text-zinc-400 font-medium">Manual Work</div>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <div className="text-[11px] uppercase text-zinc-500 font-bold tracking-wider mb-2">After</div>
                                    <div className="text-green-500 font-black text-4xl sm:text-5xl leading-none mb-2">0h</div>
                                    <div className="text-xs text-zinc-400 font-medium">Automated</div>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <Button asChild size="default" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]">
                            <Link href="/contact?plan=starter">
                                {t("cards.starter.cta")} <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>

                        {/* Trust Elements */}
                        <div className="mt-4 flex items-center justify-center gap-4 opacity-60">
                            <div className="flex items-center gap-1 text-[10px] text-zinc-400">
                                <ShieldCheck className="w-3 h-3" /> {t("trust.gdpr")}
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-zinc-400">
                                <Zap className="w-3 h-3" /> {t("trust.instant")}
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Custom Business Engine */}
                    <div className="relative rounded-2xl bg-zinc-900/20 border border-zinc-800 p-6 flex flex-col hover:border-zinc-700 transition-colors h-full">

                        {/* Hours Reclaimed (Prominent) */}
                        <div className="mb-4 text-center pt-4">
                            <span className="block text-xs text-zinc-500 uppercase tracking-widest mb-1">{t("cards.custom.goal")}</span>
                            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                                {t("cards.custom.hoursReclaimed")}
                            </div>
                        </div>

                        {/* Title & Price */}
                        <div className="text-center mb-6 border-b border-zinc-800 pb-4">
                            <h3 className="text-lg font-bold text-white mb-1">{t("cards.custom.headline")}</h3>
                            <div className="text-zinc-400 font-medium text-sm">{t("cards.custom.price")}</div>
                        </div>

                        {/* Bullets */}
                        <ul className="space-y-3 mb-6">
                            {["0", "1", "2"].map((i) => (
                                <li key={i} className="flex items-start gap-2.5">
                                    <div className="flex-shrink-0 w-4 h-4 rounded-full bg-white/5 flex items-center justify-center mt-0.5">
                                        <Check className="w-2.5 h-2.5 text-white" />
                                    </div>
                                    <span className="text-zinc-300 text-sm leading-snug">
                                        {t(`cards.custom.bullets.${i}`)}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {/* Visual Connector Stack (Fills space dynamically) */}
                        <div className="flex-1 flex flex-col justify-end mt-4 mb-6">
                            <MiniIntegrationsBeam />
                        </div>

                        {/* Outcome Box */}
                        <div className="rounded-lg bg-zinc-800/20 p-3 mb-6 text-center border border-white/5">
                            <p className="text-xs text-zinc-300 italic">
                                "{t("cards.custom.outcome")}"
                            </p>
                        </div>

                        {/* CTA */}
                        <Button asChild variant="outline" size="default" className="w-full border-zinc-700 hover:bg-zinc-800 text-white font-semibold transition-all">
                            <Link href="/contact?plan=custom">
                                {t("cards.custom.cta")} <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Service Multiplier (Add-on) */}
                <div className="max-w-3xl mx-auto w-full">
                    <div className="rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left shadow-2xl">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                            <Code2Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-base font-bold text-white mb-1">{t("addon.title")}</h4>
                            <p className="text-xs text-zinc-400 leading-relaxed max-w-xl">
                                {t("addon.description")}
                            </p>
                        </div>
                        <Link
                            href="/contact?addon=website"
                            className="flex-shrink-0 group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 hover:border-primary/50 hover:bg-zinc-800 transition-all cursor-pointer"
                        >
                            <div className="w-4 h-4 rounded border border-zinc-600 group-hover:border-primary flex items-center justify-center bg-zinc-950 text-transparent group-hover:text-primary transition-colors">
                                <Check className="w-3 h-3" />
                            </div>
                            <span className="text-xs font-medium text-zinc-300 group-hover:text-white">
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
