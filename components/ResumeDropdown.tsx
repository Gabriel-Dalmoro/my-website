"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { textContent } from "@/lib/content";

export default function ResumeDropdown({
  language,
}: {
  language: "english" | "portuguese" | "spanish";
}) {
  const handleDownload = (value: "english" | "portuguese" | "spanish") => {
    const fileUrl = textContent[language].resumeFiles[value];
    if (fileUrl) {
      window.open(fileUrl, "_blank");
    }
  };

  return (
    <Select onValueChange={handleDownload}>
      <SelectTrigger className="bg-primary border-primary mt-2 h-20 w-72 justify-center gap-6 rounded-sm px-6 py-3 text-lg font-medium text-black transition-transform duration-200 hover:scale-105">
        <SelectValue placeholder={textContent[language].resumeDropdown} />
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
