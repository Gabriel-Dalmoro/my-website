"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "motion/react";
import { Check, Code2, Rocket, Brain } from "lucide-react";

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
                    className="mt-6 text-lg leading-8 text-zinc-400 max-w-2xl mx-auto"
                >
                    {t("subheadline")}
                </motion.p>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24 relative z-20">
                {/* Story Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative w-full max-w-sm mx-auto lg:mr-auto lg:ml-0"
                    >
                        <div className="aspect-[4/5] w-full relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 border border-zinc-800">
                            <Image
                                src="/gabriel-profile.jpg"
                                alt="Gabriel Dalmoro"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/20 to-transparent" />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6 text-lg text-zinc-300 leading-relaxed"
                    >
                        <h2 className="text-3xl font-bold text-white mb-6">{t("story.title")}</h2>
                        <p>{t("story.p1")}</p>
                        <p>{t("story.p2")}</p>
                        <p className="text-white font-medium border-l-4 border-primary pl-4">{t("story.p3")}</p>
                    </motion.div>
                </div>

                {/* Timeline */}
                <div className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">{t("journey.title")}</h2>
                    </div>
                    <div className="relative">
                        {/* Line */}
                        <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-zinc-800 -translate-x-1/2 hidden lg:block" />

                        <div className="space-y-12">
                            {timeline.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`flex flex-col lg:flex-row items-center gap-8 ${i % 2 === 0 ? "lg:flex-row-reverse" : ""}`}
                                >
                                    {/* Content */}
                                    <div className="flex-1 w-full lg:text-right">
                                        <div className={`rounded-2xl bg-zinc-900/50 p-6 border border-zinc-800 hover:border-primary/50 transition-colors ${i % 2 === 0 ? "lg:text-left" : "lg:text-right"}`}>
                                            <span className="text-primary font-bold text-xl block mb-2">{t(`journey.steps.${item.index}.year`)}</span>
                                            <h3 className="text-white font-semibold text-lg mb-2">{t(`journey.steps.${item.index}.title`)}</h3>
                                            <p className="text-zinc-400 text-sm">{t(`journey.steps.${item.index}.description`)}</p>
                                        </div>
                                    </div>

                                    {/* Icon */}
                                    <div className="flex-none relative z-10 w-12 h-12 rounded-full bg-zinc-900 border-2 border-primary flex items-center justify-center shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                                        <item.icon className="w-5 h-5 text-primary" />
                                    </div>

                                    {/* Spacer/Empty for grid balance */}
                                    <div className="flex-1 hidden lg:block" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Philosophy Grid */}
                <div>
                    <h2 className="text-3xl font-bold text-white text-center mb-12">{t("values.title")}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-zinc-900/30 p-8 rounded-3xl border border-white/5 hover:bg-zinc-900/50 transition-colors"
                            >
                                <h3 className="text-xl font-bold text-white mb-4">{t(`values.cards.${i}.title`)}</h3>
                                <p className="text-zinc-400 leading-relaxed">{t(`values.cards.${i}.description`)}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
