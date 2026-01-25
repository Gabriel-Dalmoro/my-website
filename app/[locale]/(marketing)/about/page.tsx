"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "motion/react";
import { Check, Code2, Rocket, Brain } from "lucide-react";
import { ShineBorder } from "@/components/ui/shine-border";

export default function AboutPage() {
    const t = useTranslations("About");

    const timeline = [
        { icon: Code2, index: "0" },
        { icon: Rocket, index: "1" },
        { icon: Brain, index: "2" },
        { icon: Check, index: "3" },
    ];

    return (
        <div className="bg-zinc-950 min-h-screen">
            {/* Hero / Intro */}
            <div className="pt-32 pb-12 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
                >
                    {t("headline")}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mt-6 text-lg leading-8 text-zinc-400 max-w-2xl mx-auto px-6"
                >
                    {t("subheadline")}
                </motion.p>
            </div>

            <div className="mx-auto max-w-screen-xl px-6 lg:px-8 pb-24 relative z-20">
                {/* Story Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-center mb-32 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative w-full max-w-[340px] mx-auto lg:ml-0"
                    >
                        <div className="aspect-[4/5] w-full relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 border border-zinc-800 ring-1 ring-white/10 group">
                            <Image
                                src="/gabriel-profile.jpg"
                                alt="Gabriel Dalmoro"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent" />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6 text-lg text-zinc-300 leading-relaxed"
                    >
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="w-8 h-1 bg-primary rounded-full" />
                            {t("story.title")}
                        </h2>
                        <p>{t("story.p1")}</p>
                        <p>{t("story.p2")}</p>
                        <p className="text-white font-medium border-l-4 border-primary pl-4 bg-primary/5 py-4 rounded-r-lg">{t("story.p3")}</p>
                    </motion.div>
                </div>

                {/* Timeline */}
                <div className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">{t("journey.title")}</h2>
                        <div className="w-12 h-1 bg-primary mx-auto rounded-full" />
                    </div>
                    <div className="relative max-w-4xl mx-auto">
                        {/* Line */}
                        <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/30 to-transparent -translate-x-1/2 hidden lg:block" />

                        <div className="space-y-16">
                            {timeline.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`flex flex-col lg:flex-row items-center gap-10 ${i % 2 === 0 ? "lg:flex-row-reverse" : ""}`}
                                >
                                    {/* Content */}
                                    <div className="flex-1 w-full flex flex-col items-center lg:items-end">
                                        <div className="relative rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-primary/20 transition-all duration-300 w-full group overflow-hidden shadow-2xl shadow-black/50">
                                            <ShineBorder
                                                borderWidth={1}
                                                duration={14}
                                                shineColor={["#EAB308", "#A855F7", "#EAB308"]}
                                            />
                                            <div className={`relative z-10 p-6 ${i % 2 === 0 ? "lg:text-left" : "lg:text-right"}`}>
                                                <span className="text-primary font-black text-xl block mb-2 tracking-tight">{t(`journey.steps.${item.index}.year`)}</span>
                                                <h3 className="text-white font-bold text-xl mb-2 group-hover:text-primary transition-colors">{t(`journey.steps.${item.index}.title`)}</h3>
                                                <p className="text-zinc-400 text-base leading-relaxed">{t(`journey.steps.${item.index}.description`)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Icon */}
                                    <div className="flex-none relative z-10 w-14 h-14 rounded-full bg-zinc-950 border-2 border-primary flex items-center justify-center shadow-[0_0_20px_rgba(234,179,8,0.4)] group hover:scale-110 transition-transform duration-300">
                                        <item.icon className="w-6 h-6 text-primary group-hover:animate-pulse" />
                                    </div>

                                    {/* Spacer/Empty for grid balance */}
                                    <div className="flex-1 hidden lg:block" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Philosophy Grid */}
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">{t("values.title")}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-zinc-900/20 p-8 rounded-3xl border border-white/5 hover:border-primary/30 hover:bg-zinc-900/40 transition-all duration-500 group"
                            >
                                <div className="w-10 h-1 bg-primary mb-6 transition-all duration-500 group-hover:w-full rounded-full opacity-50" />
                                <h3 className="text-xl font-black text-white mb-4 group-hover:text-primary transition-colors">{t(`values.cards.${i}.title`)}</h3>
                                <p className="text-zinc-400 leading-relaxed text-sm">{t(`values.cards.${i}.description`)}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
