"use client";

import { useRef, useState, useEffect } from "react";
import BrowserFrame from "./BrowserFrame";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import { useTranslations } from "next-intl";
import { LampContainer } from "../ui/lamp";
import { motion } from "motion/react";

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
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
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

      <div className="relative z-50 mx-auto max-w-5xl px-6 -mt-48 lg:-mt-64">
        <BrowserFrame className="relative group bg-zinc-900 shadow-2xl shadow-primary/10 border-zinc-800">
          <div className="relative aspect-video w-full bg-black overflow-hidden group rounded-b-xl">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              playsInline
              onClick={togglePlay}
              poster="/video-poster.jpg"
            >
              <source src="/video/elisa_project_video1.mp4" type="video/mp4" />
              <track
                kind="subtitles"
                src="/video/english-subtitles-final.vtt"
                srcLang="en"
                label="English"
                default={activeSubtitle === "en"}
              />
              <track
                kind="subtitles"
                src="/video/french-subtitles-final.vtt"
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
                    className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${activeSubtitle === "en"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                      }`}
                  >
                    English
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); switchSubtitle("fr"); }}
                    className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${activeSubtitle === "fr"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                      }`}
                  >
                    Français
                  </button>
                </div>
              </div>
            </div>
          </div>
        </BrowserFrame>
      </div>
    </section>
  );
}
