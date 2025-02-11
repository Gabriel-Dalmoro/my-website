import { textContent } from "@/lib/content";

export default function Home() {
  const content = textContent;

  return (
    <div className="grid min-h-screen items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-1 flex flex-col items-center gap-8 sm:items-start">
        <section className="">
          <h1 className="text-6xl sm:text-7xl">Gabriel H. Dalmoro</h1>
          <p className="sm:items-start">{content.english.bio} </p>
        </section>

        <section>
          <h1 className="text-4xl">About Me</h1>
          <p>{content.english.about}</p>
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
      </main>

      <footer></footer>
    </div>
  );
}
