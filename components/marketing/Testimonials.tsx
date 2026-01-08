import { useTranslations } from "next-intl";

export default function Testimonials() {
    const t = useTranslations("SocialProof");

    return (
        <div className="py-16 bg-zinc-950/50 border-y border-zinc-900">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-xl text-center">
                    <h2 className="text-lg font-semibold leading-8 tracking-tight text-yellow-500">
                        {t("headline")}
                    </h2>
                </div>
                <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-zinc-400 sm:mt-16 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-2">

                    {/* Testimonial 0 */}
                    <figure className="rounded-2xl bg-zinc-900/50 p-6 ring-1 ring-zinc-800">
                        <blockquote className="text-zinc-300">
                            <p>“{t("testimonials.0.body")}”</p>
                        </blockquote>
                        <figcaption className="mt-6 flex items-center gap-x-4">
                            <img
                                className="h-10 w-10 rounded-full bg-zinc-800"
                                src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                            />
                            <div>
                                <div className="font-semibold text-white">{t("testimonials.0.author")}</div>
                                <div className="text-zinc-500">{t("testimonials.0.role")}</div>
                            </div>
                        </figcaption>
                    </figure>

                    {/* Testimonial 1 */}
                    <figure className="rounded-2xl bg-zinc-900/50 p-6 ring-1 ring-zinc-800">
                        <blockquote className="text-zinc-300">
                            <p>“{t("testimonials.1.body")}”</p>
                        </blockquote>
                        <figcaption className="mt-6 flex items-center gap-x-4">
                            <img
                                className="h-10 w-10 rounded-full bg-zinc-800"
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                            />
                            <div>
                                <div className="font-semibold text-white">{t("testimonials.1.author")}</div>
                                <div className="text-zinc-500">{t("testimonials.1.role")}</div>
                            </div>
                        </figcaption>
                    </figure>

                </div>
            </div>
        </div>
    );
}
