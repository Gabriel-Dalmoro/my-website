import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import "../globals.css";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Clarity from "@/components/analytics/Clarity";

// Check if metadata needs dynamic locale? For now keep static or update later.
export const metadata: Metadata = {
  metadataBase: new URL("https://www.gabrieldalmoro.com"),
  title: {
    default: "Gabriel Dalmoro | Business Automation Expert",
    template: "%s | Gabriel Dalmoro",
  },
  description:
    "I build systems that do the work for you. Save 20+ hours a week and scale your business with custom AI & Automation solutions.",
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      fr: "/fr",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.gabrieldalmoro.com/",
    siteName: "Gabriel Dalmoro",
    title: "Gabriel Dalmoro | Business Automation Expert",
    description:
      "I build systems that do the work for you. Save 20+ hours a week and scale your business with custom AI & Automation solutions.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gabriel Dalmoro - Business Automation & AI",
      },
    ],
    locale: "en_US",
    alternateLocale: ["fr_FR"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabriel Dalmoro | Business Automation Expert",
    creator: "@gabrieldalmoro",
    description:
      "I build systems that do the work for you. Save 20+ hours a week and scale your business with custom AI & Automation solutions.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
          <Analytics />
          <SpeedInsights />
          <Clarity />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Gabriel Dalmoro",
                url: "https://www.gabrieldalmoro.com",
                logo: "https://www.gabrieldalmoro.com/favicon.png",
                sameAs: [
                  "https://twitter.com/gabrieldalmoro",
                  "https://linkedin.com/in/gabrieldalmoro",
                  "https://github.com/gabrieldalmoro"
                ]
              })
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
