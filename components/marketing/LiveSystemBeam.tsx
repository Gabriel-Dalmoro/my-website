"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import Image from "next/image";
import { User, DollarSign, Megaphone, Target, BarChart3, Mail, FileText, Calendar, CreditCard } from "lucide-react";

// Tool Icons
const Icons = {
    // Operations
    gmail: Mail,
    sheets: FileText,
    calendar: Calendar,
    invoice: DollarSign,
    payment: CreditCard,

    // Marketing
    social: Megaphone,
    analytics: BarChart3,

    // Sales
    crm: Target,
};

const Circle = forwardRef<
    HTMLDivElement,
    { className?: string; children?: React.ReactNode; active?: boolean }
>(({ className, children, active }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "z-10 flex items-center justify-center rounded-full border-2 transition-all duration-500",
                active
                    ? "border-primary bg-zinc-900 shadow-[0_0_20px_-5px_rgba(234,179,8,0.5)] scale-110"
                    : "border-zinc-800 bg-zinc-900/50 opacity-40 grayscale scale-100",
                className
            )}
        >
            {children}
        </div>
    );
});

Circle.displayName = "Circle";

interface LiveSystemBeamProps {
    className?: string;
    activeCategory: "operations" | "marketing" | "sales";
}

export function LiveSystemBeam({
    className,
    activeCategory
}: LiveSystemBeamProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const div1Ref = useRef<HTMLDivElement>(null);
    const div2Ref = useRef<HTMLDivElement>(null);
    const div3Ref = useRef<HTMLDivElement>(null);
    const div4Ref = useRef<HTMLDivElement>(null);
    const div5Ref = useRef<HTMLDivElement>(null);
    const div6Ref = useRef<HTMLDivElement>(null); // Central Hub
    const div7Ref = useRef<HTMLDivElement>(null); // User

    // Define active tools based on category
    const isActive = (tools: string[]) => {
        const map = {
            operations: ["gmail", "sheets", "calendar", "invoice", "payment"],
            marketing: ["social", "analytics", "sheets"],
            sales: ["gmail", "crm", "calendar"]
        };
        return tools.some(t => map[activeCategory].includes(t));
    };

    // Tooltips content
    const getTooltip = (key: string) => {
        const tooltips: Record<string, string> = {
            gmail: "Sends Auto-Invoices & Follow-ups",
            sheets: "Syncs Data & Financials",
            calendar: "Manages Bookings 24/7",
            invoice: "Generates PDFs Instantly",
            payment: "Secures Stripe Payments",
            social: "Publishes Content across Channels",
            analytics: "Tracks Brand Performance",
            crm: "Scores & Qualifies Leads"
        };
        return tooltips[key] || "";
    };

    const ToolIcon = forwardRef<HTMLDivElement, { iconKey: string, IconComponent: any }>(
        ({ IconComponent }, ref) => (
            <div ref={ref} className="relative flex items-center justify-center z-20">
                <Circle className="size-8 sm:size-10 p-2 border-primary bg-zinc-900 shadow-[0_0_20px_-5px_rgba(234,179,8,0.5)] scale-110" active={true}>
                    <IconComponent className="w-full h-full text-white" />
                </Circle>
            </div>
        ));
    ToolIcon.displayName = "ToolIcon";

    return (
        <div
            className={cn(
                "relative flex h-full w-full items-center justify-center py-2 sm:py-4",
                className
            )}
            ref={containerRef}
        >
            <div className="flex size-full flex-row items-center justify-between gap-2 sm:gap-6 max-w-[280px] sm:max-w-md">

                {/* Left Column: Tools (Always shown) */}
                <div className="flex flex-col justify-center gap-2 z-20 p-2">
                    <div className="flex items-center justify-center">
                        <ToolIcon ref={div1Ref} iconKey="gmail" IconComponent={Icons.gmail} />
                    </div>
                    <div className="flex items-center justify-center">
                        <ToolIcon ref={div2Ref} iconKey="social" IconComponent={Icons.social} />
                    </div>
                    <div className="flex items-center justify-center">
                        <ToolIcon ref={div3Ref} iconKey="analytics" IconComponent={Icons.analytics} />
                    </div>
                    <div className="flex items-center justify-center">
                        <ToolIcon ref={div4Ref} iconKey="invoice" IconComponent={Icons.invoice} />
                    </div>
                    <div className="flex items-center justify-center">
                        <ToolIcon ref={div5Ref} iconKey="payment" IconComponent={Icons.payment} />
                    </div>
                </div>

                {/* Center: Hub */}
                <div className="flex flex-col justify-center relative z-20">
                    <Circle ref={div6Ref} className="size-12 sm:size-20 !border-primary !bg-zinc-950 p-1.5 sm:p-2 shadow-[0_0_50px_-5px_rgba(234,179,8,0.4)] animate-pulse" active={true}>
                        <Image
                            src="/favicon.png"
                            alt="Hub"
                            width={50}
                            height={50}
                            className="w-full h-full object-contain opacity-90"
                        />
                    </Circle>
                </div>

                {/* Right: User */}
                <div className="flex flex-col justify-center z-20">
                    <Circle ref={div7Ref} className="size-8 sm:size-14 !border-zinc-700 !bg-zinc-800 p-2 sm:p-2.5" active={true}>
                        <User className="w-full h-full text-zinc-400" />
                    </Circle>
                </div>
            </div>

            {/* Beams (Always full opacity) */}
            {[div1Ref, div2Ref, div3Ref, div4Ref, div5Ref].map((ref, i) => (
                <AnimatedBeam
                    key={i}
                    containerRef={containerRef}
                    fromRef={ref}
                    toRef={div6Ref}
                    duration={3}
                    pathColor="rgba(234, 179, 8, 0.5)"
                    gradientStartColor="#EAB308"
                    gradientStopColor="#FACC15"
                    className="opacity-100"
                />
            ))}

            {/* Hub -> User */}
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div6Ref}
                toRef={div7Ref}
                duration={3}
                pathColor="rgba(234, 179, 8, 0.5)"
                gradientStartColor="#EAB308"
                gradientStopColor="#FFFFFF"
            />

        </div>
    );
}
