import { useTranslations } from "next-intl";

const locations = [
    { name: "canada", top: "25%", left: "22%" },
    { name: "brazil", top: "70%", left: "32%" },
    { name: "france", top: "32%", left: "49%" }, // Approximate coords for styled map
];

export default function GlobalReach() {
    const t = useTranslations("GlobalReach");

    return (
        <div className="py-24 sm:py-32 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        {t("headline")}
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-zinc-400">
                        {t("description")}
                    </p>
                </div>

                <div className="relative w-full aspect-[2/1] max-w-4xl mx-auto rounded-3xl bg-zinc-900/40 border border-zinc-800 shadow-2xl p-4">
                    {/* Abstract World Map SVG */}
                    <svg
                        viewBox="0 0 1000 500"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full opacity-30"
                    >
                        {/* Simple abstract representation of continents - keeping it ultra simple/minimal */}
                        <path d="M250,150 Q300,100 350,150 T400,200" stroke="#333" strokeWidth="2" fill="none" className="hidden" />
                        {/* Using a rough path for world outline or just relying on the pins to imply location if we don't have a complex path */}
                        {/* Let's try to simulate a very basic outline or grid */}
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#333" strokeWidth="0.5" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#grid)" />

                        {/* 
                            Since I cannot easily generate a high-fidelity map SVG code without it being huge, 
                            I will rely on the conceptual design: A grid background with clear labeled "Nodes" 
                            representing the connections. The user asked for a "simple map", but without a real SVG asset 
                            it looks broken. I will imply the map with the grid and positioned nodes.
                            
                            BETTER APPROACH: Use a simple dotted world map image or just CSS-positioned dots 
                            on a background that "implies" a map. 
                        */}
                    </svg>

                    {/* Actual Map Image Background - using a placeholder if we don't have an asset, 
                        BUT for this agent I'll create a nice CSS-only node network or just the dots 
                        if the background is too hard to conjure. 
                        
                        Let's place a subtle World Map SVG path if possible. 
                        I'll use a very simplified set of paths for the Americas/Europe.
                    */}

                    <div className="absolute inset-0">
                        {/* Simplified World outlines for context */}
                        <svg viewBox="0 0 1000 500" className="w-full h-full stroke-zinc-700/50 fill-none" strokeWidth="1.5">
                            {/* North America */}
                            <path d="M150,100 L250,80 L350,120 L300,200 L200,250 L100,200 Z" />
                            {/* South America */}
                            <path d="M280,300 L350,320 L320,450 L250,400 Z" />
                            {/* Europe/Africa */}
                            <path d="M450,120 L550,100 L600,250 L550,400 L450,300 Z" />
                        </svg>
                    </div>


                    {/* Location Pins */}
                    {locations.map((loc) => (
                        <div
                            key={loc.name}
                            className="absolute flex flex-col items-center"
                            style={{ top: loc.top, left: loc.left }}
                        >
                            <span className="relative flex h-4 w-4">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-4 w-4 bg-yellow-500"></span>
                            </span>
                            <span className="mt-2 text-xs font-semibold uppercase tracking-wider text-zinc-300 bg-zinc-950/80 px-2 py-1 rounded-full border border-zinc-800">
                                {t(`locations.${loc.name}`)}
                            </span>
                        </div>
                    ))}

                    {/* Connecting lines (optional, to show collaboration) */}
                    <svg className="absolute inset-0 pointer-events-none opacity-20">
                        <path d="M240,150 Q360,250 500,160" stroke="#EAB308" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                        <path d="M320,350 Q400,300 500,160" stroke="#EAB308" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                    </svg>

                </div>
            </div>
        </div>
    );
}
