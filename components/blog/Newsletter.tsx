"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Newsletter() {
    const t = useTranslations("Blog.newsletter");

    return (
        <section className="bg-zinc-950 rounded-3xl p-8 sm:p-12 relative overflow-hidden my-16 border border-zinc-800 shadow-xl">
            {/* Circuit Pattern Background (SVG) */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <path d="M10 10 L30 10 L30 30" fill="none" stroke="currentColor" strokeWidth="2" className="text-yellow-500" />
                        <circle cx="30" cy="30" r="3" fill="currentColor" className="text-yellow-500" />
                        <path d="M70 70 L90 70 L90 90" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#circuit)" />
                </svg>
            </div>

            <div className="relative z-10 max-w-2xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 mb-6 shadow-inner">
                        <Mail className="w-6 h-6 text-yellow-500" />
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4">
                        {t.rich("headline", {
                            gold: (chunks) => <span className="text-yellow-500">{chunks}</span>
                        })}
                    </h2>
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 inline-block">
                        <p className="text-zinc-500 text-sm font-medium">✨ {t("subheadline")}</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
