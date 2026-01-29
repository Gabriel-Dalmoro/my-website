"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { User, Calendar, CreditCard, Users, Database, Zap } from "lucide-react";
import Image from "next/image";

const Circle = forwardRef<
    HTMLDivElement,
    { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "z-10 flex items-center justify-center rounded-full border-2 border-zinc-800 bg-zinc-900 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
                className
            )}
        >
            {children}
        </div>
    );
});

Circle.displayName = "Circle";

export function MiniIntegrationsBeam({
    className,
}: {
    className?: string;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const div1Ref = useRef<HTMLDivElement>(null);
    const div2Ref = useRef<HTMLDivElement>(null);
    const div3Ref = useRef<HTMLDivElement>(null);
    const div4Ref = useRef<HTMLDivElement>(null);
    const div6Ref = useRef<HTMLDivElement>(null); // Central Hub
    const div7Ref = useRef<HTMLDivElement>(null); // User

    return (
        <div
            className={cn(
                "relative flex h-[160px] w-full items-center justify-center overflow-hidden",
                className
            )}
            ref={containerRef}
        >
            <div className="flex size-full flex-row items-center justify-between gap-2 px-2">

                {/* Left: Tools - Inputs */}
                <div className="flex flex-col justify-center gap-3 z-20">
                    <Circle ref={div1Ref} className="size-8 p-1.5 border-white/5 bg-zinc-800 text-blue-400">
                        <Users className="w-full h-full" />
                    </Circle>
                    <Circle ref={div2Ref} className="size-8 p-1.5 border-white/5 bg-zinc-800 text-green-400">
                        <CreditCard className="w-full h-full" />
                    </Circle>
                    <Circle ref={div3Ref} className="size-8 p-1.5 border-white/5 bg-zinc-800 text-orange-400">
                        <Calendar className="w-full h-full" />
                    </Circle>
                    <Circle ref={div4Ref} className="size-8 p-1.5 border-white/5 bg-zinc-800 text-purple-400">
                        <Database className="w-full h-full" />
                    </Circle>
                </div>

                {/* Center: My Logo - Hub */}
                <div className="flex flex-col justify-center relative z-20 px-4">
                    <Circle ref={div6Ref} className="size-14 border-2 border-primary bg-zinc-950 p-2 shadow-[0_0_30px_-5px_rgba(234,179,8,0.3)]">
                        <Image
                            src="/favicon.png"
                            alt="GD Logo"
                            width={40}
                            height={40}
                            className="w-full h-full object-contain rounded-full opacity-90"
                        />
                    </Circle>
                </div>

                {/* Right: User - Destination */}
                <div className="flex flex-col justify-center z-20">
                    <Circle ref={div7Ref} className="size-10 border-zinc-700 bg-zinc-800 p-2 shadow-lg">
                        <User className="w-full h-full text-zinc-300" />
                    </Circle>
                </div>
            </div>

            {/* Beams: Tools (Left) -> Hub (Center) */}
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div1Ref}
                toRef={div6Ref}
                duration={3}
                pathColor="rgba(234,179,8,0.2)"
                gradientStartColor="#EAB308"
                gradientStopColor="#FACC15"
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div2Ref}
                toRef={div6Ref}
                duration={3}
                delay={0.5}
                pathColor="rgba(234,179,8,0.2)"
                gradientStartColor="#EAB308"
                gradientStopColor="#FACC15"
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div3Ref}
                toRef={div6Ref}
                duration={3}
                delay={1}
                pathColor="rgba(234,179,8,0.2)"
                gradientStartColor="#EAB308"
                gradientStopColor="#FACC15"
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div4Ref}
                toRef={div6Ref}
                duration={3}
                delay={1.5}
                pathColor="rgba(234,179,8,0.2)"
                gradientStartColor="#EAB308"
                gradientStopColor="#FACC15"
            />

            {/* Beam: Hub (Center) -> User (Right) */}
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div6Ref}
                toRef={div7Ref}
                duration={3}
                pathColor="rgba(234,179,8,0.2)"
                gradientStartColor="#EAB308"
                gradientStopColor="#FFFFFF"
            />
        </div>
    );
}
