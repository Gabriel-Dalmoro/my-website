"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle, XCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ClinicResults() {
    const t = useTranslations("Clinic.Results");

    const before = [t("before0"), t("before1"), t("before2"), t("before3")];
    const after = [t("after0"), t("after1"), t("after2"), t("after3")];

    return (
        <section className="bg-zinc-950 py-20 border-t border-zinc-900">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Header */}
                <div className="mx-auto max-w-2xl text-center mb-12">
                    <p className="text-base font-semibold uppercase tracking-wide text-yellow-500">
                        {t("label")}
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        {t("headline")}
                    </h2>
                    <p className="mt-4 text-lg text-zinc-400">{t("location")}</p>
                </div>

                {/* Before / After + Impact */}
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
                    {/* Before / After lists */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-red-400">
                                {t("beforeLabel")}
                            </h3>
                            <ul className="space-y-3">
                                {before.map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-zinc-300">
                                        <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-green-400">
                                {t("afterLabel")}
                            </h3>
                            <ul className="space-y-3">
                                {after.map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-zinc-300">
                                        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Impact card */}
                    <div className="flex flex-col items-center gap-8">
                        <div className="w-full rounded-2xl border border-yellow-500/30 bg-yellow-500/5 p-8 text-center">
                            <p className="text-6xl font-black text-yellow-400">{t("impactValue")}</p>
                            <p className="mt-2 text-lg font-medium text-zinc-300">{t("impactLabel")}</p>
                            <p className="mt-1 text-sm text-zinc-500">{t("impactNote")}</p>
                        </div>

                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-semibold transition-colors"
                        >
                            {t("cta")}
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
