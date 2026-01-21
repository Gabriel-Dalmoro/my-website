import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import "../globals.css";
import LanguageSwitcher from "@/components/LanguageSwitcher";

// Check if metadata needs dynamic locale? For now keep static or update later.
export const metadata: Metadata = {
  title: "Gabriel Dalmoro | Business Automation Expert",
  description:
    "I build systems that do the work for you. Save 20+ hours a week and scale your business with custom AI & Automation solutions.",
  openGraph: {
    type: "website",
    url: "https://www.gabrieldalmoro.com/",
    title: "Gabriel Dalmoro | Business Automation Expert",
    description:
      "I build systems that do the work for you. Save 20+ hours a week and scale your business with custom AI & Automation solutions.",
    images: [
      {
        url: "/og-image.png", // Updated OG image
        width: 1200,
        height: 630,
        alt: "Gabriel Dalmoro - Business Automation & AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabriel Dalmoro | Business Automation Expert",
    description:
      "I build systems that do the work for you. Save 20+ hours a week and scale your business with custom AI & Automation solutions.",
    images: ["/og-image.png"],
  },
  icons: {
    //favicon logo uses font Archivo Black
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <body className="flex min-h-screen flex-col">
        <NextIntlClientProvider messages={messages}>

          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
