import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Logo from "@/components/Logo";
import "./globals.css";
import DarkButton from "@/components/DarkButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gabriel Dalmoro",
  description:
    "Work and Life of Gabriel Dalmoro - Follow along my adventures in the tech world, and in the real world. 🌎 👨🏼‍💻",
  openGraph: {
    type: "website",
    url: "https://www.gabrieldalmoro.com/",
    title: "Gabriel Dalmoro",
    description:
      "Work and Life of Gabriel Dalmoro - Follow along my adventures in the tech world, and in the real world. 🌎 👨🏼‍💻",
    images: [
      {
        url: "/meta-image.png", // ✅ Uses the image in /public
        width: 1200,
        height: 630,
        alt: "Gabriel Dalmoro - Portfolio Cover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabriel Dalmoro",
    description:
      "Work and Life of Gabriel Dalmoro - Follow along my adventures in the tech world, and in the real world. 🌎 👨🏼‍💻",
    images: ["/meta-image.png"], // ✅ Twitter preview uses the same image
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background antialiased dark:bg-background`}
      >
        <header className="container mx-auto flex items-center justify-between p-4">
          <Logo size={50} />
          <a href="#projects" className="text-base">
            Projects
          </a>
          <a href="#contact" className="text-base">
            Contact
          </a>
          <DarkButton />
        </header>
        {children}
      </body>
    </html>
  );
}
