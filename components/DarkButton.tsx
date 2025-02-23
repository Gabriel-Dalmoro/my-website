"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

const DarkButton = () => {
  const [icon, setIcon] = useState(<Moon />);
  const toggleDarkMode = () => {
    const htmlElement = document.documentElement;
    const isDarkMode = htmlElement.classList.toggle("dark");

    if (!isDarkMode) {
      // 🔹 Switching to Light Mode: Reset CSS Variables Manually
      document.documentElement.style.setProperty("--background", "0 0% 100%");
      document.documentElement.style.setProperty(
        "--foreground",
        "20 14.3% 4.1%",
      );
      setIcon(<Moon />);
    } else {
      // 🔹 Switching to Dark Mode: Ensure Dark Variables Apply
      document.documentElement.style.setProperty(
        "--background",
        "20 14.3% 4.1%",
      );
      document.documentElement.style.setProperty(
        "--foreground",
        "60 9.1% 97.8%",
      );
      setIcon(<Sun />);
    }
  };

  return (
    <Button
      variant="secondary"
      onClick={toggleDarkMode}
      className="rounded border p-2 text-base"
    >
      {icon}
    </Button>
  );
};

export default DarkButton;
