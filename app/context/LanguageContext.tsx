"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Define the type for the context
interface LanguageContextType {
  language: "english" | "portuguese" | "spanish";
  setLanguage: (language: "english" | "portuguese" | "spanish") => void;
}

// ✅ Create the Language Context
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

// ✅ Create a provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<
    "english" | "portuguese" | "spanish"
  >("english");

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// ✅ Custom hook to use the Language Context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
