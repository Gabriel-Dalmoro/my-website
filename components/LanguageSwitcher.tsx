"use client";

import { useEffect, useState } from "react";
import { setCookie, getCookie } from "cookies-next"; // ✅ Use only cookies
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { textContent } from "@/lib/content";

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState<
    "english" | "portuguese" | "spanish"
  >("english");

  // ✅ Load the language from cookies when the component mounts
  useEffect(() => {
    const storedLang = (getCookie("selectedLanguage") || "english") as
      | "english"
      | "portuguese"
      | "spanish";
    setLanguage(storedLang);
  }, []);

  // ✅ Update the cookie when the user changes the language
  const handleLanguageSwitch = (
    value: "english" | "portuguese" | "spanish",
  ) => {
    setLanguage(value);
    setCookie("selectedLanguage", value, { path: "/" }); // ✅ Store language in cookies
  };

  return (
    <Select onValueChange={handleLanguageSwitch} value={language}>
      <SelectTrigger className="w-42 mt-2 h-12 justify-center gap-6 rounded-sm border-primary bg-primary-faded px-6 py-3 font-medium text-black text-foreground transition-transform duration-200 hover:scale-105">
        {/* ✅ Dynamically update placeholder based on selected language */}
        <SelectValue placeholder={textContent[language].languageDropdown} />
      </SelectTrigger>
      <SelectContent className="bg-background">
        {/* ✅ Dropdown items update dynamically based on the selected language */}
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
