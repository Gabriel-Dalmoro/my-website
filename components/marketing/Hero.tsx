import Link from "next/link";
import { Button } from "@/components/ui/button";
import DotGrid from "@/components/DotGrid";
import TextType from "@/components/TextType";
import { useTranslations } from "next-intl";

export default function Hero() {
    const t = useTranslations("Hero");

    return (
        <section className="relative flex flex-col items-center justify-center pt-24 pb-20 text-center overflow-hidden">
            {/* DotGrid Background */}
            <div className="absolute inset-0 -z-20">
                <DotGrid baseColor="#333" style={{}} />
            </div>

            {/* Ambient Glow - Centered behind text */}
            <div className="absolute top-1/2 left-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500/10 blur-[120px]"></div>

            <div className="relative z-10 flex flex-col items-center px-6 lg:px-8">
                {/* The Hook */}
                <h1 className="text-5xl font-extrabold leading-tight text-white md:text-7xl">
                    {t("hook")}
                </h1>

                {/* The Solution */}
                <div className="mt-4 min-h-[80px] sm:min-h-[60px] text-2xl font-medium text-zinc-400 md:text-4xl">
                    <TextType
                        text={[t("solution")]}
                        showCursor={true}
                        cursorCharacter="|"
                        variableSpeed={undefined}
                        onSentenceComplete={undefined}
                    />
                </div>

                <p className="mt-6 text-lg leading-8 text-zinc-400">
                    {t("description")}
                </p>
            </div>

            <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button asChild size="lg" className="rounded-full">
                    <Link href="https://calendly.com/" target="_blank">
                        {t("cta")}
                    </Link>
                </Button>
            </div>

            {/* Background decoration (Grid) - Kept subtle */}
            <div className="absolute inset-0 -z-20 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-5 dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)]"></div>
        </section>
    );
}
