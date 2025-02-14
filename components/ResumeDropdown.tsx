"use client"; // Ensures this component is interactive

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { textContent } from "@/lib/content";

export default function ResumeDropdown() {
  const handleDownload = (value: string) => {
    const fileUrl = textContent.english.resumeFiles[value];
    if (fileUrl) {
      window.open(fileUrl, "_blank");
    }
  };

  return (
    <Select onValueChange={handleDownload}>
      <SelectTrigger className="mt-2 h-12 w-[180px]">
        <SelectValue placeholder="Resume Language" />
      </SelectTrigger>
      <SelectContent>
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
