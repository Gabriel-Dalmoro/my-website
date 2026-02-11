"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import LanguageSwitcher from "../LanguageSwitcher";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

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
        { name: t("blog"), href: "/blog" },
        { name: t("pricing"), href: "/pricing" },
        { name: t("contact"), href: "/contact" },
    ];

    // Check if link is active (simple check for now)
    const isActive = (path: string) => {
        if (path === "/" && pathname === "/") return true;
        if (path !== "/" && pathname.includes(path)) return true;
        return false;
    };

    const isBlog = pathname?.includes("/blog") || pathname?.includes("/studio");

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? isBlog
                    ? "bg-white/80 backdrop-blur-md border-b border-zinc-200 py-3 text-zinc-900 shadow-sm"
                    : "bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900 py-3"
                : "bg-transparent py-6"
                }`}
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <nav className="flex items-center justify-between" aria-label="Global">
                    {/* Logo Area */}
                    <div className="flex lg:flex-1">
                        <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2 transition-opacity hover:opacity-80">
                            <img src="/favicon.png" alt="GD" className="w-8 h-8 rounded-md" />
                            <span className={`text-lg font-bold tracking-tight ${isBlog && !isScrolled ? "text-zinc-900" : isBlog && isScrolled ? "text-zinc-900" : "text-white"}`}>Gabriel Dalmoro</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex lg:gap-x-8">
                        {navLinks.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`text-sm font-semibold leading-6 transition-colors ${isActive(item.href)
                                    ? "text-primary"
                                    : isBlog
                                        ? "text-zinc-600 hover:text-primary"
                                        : "text-zinc-300 hover:text-white"
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side: CTA, Lang Switcher & Mobile Menu Button */}
                    <div className="flex flex-1 justify-end items-center gap-4">

                        {/* CTA Button (Desktop) */}
                        <div className="hidden lg:block">
                            <Button asChild size="sm" className="hidden lg:flex px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-[0_0_15px_rgba(234,179,8,0.3)] hover:shadow-[0_0_20px_rgba(234,179,8,0.5)] transition-all">
                                <Link href="/contact">
                                    {t("bookCall")}
                                </Link>
                            </Button>
                        </div>

                        {/* Language Switcher (Full) */}
                        <LanguageSwitcher />

                        {/* Mobile Menu Button */}
                        <div className="flex lg:hidden">
                            <button
                                type="button"
                                className={`-m-2.5 inline-flex items-center justify-center rounded-lg p-2.5 border border-transparent transition-all ${isBlog
                                    ? "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
                                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50 hover:border-zinc-700"
                                    }`}
                                onClick={() => setMobileMenuOpen(true)}
                            >
                                <span className="sr-only">Open main menu</span>
                                <Menu className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Mobile Menu Overlay */}
                {/* Updated to be fully opaque for better readability over backdrop dots */}
                {mobileMenuOpen && (
                    <div className="lg:hidden fixed inset-0 z-50 bg-black" onClick={() => setMobileMenuOpen(false)}>
                        <div
                            className="absolute top-0 right-0 w-full sm:max-w-xs h-full bg-zinc-950 border-l border-white/10 p-6 shadow-2xl animate-in slide-in-from-right duration-300"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-8">
                                <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                                    <img src="/favicon.png" alt="GD" className="w-8 h-8 rounded-md" />
                                    <span className="text-lg font-bold text-white tracking-tight">Gabriel Dalmoro</span>
                                </Link>
                                <button
                                    type="button"
                                    className="-m-2.5 rounded-md p-2.5 text-zinc-400 hover:text-white transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <X className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                            <div className="flow-root">
                                <div className="-my-6 divide-y divide-white/10">
                                    <div className="space-y-4 py-6">
                                        {navLinks.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={`block rounded-lg px-3 py-3 text-lg font-bold leading-7 hover:bg-white/5 transition-colors ${isActive(item.href) ? "text-primary" : "text-white"
                                                    }`}
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="py-6">
                                        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg h-12 shadow-lg shadow-primary/20">
                                            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                                                {t("bookCall")}
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
