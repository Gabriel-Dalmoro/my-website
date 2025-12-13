import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
    return (
        <section className="flex flex-col items-center justify-center py-24 text-center">
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
                Stop Trading Time for Money. I Build Autonomous AI Workflows for Your
                Business.
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Specializing in Next.js, n8n, and Python-based AI Agents.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button asChild size="lg" className="rounded-full">
                    <Link href="https://calendly.com/" target="_blank">
                        Book a 15-Min Automation Audit
                    </Link>
                </Button>
            </div>
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-10 dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)]"></div>
        </section>
    );
}
