import { Bot, LineChart, Workflow } from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";
import { useTranslations } from "next-intl";

export default function ServiceCards() {
    const t = useTranslations("Services");

    const features = [
        {
            name: t("cards.recruiting.name"),
            description: t("cards.recruiting.description"),
            icon: Bot,
        },
        {
            name: t("cards.dashboards.name"),
            description: t("cards.dashboards.description"),
            icon: LineChart,
        },
        {
            name: t("cards.workflows.name"),
            description: t("cards.workflows.description"),
            icon: Workflow,
        },
    ];

    return (
        <div className="pb-24 sm:pb-32 bg-zinc-950">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-base font-semibold leading-7 text-yellow-500 uppercase tracking-wide">{t("label")}</p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        {t("headline")}
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-zinc-400">
                        {t("subheadline")}
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <SpotlightCard
                                key={index}
                                spotlightColor="rgba(234, 179, 8, 0.25)"
                                className="bg-zinc-900/50 border-zinc-800 flex flex-col rounded-2xl border p-6 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                                    <feature.icon className="h-5 w-5 flex-none text-yellow-500" aria-hidden="true" />
                                    {feature.name}
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-zinc-400">
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
