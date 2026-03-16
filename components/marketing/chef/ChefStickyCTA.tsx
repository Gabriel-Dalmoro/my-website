"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function ChefStickyCTA() {
    const t = useTranslations("Chef.Sticky");
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => setVisible(window.scrollY > 600);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 ease-in-out ${
                visible ? "translate-y-0" : "translate-y-full"
            }`}
        >
            <div className="border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-md px-4 py-3 sm:px-6">
                <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
                    <p className="text-sm text-zinc-300 hidden sm:block">
                        🍽️ {t("text")}
                    </p>
                    <Link
                        href="/contact"
                        className="ml-auto flex-shrink-0 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-bold text-black hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20 active:scale-95"
                    >
                        {t("button")}
                    </Link>
                </div>
            </div>
        </div>
    );
}
