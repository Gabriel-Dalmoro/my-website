import type { Config } from "tailwindcss";

export default {
  darkMode: "class", // ✅ Ensures dark mode works via class
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        container: "1350px", // Limits max width on large screens
      },
      // 🔹 Colors now properly reference CSS variables
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          faded: "hsl(var(--primary-faded))",
        },

        secondary: "hsl(var(--secondary))",

        border: "hsl(var(--border))",

        text: {
          primary: "hsl(var(--text-primary))",
          secondary: "hsl(var(--text-secondary))",
          tertiary: "hsl(var(--text-tertiary))",
        },

        button: {
          border: "hsl(var(--button-border))",
          hover: "hsl(var(--button-hover-bg))",
        },
      },

      // 🔹 Typography System
      fontSize: {
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["14px", { lineHeight: "20px" }],
        base: ["16px", { lineHeight: "24px" }],
        lg: ["20px", { lineHeight: "28px" }],
        xl: ["24px", { lineHeight: "32px" }],
        "2xl": ["32px", { lineHeight: "40px" }],
        "3xl": ["40px", { lineHeight: "48px" }],
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },

      // 🔹 Spacing System
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
      },

      // 🔹 Border Radius System
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
      },

      // 🔹 Responsive Breakpoints
      screens: {
        xs: "375px", // Small phones
        sm: "640px", // Regular mobile
        md: "768px", // Tablets
        lg: "1024px", // Laptops
        xl: "1280px", // Desktops
        "2xl": "1536px", // Large screens
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
