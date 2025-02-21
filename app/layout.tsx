import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Logo from "@/components/Logo";
import DarkButton from "@/components/DarkButton";

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
  icons: {
    //favicon logo uses font Archivo Black
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        {/* <header className="container mx-auto flex items-center justify-between p-4">
          <Logo size={50} />
          <DarkButton />
        </header> */}
        <main>{children}</main>
      </body>
    </html>
  );
}
