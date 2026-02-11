"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import BrowserFrame from "@/components/marketing/BrowserFrame";
import Image from "next/image";

// Project Configuration
const PROJECTS = [
    { id: "operations", logo: "/elisaLogo.png" }, // Elisa Batch Cooking
    { id: "marketing", logo: "/IconFTE.png" },    // Fit to Excel
    { id: "sales", logo: "/harpiaLogo.jpg" }      // Smart Client Finder
] as const;

export default function ClientCarousel() {
    const t = useTranslations("ClientShowcase");
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const activeProject = PROJECTS[activeIndex];

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setActiveIndex((prev) => {
            let next = prev + newDirection;
            if (next < 0) next = PROJECTS.length - 1;
            if (next >= PROJECTS.length) next = 0;
            return next;
        });
    };

    const handleJump = (index: number) => {
        setDirection(index > activeIndex ? 1 : -1);
        setActiveIndex(index);
    };

    // Variants for slide animation
    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? "100%" : "-100%",
            opacity: 0,
            scale: 0.95,
            filter: "blur(4px)"
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)"
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? "100%" : "-100%",
            opacity: 0,
            scale: 0.95,
            filter: "blur(4px)"
        })
    };

    const getVideoSrc = (id: string) => {
        // Map project IDs to video sources - Only Elisa has a video for now
        switch (id) {
            case "operations": return "/video/Elisa_projectDEMO.mp4";
            // Other projects don't have videos yet
            default: return "";
        }
    };

    return (
        <section className="py-16 sm:py-24 bg-zinc-950 overflow-hidden" id="showcase">
            <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">

                {/* 1. SECTION HEADING */}
                <div className="text-center mb-8">
                    <h2 className="text-sm font-bold tracking-widest text-zinc-500 uppercase">
                        {t("selection.title_new") || "Client Results"}
                    </h2>
                    <h3 className="text-3xl md:text-5xl font-black text-white mt-2 tracking-tight">
                        {t("selection.subtitle_new") || "Proven Transformations"}
                    </h3>
                </div>

                {/* 2. TOP NAVIGATION (Arrows & Counter) */}
                <div className="flex items-center justify-center gap-8 mb-12">
                    <button
                        onClick={() => paginate(-1)}
                        className="p-4 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-[#FFD700] hover:border-[#FFD700]/50 hover:bg-zinc-800 transition-all active:scale-95 group shadow-lg"
                        aria-label="Previous Project"
                    >
                        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                    </button>

                    <span className="text-lg font-mono text-zinc-500 tracking-widest">
                        <span className="text-white font-bold">{activeIndex + 1}</span> / {PROJECTS.length}
                    </span>

                    <button
                        onClick={() => paginate(1)}
                        className="p-4 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-[#FFD700] hover:border-[#FFD700]/50 hover:bg-zinc-800 transition-all active:scale-95 group shadow-lg"
                        aria-label="Next Project"
                    >
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* 3. CAROUSEL CONTENT */}
                <div className="relative min-h-[700px] lg:min-h-[600px]">
                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                        <motion.div
                            key={activeProject.id}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.3 }
                            }}
                            className="w-full flex flex-col lg:flex-row gap-8 lg:gap-16 items-start"
                        >
                            {/* LEFT COL: VIDEO (65% on Desktop) */}
                            <div className="w-full lg:w-[65%] flex flex-col items-center justify-center">
                                <BrowserFrame className="w-full aspect-video shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-zinc-800/50 bg-zinc-900/50 backdrop-blur-sm p-1 rounded-2xl relative">
                                    {/* Subtle Yellow Glow Behind Video */}
                                    <div className="absolute -inset-4 bg-[#FFD700]/5 blur-3xl rounded-full -z-10 opacity-50"></div>
                                    <div className="relative w-full h-full bg-black/40 group rounded-xl overflow-hidden shadow-inner flex items-center justify-center">
                                        {getVideoSrc(activeProject.id) ? (
                                            <video
                                                className="w-full h-full object-cover"
                                                controls
                                                playsInline
                                                src={getVideoSrc(activeProject.id)}
                                            >
                                                <track
                                                    src="/video/Elisa_projectDEMO - en.vtt"
                                                    kind="subtitles"
                                                    srcLang="en"
                                                    label="English"
                                                    default
                                                />
                                                <track
                                                    src="/video/Elisa_projectDEMO - fr.vtt"
                                                    kind="subtitles"
                                                    srcLang="fr"
                                                    label="Français"
                                                />
                                            </video>
                                        ) : (
                                            <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-700">
                                                <div className="px-6 py-3 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 backdrop-blur-md shadow-[0_0_20px_rgba(255,215,0,0.2)]">
                                                    <span className="text-sm font-black text-[#FFD700] uppercase tracking-[0.2em] animate-pulse">
                                                        {t("selection.videoComingSoon")}
                                                    </span>
                                                </div>
                                                <p className="text-zinc-500 text-xs font-medium uppercase tracking-widest opacity-60">
                                                    Case Study In Production
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </BrowserFrame>
                            </div>

                            {/* RIGHT COL: DETAILS (35% on Desktop) */}
                            <div className="w-full lg:w-[35%] flex flex-col h-full pt-4 justify-center">

                                {/* 1. LOGO & NAME GROUPING */}
                                <div className="flex items-center gap-5 mb-10">
                                    {activeProject.logo && (
                                        <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#FFD700] shadow-[0_0_20px_-5px_rgba(255,215,0,0.5)] bg-white p-2.5 flex-shrink-0">
                                            <Image
                                                src={activeProject.logo}
                                                alt={`${t(`${activeProject.id}.clientName`)} Logo`}
                                                fill
                                                className="object-contain p-1.5"
                                            />
                                        </div>
                                    )}
                                    <div className="flex flex-col">
                                        <h4 className="text-3xl font-bold text-white tracking-tight leading-tight">
                                            {t(`${activeProject.id}.clientName`)}
                                        </h4>
                                        <p className="text-sm font-semibold text-[#FFD700] tracking-widest mt-1.5 uppercase opacity-90">
                                            {t(`${activeProject.id}.clientIndustry`)}
                                        </p>
                                    </div>
                                </div>

                                {/* 2. IMPACT METRIC (Premium AI Look with Yellow Accent) */}
                                <div className="mb-10 relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD700] to-yellow-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-700"></div>
                                    <div className="relative bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800/50 rounded-2xl p-8 text-center shadow-2xl overflow-hidden">
                                        {/* Decorative pattern */}
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFD700]/5 rounded-full -mr-12 -mt-12 blur-2xl"></div>

                                        <div className="text-6xl lg:text-7xl font-black text-white tracking-tighter mb-3 drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]">
                                            {t(`${activeProject.id}.impact.value`)}
                                        </div>
                                        <div className="inline-block px-4 py-1.5 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/20 backdrop-blur-sm">
                                            <span className="text-xs font-bold text-[#FFD700] uppercase tracking-[0.2em]">
                                                {t(`${activeProject.id}.impact.label`)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* 3. BEFORE / AFTER (Dynamic Labeled List) */}
                                <div className="mb-10 space-y-6">
                                    <div className="relative pl-5 py-1">
                                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-zinc-800 rounded-full"></div>
                                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-1.5 block">
                                            Problem
                                        </span>
                                        <p className="text-zinc-400 text-sm leading-relaxed font-medium italic">
                                            "{t(`${activeProject.id}.pain`)}"
                                        </p>
                                    </div>
                                    <div className="relative pl-5 py-1">
                                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#FFD700] rounded-full shadow-[0_0_8px_rgba(255,215,0,0.4)]"></div>
                                        <span className="text-[10px] font-black text-[#FFD700] uppercase tracking-[0.2em] mb-1.5 block">
                                            Solution
                                        </span>
                                        <p className="text-white text-base font-semibold leading-relaxed">
                                            {t(`${activeProject.id}.outcome`)}
                                        </p>
                                    </div>
                                </div>



                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* 4. BOTTOM DOTS (Themed) */}
                <div className="flex justify-center gap-5 mt-12">
                    {PROJECTS.map((proj, idx) => (
                        <button
                            key={proj.id}
                            onClick={() => handleJump(idx)}
                            className={cn(
                                "rounded-full transition-all duration-500",
                                idx === activeIndex
                                    ? "w-10 h-2 bg-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.4)]"
                                    : "w-2 h-2 bg-zinc-800 hover:bg-zinc-700 hover:scale-110"
                            )}
                            aria-label={`Go to project ${idx + 1}`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}
