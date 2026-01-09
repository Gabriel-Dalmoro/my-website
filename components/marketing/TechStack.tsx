import { useTranslations } from "next-intl";
import {
    CreditCard,
    Bot,
    Box,
    Terminal,
    Workflow,
    Sparkles,
    Zap,
    Layout,
    Code2,
    Database,
} from "lucide-react";

const technologies = [
    { name: "OpenAI", icon: Bot },
    { name: "Gemini", icon: Sparkles },
    { name: "Anthropic", icon: Bot }, // Using Bot as placeholder for Anthropic
    { name: "n8n", icon: Workflow },
    { name: "Notion", icon: Database },
    { name: "Zapier", icon: Zap },
    { name: "Next.js", icon: Box },
    { name: "Python", icon: Terminal },
    { name: "Stripe", icon: CreditCard },
    { name: "Vercel", icon: Layout },
    { name: "React", icon: Code2 },
];

export default function TechStack() {
    const t = useTranslations("TechStack");
    return (
        <section className="py-10 border-y border-border/40 bg-card/50 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="text-center mb-8">
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                        {t("headline")}
                    </p>
                </div>

                {/* Marquee Container */}
                <div
                    className="relative flex w-full overflow-hidden group"
                    style={{
                        maskImage:
                            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                        WebkitMaskImage:
                            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                    }}
                >
                    {/* Inner scrolling container */}
                    <div className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-16 group-hover:[animation-play-state:paused]">
                        {technologies.map((tech, index) => (
                            <div
                                key={`${tech.name}-${index}`}
                                className="flex items-center gap-2 opacity-60 grayscale transition-all duration-300 hover:grayscale-0 hover:opacity-100 cursor-default"
                            >
                                <tech.icon className="h-6 w-6" strokeWidth={1.5} />
                                <span className="text-xl font-bold font-sans">{tech.name}</span>
                            </div>
                        ))}
                    </div>

                    {/* Duplicate for seamless loop */}
                    <div className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-16 ml-16 group-hover:[animation-play-state:paused]">
                        {technologies.map((tech, index) => (
                            <div
                                key={`${tech.name}-duplicate-${index}`}
                                className="flex items-center gap-2 opacity-60 grayscale transition-all duration-300 hover:grayscale-0 hover:opacity-100 cursor-default"
                            >
                                <tech.icon className="h-6 w-6" strokeWidth={1.5} />
                                <span className="text-xl font-bold font-sans">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
