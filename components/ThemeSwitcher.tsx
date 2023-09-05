"use client";

import { useEffect, useState } from "react";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";

export default function ThemeSwitcher() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const theme = savedTheme
      ? savedTheme
      : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

    setDarkMode(theme === "dark");

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e: MediaQueryListEvent) => setDarkMode(e.matches);
    mediaQuery.addEventListener("change", listener);

    return () => {
      mediaQuery.removeEventListener("change", listener);
    };
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="flex gap-4 justify-end pr-7">
      <BsFillMoonStarsFill
        className="dark:text-primary-gray cursor-pointer"
        size={20}
        onClick={() => setDarkMode(true)}
      />
      <BsFillSunFill
        className="dark:text-primary-gray cursor-pointer"
        size={20}
        onClick={() => setDarkMode(false)}
      />
    </div>
  );
}
