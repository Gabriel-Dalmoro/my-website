// import { textContent } from "@/lib/content";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { buttonVariants } from "@/components/ui/button";
// import Link from "next/link";
// import {
//   Copyright,
//   GithubIcon,
//   Instagram,
//   LinkedinIcon,
//   Mail,
//   MessageCircle,
// } from "lucide-react";
// import ResumeDropdown from "@/components/ResumeDropdown";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// export default function Home() {
//   const content = textContent;

//   return (
//     <div className="min-h-screen py-3">
//       <main className="mx-auto flex max-w-screen-lg flex-col gap-8 px-6 sm:px-12">
//         <section className="">
//           <h1 className="text-6xl sm:text-7xl">Gabriel Dalmoro</h1>
//           <p className="sm:items-start">{content.english.bio} </p>
//         </section>

//         <section>
//           <h1 className="text-4xl">{content.english.aboutTitle}</h1>
//           <p>{content.english.about}</p>
//         </section>

//         <section>
//           <h1 className="text-center text-4xl">
//             {content.english.resumeTitle}
//           </h1>
//           <p className="text-center">{content.english.resume}</p>

//           <div className="my-6 flex justify-center">
//             <ResumeDropdown />
//           </div>
//         </section>

//         <section>
//           <h1 className="mb-2 text-4xl">{content.english.projectsTitle}</h1>
//           <ScrollArea className="w-full">
//             <div className="flex w-max gap-4 p-4">
//               {content.english.projects.map((project) => (
//                 <Card className="mb-4 w-[300px] flex-shrink-0" key={project.id}>
//                   <CardHeader>
//                     <CardTitle>{project.title}</CardTitle>
//                     <CardDescription>{project.technologies}</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <p>{project.summary}</p>
//                   </CardContent>
//                   <CardFooter className="justify-end">
//                     <Dialog>
//                       <DialogTrigger asChild>
//                         <Button variant="outline">More Info</Button>
//                       </DialogTrigger>
//                       <DialogContent className="sm:max-w-md">
//                         <DialogHeader>
//                           <DialogTitle className="text-3xl">
//                             {project.title}
//                           </DialogTitle>
//                           <DialogDescription>
//                             {project.technologies}
//                           </DialogDescription>
//                         </DialogHeader>
//                         <p className="mt-2">{project.description}</p>
//                         <DialogFooter className="sm:justify-start">
//                           <DialogClose asChild>
//                             <Button type="button" variant="secondary">
//                               Close
//                             </Button>
//                           </DialogClose>
//                         </DialogFooter>
//                       </DialogContent>
//                     </Dialog>
//                   </CardFooter>
//                 </Card>
//               ))}
//             </div>
//             <ScrollBar orientation="horizontal" />
//           </ScrollArea>
//         </section>

//         <section>
//           <h1 className="text-4xl">{content.english.testimonialsTitle}</h1>
//           <p>{content.english.testimonials}</p>
//         </section>

//         <section className="mt-12">
//           <h1 className="mb-3 text-center text-4xl">
//             {content.english.contactTitle}
//           </h1>
//           <p className="mb-6 text-center">{content.english.contactText}</p>
//           <div className="flex justify-center gap-4">
//             <Link
//               href="mailto:ghdalmoro@gmail.com"
//               className={buttonVariants({
//                 variant: "outline",
//                 className: "h-20 w-52",
//               })}
//             >
//               <Mail />
//               Email
//             </Link>
//             <Link
//               target="_blank"
//               href="https://wa.me/14039732848"
//               className={buttonVariants({
//                 variant: "outline",
//                 className: "h-20 w-52",
//               })}
//             >
//               <MessageCircle />
//               WhatsApp
//             </Link>
//           </div>
//         </section>
//       </main>

//       <footer className="mt-2">
//         <div className="mt-8 flex justify-center gap-2 sm:gap-10">
//           <Link
//             target="_blank"
//             href="https://www.instagram.com/gabriel.dalmoro/"
//             className={buttonVariants({
//               variant: "secondary",
//               className: "",
//             })}
//           >
//             <Instagram />
//             Instagram
//           </Link>
//           <Link
//             target="_blank"
//             href="https://github.com/Gabriel-Dalmoro"
//             className={buttonVariants({
//               variant: "secondary",
//               className: "",
//             })}
//           >
//             <GithubIcon />
//             GitHub
//           </Link>
//           <Link
//             target="_blank"
//             href="https://www.linkedin.com/in/gabrieldalmoro/"
//             className={buttonVariants({
//               variant: "secondary",
//               className: "",
//             })}
//           >
//             <LinkedinIcon />
//             LinkedIn
//           </Link>
//         </div>
//         <div className="mt-12 flex items-center justify-center">
//           <Copyright className="h-3 text-gray-500" />
//           <p className="text-gray-500">Gabriel Dalmoro 2025</p>
//         </div>
//       </footer>
//     </div>
//   );
// }
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
  LinkedinIcon,
  Mail,
  MessageCircle,
} from "lucide-react";
import ResumeDropdown from "@/components/ResumeDropdown";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function Home() {
  const content = textContent;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 🏗 Updated layout to use `container` for auto width handling */}
      <main className="max-w-container gap-lg p-lg sm:p-xl container mx-auto flex flex-col">
        {/* ✅ Applied system typography */}
        <section>
          <h1 className="text-5xl font-bold md:text-8xl">Gabriel Dalmoro</h1>
          <p className="text-base">{content.english.bio}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">
            {content.english.aboutTitle}
          </h2>
          <p className="text-base">{content.english.about}</p>
        </section>

        {/* ✅ Centering the resume section + styling improvements */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold">
            {content.english.resumeTitle}
          </h2>
          <p className="text-base">{content.english.resume}</p>
          <div className="mt-lg flex justify-center">
            <ResumeDropdown />
          </div>
        </section>

        {/* ✅ Projects Section using ScrollArea from ShadCN */}
        <section id="projects">
          <h2 className="mt-md text-2xl font-semibold">
            {content.english.projectsTitle}
          </h2>
          <ScrollArea className="w-full">
            <div className="gap-md p-md flex w-max">
              {content.english.projects.map((project) => (
                <Card
                  className="border-border w-[300px] flex-shrink-0"
                  key={project.id}
                >
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                      {project.title}
                    </CardTitle>
                    <CardDescription>{project.technologies}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{project.summary}</p>
                  </CardContent>
                  <CardFooter className="justify-end">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">More Info</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-xl font-semibold">
                            {project.title}
                          </DialogTitle>
                          <DialogDescription>
                            {project.technologies}
                          </DialogDescription>
                        </DialogHeader>
                        <p className="mt-md text-sm">{project.description}</p>
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
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>

        {/* ✅ Testimonials Section */}
        <section>
          <h2 className="text-2xl font-semibold">
            {content.english.testimonialsTitle}
          </h2>
          <p className="text-base">{content.english.testimonials}</p>
        </section>

        {/* ✅ Contact Section - Cleaned up layout */}
        <section id="contact" className="mt-xl text-center">
          <h2 className="mb-md text-2xl font-semibold">
            {content.english.contactTitle}
          </h2>
          <p className="mb-lg text-base">{content.english.contactText}</p>
          <div className="gap-md flex justify-center">
            <Link
              href="mailto:ghdalmoro@gmail.com"
              className={buttonVariants({
                variant: "outline",
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
                variant: "outline",
                className: "flex h-16 w-48 items-center justify-center gap-2",
              })}
            >
              <MessageCircle />
              WhatsApp
            </Link>
          </div>
        </section>
      </main>

      {/* ✅ Footer - Improved spacing */}
      <footer className="mt-xl py-md text-center">
        <div className="gap-md flex justify-center">
          <Link
            target="_blank"
            href="https://www.instagram.com/gabriel.dalmoro/"
            className={buttonVariants({
              variant: "secondary",
              className: "flex items-center gap-2",
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
              className: "flex items-center gap-2",
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
              className: "flex items-center gap-2",
            })}
          >
            <LinkedinIcon />
            LinkedIn
          </Link>
        </div>
        <div className="mt-md text-muted-foreground flex items-center justify-center text-sm">
          <Copyright className="h-3" />
          <p>Gabriel Dalmoro 2025</p>
        </div>
      </footer>
    </div>
  );
}
