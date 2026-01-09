import { useTranslations } from "next-intl";
import Image from "next/image";
import StarBorder from "@/components/ui/StarBorder";

export default function Testimonials() {
    const t = useTranslations("SocialProof");

    return (
        <div className="py-16 bg-zinc-950/50 border-y border-zinc-900">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-yellow-500 sm:text-3xl">
                        {t("headline")}
                    </h2>
                </div>
                <div className="mx-auto mt-10 max-w-4xl relative">
                    <StarBorder as="div" className="w-full rounded-3xl overflow-hidden bg-zinc-950" color="#EAB308" speed="4s">
                        <figure className="bg-zinc-900 p-8 sm:p-12 text-center shadow-2xl h-full w-full relative z-10">
                            <blockquote className="text-lg font-medium leading-8 text-zinc-300 sm:text-xl sm:leading-9">
                                <p>“{t("testimonials.0.body")}”</p>
                            </blockquote>
                            <figcaption className="mt-10 flex items-center justify-center gap-x-6">
                                <div className="h-14 w-14 overflow-hidden rounded-full bg-zinc-800 relative">
                                    <Image
                                        src="/avatar_male.png"
                                        alt={t("testimonials.0.author")}
                                        className="h-full w-full object-cover"
                                        width={56}
                                        height={56}
                                    />
                                </div>
                                <div className="text-left">
                                    <div className="font-semibold text-white text-lg">{t("testimonials.0.author")}</div>
                                    <div className="text-zinc-500">{t("testimonials.0.role")}</div>
                                </div>
                            </figcaption>
                        </figure>
                    </StarBorder>
                </div>
            </div>
        </div>
    );
}
