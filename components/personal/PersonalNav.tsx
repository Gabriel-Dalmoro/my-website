import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PersonalNav() {
    return (
        <nav className="flex items-center justify-between p-6 bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b border-border/40">
            <Link
                href="/"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Professional Site
            </Link>

            {/* Optional: You can keep some simple links here like 'Journal', 'Photos' if you have them */}
            <div className="flex gap-4">
                {/* <Link href="/adventures" className="text-sm font-medium hover:underline">Journal</Link> */}
            </div>
        </nav>
    );
}
