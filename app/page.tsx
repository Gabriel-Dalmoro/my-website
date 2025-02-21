import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Copyright,
  GithubIcon,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
} from "lucide-react";
import HeroImage from "@/components/HeroImage";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {" "}
      {/* ✅ Ensures full viewport height */}
      <main className="max-w-container gap-lg p-lg sm:p-xl container mx-auto flex flex-grow flex-col bg-background dark:bg-background">
        <section className="mb-lg">
          <HeroImage />
          <p className="mt-sm text-text-secondary dark:text-text-secondary text-center text-base">
            Follow along my adventures in life and in work.
          </p>
        </section>

        <section>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button className="h-32 w-52" asChild>
              <Link href="/adventures">
                <div className="flex flex-col items-center">
                  <p>Check out my</p>
                  <h3 className="text-lg font-semibold sm:text-xl">
                    Adventures
                  </h3>
                </div>
              </Link>
            </Button>
            <Button className="h-32 w-52" asChild>
              <Link href="/work">
                <div className="flex flex-col items-center">
                  <p>Explore My</p>
                  <h3 className="text-lg font-semibold sm:text-xl">Work</h3>
                </div>
              </Link>
            </Button>
          </div>
        </section>
      </main>
      {/* ✅ Footer naturally stays at bottom when content is short */}
      <footer className="py-sm text-center">
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
    </div>
  );
}
