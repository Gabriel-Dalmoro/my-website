"use client";

import { Link } from "@/i18n/routing";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Phone } from "lucide-react";

export default function FloatingCTA() {
    const t = useTranslations("Blog.floating");
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="fixed bottom-6 right-6 z-50 md:hidden"
                >
                    <Link
                        href="/contact"
                        className="flex items-center gap-3 px-5 py-3 bg-zinc-950/90 backdrop-blur-xl border border-zinc-800 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:scale-105 active:scale-95 transition-all text-white"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-yellow-400 rounded-full blur-[2px] opacity-20 animate-pulse" />
                            <Phone className="w-4 h-4 text-yellow-400 relative z-10" />
                        </div>
                        <span className="font-bold text-sm tracking-wide">{t("cta")}</span>
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
