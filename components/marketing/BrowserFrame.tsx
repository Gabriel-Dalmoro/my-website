import { ReactNode } from "react";

interface BrowserFrameProps {
    children: ReactNode;
    className?: string;
}

export default function BrowserFrame({ children, className = "" }: BrowserFrameProps) {
    return (
        <div className={`overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl ${className}`}>
            {/* Header Bar */}
            <div className="flex h-10 items-center gap-2 border-b border-zinc-800 bg-zinc-900/50 px-4">
                {/* Traffic Lights */}
                <div className="h-3 w-3 rounded-full border border-red-500/50 bg-red-500/20"></div>
                <div className="h-3 w-3 rounded-full border border-yellow-500/50 bg-yellow-500/20"></div>
                <div className="h-3 w-3 rounded-full border border-green-500/50 bg-green-500/20"></div>
            </div>

            {/* Content Area */}
            <div className="relative bg-zinc-800/50">
                {children}
            </div>
        </div>
    );
}
