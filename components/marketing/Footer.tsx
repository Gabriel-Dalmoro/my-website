"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Footer() {
    const t = useTranslations("Footer");

    return (
        <footer className="py-10 border-t border-border/40 bg-zinc-950/50">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    {/* Left: Logo + Copyright */}
                    <div className="flex items-center gap-3">
                        <img src="/favicon.png" alt="GD" className="w-6 h-6 rounded-md opacity-80" />
                        <p className="text-sm leading-5 text-zinc-400">
                            &copy; {new Date().getFullYear()} Gabriel Dalmoro. {t("rights")}
                        </p>
                    </div>

                    {/* Right: Links + Language Switcher */}
                    <div className="flex items-center gap-5 flex-wrap justify-center">
                        <Link
                            href="/blog"
                            className="text-sm font-semibold leading-6 text-zinc-400 hover:text-white transition-colors"
                        >
                            Blog
                        </Link>
                        <Link
                            href="/legal"
                            className="text-sm font-semibold leading-6 text-zinc-400 hover:text-white transition-colors"
                        >
                            {t("legal")}
                        </Link>
                        <Link
                            href="/terms"
                            className="text-sm font-semibold leading-6 text-zinc-400 hover:text-white transition-colors"
                        >
                            {t("terms")}
                        </Link>
                        <LanguageSwitcher variant="full" />
                    </div>
                </div>
            </div>
        </footer>
    );
}
