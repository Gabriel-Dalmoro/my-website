"use client";

import { useRef, useState, useEffect } from "react";
import BrowserFrame from "./BrowserFrame";
import { Play, Pause, Volume2, VolumeX, Maximize, Mail, FileSpreadsheet, Calendar, Receipt, CreditCard, Users, Layout } from "lucide-react";
import { useTranslations } from "next-intl";
import { LampContainer } from "../ui/lamp";
import { ShineBorder } from "@/components/ui/shine-border";
import { motion } from "motion/react";
import { IntegrationsBeam } from "./IntegrationsBeam";

export default function ClientShowcase() {
  const t = useTranslations("ClientShowcase");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSubtitle, setActiveSubtitle] = useState<"en" | "fr" | null>("en");

  // Handle time updates for the progress bar
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener("timeupdate", updateProgress);
    return () => video.removeEventListener("timeupdate", updateProgress);
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullScreen = () => {
    const video = videoRef.current;
    if (!video) return;

    // Standard
    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
    // iOS / Safari
    else if ((video as any).webkitEnterFullscreen) {
      (video as any).webkitEnterFullscreen();
    }
    // Older Webkit
    else if ((video as any).webkitRequestFullscreen) {
      (video as any).webkitRequestFullscreen();
    }
    // IE/Edge
    else if ((video as any).msRequestFullscreen) {
      (video as any).msRequestFullscreen();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    if (videoRef.current) {
      const newTime = (newProgress / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
    }
  };

  const switchSubtitle = (lang: "en" | "fr" | null) => {
    setActiveSubtitle(lang);
    if (videoRef.current) {
      const tracks = videoRef.current.textTracks;
      for (let i = 0; i < tracks.length; i++) {
        // Hide all first
        tracks[i].mode = "hidden";
        // Show selected
        if (tracks[i].language === lang) {
          tracks[i].mode = "showing";
        }
      }
    }
  };

  const techStack = [
    { name: t("techs.gmail"), icon: Mail },
    { name: t("techs.sheets"), icon: FileSpreadsheet },
    { name: t("techs.calendar"), icon: Calendar },
    { name: t("techs.accounting"), icon: Receipt },
    { name: t("techs.payments"), icon: CreditCard },
    { name: t("techs.crm"), icon: Users },
    { name: t("techs.design"), icon: Layout },
  ];

  return (
    <section className="bg-zinc-950 pt-24 pb-24">
      <LampContainer className="pt-32 bg-zinc-950 min-h-[60vh]">
        <motion.h2
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-52 text-center text-4xl font-bold tracking-tight text-zinc-950 sm:text-6xl md:text-7xl"
        >
          {t("headline")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-4 text-lg leading-8 text-white max-w-2xl text-center"
        >
          {t("description")}
        </motion.p>
      </LampContainer>

      <div className="relative z-50 mx-auto max-w-7xl px-6 -mt-64 lg:-mt-80">
        <div className="flex flex-col gap-12 mt-12 lg:mt-24">
          {/* Row 1: Stats Card (Left) & Video (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            {/* 1. Time Saved Card (Left Column) */}
            {/* 1. Time Saved Card (Left Column) */}
            <div className="lg:col-span-4 relative rounded-3xl border border-primary/20 bg-zinc-900/80 p-8 flex flex-col justify-between text-center backdrop-blur-sm shadow-[0_0_40px_-20px_rgba(234,179,8,0.2)] overflow-hidden h-full order-first">
              <ShineBorder shineColor={["#EAB308"]} duration={5} className="absolute inset-0 size-full pointer-events-none" />
              <div className="relative z-10 mb-8">
                <h3 className="text-6xl lg:text-7xl font-bold text-primary mb-4 tracking-tighter">
                  {t("timeSaved").split(" ")[0]}
                </h3>
                <p className="text-lg font-medium text-zinc-300 uppercase tracking-widest leading-relaxed">
                  {t("timeSaved").split(" ").slice(1).join(" ")}
                </p>
              </div>

              <div className="relative z-10 space-y-4 text-left">
                {/* Highlighted Optional Premium Item */}
                <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 group overflow-hidden transition-all hover:bg-primary/10">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 text-white">
                      <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 shadow-[0_0_10px_rgba(234,179,8,0.8)] animate-pulse" />
                      <span className="text-sm font-semibold tracking-tight">{t("stats.websiteDesign")}</span>
                    </div>
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded uppercase tracking-wider self-start whitespace-nowrap ml-5">
                      {t("stats.optionalPremium")}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pl-4">
                  {[
                    "gmail",
                    "sheets",
                    "calendar",
                    "invoicing",
                    "payments"
                  ].map((key, i) => (
                    <div key={i} className="flex items-center gap-3 text-zinc-400">
                      <div className="h-1.5 w-1.5 rounded-full bg-zinc-600 flex-shrink-0" />
                      <span className="text-sm font-medium">{t(`stats.${key}`)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Video Player (Left/Right depending on order, but here Right due to Grid) */}
            <div className="lg:col-span-8 w-full h-full flex items-center relative">
              <BrowserFrame className="w-full aspect-video lg:absolute lg:inset-0 lg:h-full lg:aspect-auto">
                <div className="relative w-full bg-black overflow-hidden group rounded-b-xl h-full">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    playsInline
                    onClick={togglePlay}
                    poster="/video-poster.jpg"
                  >
                    <source src="/video/elisa_project_videoDEMO2.mp4" type="video/mp4" />
                    <track
                      kind="subtitles"
                      src="/video/elisa_project_videoDEMO2.vtt"
                      srcLang="en"
                      label="English"
                      default={activeSubtitle === "en"}
                    />
                    <track
                      kind="subtitles"
                      src="/video/elisa_project_videoDEMO2_fr.vtt"
                      srcLang="fr"
                      label="Français"
                    />
                    Your browser does not support the video tag.
                  </video>

                  {/* Custom Controls Overlay */}
                  <div
                    className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"
                      }`}
                  >
                    {!isPlaying && (
                      <button
                        onClick={togglePlay}
                        className="rounded-full bg-white/10 p-4 backdrop-blur-sm transition-transform hover:scale-110 hover:bg-white/20"
                      >
                        <Play className="h-12 w-12 text-white fill-white" />
                      </button>
                    )}
                  </div>

                  {/* Bottom Bar Controls */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 gap-2">

                    {/* Scrub Bar */}
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={progress}
                      onChange={handleSeek}
                      className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary transition-all hover:h-2"
                    />

                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-4">
                        <button onClick={togglePlay} className="text-white hover:text-primary transition-colors">
                          {isPlaying ? <Pause className="h-6 w-6 fill-current" /> : <Play className="h-6 w-6 fill-current" />}
                        </button>

                        <button onClick={toggleMute} className="text-white hover:text-primary transition-colors">
                          {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                        </button>

                        <button onClick={toggleFullScreen} className="text-white hover:text-primary transition-colors">
                          <Maximize className="h-6 w-6" />
                        </button>
                      </div>

                      {/* Subtitle Switcher */}
                      <div className="flex gap-2 p-1 bg-black/50 rounded-lg backdrop-blur-sm">
                        <button
                          onClick={(e) => { e.stopPropagation(); switchSubtitle("en"); }}
                          className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${activeSubtitle === "en"
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-white/70 hover:text-white hover:bg-white/10"
                            }`}
                        >
                          EN
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); switchSubtitle("fr"); }}
                          className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${activeSubtitle === "fr"
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-white/70 hover:text-white hover:bg-white/10"
                            }`}
                        >
                          FR
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </BrowserFrame>
            </div>
            {/* End Video Player Column (Moved) */}
          </div>

          {/* Row 2: Integrations Beam (Centered) */}
          <div className="w-full flex justify-center">
            <div className="w-full max-w-4xl">
              <IntegrationsBeam />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
