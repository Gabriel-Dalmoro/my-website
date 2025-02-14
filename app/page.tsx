import ContactForm from "@/components/ContactForm";
import { textContent } from "@/lib/content";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
          <h1 className="text-4xl">About Me</h1>
          <p>{content.english.about}</p>
        </section>

        <section>
          <h1 className="text-4xl">Resume</h1>
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
          <h1 className="mb-2 text-4xl">Projects</h1>
          {content.english.projects.map((project) => (
            <div
              key={project.id}
              className="mb-4 rounded-md border-2 border-slate-500 p-4"
            >
              <h3 className="mb-1 text-2xl font-medium">{project.title}</h3>
              <p className="mb-3">{project.description}</p>
              <p>
                <strong>Technologies Used:</strong> {project.technologies}
              </p>
            </div>
          ))}
        </section>

        <section>
          <h1 className="text-4xl">Testimonials</h1>
          <p>{content.english.testimonials}</p>
        </section>

        <section>
          <h1 className="text-4xl">Contact</h1>
          <ContactForm />
        </section>
      </main>

      <footer className="mt-10">
        <div className="flex justify-around">
          <div className="m-2 rounded border border-slate-500 p-2">
            <a href="https://facebook.com">facebook</a>
          </div>
          <div className="m-2 rounded border border-slate-500 p-2">
            <a href="https://instagram.com">instagram</a>
          </div>

          <div className="m-2 rounded border border-slate-500 p-2">
            <a href="https://github.com">github</a>
          </div>

          <div className="m-2 rounded border border-slate-500 p-2">
            <a href="https://linkedin.com">linkedin</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
