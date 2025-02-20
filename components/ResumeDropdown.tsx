"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { textContent } from "@/lib/content";

export default function ResumeDropdown({ language }) {
  const handleDownload = (value: "english" | "portuguese" | "spanish") => {
    const fileUrl = textContent.english.resumeFiles[value];
    if (fileUrl) {
      window.open(fileUrl, "_blank");
    }
  };

  return (
    <Select onValueChange={handleDownload}>
      <SelectTrigger className="mt-2 h-20 w-64 justify-center gap-6 text-lg">
        <SelectValue className="">
          <p>{language}</p>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-background">
        <SelectItem value="english">
          {textContent.english.languages[0]}
        </SelectItem>
        <SelectItem value="portuguese">
          {textContent.english.languages[1]}
        </SelectItem>
        <SelectItem value="spanish">
          {textContent.english.languages[2]}
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
