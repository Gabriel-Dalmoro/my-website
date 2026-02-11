"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, ArrowRight, ShieldCheck, Globe, ArrowUpRight, TrendingUp, Users, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShineBorder } from "@/components/ui/shine-border";
import { Link } from "@/i18n/routing";
import { motion } from "motion/react";

export default function Pricing() {
    const t = useTranslations("Pricing");
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <section className="py-20 bg-zinc-950 relative overflow-hidden" id="pricing">
            {/* Background Decor - Premium Depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,193,7,0.08),transparent_50%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.05),transparent_50%)] pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* Floating Glows */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.05, 0.1, 0.05]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none"
            />

            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">

                {/* 1. Hero & Guarantee Badge */}
                <div className="mx-auto max-w-3xl text-center mb-16 sm:mb-20">
                    <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 text-white">
                        {t("title")}
                    </h2>
                    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/5 backdrop-blur-sm border border-emerald-500/20 text-emerald-400 text-[11px] font-bold uppercase tracking-widest shadow-[0_4px_20px_-10px_rgba(16,185,129,0.3)] hover:border-emerald-500/30 transition-colors">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        {t("guarantee")}
                    </div>
                </div>

                {/* 2. Pricing Grid (2 Columns) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 max-w-5xl mx-auto mb-16">

                    {/* Offer 1: The Pilot */}
                    <div className="relative group lg:h-full">
                        <div className="h-full relative rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/10 p-8 sm:p-10 flex flex-col shadow-2xl shadow-black/50 ring-1 ring-white/5 transition-all duration-500 hover:scale-[1.01] hover:bg-white/[0.04] hover:border-white/20 overflow-hidden">
                            {/* Visual Highlight */}
                            <ShineBorder
                                shineColor={["#EAB308"]}
                                duration={10}
                                className="absolute inset-0 size-full pointer-events-none !bg-transparent rounded-2xl opacity-40"
                            />

                            <div className="relative z-10 flex-grow">
                                <div className="flex items-center gap-3 mb-6">
                                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">{t("cards.starter.headline")}</h3>
                                    <div className="px-2 py-0.5 rounded-full bg-primary/20 border border-primary/40 text-primary text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                                        {t("cards.starter.badge")}
                                    </div>
                                </div>
                                <div className="text-white font-black text-5xl sm:text-6xl tracking-tighter mb-2">{t("cards.starter.price")}</div>
                                <p className="text-zinc-500 text-sm font-black uppercase tracking-widest mb-8">
                                    {t("cards.starter.tagline")}
                                </p>

                                <ul className="space-y-4 mb-8 pt-6 border-t border-zinc-800">
                                    {t.raw("cards.starter.bullets").map((bullet: string, i: number) => (
                                        <li key={i} className="flex items-start gap-3.5 group/item">
                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-0.5 shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                                                <Check className="w-3.5 h-3.5 text-black stroke-[4px]" />
                                            </div>
                                            <span className="text-zinc-200 text-sm sm:text-base font-bold group-hover/item:text-white transition-colors">
                                                {bullet}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mb-8 flex items-center gap-2.5 text-emerald-400 font-black text-xs bg-emerald-500/10 py-2 px-3 rounded-lg border border-emerald-500/20 w-fit">
                                    <ArrowUpRight className="w-4 h-4" />
                                    {t("cards.starter.note")}
                                </div>
                            </div>

                            <Button asChild size="lg" className="w-full bg-primary hover:bg-white hover:text-zinc-950 text-zinc-950 font-bold h-14 tracking-wide text-sm shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] relative z-20 rounded-xl">
                                <Link href="/contact?plan=starter">
                                    {t("cards.starter.cta")} <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Offer 2: Custom Systems */}
                    <div className="relative group lg:h-full">
                        <div className="h-full relative rounded-2xl bg-white/[0.01] backdrop-blur-lg border border-white/5 p-8 sm:p-10 flex flex-col transition-all duration-500 hover:bg-white/[0.03] hover:border-white/10 overflow-hidden">
                            <div className="relative z-10 flex-grow">
                                <div className="mb-6">
                                    <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-1">{t("cards.custom.headline")}</h3>
                                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">{t("cards.custom.tagline")}</p>
                                </div>
                                <div className="text-white font-black text-3xl sm:text-4xl tracking-tighter mb-4">{t("cards.custom.price")}</div>
                                <p className="text-zinc-400 text-sm font-medium leading-relaxed mb-8">
                                    {t("cards.custom.description")}
                                </p>

                                <ul className="space-y-4 mb-8 pt-6 border-t border-zinc-800">
                                    {t.raw("cards.custom.bullets").map((bullet: string, i: number) => (
                                        <li key={i} className="flex items-start gap-3.5 group/item">
                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center mt-0.5 group-hover/item:border-zinc-500 transition-colors">
                                                <Check className="w-3.5 h-3.5 text-zinc-500 stroke-[4px]" />
                                            </div>
                                            <span className="text-zinc-400 text-sm sm:text-base font-bold group-hover/item:text-zinc-200 transition-colors">
                                                {bullet}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Button asChild variant="outline" size="lg" className="w-full border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-white font-bold h-14 tracking-wide text-sm transition-all relative z-20 rounded-xl">
                                <Link href="/contact?plan=custom">
                                    {t("cards.custom.cta")} <ArrowRight className="w-4 h-4 ml-2 opacity-50" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* 3. Website Add-on Simplified */}
                <div className="max-w-2xl mx-auto w-full mb-20 px-4">
                    <div className="rounded-2xl bg-white/[0.02] backdrop-blur-md border border-white/5 p-5 flex items-center justify-between gap-6 hover:bg-white/[0.04] hover:border-white/10 transition-all group">
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 bg-zinc-950 rounded-lg border border-zinc-800 text-zinc-500 group-hover:text-primary transition-colors">
                                <Globe className="w-4 h-4" />
                            </div>
                            <div>
                                <h4 className="text-zinc-200 font-bold text-sm mb-0.5">{t("addon.title")}</h4>
                                <p className="text-zinc-500 text-xs font-medium">
                                    {t("addon.description")}
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-white font-bold text-sm mb-1">{t("addon.price")}</div>
                            <Link href="/contact?addon=website" className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-white transition-colors flex items-center gap-1 justify-end">
                                Add <ArrowUpRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 4. Proven Results */}
                <div className="max-w-5xl mx-auto w-full border-t border-zinc-900 pt-16 mb-20">
                    <h3 className="text-center text-zinc-600 font-black uppercase tracking-widest text-[10px] mb-12">
                        {t("socialProof.headline")}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl bg-zinc-900/20 border border-zinc-800/40 hover:bg-zinc-900/40 transition-colors group">
                                <div className="mb-4 text-primary opacity-60 group-hover:opacity-100 transition-opacity">
                                    {i === 0 && <TrendingUp className="w-8 h-8" />}
                                    {i === 1 && <Users className="w-8 h-8" />}
                                    {i === 2 && <Mail className="w-8 h-8" />}
                                </div>
                                <h4 className="text-zinc-400 font-black uppercase tracking-widest text-[10px] mb-2 h-10 flex items-center justify-center">
                                    {t(`socialProof.items.${i}.name`)}
                                </h4>
                                <p className="text-white font-black text-xl sm:text-2xl leading-tight">
                                    {t(`socialProof.items.${i}.result`)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. FAQ Section */}
                <div className="max-w-2xl mx-auto w-full mb-20 px-4 sm:px-0">
                    <h3 className="text-center text-zinc-600 font-black uppercase tracking-widest text-[10px] mb-12">
                        {t("faq.headline")}
                    </h3>
                    <div className="space-y-4">
                        {[0, 1, 2].map((i, index) => (
                            <div key={i} className="border-b border-zinc-800/40 pb-4">
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="flex items-center justify-between w-full text-left focus:outline-none group py-2"
                                >
                                    <span className={`text-base font-bold transition-colors ${openFaq === index ? "text-primary" : "text-zinc-400 group-hover:text-zinc-100"}`}>
                                        {t(`faq.questions.${i}.q`)}
                                    </span>
                                    <ArrowRight className={`w-4 h-4 text-zinc-700 transition-transform duration-300 ${openFaq === index ? "rotate-90 text-primary" : "group-hover:text-zinc-500"}`} />
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                                    <p className="text-zinc-500 text-sm leading-relaxed pr-8 pl-4 border-l-2 border-primary/20 ml-1 font-medium">
                                        {t(`faq.questions.${i}.a`)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
