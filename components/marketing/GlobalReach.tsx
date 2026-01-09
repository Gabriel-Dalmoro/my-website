"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Coordinates: [Longitude, Latitude]
const markers = [
    { name: "canada", coordinates: [-114.0719, 51.0447], labelOffset: [0, -40] }, // Calgary
    { name: "brazil", coordinates: [-48.5495, -27.5969], labelOffset: [50, 0] },  // Florianópolis
    { name: "france", coordinates: [6.1294, 45.8992], labelOffset: [40, -30] },   // Annecy
];

export default function GlobalReach() {
    const t = useTranslations("GlobalReach");
    const [activeLang, setActiveLang] = useState("en");

    const languageDemos: Record<string, { label: string; text: string }> = {
        en: { label: "English", text: "Because Google Translate isn't going to close that deal for you." },
        pt: { label: "Português", text: "Do 'jeitinho' à eficiência, sem perder a tradução." },
        fr: { label: "Français", text: "Aussi à l'aise avec Molière qu'avec le JavaScript." },
        es: { label: "Español", text: "Más que un 'Hola', hablo el idioma de los negocios." },
    };

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

                {/* Languages - Interactive Demo */}
                <div className="flex flex-col items-center mt-8 space-y-6">
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        {Object.entries(languageDemos).map(([code, { label }]) => (
                            <button
                                key={code}
                                onClick={() => setActiveLang(code)}
                                className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-all duration-300 ${activeLang === code
                                        ? "border-yellow-500 bg-yellow-500/10 text-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.2)]"
                                        : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    <div className="h-8 flex items-center justify-center">
                        <p
                            key={activeLang}
                            className="text-zinc-300 italic animate-in fade-in slide-in-from-bottom-2 duration-300"
                        >
                            "{languageDemos[activeLang].text}"
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
