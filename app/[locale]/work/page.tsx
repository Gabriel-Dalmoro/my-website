import { textContent } from "@/lib/content";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import ResumeDropdown from "@/components/ResumeDropdown";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import HeroImage from "@/components/HeroImage";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const language =
    (cookieStore.get("selectedLanguage")?.value as
      | "english"
      | "portuguese"
      | "spanish") || "english";

  console.log(language);

  const content = textContent[language];

  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-background dark:text-foreground">
      <main className="container mx-auto flex max-w-container flex-col gap-lg bg-background p-lg dark:bg-background sm:p-xl">
        <section className="mb-lg">
          <HeroImage />
          <p className="mt-sm text-center text-base text-text-secondary dark:text-text-secondary">
            {content.bio}
          </p>
        </section>

        <section className="-mt-6 mb-8 flex justify-center">
          <LanguageSwitcher />
        </section>

        <section>
          <h2 className="text-2xl font-semibold">{content.aboutTitle}</h2>
          <p className="text-base text-text-secondary dark:text-text-secondary">
            {content.about}
          </p>
        </section>

        {/* ✅ Centering the resume section + styling improvements */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold">{content.resumeTitle}</h2>
          <p className="text-base text-text-secondary dark:text-text-secondary">
            {content.resume}
          </p>
          <div className="mt-lg flex justify-center">
            <ResumeDropdown language={language} />
          </div>
        </section>

        {/* ✅ Projects Section using ScrollArea from ShadCN */}
        <section id="projects">
          <h2 className="mt-md text-2xl font-semibold">
            {content.projectsTitle}
          </h2>
          <ScrollArea className="w-full">
            <div className="flex w-max gap-md p-md">
              {content.projects.map((project) => (
                <Card
                  className="w-[300px] flex-shrink-0 border-border"
                  key={project.id}
                >
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-text-tertiary dark:text-text-tertiary">
                      {project.technologies}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-text-secondary dark:text-text-secondary">
                      {project.summary}
                    </p>
                  </CardContent>
                  <CardFooter className="justify-end">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="secondary">{content.info}</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle className="font-semibold">
                            {project.title}
                          </DialogTitle>
                          <DialogDescription>
                            <div className="text-text-tertiary dark:text-text-tertiary">
                              {project.technologies}
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                        <p className="mt-md text-sm text-text-secondary dark:text-text-secondary">
                          {project.description}
                        </p>
                        <DialogFooter className="sm:justify-start">
                          <DialogClose asChild>
                            <Button type="button" variant="secondary">
                              {content.close}
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>

        {/* Testimonials Section */}
        <section>
          <h2 className="text-2xl font-semibold">
            {content.testimonialsTitle}
          </h2>
          <p className="text-base text-text-secondary dark:text-text-secondary">
            {content.testimonials}
          </p>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mt-xl text-center">
          <h2 className="mb-md text-2xl font-semibold">
            {content.contactTitle}
          </h2>
          <p className="mb-lg text-base text-text-secondary dark:text-text-secondary">
            {content.contactText}
          </p>
          <div className="flex justify-center gap-md">
            <Link
              href="mailto:ghdalmoro@gmail.com"
              className={buttonVariants({
                variant: "default",
                className: "flex h-16 w-48 items-center justify-center gap-2",
              })}
            >
              <Mail />
              Email
            </Link>
            <Link
              target="_blank"
              href="https://wa.me/14039732848"
              className={buttonVariants({
                variant: "default",
                className: "flex h-16 w-48 items-center justify-center gap-2",
              })}
            >
              <MessageCircle />
              WhatsApp
            </Link>
          </div>
        </section>
      </main>

      {/* 
      <footer className="mt-xl py-md text-center">
        <div className="flex justify-center gap-10">
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
        </div>

        <div className="mt-md text-muted-foreground flex items-center justify-center text-sm">
          <Copyright className="h-3 text-gray-500" />
          <small className="text-text-tertiary dark:text-text-tertiary">
            Gabriel Dalmoro 2025
          </small>
        </div>
      </footer> */}
    </div>
  );
}
