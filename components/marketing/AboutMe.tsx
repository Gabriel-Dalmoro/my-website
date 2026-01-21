import { useTranslations } from "next-intl";
import Image from "next/image";

export default function AboutMe() {
    const t = useTranslations("AboutMe");

    return (
        <div className="bg-zinc-900/30 py-16 sm:py-24 border-y border-zinc-900">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-16 items-center">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-yellow-500">
                            {t("headline")}
                        </h2>
                        <p className="mt-6 text-xl leading-8 text-zinc-300">
                            {t("description")}
                        </p>
                    </div>
                    <div className="relative aspect-[3/4] w-full max-w-xs mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-zinc-800">
                        <Image
                            src="/gabriel-final.jpg"
                            alt="Gabriel Dalmoro"
                            fill
                            className="object-cover object-top scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        {/* Subtle overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
