import { useTranslations } from "next-intl";

export default function AboutMe() {
    const t = useTranslations("AboutMe");

    return (
        <div className="bg-zinc-900/30 py-24 sm:py-32 border-y border-zinc-900">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        {t("headline")}
                    </h2>
                    <p className="mt-6 text-xl leading-8 text-zinc-300">
                        {t("description")}
                    </p>
                </div>
            </div>
        </div>
    );
}
