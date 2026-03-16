import { CalendarCheck, Receipt, ClipboardList } from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";
import ShinyText from "@/components/ui/ShinyText";
import { useTranslations } from "next-intl";

export default function ChefServices() {
    const t = useTranslations("Chef.Services");

    const services = [
        {
            icon: CalendarCheck,
            name: t("card0name"),
            description: t("card0description"),
        },
        {
            icon: Receipt,
            name: t("card1name"),
            description: t("card1description"),
        },
        {
            icon: ClipboardList,
            name: t("card2name"),
            description: t("card2description"),
        },
    ];

    return (
        <div className="pb-12 sm:pb-16 bg-zinc-950">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-base font-semibold leading-7 text-green-500 uppercase tracking-wide">
                        {t("label")}
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        <ShinyText
                            text={t("headline")}
                            disabled={false}
                            speed={3}
                            className=""
                            color="#ffffff"
                            shineColor="#EAB308"
                        />
                    </h2>
                    <p className="mt-6 text-xl leading-8 text-zinc-400">
                        {t("subheadline")}
                    </p>
                </div>

                <div className="mx-auto mt-10 max-w-2xl sm:mt-12 lg:mt-16 lg:max-w-none">
                    <dl className="mx-auto grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3">
                        {services.map((service, index) => (
                            <SpotlightCard
                                key={index}
                                spotlightColor="rgba(234, 179, 8, 0.25)"
                                className="bg-zinc-900/50 border-zinc-800 flex flex-col rounded-2xl border p-6 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <dt className="flex items-center gap-x-3 text-lg font-bold leading-7 text-white">
                                    <service.icon
                                        className="h-8 w-8 flex-none text-yellow-500"
                                        aria-hidden="true"
                                    />
                                    {service.name}
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-zinc-400">
                                    <p className="flex-auto">{service.description}</p>
                                </dd>
                            </SpotlightCard>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
}
