"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import StarBorder from "@/components/ui/StarBorder";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

export default function Testimonials() {
    const t = useTranslations("SocialProof");
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonialCount = 3;

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonialCount);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonialCount) % testimonialCount);
    };

    // Helper to adjust font size based on text length
    const getFontSize = (text: string) => {
        if (text.length < 150) return "text-xl sm:text-3xl sm:leading-10"; // Short
        if (text.length < 300) return "text-lg sm:text-2xl sm:leading-9";  // Medium
        return "text-sm sm:text-lg sm:leading-7";                          // Long
    };

    const currentBody = t(`testimonials.${currentIndex}.body`);

    return (
        <section className="py-24 bg-zinc-950 border-y border-zinc-900 overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50 mix-blend-screen animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl opacity-50 mix-blend-screen animate-pulse delay-1000" />
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 w-full">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
                    >
                        {t("headline")}
                    </motion.h2>
                </div>

                <div className="mx-auto max-w-3xl relative">
                    {/* 
                      Restoring original StarBorder look:
                      - bg-zinc-950 (Opaque) to ensure gradients are masked correctly by inner content.
                      - rounded-3xl to match original curvature.
                    */}
                    <StarBorder as="div" className="w-full rounded-3xl bg-zinc-950 overflow-hidden" color="#EAB308" speed="4s">
                        {/* 
                           Inner content card:
                           - bg-zinc-900 (Dark Grey) to contrast with border and page.
                           - rounded-3xl to match border.
                           - h-[600px] fixed height.
                        */}
                        <div className="bg-zinc-900 p-6 sm:p-10 h-[600px] flex flex-col justify-center items-center relative rounded-3xl">

                            {/* Decorative Quote Icon */}
                            <div className="absolute top-6 left-6 text-zinc-800 pointer-events-none">
                                <Quote className="w-10 h-10 sm:w-12 sm:h-12 opacity-50" />
                            </div>

                            <div className="w-full relative overflow-hidden flex-1 flex flex-col justify-center">
                                <AnimatePresence mode="wait">
                                    <motion.figure
                                        key={currentIndex}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.05 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className="text-center flex flex-col items-center justify-center h-full px-2"
                                    >
                                        <blockquote className={`font-medium leading-relaxed text-zinc-200 max-w-2xl mx-auto transition-all duration-300 ${getFontSize(currentBody)}`}>
                                            <p>“{currentBody}”</p>
                                        </blockquote>

                                        <figcaption className="mt-8 flex flex-col items-center gap-4 shrink-0">
                                            <div className="flex items-center justify-center gap-x-4">
                                                <div className="relative h-12 w-12 overflow-hidden rounded-full bg-zinc-800 ring-2 ring-primary/20 shrink-0">
                                                    <Image
                                                        src={currentIndex === 1 ? "/avatar_female.png" : "/avatar_male.png"}
                                                        alt={t(`testimonials.${currentIndex}.author`)}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="text-left">
                                                    <div className="font-semibold text-white text-base">
                                                        {t(`testimonials.${currentIndex}.author`)}
                                                    </div>
                                                    <div className="text-sm text-zinc-500">
                                                        {t(`testimonials.${currentIndex}.role`)}
                                                    </div>
                                                </div>
                                            </div>
                                        </figcaption>
                                    </motion.figure>
                                </AnimatePresence>
                            </div>

                            {/* Controls */}
                            <div className="flex items-center gap-4 mt-8 z-20 shrink-0">
                                <button
                                    onClick={handlePrev}
                                    className="p-3 rounded-full bg-zinc-800/50 text-zinc-400 hover:bg-white/10 hover:text-white transition-all backdrop-blur-sm border border-white/5 active:scale-95"
                                    aria-label="Previous testimonial"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </button>

                                <div className="flex gap-2">
                                    {[...Array(testimonialCount)].map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentIndex(i)}
                                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === currentIndex
                                                ? "bg-primary w-8"
                                                : "bg-zinc-700 hover:bg-zinc-600"
                                                }`}
                                            aria-label={`Go to testimonial ${i + 1}`}
                                        />
                                    ))}
                                </div>

                                <button
                                    onClick={handleNext}
                                    className="p-3 rounded-full bg-zinc-800/50 text-zinc-400 hover:bg-white/10 hover:text-white transition-all backdrop-blur-sm border border-white/5 active:scale-95"
                                    aria-label="Next testimonial"
                                >
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>

                        </div>
                    </StarBorder>
                </div>
            </div>
        </section>
    );
}
