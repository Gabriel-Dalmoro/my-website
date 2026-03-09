"use client";
import dynamic from "next/dynamic";

// ssr: false is only valid inside a Client Component in App Router
const ClientCarousel = dynamic(() => import("@/components/marketing/ClientCarousel"), { ssr: false });

export default ClientCarousel;
