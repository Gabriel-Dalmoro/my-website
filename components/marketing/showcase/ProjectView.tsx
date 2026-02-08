"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import BrowserFrame from "@/components/marketing/BrowserFrame";
import { LiveSystemBeam } from "@/components/marketing/LiveSystemBeam";

import { ShineBorder } from "@/components/ui/shine-border";
import { Button } from "@/components/ui/button";
import { ArrowRight, Quote, CheckCircle2, XCircle } from "lucide-react";

interface Track {
    src: string;
    lang: string;
    label: string;
    default?: boolean;
}

interface ProjectViewProps {
    category: "operations" | "marketing" | "sales";
    videoSrc: string;
    videoPoster?: string;
    tracks?: Track[];
}

export default function ProjectView({
    category,
    videoSrc,
    videoPoster,
    tracks = []
}: ProjectViewProps) {
    const t = useTranslations(`ClientShowcase.${category}`);
    const tShowcase = useTranslations("ClientShowcase");
    // Safe check for array to avoid render errors during dev
    const automations = t.raw("automations") as Array<{ manual: string; automated: string }>;
    const videoRef = useRef<HTMLVideoElement>(null);

    return (
        <div className="w-full">

            {/* Top Section: Video & Dashboard Data */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-6">

                {/* Left Col: Video Player (Main Focus) */}
                <div className="lg:col-span-8 w-full flex flex-col gap-6">

                    {/* Visual Bridge: Problem vs Solution */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-800/50 rounded-2xl border border-zinc-800/80 overflow-hidden shadow-2xl">
                        {/* Before Side */}
                        <div className="flex items-center gap-4 bg-zinc-950 p-5 md:p-6 transition-colors hover:bg-zinc-900/50">
                            <div className="flex-shrink-0 p-2 bg-red-500/10 rounded-full border border-red-500/20">
                                <XCircle className="w-4 h-4 text-red-500" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-red-500/60 uppercase tracking-widest mb-0.5">Focus: Manual Pain</span>
                                <p className="text-sm md:text-base font-medium text-zinc-300 leading-tight">
                                    {t("pain")}
                                </p>
                            </div>
                        </div>

                        {/* After Side */}
                        <div className="flex items-center gap-4 bg-emerald-600/10 p-5 md:p-6 transition-colors hover:bg-emerald-600/20 border-t sm:border-t-0 sm:border-l border-zinc-800/50">
                            <div className="flex-shrink-0 p-2 bg-emerald-500/20 rounded-full border border-emerald-500/30">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-emerald-500/60 uppercase tracking-[0.2em] mb-0.5">The Transformation</span>
                                <p className="text-sm md:text-base font-bold text-white leading-tight tracking-tight">
                                    {t("outcome")}
                                </p>
                            </div>
                        </div>
                    </div>

                    <BrowserFrame className="w-full aspect-video shadow-2xl border-zinc-800/80">
                        <div className="relative w-full bg-black overflow-hidden group rounded-b-xl h-full flex items-center justify-center">
                            {category === 'operations' ? (
                                <video
                                    ref={videoRef}
                                    className="w-full h-full object-cover"
                                    loop
                                    playsInline
                                    poster={videoPoster}
                                    controls
                                    crossOrigin="anonymous"
                                >
                                    <source src={videoSrc} type="video/webm" />
                                    <source src={videoSrc.replace('.webm', '.mp4')} type="video/mp4" />
                                    {tracks.map((track, idx) => (
                                        <track
                                            key={idx}
                                            kind="subtitles"
                                            src={track.src}
                                            srcLang={track.lang}
                                            label={track.label}
                                            default={track.default}
                                        />
                                    ))}
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/20 p-4 sm:p-8">
                                    <div className="flex-1 w-full flex items-center justify-center overflow-hidden">
                                        <LiveSystemBeam activeCategory={category} className="scale-[0.9] sm:scale-[0.95] lg:scale-[1.0] opacity-80" />
                                    </div>
                                    <div className="mt-2 sm:mt-4 bg-zinc-900/50 border border-zinc-800/80 px-4 py-2 rounded-full backdrop-blur-sm">
                                        <p className="text-zinc-400 font-bold tracking-widest uppercase text-[9px] sm:text-xs">
                                            {tShowcase("selection.demoComingSoon")}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </BrowserFrame>

                </div>

                {/* Right Col: Dashboard Metrics & Tools */}
                <div className="lg:col-span-4 flex flex-col gap-4 md:gap-6 h-full">

                    {/* Impact Hammer */}
                    <div className="relative rounded-3xl border border-zinc-800 bg-zinc-900/40 p-10 text-center shadow-xl overflow-hidden group hover:border-primary/20 transition-all duration-500">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                            <CheckCircle2 className="w-24 h-24 text-primary" />
                        </div>
                        <div className="relative z-10 flex flex-col items-center justify-center gap-1">
                            <div className="text-6xl md:text-7xl font-black text-white leading-none tracking-tighter drop-shadow-2xl group-hover:text-primary transition-colors duration-500">
                                {t("impact.value")}
                            </div>
                            <div className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.3em] mt-2">
                                {t("impact.label")}
                            </div>
                        </div>
                    </div>

                    {/* Manual Work We Automated */}
                    <div className="rounded-3xl border border-zinc-800 bg-zinc-950/40 p-8 flex flex-col flex-1 shadow-2xl backdrop-blur-sm">
                        <h4 className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.4em] mb-10 text-center border-b border-zinc-900/50 pb-4">
                            {t("manualWorkTitle")}
                        </h4>
                        <ul className="space-y-8 mb-12">
                            {Array.isArray(automations) && automations.map((item: any, i: number) => (
                                <li key={i} className="flex flex-col gap-2 group/item">
                                    <div className="flex items-center gap-2 opacity-40 group-hover/item:opacity-60 transition-opacity">
                                        <XCircle className="w-3 h-3 text-red-500/80" />
                                        <span className="text-zinc-500 line-through text-xs md:text-sm decoration-zinc-700 decoration-1">
                                            {item.manual}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="p-1 bg-emerald-500/10 rounded-full">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                        </div>
                                        <span className="text-emerald-400 text-sm md:text-lg font-black tracking-tight group-hover/item:text-emerald-300 transition-colors">
                                            {item.automated}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-auto">
                            <Button className="w-full bg-primary text-zinc-950 hover:bg-white hover:scale-[1.02] active:scale-[0.98] font-black text-xs h-14 shadow-[0_20px_40px_-10px_rgba(234,179,8,0.3)] transition-all duration-300 px-4 text-center uppercase tracking-widest">
                                {t("cta")}
                            </Button>
                        </div>
                    </div>

                </div>
            </div>



        </div>
    )
}
