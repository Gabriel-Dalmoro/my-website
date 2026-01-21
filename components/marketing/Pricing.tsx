"use client";

import { useTranslations } from "next-intl";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

export default function Pricing() {
    const t = useTranslations("Pricing");
    const tNav = useTranslations("Navigation");

    const packages = [
        {
            key: "foundation",
            highlight: false
        },
        {
            key: "performance",
            highlight: true // The High-Performance Engine
        },
        {
            key: "scaling",
            highlight: false
        }
    ];

    return (
        <section id="pricing" className="py-24 bg-zinc-950 relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        {t("headline")}
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {packages.map((pkg, index) => (
                        <motion.div
                            key={pkg.key}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className={`relative flex flex-col rounded-3xl p-8 xl:p-10 ${pkg.highlight
                                ? "bg-zinc-900 border-2 border-primary/50 ring-1 ring-primary/50 shadow-2xl shadow-primary/10 scale-105 z-10"
                                : "bg-zinc-900/50 border border-zinc-800 ring-1 ring-white/5"
                                }`}
                        >
                            {pkg.highlight && (
                                <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-primary to-yellow-400 px-3 py-1 text-center text-xs font-semibold leading-5 text-zinc-900 shadow-sm">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-4">
                                <h3 id={pkg.key} className="text-lg font-semibold leading-8 text-white">
                                    {t(`cards.${pkg.key}.name`)}
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-zinc-400">
                                    {t(`cards.${pkg.key}.header`)}
                                </p>
                            </div>

                            <div className="flex items-baseline gap-x-1">
                                <span className="text-2xl font-bold tracking-tight text-white">
                                    {t(`cards.${pkg.key}.subHeader`)}
                                </span>
                            </div>

                            <p className="mt-6 text-sm italic text-zinc-300 border-l-2 border-primary/50 pl-3">
                                "{t(`cards.${pkg.key}.outcome`)}"
                            </p>

                            <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-zinc-300 xl:mt-10 flex-1">
                                {[0, 1, 2].map((i) => (
                                    <li key={i} className="flex gap-x-3">
                                        <Check className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
                                        {t(`cards.${pkg.key}.features.${i}`)}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8">
                                <Button
                                    asChild
                                    size="lg"
                                    className={`w-full rounded-full ${pkg.highlight
                                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                        : "bg-zinc-800 text-white hover:bg-zinc-700"
                                        }`}
                                >
                                    <Link href="/contact" className="gap-2">
                                        {t("cta")} <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
