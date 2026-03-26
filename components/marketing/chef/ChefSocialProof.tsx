"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

function StatCounter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
    const [count, setCount] = useState(0);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!inView || hasAnimated.current) return;
        hasAnimated.current = true;
        const duration = 1800;
        const start = Date.now();
        const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
            else setCount(target);
        };
        requestAnimationFrame(tick);
    }, [inView, target]);

    return (
        <span className="text-5xl font-black text-yellow-400 tabular-nums">
            {count}{suffix}
        </span>
    );
}

export default function ChefSocialProof() {
    const t = useTranslations("Chef.SocialProof");
    const ref = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true); },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const stats = [
        { target: 520, suffix: "+", label: t("stat0label") },
        { target: 10, suffix: "+", label: t("stat1label") },
        { target: 100, suffix: "%", label: t("stat2label") },
    ];

    return (
        <section className="border-y border-zinc-800 bg-zinc-950 py-10">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 mb-8">
                    {t("label")}
                </p>
                <div ref={ref} className="grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
                    {stats.map((stat) => (
                        <div key={stat.label} className="flex flex-col items-center gap-1">
                            <StatCounter target={stat.target} suffix={stat.suffix} inView={inView} />
                            <span className="text-sm text-zinc-400">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
