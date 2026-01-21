"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import ProjectView from "./showcase/ProjectView";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const PROJECTS = [
  {
    id: "project1",
    name: "Elisa Batch Cooking",
    videoSrc: "/video/elisa_project_videoDEMO2.mp4",
    statsKeys: ["gmail", "sheets", "calendar", "invoicing", "payments"],
    premiumFeature: { nameKey: "stats.websiteDesign", labelKey: "stats.optionalPremium" },
    tracks: [
      { src: "/video/elisa_project_videoDEMO2.vtt", lang: "en", label: "English", default: true },
      { src: "/video/elisa_project_videoDEMO2_fr.vtt", lang: "fr", label: "Français", default: false }
    ]
  },
  // {
  //     id: "project2",
  //     name: "Lead Qualification Agent",
  //     videoSrc: "/video/elisa_project_videoDEMO2.mp4",
  //     statsKeys: ["gmail", "sheets", "crm", "invoicing", "calendar"],
  //     tracks: [
  //         { src: "/video/elisa_project_videoDEMO2.vtt", lang: "en", label: "English", default: true },
  //         { src: "/video/elisa_project_videoDEMO2_fr.vtt", lang: "fr", label: "Français", default: false }
  //     ]
  // }
];

export default function ClientShowcase() {
  const t = useTranslations("ClientShowcase");
  const [activeIndex, setActiveIndex] = useState(0);

  const activeProject = PROJECTS[activeIndex];

  const nextProject = () => {
    // setActiveIndex((prev) => (prev + 1) % PROJECTS.length);
  };

  const prevProject = () => {
    // setActiveIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden" id="projects">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]"></div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header (Tabs Hidden for Single Project) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold tracking-tight text-primary sm:text-6xl mb-6 drop-shadow-sm">
              {t("title")}
            </h2>
            <p className="text-lg text-zinc-400 leading-relaxed">
              {t("subtitle")}
            </p>
          </div>

          {/* Desktop Tabs (Hidden) */}
          {/* <div className="hidden md:flex items-center gap-2 bg-zinc-900/50 p-1.5 rounded-xl border border-zinc-800">
                        {PROJECTS.map((project, idx) => (
                            <button
                                key={project.id}
                                onClick={() => setActiveIndex(idx)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                    activeIndex === idx 
                                        ? "bg-zinc-800 text-white shadow-lg border border-zinc-700" 
                                        : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                                }`}
                            >
                                {project.name}
                            </button>
                        ))}
                    </div> */}
        </div>

        {/* Mobile Tabs (Hidden) */}
        {/* <div className="md:hidden flex overflow-x-auto pb-4 mb-8 gap-3 -mx-6 px-6 scrollbar-hide">
                     {PROJECTS.map((project, idx) => (
                        <button
                            key={project.id}
                            onClick={() => setActiveIndex(idx)}
                            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                                activeIndex === idx 
                                    ? "bg-primary/10 border-primary text-primary" 
                                    : "bg-zinc-900 border-zinc-800 text-zinc-400"
                            }`}
                        >
                            {project.name}
                        </button>
                    ))}
                </div> */}

        {/* Project View (Animated Switch) */}
        <div className="relative min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectView
                id={activeProject.id}
                titleKey={activeProject.id}
                statsKeys={activeProject.statsKeys}
                videoSrc={activeProject.videoSrc}
                premiumFeature={activeProject.premiumFeature}
                tracks={activeProject.tracks}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Navigation (Hidden for now) */}
        {/* <div className="mt-16 flex items-center justify-center border-t border-zinc-900 pt-8">
                    <div className="flex items-center gap-4">
                         <span className="text-zinc-500 text-sm font-medium uppercase tracking-wider">
                            Explore More Work
                        </span>
                        <div className="flex gap-2">
                             <Button 
                                variant="outline" 
                                size="icon" 
                                onClick={prevProject}
                                className="rounded-full border-zinc-800 text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800"
                             >
                                <ChevronLeft className="w-5 h-5" />
                            </Button>
                            <Button 
                                variant="outline" 
                                size="lg" 
                                onClick={nextProject}
                                className="rounded-full border-zinc-800 text-white bg-zinc-900 hover:bg-zinc-800 hover:border-primary/50 group pl-6 pr-4"
                            >
                                <span className="mr-2">Next Project: {PROJECTS[(activeIndex + 1) % PROJECTS.length].name}</span>
                                <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-primary transition-colors" />
                            </Button>
                        </div>
                    </div>
                </div> */}

      </div>
    </section>
  );
}
