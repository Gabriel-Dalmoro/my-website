"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import ProjectView from "./showcase/ProjectView";
import AboutMe from "./AboutMe";
import Testimonials from "./Testimonials";
import { ArrowLeft, LayoutDashboard, Megaphone, TrendingUp } from "lucide-react";

const CATEGORIES = ["operations", "marketing", "sales"] as const;
type Category = typeof CATEGORIES[number];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    filter: "blur(10px)"
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    filter: "blur(0px)"
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    filter: "blur(10px)"
  })
};

export default function ClientShowcase() {
  const t = useTranslations("ClientShowcase");
  const [activeCategory, setActiveCategory] = useState<Category>("operations");
  const [direction, setDirection] = useState(0);

  const handleCategoryChange = (newCat: Category) => {
    const oldIndex = CATEGORIES.indexOf(activeCategory);
    const newIndex = CATEGORIES.indexOf(newCat);
    setDirection(newIndex > oldIndex ? 1 : -1);
    setActiveCategory(newCat);
  };

  // Define video config for each category
  const getVideoConfig = (category: Category) => {
    switch (category) {
      case "operations":
        return {
          videoSrc: "/video/Elisa_projectDEMO.mp4",
          tracks: [
            { src: "/video/Elisa_projectDEMO - en.vtt", lang: "en", label: "English", default: true },
            { src: "/video/Elisa_projectDEMO - fr.vtt", lang: "fr", label: "Français", default: false }
          ]
        };
      case "marketing":
        return {
          videoSrc: "/video/Elisa_projectDEMO.mp4",
          tracks: []
        };
      case "sales":
        return {
          videoSrc: "/video/Elisa_projectDEMO.mp4",
          tracks: []
        };
    }
  };

  const getIcon = (cat: Category, className: string = "w-8 h-8") => {
    switch (cat) {
      case 'operations': return <LayoutDashboard className={className} />;
      case 'marketing': return <Megaphone className={className} />;
      case 'sales': return <TrendingUp className={className} />;
    }
  }

  return (
    <section className="py-8 sm:py-12 bg-zinc-950 relative overflow-hidden flex flex-col justify-center" id="showcase">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/10 blur-[120px]"></div>

      <div className="w-full">
        {/* 1. ABOUT ME (Always visible at the top) */}
        <div className="w-full border-b border-zinc-900 mb-12">
          <AboutMe />
        </div>

        {/* 2. SELECTION CARDS */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full mb-8 flex flex-col items-center justify-center">

          {/* PERSISTENT TITLE */}
          <h2 className="font-black text-center text-white tracking-tight text-3xl md:text-6xl mb-12 opacity-90 max-w-4xl">
            {t("selection.title")}
          </h2>

          {/* CARDS CONTAINER */}
          <div className="grid grid-cols-3 gap-3 md:gap-6 w-full max-w-5xl relative z-10">
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat;
              const index = CATEGORIES.indexOf(cat);

              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`
                    group relative flex flex-col items-center text-center p-4 md:p-8 rounded-[2rem] border transition-all duration-500
                    ${isSelected
                      ? 'bg-zinc-900 border-primary shadow-[0_0_40px_-10px_rgba(234,179,8,0.4)] ring-1 ring-primary/50 translate-y-[-4px]'
                      : 'bg-zinc-900/40 border-zinc-800/50 hover:border-zinc-700 opacity-70 hover:opacity-100 hover:translate-y-[-2px]'
                    }
                  `}
                >
                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] mb-4 transition-colors ${isSelected ? 'text-primary/90' : 'text-zinc-600'}`}>
                    client demo {["one", "two", "three"][index]}
                  </span>

                  <div className={`transition-all duration-500 mb-4 ${isSelected ? 'text-primary scale-110' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                    {getIcon(cat, "w-6 h-6 md:w-10 md:h-10")}
                  </div>

                  <h3 className={`font-black transition-all duration-500 text-[10px] md:text-sm uppercase tracking-widest leading-tight ${isSelected ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-400'}`}>
                    {t(`selection.cards.${cat}.title`)}
                  </h3>

                  {isSelected && (
                    <motion.div
                      layoutId="activeSubtle"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-full blur-[2px]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* NARRATIVE BRIDGE (Always Shown) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center mt-12 mb-2 text-center"
          >
            <p
              className="text-4xl md:text-8xl text-yellow-500 mb-4 tracking-tight leading-none"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              {t("selection.narrativeBridge")}
            </p>
            <h3 className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 opacity-90">
              {t(`${activeCategory}.clientName`)}
            </h3>
            <p className="text-zinc-500 text-xs md:text-base font-bold uppercase tracking-[0.4em] opacity-60">
              {t("industryLabel")} {t(`${activeCategory}.clientIndustry`)}
            </p>
          </motion.div>

          {/* 3. PROJECT SHOWCASE (Always Shown) */}
          <div className="w-full pt-12">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeCategory}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
              >
                <ProjectView
                  category={activeCategory}
                  videoSrc={getVideoConfig(activeCategory).videoSrc}
                  tracks={getVideoConfig(activeCategory).tracks || []}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 4. TESTIMONIALS (Linked to project) */}
        <Testimonials focusedCategory={activeCategory} />
      </div>
    </section>
  );
}
