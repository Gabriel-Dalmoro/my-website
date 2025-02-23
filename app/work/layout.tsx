import DarkButton from "@/components/DarkButton";
import Hamburger from "@/components/Hamburger";
import Logo from "@/components/Logo";
import {
  Copyright,
  GithubIcon,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <header className="container mx-auto flex max-w-[1000px] items-center justify-between p-4 text-center">
          <Logo size={50} />
          {/* <div className="flex justify-between"> */}
          <a href="#projects" className="hidden text-base sm:block">
            Projects
          </a>
          <a href="#contact" className="hidden text-base sm:block">
            Contact
          </a>
          <a href="/adventures" className="hidden text-base sm:block">
            Check Out My Adventures
          </a>
          {/* </div> */}
          <div className="hidden sm:block">
            <DarkButton />
          </div>
          <div className="sm:hidden">
            <Hamburger />
          </div>
        </header>
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

          <div className="mt-md text-muted-foreground flex items-center justify-center text-sm">
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
