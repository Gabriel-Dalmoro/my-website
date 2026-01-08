import BrowserFrame from "@/components/marketing/BrowserFrame";
import { useTranslations } from "next-intl";

const projects = [
    {
        title: "AI Hiring Assistant (n8n + GPT-4)",
        description: "A fully autonomous agent that scores resumes against job descriptions.",
        // Placeholder video ID, replace with actual
        videoUrl: "https://www.loom.com/embed/placeholder1",
    },
    {
        title: "VisionSort Dashboard",
        description: "Real-time complex data visualization in Next.js.",
        // Placeholder video ID, replace with actual
        videoUrl: "https://www.loom.com/embed/placeholder2",
    },
];

export default function LoomGrid() {
    const t = useTranslations("FeaturedWork");

    return (
        <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
                        {t("headline")}
                    </h2>
                    <p className="mt-2 text-lg leading-8 text-zinc-400">
                        {t("subheadline")}
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {projects.map((project) => (
                        <div key={project.title} className="flex flex-col gap-4">
                            <BrowserFrame>
                                <div className="relative aspect-video w-full bg-muted">
                                    {/* 
                                        Note: For a real Loom embed, you'd typically use an iframe or their SDK.
                                        Using a simple iframe here for demonstration.
                                     */}
                                    <iframe
                                        src={project.videoUrl}
                                        allowFullScreen
                                        className="absolute top-0 left-0 w-full h-full"
                                        title={project.title}
                                    ></iframe>
                                </div>
                            </BrowserFrame>
                            <div>
                                <h3 className="text-lg font-semibold">{project.title}</h3>
                                <p className="text-muted-foreground">{project.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
