import ContactForm from "@/components/ContactForm";
import { textContent } from "@/lib/content";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Copyright } from "lucide-react";

export default function Home() {
  const content = textContent;

  return (
    <div className="grid min-h-screen items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-1 flex flex-col gap-8">
        <section className="">
          <h1 className="text-6xl sm:text-7xl">Gabriel H. Dalmoro</h1>
          <p className="sm:items-start">{content.english.bio} </p>
        </section>

        <section>
          <h1 className="text-4xl">{content.english.aboutTitle}</h1>
          <p>{content.english.about}</p>
        </section>

        <section>
          <h1 className="text-4xl">{content.english.resumeTitle}</h1>
          <p>{content.english.resume}</p>

          <Select>
            <SelectTrigger className="mt-2 h-12 w-[180px]">
              <SelectValue placeholder="Resume Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">
                {content.english.languages[0]}
              </SelectItem>
              <SelectItem value="portuguese">
                {content.english.languages[1]}
              </SelectItem>
              <SelectItem value="spanish">
                {content.english.languages[2]}
              </SelectItem>
            </SelectContent>
          </Select>
        </section>

        <section>
          <h1 className="mb-2 text-4xl">{content.english.projectsTitle}</h1>
          {content.english.projects.map((project) => (
            <Card className="mb-4" key={project.id}>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.technologies}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{project.summary}</p>
              </CardContent>
              <CardFooter className="justify-end">
                <Button>More Info</Button>
              </CardFooter>
            </Card>
          ))}
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
              WhatsApp
            </Link>
          </div>
        </section>
      </main>

      <footer className="mt-10">
        <div className="flex justify-around">
          <Link
            href="https://www.instagram.com/gabriel.dalmoro/"
            className={buttonVariants({
              variant: "secondary",
              className: "",
            })}
          >
            Instagram
          </Link>
          <Link
            href="https://github.com/Gabriel-Dalmoro"
            className={buttonVariants({
              variant: "secondary",
              className: "",
            })}
          >
            GitHub
          </Link>
          <Link
            href="https://www.linkedin.com/in/gabrieldalmoro/"
            className={buttonVariants({
              variant: "secondary",
              className: "",
            })}
          >
            LinkedIn
          </Link>
        </div>
        <div className="mt-12 flex justify-center">
          <Copyright className="h-3 text-gray-500" />
          <p className="text-gray-500">Gabriel H. Dalmoro 2025</p>
        </div>
      </footer>
    </div>
  );
}
