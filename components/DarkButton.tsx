"use client";

const DarkButton = () => {
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
    }
  };

  return (
    <button onClick={toggleDarkMode} className="rounded border p-2">
      Toggle Dark Mode
    </button>
  );
};

export default DarkButton;
