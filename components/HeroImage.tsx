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
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-zinc-800 shadow-2xl">
        <Image
          src="/gabriel-final.jpg"
          fill
          alt="Gabriel Dalmoro"
          className="object-cover object-top scale-105 hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
    </div>
  );
};

export default HeroImage;
