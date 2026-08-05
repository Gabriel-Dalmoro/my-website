import "../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visioncare Associates x Gabriel Dalmoro",
  description:
    "A private page built for Visioncare Associates. What the manual work costs, and what I would automate first.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function VisioncareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
