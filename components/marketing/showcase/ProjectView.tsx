"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import BrowserFrame from "@/components/marketing/BrowserFrame";
import { IntegrationsBeam } from "@/components/marketing/IntegrationsBeam";
import { ShineBorder } from "@/components/ui/shine-border";

interface Track {
    src: string;
    lang: string;
    label: string;
    default?: boolean;
}

interface ProjectViewProps {
    id: string;
    titleKey: string;
    statsKeys: string[];
    videoSrc: string;
    videoPoster?: string;
    tracks?: Track[];
    premiumFeature?: {
        nameKey: string;
        labelKey: string;
    };
}

export default function ProjectView({
    id,
    titleKey,
    statsKeys,
    videoSrc,
    videoPoster,
    tracks = [],
    premiumFeature
}: ProjectViewProps) {
    const t = useTranslations("ClientShowcase");
    const videoRef = useRef<HTMLVideoElement>(null);

    return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Row 1: Stats & Video */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">

                {/* 1. Stats Card */}
                <div className="lg:col-span-4 relative rounded-3xl border border-primary/20 bg-zinc-900/80 p-8 flex flex-col justify-between text-center backdrop-blur-sm shadow-[0_0_40px_-20px_rgba(234,179,8,0.2)] overflow-hidden h-full order-first">
                    <ShineBorder shineColor={["#EAB308"]} duration={5} className="absolute inset-0 size-full pointer-events-none" />

                    <div className="relative z-10 mb-8">
                        <h3 className="text-6xl lg:text-7xl font-bold text-primary mb-4 tracking-tighter">
                            {t(`${id}.timeSaved`).split(" ")[0]}
                        </h3>
                        <p className="text-lg font-medium text-zinc-300 uppercase tracking-widest leading-relaxed">
                            {t(`${id}.timeSaved`).split(" ").slice(1).join(" ")}
                        </p>
                    </div>

                    <div className="relative z-10 space-y-4 text-left">
                        {premiumFeature && (
                            <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 group overflow-hidden transition-all hover:bg-primary/10">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-3 text-white">
                                        <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 shadow-[0_0_10px_rgba(234,179,8,0.8)] animate-pulse" />
                                        <span className="text-sm font-semibold tracking-tight">{t(premiumFeature.nameKey)}</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded uppercase tracking-wider self-start whitespace-nowrap ml-5">
                                        {t(premiumFeature.labelKey)}
                                    </span>
                                </div>
                            </div>
                        )}

                        <div className="space-y-2 pl-4">
                            {statsKeys.map((key, i) => (
                                <div key={i} className="flex items-center gap-3 text-zinc-400">
                                    <div className="h-1.5 w-1.5 rounded-full bg-zinc-600 flex-shrink-0" />
                                    <span className="text-sm font-medium">{t(`stats.${key}`)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2. Video Player */}
                <div className="lg:col-span-8 w-full h-full flex items-center relative min-h-[300px] lg:min-h-0">
                    <BrowserFrame className="w-full aspect-video lg:absolute lg:inset-0 lg:h-full lg:aspect-auto">
                        <div className="relative w-full bg-black overflow-hidden group rounded-b-xl h-full">
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
                        </div>
                    </BrowserFrame>
                </div>
            </div>

            {/* Row 2: Beam */}
            <div className="w-full flex justify-center">
                <div className="w-full max-w-4xl">
                    <IntegrationsBeam />
                </div>
            </div>
        </div>
    )
}
