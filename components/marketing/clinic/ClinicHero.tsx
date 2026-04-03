import Link from "next/link";
import { PulsatingButton } from "@/components/ui/pulsating-button";
import DotGrid from "@/components/DotGrid";
import TextType from "@/components/TextType";
import { useTranslations } from "next-intl";

export default function ClinicHero() {
    const t = useTranslations("Clinic.Hero");

    return (
        <section className="relative flex flex-col items-center justify-center pt-24 pb-20 text-center overflow-hidden">
            {/* DotGrid Background */}
            <div className="absolute inset-0 -z-20">
                <DotGrid baseColor="#333" style={{}} />
            </div>

            {/* Warm Amber Glow — two overlapping blobs */}
            <div className="absolute top-1/2 left-1/2 -z-10 h-[350px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[100px]" />
            <div className="absolute top-1/2 left-1/2 -z-10 h-[250px] w-[350px] -translate-x-[40%] -translate-y-[60%] rounded-full bg-orange-500/8 blur-[80px]" />

            <div className="relative z-10 flex flex-col items-center px-6 lg:px-8">
                {/* Niche badge */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1.5 text-sm font-medium text-yellow-400">
                    <span>🏥</span>
                    <span>{t("badge")}</span>
                </div>

                {/* The Hook */}
                <h1 className="text-5xl font-extrabold leading-tight text-white md:text-7xl">
                    {t("hook")}
                </h1>

                {/* The Solution */}
                <div className="mt-4 min-h-[120px] sm:min-h-[60px] text-2xl font-medium text-zinc-400 md:text-4xl">
                    <TextType
                        text={[t("solution")]}
                        showCursor={true}
                        cursorCharacter="|"
                        variableSpeed={undefined}
                        onSentenceComplete={undefined}
                    />
                </div>

                <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-400">
                    {t("description")}
                </p>
            </div>

            <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link href="/contact">
                    <PulsatingButton className="px-8 py-3 text-lg font-bold" pulseColor="#EAB308">
                        {t("cta")}
                    </PulsatingButton>
                </Link>
            </div>
        </section>
    );
}
