"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import Image from "next/image";
import { User } from "lucide-react";

// Logos
const Logos = {
    gmail: () => (
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
            <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"></path><path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"></path><polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"></polygon><path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"></path><path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"></path>
        </svg>
    ),
    sheets: () => (
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
            <path fill="#43a047" d="M37,45H11c-1.657,0-3-1.343-3-3V6c0-1.657,1.343-3,3-3h19l10,10v29C40,43.657,38.657,45,37,45z"></path><path fill="#c8e6c9" d="M40 13L30 13 30 3z"></path><path fill="#2e7d32" d="M30 13L40 23 40 13z"></path><path fill="#e8f5e9" d="M31,23H17h-2v2v2v2v2v2v2v2h18v-2v-2v-2v-2v-2v-2v-2H31z M17,25h4v2h-4V25z M17,29h4v2h-4V29z M17,33h4v2h-4V33z M31,35h-8v-2h8V35z M31,31h-8v-2h8V31z M31,27h-8v-2h8V27z"></path>
        </svg>
    ),
    calendar: () => (
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
            <rect width="22" height="22" x="13" y="13" fill="#fff"></rect><polygon fill="#1e88e5" points="25.68,20.92 26.688,22.36 28.272,21.208 28.272,29.56 30,29.56 30,18.616 28.56,18.616"></polygon><path fill="#1e88e5" d="M22.943,23.745c0.625-0.574,1.013-1.37,1.013-2.249c0-1.747-1.533-3.168-3.417-3.168 c-1.602,0-2.972,1.009-3.33,2.453l1.657,0.421c0.165-0.664,0.868-1.146,1.673-1.146c0.942,0,1.709,0.646,1.709,1.44 c0,0.794-0.767,1.44-1.709,1.44h-0.997v1.728h0.997c1.081,0,1.993,0.751,1.993,1.64c0,0.904-0.866,1.64-1.931,1.64 c-0.962,0-1.784-0.61-1.914-1.418L17,26.802c0.262,1.636,1.81,2.87,3.6,2.87c2.007,0,3.64-1.511,3.64-3.368 C24.24,25.281,23.736,24.363,22.943,23.745z"></path><polygon fill="#fbc02d" points="34,42 14,42 13,38 14,34 34,34 35,38"></polygon><polygon fill="#4caf50" points="38,35 42,34 42,14 38,13 34,14 34,34"></polygon><path fill="#1e88e5" d="M34,14l1-4l-1-4H9C7.343,6,6,7.343,6,9v25l4,1l4-1V14H34z"></path><polygon fill="#e53935" points="34,34 34,42 42,34"></polygon><path fill="#1565c0" d="M39,6h-5v8h8V9C42,7.343,40.657,6,39,6z"></path><path fill="#1565c0" d="M9,42h5v-8H6v5C6,40.657,7.343,42,9,42z"></path>
        </svg>
    ),
    stripe: () => (
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
            <path fill="#03A9F4" d="M41.765,38H6.235C4.439,38,3,36.63,3,34.848v-22.62C3,10.445,4.439,9,6.235,9h35.529C43.56,9,45,10.445,45,12.228v22.62C45,36.63,43.56,38,41.765,38z"></path><path fill="#FFF" d="M36.847,23.277c0.069-1.101,0.354-1.613,0.926-1.613c0.548,0,0.848,0.527,0.886,1.613H36.847z M40.953,23.935c0-1.23-0.27-2.203-0.781-2.885c-0.54-0.697-1.346-1.05-2.359-1.05c-2.088,0-3.396,1.546-3.396,4.022c0,1.384,0.345,2.427,1.038,3.085C36.072,27.702,36.958,28,38.085,28c1.047,0,2.017-0.251,2.632-0.655l-0.268-1.688c-0.607,0.331-1.31,0.511-2.095,0.511c-0.47,0-0.806-0.103-1.044-0.308c-0.262-0.219-0.408-0.572-0.46-1.076h4.068C40.944,24.669,40.953,24.106,40.953,23.935z M31.057,25.533c-0.221,0.377-0.531,0.58-0.89,0.58c-0.241,0-0.472-0.053-0.669-0.147v-3.718c0.428-0.441,0.814-0.491,0.942-0.491c0.631,0,0.941,0.681,0.941,2.017C31.384,24.534,31.269,25.126,31.057,25.533z M33.113,20.709c-0.438-0.571-1.059-0.853-1.845-0.853c-0.712,0-1.343,0.302-1.934,0.936l-0.142-0.784H27V31l2.481-0.416l0.017-2.799c0.387,0.121,0.779,0.185,1.131,0.185c0.627,0,1.53-0.157,2.235-0.926c0.667-0.73,0.996-1.862,0.996-3.361C33.86,22.358,33.615,21.353,33.113,20.709z M23.527,20.008H26V28h-2.473V20.008z M24.784,19.233c0.718,0,1.3-0.594,1.3-1.313c0-0.733-0.584-1.32-1.3-1.32c-0.738,0-1.323,0.587-1.323,1.32C23.461,18.64,24.046,19.233,24.784,19.233z M22.463,19.9c-0.705,0-1.279,0.372-1.491,1.031l-0.15-0.921h-2.17V28h2.482v-5.25c0.312-0.382,0.749-0.52,1.362-0.52c0.127,0,0.256,0,0.438,0.026v-2.294C22.751,19.921,22.6,19.9,22.463,19.9z M17.68,21.855l0.308-1.848h-1.601v-2.245l-2.129,0.354l-0.309,1.891L13.2,20.13l-0.277,1.726h1.024v3.622c0,0.941,0.238,1.599,0.72,1.998c0.421,0.335,1.011,0.493,1.843,0.493c0.654,0,1.043-0.112,1.297-0.184v-1.959c-0.133,0.041-0.48,0.115-0.716,0.115c-0.48,0-0.705-0.25-0.705-0.825v-3.265h1.294V21.855z M10.531,23.05c-0.707-0.265-1.118-0.473-1.118-0.803c0-0.275,0.229-0.434,0.646-0.434c0.737,0,1.509,0.281,2.023,0.544l0.3-1.829C11.964,20.326,11.113,20,9.94,20c-0.84,0-1.535,0.22-2.014,0.621c-0.532,0.429-0.802,1.043-0.802,1.786c0,1.347,0.824,1.918,2.166,2.402c0.857,0.308,1.154,0.527,1.154,0.868c0,0.322-0.274,0.514-0.795,0.514c-0.624,0-1.641-0.31-2.327-0.703l-0.282,1.853C7.616,27.663,8.676,28,9.788,28c0.887,0,1.622-0.21,2.102-0.606c0.568-0.432,0.844-1.077,0.844-1.905C12.736,24.106,11.891,23.531,10.531,23.05L10.531,23.05z"></path>
        </svg>
    ),
    invoice: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="18" height="16" rx="2" fill="#10B981" />
            <path d="M7 8H17" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M7 12H17" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M7 16H12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="16" cy="16" r="2" stroke="white" strokeWidth="1.5" />
            <path d="M16 15V17M15 16H17" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    )
};

const Circle = forwardRef<
    HTMLDivElement,
    { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "z-10 flex items-center justify-center rounded-full border-2 border-zinc-800 bg-zinc-900 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] hover:scale-110 transition-transform duration-200 hover:border-primary/50",
                className
            )}
        >
            {children}
        </div>
    );
});

Circle.displayName = "Circle";

export function IntegrationsBeam({
    className,
}: {
    className?: string;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const div1Ref = useRef<HTMLDivElement>(null);
    const div2Ref = useRef<HTMLDivElement>(null);
    const div3Ref = useRef<HTMLDivElement>(null);
    const div4Ref = useRef<HTMLDivElement>(null);
    const div5Ref = useRef<HTMLDivElement>(null);
    const div6Ref = useRef<HTMLDivElement>(null); // Central Logo
    const div7Ref = useRef<HTMLDivElement>(null); // User

    return (
        <div
            className={cn(
                "relative flex h-[350px] w-full items-center justify-center p-0 md:p-10",
                className
            )}
            ref={containerRef}
        >
            <div className="flex size-full flex-row items-center justify-between gap-2 sm:gap-12 max-w-4xl px-2 sm:px-4">

                {/* Left: Tools - Inputs */}
                <div className="flex flex-col justify-center gap-3 sm:gap-5 z-20">
                    <div className="flex items-center justify-center">
                        <Circle ref={div1Ref} className="size-10 sm:size-12 p-2 bg-white/5 border-white/10 hover:border-red-500/50 shadow-inner">
                            <Logos.gmail />
                        </Circle>
                    </div>
                    <div className="flex items-center justify-center">
                        <Circle ref={div2Ref} className="size-10 sm:size-12 p-2 bg-white/5 border-white/10 hover:border-green-500/50 shadow-inner">
                            <Logos.sheets />
                        </Circle>
                    </div>
                    <div className="flex items-center justify-center">
                        <Circle ref={div3Ref} className="size-10 sm:size-12 p-2 bg-white/5 border-white/10 hover:border-blue-500/50 shadow-inner">
                            <Logos.calendar />
                        </Circle>
                    </div>
                    <div className="flex items-center justify-center">
                        <Circle ref={div4Ref} className="size-10 sm:size-12 p-2 bg-white/5 border-white/10 hover:border-emerald-500/50 shadow-inner">
                            <Logos.invoice />
                        </Circle>
                    </div>
                    <div className="flex items-center justify-center">
                        <Circle ref={div5Ref} className="size-10 sm:size-12 p-2 bg-white/5 border-white/10 hover:border-indigo-500/50 shadow-inner">
                            <Logos.stripe />
                        </Circle>
                    </div>
                </div>

                {/* Center: My Logo - Hub */}
                <div className="flex flex-col justify-center relative z-20">
                    <Circle ref={div6Ref} className="size-20 sm:size-24 border-2 border-primary bg-zinc-950 p-3 sm:p-4 shadow-[0_0_50px_-5px_rgba(234,179,8,0.4)]">
                        <Image
                            src="/favicon.png"
                            alt="GD Logo"
                            width={80}
                            height={80}
                            className="w-full h-full object-contain rounded-lg"
                        />
                    </Circle>
                </div>

                {/* Right: User - Destination */}
                <div className="flex flex-col justify-center z-20">
                    <Circle ref={div7Ref} className="size-14 sm:size-16 border-2 border-zinc-700 bg-zinc-800 p-3 shadow-lg">
                        <User className="w-full h-full text-white" />
                    </Circle>
                </div>
            </div>

            {/* Beams: Tools (Left) -> Hub (Center) */}
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div1Ref}
                toRef={div6Ref}
                duration={3}
                pathColor="#EAB308"
                gradientStartColor="#EAB308"
                gradientStopColor="#FACC15"
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div2Ref}
                toRef={div6Ref}
                duration={3}
                pathColor="#EAB308"
                gradientStartColor="#EAB308"
                gradientStopColor="#FACC15"
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div3Ref}
                toRef={div6Ref}
                duration={3}
                pathColor="#EAB308"
                gradientStartColor="#EAB308"
                gradientStopColor="#FACC15"
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div4Ref}
                toRef={div6Ref}
                duration={3}
                pathColor="#EAB308"
                gradientStartColor="#EAB308"
                gradientStopColor="#FACC15"
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div5Ref}
                toRef={div6Ref}
                duration={3}
                pathColor="#EAB308"
                gradientStartColor="#EAB308"
                gradientStopColor="#FACC15"
            />

            {/* Beam: Hub (Center) -> User (Right) */}
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div6Ref}
                toRef={div7Ref}
                duration={3}
                pathColor="#EAB308"
                gradientStartColor="#EAB308"
                gradientStopColor="#FFFFFF"
            />
        </div>
    );
}
