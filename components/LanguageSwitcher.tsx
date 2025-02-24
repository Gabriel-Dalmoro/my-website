"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { textContent } from "@/lib/content";

export default function LanguageSwitcher({
  language,
}: {
  language: "english" | "portuguese" | "spanish";
}) {
  const handleLanguageSwitch = (
    value: "english" | "portuguese" | "spanish",
  ) => {};

  return (
    <Select onValueChange={handleLanguageSwitch}>
      <SelectTrigger className="bg-primary-faded border-primary w-42 mt-2 h-12 justify-center gap-6 rounded-sm px-6 py-3 font-medium text-black text-foreground transition-transform duration-200 hover:scale-105">
        <SelectValue placeholder={textContent[language].languageDropdown} />
      </SelectTrigger>
      <SelectContent className="bg-background">
        <SelectItem value="english">
          {textContent[language].languages[0]}
        </SelectItem>
        <SelectItem value="portuguese">
          {textContent[language].languages[1]}
        </SelectItem>
        <SelectItem value="spanish">
          {textContent[language].languages[2]}
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
