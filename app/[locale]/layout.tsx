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
          <div className="absolute top-6 right-6 z-50">
            <LanguageSwitcher variant="minimal" />
          </div>
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
