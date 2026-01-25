"use client";

import { Link } from "@/i18n/routing";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

export default function PromoCard() {
    const t = useTranslations("Blog.promo");

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group relative flex flex-col items-start justify-between min-h-[300px] h-full p-8 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden"
        >
            {/* Circuit Pattern Background (SVG) */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <pattern id="circuit-promo" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                        <path d="M10 10 L30 10 L30 30" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-yellow-500" />
                        <circle cx="30" cy="30" r="2" fill="currentColor" className="text-yellow-500" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#circuit-promo)" />
                </svg>
            </div>

            <div className="relative z-10 flex flex-col gap-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400/10 border border-yellow-400/20 rounded-full w-fit">
                    <Sparkles className="w-3 h-3 text-yellow-400" />
                    <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider">{t("badge")}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    {t("title")}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                    {t("description")}
                </p>
            </div>

            <div className="relative z-10 mt-8 w-full">
                <Link
                    href="/contact"
                    className="flex items-center justify-between w-full p-4 bg-zinc-900 border border-zinc-800 rounded-2xl group-hover:bg-zinc-800 group-hover:border-zinc-700 transition-all duration-300"
                >
                    <span className="font-bold text-white">{t("cta")}</span>
                    <div className="p-2 bg-yellow-400 rounded-full text-black">
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                </Link>
            </div>
        </motion.div>
    );
}
