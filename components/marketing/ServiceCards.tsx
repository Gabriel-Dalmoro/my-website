import { Bot, LineChart, Workflow } from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";

const features = [
    {
        name: "AI Recruiting Agents",
        description: "Automated candidate screening and scoring.",
        icon: Bot,
    },
    {
        name: "Business Dashboards",
        description: "Real-time data visualization (VisionSort).",
        icon: LineChart, // Or appropriate icon
    },
    {
        name: "Custom Workflows",
        description: "Connecting your APIs to LLMs for automated operations.",
        icon: Workflow,
    },
];

export default function ServiceCards() {
    return (
        <div className="py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What I Build</h2>
                    <p className="mt-2 text-lg leading-8 text-muted-foreground">
                        Scalable, automated solutions to replace manual operational drag.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        {features.map((feature) => (
                            <SpotlightCard
                                key={feature.name}
                                spotlightColor="rgba(234, 179, 8, 0.25)"
                                className="bg-zinc-900/50 border-zinc-800 flex flex-col rounded-2xl border p-6 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                                    <feature.icon className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                                    {feature.name}
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                                    <p className="flex-auto">{feature.description}</p>
                                </dd>
                            </SpotlightCard>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
}
