"use client";

import Image from "next/image";
import StarBorder from "@/components/ui/StarBorder";
import { Quote } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ChefTestimonial() {
    const t = useTranslations("Chef.Testimonial");

    const body = t.rich("body", {
        bold: (chunks) => (
            <strong className="text-white font-bold underline decoration-yellow-500/60 decoration-2 underline-offset-2">
                {chunks}
            </strong>
        ),
    });

    return (
        <section className="py-20 bg-zinc-950 border-y border-zinc-900">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        {t("headline")}
                    </h2>
                </div>

                <div className="mx-auto max-w-3xl">
                    <StarBorder as="div" className="w-full rounded-3xl bg-zinc-950 overflow-hidden" color="#EAB308" speed="4s">
                        <div className="bg-zinc-900 p-8 sm:p-12 rounded-3xl relative">
                            {/* Decorative Quote Icon */}
                            <div className="absolute top-6 left-6 text-zinc-800 pointer-events-none">
                                <Quote className="w-10 h-10 sm:w-12 sm:h-12 opacity-50" />
                            </div>

                            <figure className="text-center flex flex-col items-center justify-center pt-4">
                                <blockquote className="text-xl sm:text-2xl font-medium leading-relaxed text-zinc-300 max-w-2xl mx-auto">
                                    <p>"{body}"</p>
                                </blockquote>

                                <figcaption className="mt-8 flex flex-col items-center gap-4">
                                    <div className="flex items-center justify-center gap-x-4">
                                        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-zinc-800 ring-2 ring-yellow-500/20 shrink-0">
                                            <Image
                                                src="/avatar_female.png"
                                                alt={t("author")}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="text-left">
                                            <div className="font-semibold text-white text-base">
                                                {t("author")}
                                            </div>
                                            <div className="text-sm text-zinc-500">
                                                {t("role")}
                                            </div>
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
