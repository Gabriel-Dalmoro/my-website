"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Check, Code2, Rocket, Brain, Zap, Briefcase, Terminal, Network, TrendingUp, Users, Wrench, ArrowRight } from "lucide-react";
import { ShineBorder } from "@/components/ui/shine-border";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
    const t = useTranslations("About");
    const timelineRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start end", "end center"]
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    const timeline = [
        { icon: Zap, index: "0" },        // 2008 - Spark
        { icon: Briefcase, index: "1" },  // 2018 - Reality Check
        { icon: Code2, index: "2" },      // 2021 - Pivot
        { icon: Network, index: "3" },    // Today - Synthesis
    ];

    const values = [
        { icon: TrendingUp, key: "0" },   // Impact
        { icon: Users, key: "1" },        // Collaboration
        { icon: Wrench, key: "2" },       // Pragmatism
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
                    <div className="relative max-w-4xl mx-auto" ref={timelineRef}>
                        {/* Line Container */}
                        <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 block">
                            {/* Background Line */}
                            <div className="absolute inset-0 w-full h-full bg-zinc-800 rounded-full" />
                            {/* Filling Line */}
                            <motion.div
                                style={{ height: heightTransform }}
                                className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary via-yellow-200 to-primary rounded-full shadow-[0_0_15px_rgba(234,179,8,0.5)]"
                            />
                        </div>

                        <div className="space-y-24 py-12">
                            {timeline.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`flex flex-col lg:flex-row items-center gap-10 ${i % 2 === 0 ? "lg:flex-row-reverse" : ""}`}
                                >
                                    {/* Content */}
                                    <div className="flex-1 w-full pl-12 lg:pl-0 flex flex-col items-center lg:items-end">
                                        <div className="relative rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-primary/20 transition-all duration-300 w-full group overflow-hidden shadow-2xl shadow-black/50 hover:shadow-primary/5">
                                            <ShineBorder
                                                borderWidth={1}
                                                duration={14}
                                                shineColor={["#EAB308", "#FEF08A", "#EAB308"]}
                                            />
                                            <div className={`relative z-10 p-8 ${i % 2 === 0 ? "lg:text-left" : "lg:text-right"}`}>
                                                <span className="text-primary font-black text-2xl block mb-3 tracking-tighter shadow-primary drop-shadow-[0_0_10px_rgba(234,179,8,0.3)]">{t(`journey.steps.${item.index}.year`)}</span>
                                                <h3 className="text-white font-bold text-xl mb-3 group-hover:text-primary transition-colors">{t(`journey.steps.${item.index}.title`)}</h3>
                                                <p className="text-zinc-400 text-base leading-relaxed">{t(`journey.steps.${item.index}.description`)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Icon */}
                                    <div className="flex-none absolute left-0 lg:left-1/2 lg:-translate-x-1/2 z-10 w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-zinc-950 border-4 border-zinc-800 group-hover:border-primary flex items-center justify-center shadow-xl group transition-all duration-500">
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <item.icon className="w-5 h-5 lg:w-7 lg:h-7 text-zinc-500 group-hover:text-primary transition-colors duration-300" />
                                    </div>

                                    {/* Spacer/Empty for grid balance */}
                                    <div className="flex-1 hidden lg:block" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Philosophy Grid */}
                <div className="max-w-5xl mx-auto mb-32">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">{t("values.title")}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {values.map((v, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                    borderColor: "rgba(234, 179, 8, 0.4)", // Primary color with opacity
                                    backgroundColor: "rgba(24, 24, 27, 0.6)" // Darker bg
                                }}
                                viewport={{ once: false, margin: "-100px" }} // Triggers when element is 100px inside viewport
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="relative bg-zinc-900/20 p-8 rounded-3xl border border-white/5 transition-all duration-500 group overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity transform translate-x-4 -translate-y-4">
                                    <v.icon className="w-24 h-24 text-primary" />
                                </div>
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                                    <v.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-black text-white mb-4 group-hover:text-primary transition-colors">{t(`values.cards.${i}.title`)}</h3>
                                <p className="text-zinc-400 leading-relaxed text-sm relative z-10">{t(`values.cards.${i}.description`)}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Final Human CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto text-center bg-gradient-to-br from-zinc-900 to-zinc-950 p-12 rounded-3xl border border-white/10 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold text-white mb-6">{t("finalCta.headline")}</h2>
                        <p className="text-zinc-400 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
                            {t("finalCta.description")}
                        </p>
                        <Link href="/contact">
                            <Button size="lg" className="font-bold text-base px-8 py-6 rounded-full bg-primary text-zinc-950 hover:bg-primary/90">
                                {t("finalCta.button")} <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
