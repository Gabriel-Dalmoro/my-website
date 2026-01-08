"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { ChangeEvent, useTransition } from "react";

export default function LanguageSwitcher({ variant = 'full' }: { variant?: 'minimal' | 'full' }) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  const isMinimal = variant === 'minimal';

  return (
    <div className="relative group">
      <select
        defaultValue={locale}
        className={`appearance-none text-xs font-medium border rounded-md py-1.5 pl-3 pr-8 transition-colors focus:outline-none cursor-pointer ${isMinimal
            ? "bg-transparent text-zinc-500 hover:text-white border-transparent hover:border-zinc-800"
            : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700 focus:ring-1 focus:ring-yellow-500/50"
          }`}
        onChange={onChange}
        disabled={isPending}
      >
        <option value="en" className="bg-zinc-900 text-zinc-400">
          {isMinimal ? "EN" : "English"}
        </option>
        <option value="fr" className="bg-zinc-900 text-zinc-400">
          {isMinimal ? "FR" : "Français"}
        </option>
      </select>
      <div className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 transition-colors ${isMinimal ? "text-zinc-600 group-hover:text-zinc-400" : "text-zinc-500"
        }`}>
        <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd" />
        </svg>
      </div>
    </div>
  );
}
