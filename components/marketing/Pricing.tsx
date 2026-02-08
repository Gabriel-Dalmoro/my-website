"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, ArrowRight, ShieldCheck, Globe, ArrowUpRight, TrendingUp, Users, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShineBorder } from "@/components/ui/shine-border";
import { Link } from "@/i18n/routing";

export default function Pricing() {
    const t = useTranslations("Pricing");
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <section className="py-16 sm:py-24 bg-zinc-950 relative overflow-hidden" id="pricing">
            {/* Background Decor - Subtle */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none" />

            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col justify-center">

                {/* 1. Hero (Scaled Down) */}
                <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-5xl font-black tracking-tighter mb-0 bg-gradient-to-br from-white via-white to-zinc-500 bg-clip-text text-transparent">
                        {t("title")}
                    </h2>
                </div>

                {/* 2. Guarantee (Scaled Down) */}
                <div className="mx-auto max-w-fit mb-16 sm:mb-24">
                    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 bg-gradient-to-r from-emerald-950/40 to-emerald-900/20 border border-emerald-500/40 rounded-full px-6 py-3 sm:px-8 sm:py-4 backdrop-blur-md shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)] hover:shadow-[0_0_50px_-5px_rgba(16,185,129,0.4)] transition-shadow duration-500 group">
                        <div className="bg-emerald-500/10 p-2 rounded-full ring-1 ring-emerald-500/30 group-hover:scale-110 transition-transform duration-300">
                            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                        </div>
                        <div className="text-center sm:text-left">
                            <div className="text-emerald-400 font-bold text-[10px] sm:text-[11px] uppercase tracking-widest mb-0.5 shadow-emerald-500/50 drop-shadow-sm">
                                {t("guarantee.badge")}
                            </div>
                            <h3 className="text-white font-bold text-base sm:text-lg leading-tight tracking-tight">
                                {t("guarantee.title")}
                            </h3>
                        </div>
                    </div>
                </div>

                {/* 3. The Pilot Card (Scaled Down) */}
                <div className="max-w-3xl mx-auto w-full mb-24">
                    <div className="relative rounded-xl bg-zinc-900/80 border border-primary/20 p-6 sm:p-10 flex flex-col md:flex-row gap-8 sm:gap-10 shadow-2xl shadow-black/50 ring-1 ring-white/5 items-center">
                        {/* Glow */}
                        <ShineBorder shineColor={["#EAB308"]} duration={10} className="absolute inset-0 size-full pointer-events-none !bg-transparent rounded-xl opacity-50" />

                        <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                                <h3 className="text-2xl font-black text-white uppercase tracking-tight">{t("cards.pilot.headline")}</h3>
                                <div className="px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[9px] font-bold uppercase tracking-widest">
                                    Entry Point
                                </div>
                            </div>
                            <div className="text-white font-black text-4xl sm:text-6xl tracking-tighter mb-3">{t("cards.pilot.price")}</div>
                            <p className="text-lg font-medium text-zinc-400 mb-4 leading-relaxed">
                                {t("cards.pilot.value")}
                            </p>
                        </div>

                        <div className="flex-1 w-full relative z-10 bg-zinc-900/50 p-5 rounded-lg border border-zinc-800/50">
                            <ul className="space-y-3 mb-5">
                                {[0, 1, 2, 3].map((i) => (
                                    <li key={i} className="flex items-start gap-3 group">
                                        <div className="flex-shrink-0 w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 group-hover:bg-primary/20 transition-colors">
                                            <Check className="w-2.5 h-2.5 text-primary stroke-[3px]" />
                                        </div>
                                        <span className="text-zinc-200 text-sm font-bold group-hover:text-white transition-colors">
                                            {t(`cards.pilot.bullets.${i}`)}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* ROI Line */}
                            <div className="mb-5 pt-3 border-t border-zinc-800 text-center md:text-left">
                                <p className="text-emerald-400 text-xs italic font-medium flex items-center justify-center md:justify-start gap-1.5">
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                    {t("cards.pilot.roi")}
                                </p>
                            </div>

                            <Button asChild size="lg" className="w-full bg-primary hover:bg-white hover:text-zinc-950 text-zinc-950 font-black h-12 uppercase tracking-widest text-xs shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]">
                                <Link href="/contact?plan=pilot">
                                    {t("cards.pilot.cta")} <ArrowRight className="w-3.5 h-3.5 ml-2" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* 4. Custom Ecosystem Title (Scaled Down) */}
                <div className="text-center mb-12 px-4">
                    <h2 className="text-2xl sm:text-3xl font-black text-zinc-200 tracking-tight mb-2 uppercase">
                        {t("cards.custom.headline")}
                    </h2>
                    <p className="text-zinc-500 text-sm font-medium max-w-xl mx-auto">
                        {t("cards.custom.subhead")}
                    </p>
                </div>

                {/* 5. Custom Ecosystem Cards (3 Columns / Scaled Down) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-6xl mx-auto mb-16 w-full px-2 sm:px-0">
                    {[0, 1, 2].map((i) => (
                        <div key={i} className={`relative rounded-xl bg-zinc-900/20 border p-6 flex flex-col h-full hover:bg-zinc-900/40 transition-all duration-300 group ${i === 1 ? 'border-primary/40 bg-zinc-900/40 shadow-xl shadow-black/20 scale-[1.02] z-10' : 'border-zinc-800 hover:border-zinc-700'}`}>
                            {/* Most Popular Badge for Pro */}
                            {i === 1 && (
                                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary text-black text-[9px] font-black uppercase tracking-widest px-3 py-0.5 rounded-full shadow-lg shadow-primary/20">
                                    {t(`cards.custom.tiers.${i}.badge`)}
                                </div>
                            )}

                            <div className="mb-5 pb-5 border-b border-zinc-800/50">
                                <h3 className={`text-xs font-black uppercase tracking-widest mb-2 ${i === 1 ? 'text-primary' : 'text-zinc-500'}`}>
                                    {t(`cards.custom.tiers.${i}.name`)}
                                </h3>
                                <div className="text-white font-black text-2xl sm:text-3xl tracking-tighter mb-2">
                                    {t(`cards.custom.tiers.${i}.price`)}
                                </div>
                                <p className="text-zinc-400 text-[11px] font-medium min-h-[2.5em] leading-relaxed">
                                    {t(`cards.custom.tiers.${i}.desc`)}
                                </p>
                            </div>

                            <ul className="space-y-3 mb-6 flex-grow">
                                {t.raw(`cards.custom.tiers.${i}.features`).map((feature: string, idx: number) => (
                                    <li key={idx} className="flex items-start gap-2.5">
                                        <div className={`flex-shrink-0 w-1.5 h-1.5 rounded-full mt-1.5 ${i === 1 ? 'bg-primary' : 'bg-zinc-700 group-hover:bg-zinc-500'} transition-colors`} />
                                        <span className={`text-xs sm:text-sm font-medium leading-snug ${i === 1 ? 'text-zinc-200' : 'text-zinc-400 group-hover:text-zinc-300'} transition-colors`}>
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <Button asChild variant={i === 1 ? "default" : "outline"} size="lg" className={`w-full font-bold h-10 uppercase tracking-widest text-[10px] mt-auto transition-all ${i === 1 ? 'bg-white text-black hover:bg-zinc-200' : 'border-zinc-700 hover:bg-zinc-800 text-zinc-300 hover:text-white'}`}>
                                <Link href="/contact?plan=custom">
                                    {t("cards.custom.cta")} <ArrowRight className={`w-3 h-3 ml-2 ${i !== 1 && 'opacity-50'}`} />
                                </Link>
                            </Button>
                        </div>
                    ))}
                </div>

                {/* 6. Website Add-on (Scaled Down) */}
                <div className="max-w-3xl mx-auto w-full mb-16 px-4 sm:px-0">
                    <div className="rounded-lg bg-gradient-to-r from-zinc-900/50 to-zinc-900/30 border border-zinc-800/50 p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-5 hover:border-zinc-700/80 transition-all duration-500 group">
                        <div className="flex items-start gap-4">
                            <div className="p-2.5 bg-zinc-900 rounded-lg border border-zinc-800 text-zinc-400 group-hover:text-white group-hover:border-zinc-700 transition-colors hidden sm:block">
                                <Globe className="w-4 h-4" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="text-zinc-200 font-bold text-base">{t("websiteAddon.title")}</h4>
                                    <span className="text-zinc-500 text-[10px] font-medium px-1.5 py-0.5 border border-zinc-800 rounded bg-zinc-900/50">Optional</span>
                                </div>
                                <div className="text-white font-bold text-lg mb-1.5">{t("websiteAddon.price")}</div>
                                <p className="text-zinc-500 text-xs max-w-lg leading-relaxed group-hover:text-zinc-400 transition-colors">
                                    {t("websiteAddon.description")}
                                </p>
                            </div>
                        </div>
                        <Button asChild variant="ghost" className="text-zinc-400 hover:text-white hover:bg-zinc-800/50 whitespace-nowrap pl-0 md:pl-4 text-xs h-8">
                            <Link href="/contact?addon=website">
                                {t("websiteAddon.link")} <ArrowUpRight className="w-3 h-3 ml-1.5 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* 7. Proven Results (Mini-Section - Scaled Down) */}
                <div className="max-w-5xl mx-auto w-full border-t border-zinc-900 pt-12 mb-16">
                    <h3 className="text-center text-zinc-600 font-bold uppercase tracking-widest text-[10px] mb-8">
                        {t("socialProof.headline")}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="flex flex-col items-center text-center p-5 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-900/60 transition-colors group">
                                <div className="mb-3 text-primary opacity-80 group-hover:opacity-100 transition-opacity">
                                    {i === 0 && <TrendingUp className="w-6 h-6" />}
                                    {i === 1 && <Users className="w-6 h-6" />}
                                    {i === 2 && <Mail className="w-6 h-6" />}
                                </div>
                                <h4 className="text-zinc-300 font-bold uppercase tracking-wider text-[11px] mb-1.5 h-8 flex items-center justify-center">
                                    {t(`socialProof.items.${i}.name`)}
                                </h4>
                                <p className="text-white font-black text-lg sm:text-xl leading-tight">
                                    {t(`socialProof.items.${i}.result`)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 8. Questions (FAQ - Scaled Down) */}
                <div className="max-w-xl mx-auto w-full mb-16 px-4 sm:px-0">
                    <h3 className="text-center text-zinc-600 font-bold uppercase tracking-widest text-[9px] mb-8">
                        {t("faq.headline")}
                    </h3>
                    <div className="space-y-3">
                        {[0, 1, 2].map((i, index) => (
                            <div key={i} className="border-b border-zinc-800/50 pb-3">
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="flex items-center justify-between w-full text-left focus:outline-none group py-1.5"
                                >
                                    <span className={`text-sm font-medium transition-colors ${openFaq === index ? "text-primary" : "text-zinc-400 group-hover:text-zinc-200"}`}>
                                        {t(`faq.questions.${i}.q`)}
                                    </span>
                                    <ArrowRight className={`w-3.5 h-3.5 text-zinc-600 transition-transform duration-300 ${openFaq === index ? "rotate-90 text-primary" : "group-hover:text-zinc-400"}`} />
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? "max-h-20 opacity-100 mt-1.5" : "max-h-0 opacity-0"}`}>
                                    <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed pr-6 pl-1 border-l-2 border-zinc-800 ml-1">
                                        {t(`faq.questions.${i}.a`)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 9. Final CTA - Removed (using global footer CTA) */}

            </div>
        </section>
    );
}
