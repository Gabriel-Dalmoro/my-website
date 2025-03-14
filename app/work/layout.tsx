import Navbar from "@/components/Navbar";
import { cookies } from "next/headers";
import {
  Copyright,
  GithubIcon,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

const layout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  // ✅ Read the selected language from cookies
  const cookieStore = await cookies();
  const language =
    (cookieStore.get("selectedLanguage")?.value as
      | "english"
      | "portuguese"
      | "spanish") || "english";

  return (
    <html lang={language}>
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>

        {/* ✅ Footer */}
        <footer className="mt-xl py-md text-center">
          <div className="flex justify-center gap-5 sm:gap-10">
            <Link
              target="_blank"
              href="https://www.instagram.com/gabriel.dalmoro/"
            >
              <Instagram className="h-8 w-8" strokeWidth={1.5} />
            </Link>
            <Link target="_blank" href="https://github.com/Gabriel-Dalmoro">
              <GithubIcon className="h-8 w-8" strokeWidth={1.5} />
            </Link>
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/gabrieldalmoro/"
            >
              <Linkedin className="h-8 w-8" strokeWidth={1.5} />
            </Link>
            <Link target="_blank" href="mailto:ghdalmoro@gmail.com">
              <Mail className="h-8 w-8" strokeWidth={1.5} />
            </Link>
            <Link target="_blank" href="https://wa.me/14039732848">
              <MessageCircle className="h-8 w-8" strokeWidth={1.5} />
            </Link>
          </div>

          <div className="text-muted-foreground mt-md flex items-center justify-center text-sm">
            <Copyright className="h-3 text-gray-500" />
            <small className="text-text-tertiary dark:text-text-tertiary">
              Gabriel Dalmoro 2025
            </small>
          </div>
        </footer>
      </body>
    </html>
  );
};

export default layout;
