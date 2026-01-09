"use client";

import { useTranslations } from "next-intl";
import { ComposableMap, Geographies, Geography, Marker, Annotation } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Coordinates: [Longitude, Latitude]
const markers = [
    { name: "canada", coordinates: [-114.0719, 51.0447], labelOffset: [0, -40] }, // Calgary - moved up further
    { name: "brazil", coordinates: [-48.5495, -27.5969], labelOffset: [50, 0] },  // Florianópolis - moved right further
    { name: "france", coordinates: [6.1294, 45.8992], labelOffset: [40, -30] },   // Annecy - slightly adjusted
];

export default function GlobalReach() {
    const t = useTranslations("GlobalReach");

    return (
        <div className="py-16 sm:py-24 overflow-hidden bg-zinc-950">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-10">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-yellow-500">
                        {t("headline")}
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-zinc-400">
                        {t("description")}
                    </p>
                </div>

                <div className="relative w-full aspect-[2/1] max-w-5xl mx-auto rounded-3xl bg-zinc-900/20 border border-zinc-800/50 shadow-2xl overflow-hidden">
                    <ComposableMap
                        projection="geoMercator"
                        projectionConfig={{
                            scale: 220,
                            center: [-20, 25] // Focused on the Atlantic corridor (Americas <> Europe)
                        }}
                        className="w-full h-full"
                    >
                        <Geographies geography={geoUrl}>
                            {({ geographies }: { geographies: any[] }) =>
                                geographies.map((geo: any) => (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill="#27272a" // zinc-800
                                        stroke="#3f3f46" // zinc-700
                                        strokeWidth={0.5}
                                        style={{
                                            default: { outline: "none" },
                                            hover: { fill: "#3f3f46", outline: "none" },
                                            pressed: { outline: "none" },
                                        }}
                                    />
                                ))
                            }
                        </Geographies>

                        {markers.map(({ name, coordinates, labelOffset }) => (
                            <Marker key={name} coordinates={coordinates as [number, number]}>
                                {/* Glowing Effect */}
                                <circle r={8} fill="#EAB308" opacity="0.3" className="animate-ping" />
                                {/* Pin Point */}
                                <circle r={3} fill="#EAB308" />

                                {/* Country Label */}
                                <text
                                    textAnchor="middle"
                                    y={labelOffset[1]}
                                    x={labelOffset[0]}
                                    className="text-[32px] sm:text-[18px] font-bold uppercase tracking-wider fill-zinc-200"
                                    style={{ fontFamily: "system-ui", textShadow: "0px 2px 4px rgba(0,0,0,0.8)" }}
                                >
                                    {t(`locations.${name}`)}
                                </text>
                            </Marker>
                        ))}
                    </ComposableMap>

                    {/* Subtle overlay gradient to blend edges if map cuts off */}
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(transparent_50%,#09090b_100%)]"></div>
                </div>

                {/* Languages - Minimalist Badges */}
                <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                    {[
                        { code: "en", label: t("languages.en") },
                        { code: "pt", label: t("languages.pt") },
                        { code: "fr", label: t("languages.fr") },
                        { code: "es", label: t("languages.es") },
                    ].map((lang) => (
                        <div
                            key={lang.code}
                            className="px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-sm font-medium text-zinc-300 hover:border-yellow-500/50 hover:text-white transition-colors cursor-default"
                        >
                            {lang.label}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
