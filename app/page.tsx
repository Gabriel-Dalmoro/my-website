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
import {
  Copyright,
  GithubIcon,
  Instagram,
  InstagramIcon,
  Linkedin,
  LinkedinIcon,
  Mail,
  MessageCircle,
} from "lucide-react";
import ResumeDropdown from "@/components/ResumeDropdown";

export default function Home() {
  const content = textContent;

  return (
    <div className="grid min-h-screen max-w-full items-center gap-12 pb-4">
      <main className="container mx-auto flex flex-col gap-8 p-8 sm:p-16">
        <section className="">
          <h1 className="text-6xl sm:text-7xl">Gabriel Dalmoro</h1>
          <p className="sm:items-start">{content.english.bio} </p>
        </section>

        <section>
          <h1 className="text-4xl">{content.english.aboutTitle}</h1>
          <p>{content.english.about}</p>
        </section>

        <section>
          <h1 className="text-4xl">{content.english.resumeTitle}</h1>
          <p>{content.english.resume}</p>

          <ResumeDropdown />
        </section>

        <section>
          <h1 className="mb-2 text-4xl">{content.english.projectsTitle}</h1>
          <div className="relative w-full max-w-[95vw] overflow-hidden">
            <div className="flex max-w-full gap-4 overflow-x-auto scroll-smooth px-4">
              {content.english.projects.map((project) => (
                <Card className="mb-4 w-[300px] flex-shrink-0" key={project.id}>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.technologies}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{project.summary}</p>
                  </CardContent>
                  <CardFooter className="justify-end">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">More Info</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-3xl">
                            {project.title}
                          </DialogTitle>
                          <DialogDescription>
                            {project.technologies}
                          </DialogDescription>
                        </DialogHeader>
                        <p className="mt-2">{project.description}</p>
                        <DialogFooter className="sm:justify-start">
                          <DialogClose asChild>
                            <Button type="button" variant="secondary">
                              Close
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h1 className="text-4xl">{content.english.testimonialsTitle}</h1>
          <p>{content.english.testimonials}</p>
        </section>

        <section className="mt-12">
          <h1 className="mb-3 text-center text-4xl">
            {content.english.contactTitle}
          </h1>
          <p className="mb-6 text-center">{content.english.contactText}</p>
          <div className="flex justify-around">
            <Link
              href="mailto:ghdalmoro@gmail.com"
              className={buttonVariants({
                variant: "outline",
                className: "w-40",
              })}
            >
              <Mail />
              Email
            </Link>
            <Link
              target="_blank"
              href="https://wa.me/14039732848"
              className={buttonVariants({
                variant: "outline",
                className: "w-40",
              })}
            >
              <MessageCircle />
              WhatsApp
            </Link>
          </div>
        </section>
      </main>

      <footer className="mt-10">
        <div className="flex justify-around">
          <Link
            target="_blank"
            href="https://www.instagram.com/gabriel.dalmoro/"
            className={buttonVariants({
              variant: "secondary",
              className: "",
            })}
          >
            <Instagram />
            Instagram
          </Link>
          <Link
            target="_blank"
            href="https://github.com/Gabriel-Dalmoro"
            className={buttonVariants({
              variant: "secondary",
              className: "",
            })}
          >
            <GithubIcon />
            GitHub
          </Link>
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/gabrieldalmoro/"
            className={buttonVariants({
              variant: "secondary",
              className: "",
            })}
          >
            <LinkedinIcon />
            LinkedIn
          </Link>
        </div>
        <div className="mt-12 flex items-center justify-center">
          <Copyright className="h-3 text-gray-500" />
          <p className="text-gray-500">Gabriel Dalmoro 2025</p>
        </div>
      </footer>
    </div>
  );
}
