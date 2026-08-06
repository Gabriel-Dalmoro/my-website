"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Phone,
  ShieldCheck,
  FileText,
  Package,
  Clock,
  CalendarDays,
  DollarSign,
} from "lucide-react";

const WORKING_WEEKS = 48;

/* Respect the visitor's motion setting. */
function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = () => setReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/* Smoothly counts from the number on screen to the new number. */
function useCountUp(value: number, duration = 550): number {
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (reduced) {
      fromRef.current = value;
      setDisplay(value);
      return;
    }

    const from = fromRef.current;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = from + (value - from) * eased;
      fromRef.current = current;
      setDisplay(current);
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [value, duration, reduced]);

  return display;
}

interface SliderFieldProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit: string;
  onChange: (value: number) => void;
}

function SliderField({
  id,
  label,
  value,
  min,
  max,
  step = 1,
  unit,
  onChange,
}: SliderFieldProps) {
  return (
    <div className="py-4 first:pt-0 last:pb-0">
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <label
          htmlFor={id}
          className="text-[13px] font-medium leading-snug text-[#16283B]/80 sm:text-sm"
        >
          {label}
        </label>
        <span className="font-vc shrink-0 text-xl font-semibold tabular-nums leading-none text-[#16283B] sm:text-2xl">
          {value}
          <span className="font-vc-sans ml-1.5 text-[10px] font-semibold uppercase tracking-widest text-[#16283B]/40">
            {unit}
          </span>
        </span>
      </div>
      <input
        id={id}
        type="range"
        className="vc-slider w-full"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div className="mt-1.5 flex justify-between text-[10px] font-semibold uppercase tabular-nums tracking-wider text-[#16283B]/30">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

export default function WastedHoursCalculator() {
  const [patients, setPatients] = useState(90);
  const [bookingMins, setBookingMins] = useState(5);
  const [insuranceChecks, setInsuranceChecks] = useState(35);
  const [insuranceMins, setInsuranceMins] = useState(8);
  const [letters, setLetters] = useState(10);
  const [letterMins, setLetterMins] = useState(15);
  const [lensOrders, setLensOrders] = useState(8);
  const [lensMins, setLensMins] = useState(20);
  const [hourlyCost, setHourlyCost] = useState(30);

  const bookingMinutes = patients * bookingMins;
  const insuranceMinutes = insuranceChecks * insuranceMins;
  const letterMinutes = letters * letterMins;
  const lensMinutes = lensOrders * lensMins;

  const weeklyMinutes =
    bookingMinutes + insuranceMinutes + letterMinutes + lensMinutes;
  const weeklyHours = weeklyMinutes / 60;
  const yearlyHours = weeklyHours * WORKING_WEEKS;
  const yearlyCost = yearlyHours * hourlyCost;

  const animatedWeekly = useCountUp(weeklyHours);
  const animatedYearly = useCountUp(yearlyHours);
  const animatedCost = useCountUp(yearlyCost);

  const usd = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(Math.round(n));

  const breakdown = [
    {
      key: "booking",
      label: "Booking and rescheduling by phone",
      minutes: bookingMinutes,
      Icon: Phone,
    },
    {
      key: "insurance",
      label: "Insurance checks by hand",
      minutes: insuranceMinutes,
      Icon: ShieldCheck,
    },
    {
      key: "letters",
      label: "Referral and co-management letters",
      minutes: letterMinutes,
      Icon: FileText,
    },
    {
      key: "lenses",
      label: "Specialty lens orders and chasing",
      minutes: lensMinutes,
      Icon: Package,
    },
  ].sort((a, b) => b.minutes - a.minutes);

  const largest = breakdown[0].minutes || 1;

  /* Screen readers get the settled numbers once the sliders stop moving,
     instead of every frame of the count-up. */
  const [announced, setAnnounced] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnnounced(
        `${weeklyHours.toFixed(1)} hours lost per week. ${Math.round(yearlyHours)} hours lost per year. ${usd(
          yearlyCost,
        )} lost per year.`,
      );
    }, 400);
    return () => clearTimeout(timer);
  }, [weeklyHours, yearlyHours, yearlyCost]);

  const weeklyText = animatedWeekly.toFixed(1);
  const yearlyText = Math.round(animatedYearly).toLocaleString("en-US");
  const costText = usd(animatedCost);

  return (
    <div className="lg:grid lg:grid-cols-5 lg:items-start lg:gap-8">
      <p aria-live="polite" aria-atomic="true" className="sr-only">
        {announced}
      </p>

      {/* Left column: the sliders, then the breakdown */}
      <div className="flex flex-col gap-6 lg:col-span-3"></div>

      {/* Right column: the numbers, pinned so they stay in view while dragging */}
      <div className="sticky bottom-0 z-40 -mx-5 mt-6 sm:-mx-6 lg:bottom-auto lg:top-6 lg:col-span-2 lg:mx-0 lg:mt-0">
        {/* Compact bar, phone and tablet */}
        <div className="border-t-4 border-[#C3A46B] bg-[#16283B] px-5 py-4 text-white shadow-[0_-10px_30px_rgba(22,40,59,0.25)] sm:px-6 lg:hidden">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
            <div>
              <p className="mb-1 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-[#C3A46B]">
                <DollarSign className="h-3 w-3" aria-hidden="true" /> Lost per
                year
              </p>
              <p
                aria-hidden="true"
                className="font-vc text-[34px] font-bold tabular-nums leading-none text-[#C3A46B]"
              >
                {costText}
              </p>
            </div>
            <div className="shrink-0 space-y-1 text-right">
              <p
                aria-hidden="true"
                className="text-sm font-semibold tabular-nums text-white"
              >
                {weeklyText}
                <span className="ml-1 text-[10px] font-medium uppercase tracking-wide text-white/50">
                  hrs a week
                </span>
              </p>
              <p
                aria-hidden="true"
                className="text-sm font-semibold tabular-nums text-white"
              >
                {yearlyText}
                <span className="ml-1 text-[10px] font-medium uppercase tracking-wide text-white/50">
                  hrs a year
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Full panel, desktop */}
        <div className="relative hidden overflow-hidden rounded-3xl border-b-4 border-[#C3A46B] bg-[#16283B] p-7 text-white shadow-xl lg:block">
          <div className="absolute right-0 top-0 h-52 w-52 -translate-y-1/2 translate-x-1/4 rounded-full bg-white opacity-5 blur-3xl" />

          <div className="relative z-10">
            <p className="mb-5 text-[10px] font-bold uppercase tracking-widest text-[#C3A46B]">
              What the manual work costs
            </p>

            <div className="rounded-2xl bg-[#C3A46B] p-6 text-center shadow-lg">
              <p className="mb-1.5 flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#16283B]/70">
                <DollarSign className="h-3.5 w-3.5" aria-hidden="true" />
                Dollars lost per year
              </p>
              <p
                aria-hidden="true"
                className="font-vc text-[44px] font-bold tabular-nums leading-none text-[#16283B]"
              >
                {costText}
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-center">
                <p className="mb-1.5 flex items-center justify-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-[#C3A46B]">
                  <Clock className="h-3 w-3" aria-hidden="true" /> Hrs a week
                </p>
                <p
                  aria-hidden="true"
                  className="font-vc text-3xl font-bold tabular-nums leading-none text-white"
                >
                  {weeklyText}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-center">
                <p className="mb-1.5 flex items-center justify-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-[#C3A46B]">
                  <CalendarDays className="h-3 w-3" aria-hidden="true" /> Hrs a
                  year
                </p>
                <p
                  aria-hidden="true"
                  className="font-vc text-3xl font-bold tabular-nums leading-none text-white"
                >
                  {yearlyText}
                </p>
              </div>
            </div>

            <p className="mt-5 text-center text-[11px] font-medium leading-relaxed text-white/50">
              Based on {WORKING_WEEKS} working weeks a year. Front desk cost of{" "}
              {usd(hourlyCost)} an hour.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
