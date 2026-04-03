"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

interface Row {
    emoji: string;
    label: string;
    value: string;
    valueColor: string;
    muted?: boolean;
}

function CompareRow({ row, delay }: { row: Row; delay: number }) {
    return (
        <motion.div
            className={`flex items-center justify-between gap-4 py-4 border-b border-zinc-800/60 last:border-0 ${row.muted ? "opacity-40" : ""}`}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: row.muted ? 0.4 : 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay, ease: "easeOut" }}
        >
            <div className="flex items-center gap-3">
                <span className="text-2xl">{row.emoji}</span>
                <span className="text-sm text-zinc-300 leading-snug">{row.label}</span>
            </div>
            <span className={`text-3xl font-black tabular-nums shrink-0 ${row.valueColor}`}>
                {row.value}
            </span>
        </motion.div>
    );
}

export default function ClinicDayInLife() {
    const t = useTranslations("Clinic.DayInLife");

    const beforeRows: Row[] = [
        { emoji: "📞", label: t("adminBefore"),   value: "3h", valueColor: "text-red-400"   },
        { emoji: "🩺", label: t("careBefore"),     value: "4h", valueColor: "text-zinc-500"  },
        { emoji: "📈", label: t("growthBefore"),   value: "0h", valueColor: "text-zinc-600", muted: true },
    ];

    const afterRows: Row[] = [
        { emoji: "📞", label: t("adminAfter"),    value: "0h", valueColor: "text-zinc-500", muted: true },
        { emoji: "🩺", label: t("careAfter"),     value: "7h", valueColor: "text-green-400" },
        { emoji: "📈", label: t("growthAfter"),   value: "1h", valueColor: "text-yellow-400" },
    ];

    return (
        <section className="bg-zinc-950 py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-14">
                    <p className="text-base font-semibold uppercase tracking-wide text-yellow-500 mb-2">
                        {t("label")}
                    </p>
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        {t("headline")}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">

                    {/* BEFORE */}
                    <div className="rounded-2xl border border-red-500/20 bg-zinc-900/60 p-6">
                        <p className="text-xs font-black uppercase tracking-widest text-red-400 mb-4">
                            😩 {t("beforeTitle")}
                        </p>
                        {beforeRows.map((row, i) => (
                            <CompareRow key={row.label} row={row} delay={i * 0.1} />
                        ))}
                        <p className="text-xs text-red-400/70 text-center mt-4 font-medium">
                            {t("beforeStat")}
                        </p>
                    </div>

                    {/* AFTER */}
                    <div className="rounded-2xl border border-yellow-500/20 bg-zinc-900/60 p-6">
                        <p className="text-xs font-black uppercase tracking-widest text-yellow-400 mb-4">
                            ✅ {t("afterTitle")}
                        </p>
                        {afterRows.map((row, i) => (
                            <CompareRow key={row.label} row={row} delay={i * 0.1 + 0.3} />
                        ))}
                        <p className="text-xs text-green-400/70 text-center mt-4 font-medium">
                            {t("afterStat")}
                        </p>
                    </div>
                </div>

                <p className="text-center text-sm text-zinc-500 italic mt-8">
                    {t("note")}
                </p>
            </div>
        </section>
    );
}
