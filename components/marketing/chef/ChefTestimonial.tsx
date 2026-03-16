"use client";

import Image from "next/image";
import StarBorder from "@/components/ui/StarBorder";
import { Quote } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ChefTestimonial() {
    const t = useTranslations("Chef.Testimonial");

    const body = t.rich("body", {
        bold: (chunks) => (
            <strong className="text-white font-bold underline decoration-amber-500/60 decoration-2 underline-offset-2">
                {chunks}
            </strong>
        ),
    });

    return (
        <section className="py-20 bg-zinc-950 border-y border-zinc-900">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-8">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        {t("headline")}
                    </h2>
                </div>

                {/* Handwritten pull quote using Caveat font */}
                <div className="text-center mb-8">
                    <p
                        className="text-4xl sm:text-5xl text-amber-400/80"
                        style={{ fontFamily: "var(--font-caveat)" }}
                    >
                        &ldquo;520+ hours back.&rdquo;
                    </p>
                </div>

                <div className="mx-auto max-w-3xl">
                    <StarBorder as="div" className="w-full rounded-3xl bg-zinc-950 overflow-hidden" color="#F59E0B" speed="4s">
                        <div className="bg-zinc-900 p-8 sm:p-12 rounded-3xl relative">
                            <div className="absolute top-6 left-6 text-zinc-800 pointer-events-none">
                                <Quote className="w-10 h-10 sm:w-12 sm:h-12 opacity-50" />
                            </div>

                            <figure className="text-center flex flex-col items-center justify-center pt-4">
                                <blockquote className="text-xl sm:text-2xl font-medium leading-relaxed text-zinc-300 max-w-2xl mx-auto">
                                    <p>&ldquo;{body}&rdquo;</p>
                                </blockquote>

                                <figcaption className="mt-8 flex flex-col items-center gap-4">
                                    <div className="flex items-center justify-center gap-x-4">
                                        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-zinc-800 ring-2 ring-amber-500/20 shrink-0">
                                            <Image
                                                src="/avatar_female.png"
                                                alt={t("author")}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="text-left">
                                            <div className="font-semibold text-white text-base">{t("author")}</div>
                                            <div className="text-sm text-zinc-500">{t("role")}</div>
                                        </div>
                                    </div>
                                </figcaption>
                            </figure>
                        </div>
                    </StarBorder>
                </div>
            </div>
        </section>
    );
}
