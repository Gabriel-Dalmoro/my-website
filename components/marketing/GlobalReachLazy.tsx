"use client";
import dynamic from "next/dynamic";

// ssr: false is only valid inside a Client Component in App Router
const GlobalReach = dynamic(() => import("@/components/marketing/GlobalReach"), { ssr: false });

export default GlobalReach;
