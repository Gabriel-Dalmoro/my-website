import { useTranslations } from "next-intl";

export default function Testimonials() {
    const t = useTranslations("SocialProof");

    return (
        <div className="py-24 bg-zinc-950/50 border-y border-zinc-900">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-yellow-500">
                        {t("headline")}
                    </h2>
                </div>
                <div className="mx-auto mt-16 max-w-4xl">
                    <figure className="rounded-3xl bg-zinc-900/50 p-8 sm:p-10 text-center ring-1 ring-zinc-800 shadow-xl">
                        <blockquote className="text-xl font-medium leading-9 text-zinc-300 sm:text-2xl sm:leading-10">
                            <p>“{t("testimonials.0.body")}”</p>
                        </blockquote>
                        <figcaption className="mt-10 flex items-center justify-center gap-x-6">
                            <div className="h-14 w-14 overflow-hidden rounded-full bg-zinc-800">
                                {/* Placeholder for Zach's image if available, otherwise generic or initials */}
                                <div className="flex h-full w-full items-center justify-center bg-zinc-700 text-xl font-bold text-zinc-400">
                                    ZH
                                </div>
                            </div>
                            <div className="text-left">
                                <div className="font-semibold text-white text-lg">{t("testimonials.0.author")}</div>
                                <div className="text-zinc-500">{t("testimonials.0.role")}</div>
                            </div>
                        </figcaption>
                    </figure>
                </div>
            </div>
        </div>
    );
}
