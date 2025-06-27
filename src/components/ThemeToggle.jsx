import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const ThemeToggle = ({ variant = "floating" }) => {
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  });

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "w-12 h-12 p-2 rounded-full transition-colors duration-300",
        variant === "floating" && "fixed top-5 right-4 z-50 hidden md:block"
      )}
    >
      {isDarkMode ? (
        <Sun className="h-8 w-8 text-yellow-300" />
      ) : (
        <Moon className="h-8 w-8 text-blue-900" />
      )}
    </button>
  );
};
