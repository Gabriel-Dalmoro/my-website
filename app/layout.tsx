import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Logo from "@/components/Logo";
import "./globals.css";

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
  description: "Work and Life of Gabriel Dalmoro",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="container mx-auto flex items-center justify-between p-4">
          <Logo size={50} />
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="#projects" className="text-base">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="text-base">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
