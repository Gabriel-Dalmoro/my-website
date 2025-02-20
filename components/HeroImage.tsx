"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const HeroImage = ({ size = 1200 }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // 🔹 Function to check and update dark mode state
    const updateDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    // 🔹 Run it once on mount
    updateDarkMode();

    // 🔹 Observe <html> for class changes
    const observer = new MutationObserver(updateDarkMode);
    observer.observe(document.documentElement, { attributes: true });

    // 🔹 Cleanup observer on unmount
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex items-center justify-center">
      <Image
        src={isDarkMode ? "/hero-dark.png" : "/hero-light.png"}
        width={size}
        height={size}
        alt="Gabriel Dalmoro Hero Section"
        className="w-full max-w-[600px]"
      />
    </div>
  );
};

export default HeroImage;
