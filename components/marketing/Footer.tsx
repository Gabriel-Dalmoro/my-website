import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-border py-12">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row lg:px-8">
                <div className="flex gap-6">
                    <Link href="https://github.com/Gabriel-Dalmoro" target="_blank" className="text-muted-foreground hover:text-foreground">
                        <span className="sr-only">GitHub</span>
                        <Github className="h-6 w-6" />
                    </Link>
                    <Link href="https://www.linkedin.com/in/gabrieldalmoro/" target="_blank" className="text-muted-foreground hover:text-foreground">
                        <span className="sr-only">LinkedIn</span>
                        <Linkedin className="h-6 w-6" />
                    </Link>
                </div>
                <div className="text-center md:text-right">
                    <p className="text-sm leading-6 text-muted-foreground">
                        &copy; {new Date().getFullYear()} Gabriel Dalmoro. All rights reserved.
                    </p>
                    <Link href="/adventures" className="mt-2 block text-sm font-semibold text-primary hover:underline">
                        Looking for Gabriel the person? Read my Travel & Philosophy Journal &rarr;
                    </Link>
                </div>
            </div>
        </footer>
    );
}
