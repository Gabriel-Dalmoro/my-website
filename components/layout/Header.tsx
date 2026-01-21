"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import LanguageSwitcher from "../LanguageSwitcher";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
    const t = useTranslations("Navigation");
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: t("home"), href: "/" },
        { name: t("about"), href: "/about" },
        { name: t("pricing"), href: "/#pricing" },
        { name: t("contact"), href: "/contact" },
    ];

    // Check if link is active (simple check for now)
    const isActive = (path: string) => {
        if (path === "/" && pathname === "/") return true;
        if (path !== "/" && pathname.includes(path)) return true;
        return false;
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900 py-3" : "bg-transparent py-6"
                }`}
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <nav className="flex items-center justify-between" aria-label="Global">
                    {/* Logo Area */}
                    <div className="flex lg:flex-1">
                        <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2 transition-opacity hover:opacity-80">
                            <img src="/favicon.png" alt="GD" className="w-8 h-8 rounded-md" />
                            <span className="text-lg font-bold text-white tracking-tight">Gabriel Dalmoro</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex lg:gap-x-8">
                        {navLinks.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`text-sm font-semibold leading-6 transition-colors ${isActive(item.href) ? "text-primary" : "text-zinc-300 hover:text-white"
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side: Lang Switcher & Mobile Menu Button */}
                    <div className="flex flex-1 justify-end items-center gap-4">
                        <LanguageSwitcher variant="minimal" />

                        {/* Mobile Menu Button */}
                        <div className="flex lg:hidden">
                            <button
                                type="button"
                                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-zinc-400 hover:text-white"
                                onClick={() => setMobileMenuOpen(true)}
                            >
                                <span className="sr-only">Open main menu</span>
                                <Menu className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Mobile Menu Overlay */}
                {mobileMenuOpen && (
                    <div className="lg:hidden fixed inset-0 z-50 bg-zinc-950 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10 flex flex-col">
                        <div className="flex items-center justify-between">
                            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                                <img src="/favicon.png" alt="GD" className="w-8 h-8 rounded-md" />
                                <span className="text-lg font-bold text-white tracking-tight">Gabriel Dalmoro</span>
                            </Link>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-zinc-400 hover:text-white"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <X className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="mt-8 flow-root">
                            <div className="-my-6 divide-y divide-zinc-500/10">
                                <div className="space-y-2 py-6">
                                    {navLinks.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-zinc-800"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
