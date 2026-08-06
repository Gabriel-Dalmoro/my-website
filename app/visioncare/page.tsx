import React from "react";
import {
  X,
  Eye,
  Phone,
  MessageSquare,
  ShieldCheck,
  Package,
  CalendarCheck,
  ClipboardCheck,
  Boxes,
  Lock,
  Mail,
  ExternalLink,
} from "lucide-react";
import WastedHoursCalculator from "@/components/demo/visioncare/WastedHoursCalculator";

const NOTICED = [
  {
    Icon: Phone,
    title: "Booking by phone",
    body: "Your contact page has a message form on it. So my guess is that most bookings still come down to a call someone has to pick up.",
  },
  {
    Icon: MessageSquare,
    title: "A second place to check",
    body: "You list a text line as well as a phone number. If somebody answers that by hand, it is one more inbox to watch all day.",
  },
  {
    Icon: ShieldCheck,
    title: "Insurance one patient at a time",
    body: "In most clinics your size, insurance is still checked by hand. If that is true here, it quietly eats the morning.",
  },
  {
    Icon: Package,
    title: "Chasing lens orders",
    body: "Scleral fittings mean trial lenses and lab orders. I would guess someone keeps track of those by hand, and calls to ask where things are.",
  },
];

const FIXES = [
  {
    Icon: CalendarCheck,
    title: "Booking that fills itself",
    body: "Patients pick a time online. It lands in the clinic calendar and a confirmation text goes out on its own. No phone tag.",
    time: "Usually gives back roughly 3 to 5 hours a week.",
  },
  {
    Icon: ClipboardCheck,
    title: "Insurance checked before they walk in",
    body: "Details are collected and checked ahead of the visit. Your front desk is not stuck on hold while patients wait at the desk.",
    time: "Usually gives back roughly 2 to 4 hours a week.",
  },
  {
    Icon: Boxes,
    title: "Every lens order in one place",
    body: "Trial lenses and lab orders sit on one simple board. Status updates arrive on their own, so nobody has to call the lab to ask where a lens is.",
    time: "Usually gives back roughly 1 to 3 hours a week.",
  },
];

export default function VisioncareDemoPage() {
  return (
    <div className="min-h-screen bg-[#F7F5F1] font-sans text-[#16283B] selection:bg-[#C3A46B] selection:text-[#16283B]">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap');
        .font-vc { font-family: 'Cormorant Garamond', serif; }
        .font-vc-italic { font-family: 'Cormorant Garamond', serif; font-style: italic; }
        .font-vc-sans { font-family: 'Inter', sans-serif; }

        .vc-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 28px;
          background: transparent;
          cursor: pointer;
        }
        .vc-slider:focus { outline: none; }
        .vc-slider::-webkit-slider-runnable-track {
          height: 8px;
          border-radius: 999px;
          background: rgba(22, 40, 59, 0.10);
        }
        .vc-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 28px;
          width: 28px;
          margin-top: -10px;
          border-radius: 999px;
          background: #16283B;
          border: 4px solid #FFFFFF;
          box-shadow: 0 2px 8px rgba(22, 40, 59, 0.35);
          transition: transform .15s ease;
        }
        .vc-slider:active::-webkit-slider-thumb { transform: scale(1.08); }
        .vc-slider:focus-visible::-webkit-slider-thumb {
          outline: 3px solid #C3A46B;
          outline-offset: 2px;
        }
        .vc-slider::-moz-range-track {
          height: 8px;
          border-radius: 999px;
          background: rgba(22, 40, 59, 0.10);
        }
        .vc-slider::-moz-range-thumb {
          height: 28px;
          width: 28px;
          border-radius: 999px;
          background: #16283B;
          border: 4px solid #FFFFFF;
          box-shadow: 0 2px 8px rgba(22, 40, 59, 0.35);
        }
        .vc-slider:focus-visible::-moz-range-thumb {
          outline: 3px solid #C3A46B;
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          .vc-slider::-webkit-slider-thumb { transition: none; }
        }
      `,
        }}
      />

      {/* Header */}
      <header className="sticky top-0 z-[100] border-b border-[#16283B]/10 bg-[#F7F5F1]/95 px-5 py-4 shadow-sm backdrop-blur-md transition-all sm:px-6 sm:py-5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row md:gap-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="shrink-0 text-left leading-none">
              <span className="font-vc block text-lg font-semibold tracking-[0.06em] text-[#16283B] sm:text-2xl">
                Visioncare Associates
              </span>
              <span className="font-vc-sans mt-1 block text-[8px] font-semibold uppercase tracking-[0.25em] text-[#4A7C94] sm:text-[9px]">
                Beverly Hills
              </span>
            </div>
            <X className="h-3 w-3 shrink-0 text-[#16283B]/30" strokeWidth={3} />
            <div className="flex items-center gap-3">
              <img
                src="/favicon.png"
                alt="Gabriel Dalmoro"
                className="h-9 w-auto shrink-0 rounded object-contain sm:h-11"
              />
              <span className="font-vc mt-1 hidden text-lg leading-none tracking-wide text-[#16283B] sm:block sm:text-xl">
                Gabriel Dalmoro
              </span>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="https://gabrieldalmoro.com/en/clinic"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-sm text-sm font-semibold text-[#16283B]/70 underline-offset-4 transition-colors hover:text-[#16283B] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C3A46B] sm:block"
            >
              Visit main site
            </a>
            <div className="rounded-full border border-[#C3A46B]/50 bg-[#C3A46B]/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-widest text-[#9d8047] sm:text-xs">
              Private page
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative w-full overflow-hidden bg-[#16283B] px-5 py-14 text-[#F7F5F1] sm:px-6 sm:py-20">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.07]" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#4A7C94]/15 via-transparent to-transparent" />
          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[10px] font-semibold uppercase tracking-widest text-[#C3A46B] sm:text-xs">
              <Eye className="h-3.5 w-3.5" /> For Dr. Shily
            </div>
            <h1 className="font-vc mb-6 text-[34px] leading-[1.1] tracking-tight drop-shadow-sm sm:text-5xl md:text-6xl">
              Dr. Shily, here is what the busywork is actually costing you.
            </h1>
            <p className="mx-auto mb-6 max-w-2xl text-base leading-relaxed opacity-80 sm:text-xl">
              I built this page just for your clinic. All I have seen is your
              website, so the numbers below start as a guess. Change any of them
              and watch what happens.
            </p>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-white/40 sm:text-xs">
              Built for Visioncare Associates. Takes about two minutes.
            </p>
          </div>
        </section>

        {/* What I noticed */}
        <section className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20">
          <div className="mb-10 text-center sm:mb-12">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#4A7C94]">
              An educated guess
            </p>
            <h2 className="font-vc mb-4 text-3xl text-[#16283B] sm:text-4xl">
              Where I would bet the time is going
            </h2>
            <p className="mx-auto max-w-2xl text-base font-light leading-relaxed text-[#16283B]/65 sm:text-lg">
              I have not seen inside your clinic. This is only what I would
              expect from the outside, after doing this for other small
              practices. Some of it will be wrong.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
            {NOTICED.map(({ Icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl border border-[#16283B]/10 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C3A46B]/40 sm:p-8"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#4A7C94]/10">
                  <Icon className="h-5 w-5 text-[#4A7C94]" aria-hidden="true" />
                </div>
                <h3 className="font-vc mb-2.5 text-xl font-semibold text-[#16283B] sm:text-2xl">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-[#16283B]/65">
                  {body}
                </p>
              </div>
            ))}
          </div>

          <p className="font-vc-italic mx-auto mt-8 max-w-2xl text-center text-lg leading-relaxed text-[#16283B]/55">
            If I have any of this wrong, tell me. I would rather be corrected
            than keep guessing.
          </p>
        </section>

        {/* Calculator */}
        <section className="border-y border-[#16283B]/10 bg-[#EFEBE4] px-5 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 text-center sm:mb-12">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#4A7C94]">
                The wasted hours
              </p>
              <h2 className="font-vc mb-4 text-3xl text-[#16283B] sm:text-4xl">
                Put your own numbers in.
              </h2>
              <p className="mx-auto max-w-2xl text-base font-light leading-relaxed text-[#16283B]/65 sm:text-lg">
                I have started you off with a guess. Move any slider that looks
                off. This is only about the work a computer could do, not time
                with patients.
              </p>
            </div>

            <WastedHoursCalculator />
          </div>
        </section>

        {/* What I would fix first */}
        <section className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20">
          <div className="mb-10 text-center sm:mb-12">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#4A7C94]">
              What I would fix first
            </p>
            <h2 className="font-vc mb-4 text-3xl text-[#16283B] sm:text-4xl">
              Three things I would build for you
            </h2>
            <p className="mx-auto max-w-2xl text-base font-light leading-relaxed text-[#16283B]/65 sm:text-lg">
              This is not about having fewer people at the front desk. It is
              about giving them their day back so they can look after patients
              instead of chasing paperwork.
            </p>
          </div>

          <ol className="flex flex-col gap-5 sm:gap-6">
            {FIXES.map(({ Icon, title, body, time }, index) => (
              <li
                key={title}
                className="flex flex-col gap-5 rounded-2xl border border-[#16283B]/10 bg-white p-7 shadow-sm transition-colors duration-300 hover:border-[#C3A46B]/40 sm:flex-row sm:gap-7 sm:p-8"
              >
                <div className="flex shrink-0 items-center gap-4 sm:flex-col sm:items-center sm:gap-3">
                  <span className="font-vc w-10 text-center text-4xl font-semibold leading-none text-[#C3A46B] sm:text-5xl">
                    {index + 1}
                  </span>
                  <Icon className="h-5 w-5 text-[#4A7C94]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-vc mb-2 text-2xl font-semibold text-[#16283B]">
                    {title}
                  </h3>
                  <p className="mb-3 text-sm leading-relaxed text-[#16283B]/65 sm:text-[15px]">
                    {body}
                  </p>
                  <p className="inline-flex items-center rounded-full bg-[#4A7C94]/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#4A7C94]">
                    {time}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mx-auto mt-8 flex max-w-3xl items-start gap-3 rounded-xl border border-[#16283B]/10 bg-[#16283B]/[0.04] p-5 sm:p-6">
            <Lock
              className="mt-0.5 h-4 w-4 shrink-0 text-[#4A7C94]"
              aria-hidden="true"
            />
            <p className="text-sm leading-relaxed text-[#16283B]/70">
              Patient names are kept out of any AI step. The automated systems
              move dates, times and order numbers. Not medical records.
            </p>
          </div>
        </section>

        {/* Guarantee */}
        <section className="px-5 pb-16 sm:px-6 sm:pb-20">
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border-b-4 border-[#C3A46B] bg-[#16283B] p-8 text-center text-white shadow-xl sm:p-14">
            <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C3A46B] opacity-10 blur-3xl" />
            <div className="relative z-10">
              <p className="mb-6 text-[10px] font-bold uppercase tracking-widest text-[#C3A46B]">
                My promise
              </p>
              <p className="font-vc mb-6 text-2xl leading-snug sm:text-4xl">
                I save you at least 8 hours a week, or I work for free until I
                do.
              </p>
              <p className="mx-auto max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
                I can say that because I take one client at a time. Your clinic
                gets all of my attention, so I know exactly what I am promising
                before I say yes.
              </p>
            </div>
          </div>
        </section>

        {/* Who I am */}
        <section className="mx-auto max-w-3xl px-5 pb-16 text-center sm:px-6 sm:pb-20">
          <p className="mb-6 text-[10px] font-bold uppercase tracking-widest text-[#4A7C94]">
            Who I am
          </p>
          <img
            src="/favicon.png"
            alt="Gabriel Dalmoro"
            className="mx-auto mb-6 h-14 w-auto rounded-full border border-[#16283B]/10 object-contain"
          />
          <p className="text-lg font-light leading-relaxed text-[#16283B]/80 sm:text-xl">
            I am a software engineer and a former business owner. I build the
            automated systems I wish I had when I was running my own companies.
            I work with one client at a time, so you are never in a queue.
          </p>
          <p className="font-vc mt-7 text-2xl text-[#16283B]">
            Gabriel Dalmoro
          </p>
        </section>

        {/* CTA */}
        <section className="border-t-8 border-[#C3A46B] bg-[#16283B] px-5 py-16 text-white sm:px-6 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-vc mb-5 text-3xl tracking-tight sm:text-4xl md:text-5xl">
              Want those hours back, Dr. Shily?
            </h2>
            <p className="font-vc-italic mb-9 text-lg font-light leading-relaxed text-[#C3A46B] sm:text-xl">
              Pick any time that suits you. I will do the rest.
            </p>
            <a
              href="https://calendly.com/ghdalmoro/30-minute"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#C3A46B] px-8 py-5 text-sm font-bold uppercase tracking-wider text-[#16283B] shadow-xl transition-all hover:-translate-y-1 hover:bg-white hover:text-[#16283B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto sm:px-10 sm:text-[15px]"
            >
              Book a free 30 minute call{" "}
              <ExternalLink className="ml-1 h-5 w-5" aria-hidden="true" />
            </a>
            <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
              No cost. No pressure. I will show you the two things I would
              automate first.
            </p>
            <p className="mt-6 text-sm text-white/50">
              Or just reply to me here:{" "}
              <a
                href="mailto:gabriel@gabrieldalmoro.com"
                className="inline-flex items-center gap-1.5 rounded-sm font-semibold text-[#C3A46B] underline underline-offset-4 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C3A46B]"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />{" "}
                gabriel@gabrieldalmoro.com
              </a>
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#16283B]/10 bg-white py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-5 text-center sm:px-6">
          <div className="flex items-center gap-5">
            <span className="font-vc text-base font-semibold tracking-[0.08em] text-[#16283B]/40">
              Visioncare Associates
            </span>
            <X className="h-3 w-3 shrink-0 text-[#16283B]/25" strokeWidth={3} />
            <img
              src="/favicon.png"
              alt="Gabriel Dalmoro"
              className="h-9 w-auto rounded-sm opacity-60 mix-blend-multiply grayscale filter"
            />
          </div>
          <div className="mt-3 flex flex-col items-center gap-2">
            <p className="font-vc text-lg font-semibold tracking-wide text-[#16283B]/80">
              Gabriel Dalmoro
            </p>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#16283B]/40">
              Less admin. More impact.
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-4">
              <a
                href="mailto:gabriel@gabrieldalmoro.com"
                className="rounded-sm text-sm font-semibold text-[#4A7C94] transition-colors hover:text-[#16283B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C3A46B]"
              >
                gabriel@gabrieldalmoro.com
              </a>
              <span className="text-[#16283B]/20">|</span>
              <a
                href="https://gabrieldalmoro.com/en/clinic"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm text-sm font-semibold text-[#4A7C94] transition-colors hover:text-[#16283B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C3A46B]"
              >
                Visit main site
              </a>
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-[#16283B]/30">
              Prepared for Visioncare Associates
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
