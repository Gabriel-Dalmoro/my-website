import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";


export default function Footer() {
    return (
        <footer className="py-10 border-t border-border/40 bg-zinc-950/50">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 lg:px-8 sm:flex-row">
                <div className="flex items-center gap-3">
                    <img src="/favicon.png" alt="GD" className="w-6 h-6 rounded-md opacity-80" />
                    <p className="text-sm leading-5 text-zinc-400">
                        &copy; {new Date().getFullYear()} Gabriel Dalmoro. All rights reserved.
                    </p>
                </div>
                <div className="flex items-center gap-6">
                    <Link href="/blog" className="text-sm font-semibold leading-6 text-zinc-400 hover:text-white transition-colors">
                        Blog <span aria-hidden="true">&rarr;</span>
                    </Link>
                    <LanguageSwitcher variant="full" />
                </div>
            </div>
        </footer>
    );
}
