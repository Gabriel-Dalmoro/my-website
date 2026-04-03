import { useTranslations } from "next-intl";
import {
    CalendarCheck,
    Mail,
    MessageCircle,
    FileText,
    LayoutGrid,
    Database,
    CreditCard,
    Bell,
    ClipboardEdit,
    PenLine,
    Video,
    Stethoscope,
    UserCheck,
    Activity,
} from "lucide-react";

const tools = [
    { name: "Practice Better", icon: Stethoscope },
    { name: "Jane App", icon: CalendarCheck },
    { name: "Cliniko", icon: Activity },
    { name: "SimplePractice", icon: UserCheck },
    { name: "Acuity", icon: CalendarCheck },
    { name: "Google Calendar", icon: CalendarCheck },
    { name: "Gmail", icon: Mail },
    { name: "WhatsApp", icon: MessageCircle },
    { name: "Stripe", icon: CreditCard },
    { name: "Typeform", icon: ClipboardEdit },
    { name: "Google Forms", icon: FileText },
    { name: "Reminders", icon: Bell },
    { name: "Telehealth", icon: Video },
    { name: "Google Sheets", icon: LayoutGrid },
    { name: "Notion", icon: Database },
    { name: "Paper Forms", icon: PenLine },
];

export default function ClinicToolsStrip() {
    const t = useTranslations("Clinic.Tools");

    return (
        <section className="py-10 border-y border-border/40 bg-card/50 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="text-center mb-8">
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                        {t("label")}
                    </p>
                </div>

                <div
                    className="relative flex w-full overflow-hidden group"
                    style={{
                        maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                        WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                    }}
                >
                    <div className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-16 group-hover:[animation-play-state:paused]">
                        {tools.map((tool, index) => (
                            <div
                                key={`${tool.name}-${index}`}
                                className="flex items-center gap-2 opacity-60 grayscale transition-all duration-300 hover:grayscale-0 hover:opacity-100 cursor-default"
                            >
                                <tool.icon className="h-5 w-5" strokeWidth={1.5} />
                                <span className="text-lg font-bold font-sans whitespace-nowrap">{tool.name}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-16 ml-16 group-hover:[animation-play-state:paused]">
                        {tools.map((tool, index) => (
                            <div
                                key={`${tool.name}-duplicate-${index}`}
                                className="flex items-center gap-2 opacity-60 grayscale transition-all duration-300 hover:grayscale-0 hover:opacity-100 cursor-default"
                            >
                                <tool.icon className="h-5 w-5" strokeWidth={1.5} />
                                <span className="text-lg font-bold font-sans whitespace-nowrap">{tool.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
