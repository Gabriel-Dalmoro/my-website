import PersonalNav from "@/components/personal/PersonalNav";

export default function PersonalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col bg-stone-50 dark:bg-stone-950 font-serif">
            {/* Using warmer background and serif font for 'Soul' page vibe if available, else falling back */}
            {/* Note: font-serif relies on Tailwind having a serif font configured, or browser default */}
            <PersonalNav />
            <main className="flex-grow container mx-auto px-4 py-8">
                {children}
            </main>

            {/* Reuse existing footer or a simpler one */}
            <footer className="py-8 text-center text-sm text-muted-foreground">
                <p>Gabriel Dalmoro &copy; {new Date().getFullYear()} - Personal Journal</p>
            </footer>
        </div>
    );
}
