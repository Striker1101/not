import React from "react";
import { ClipLoader } from "react-spinners";
import { useEffect, useState } from "react";

export default function SubmitButton({ loading, text = "SUBMIT", disabled = false, className }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if the dark mode class is applied to the document
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    setIsDarkMode(darkModeMediaQuery.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener("change", handleChange);

    return () => darkModeMediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className="flex items-center justify-center align-middle">
      <button
        className={className || `px-10 md:px-20 py-3 rounded-2xl flex items-center justify-center
          ${(loading || disabled) ? "cursor-not-allowed opacity-50" : ""}
          bg-blue-700 text-white dark:bg-gray-800 dark:text-white
          hover:bg-blue-600 dark:hover:bg-gray-700
          disabled:bg-blue-700 disabled:dark:bg-gray-800`}
        type="submit"
        disabled={loading || disabled}
      >
        {loading ? (
          <ClipLoader size={20} color={isDarkMode ? "#000000" : "#ffffff"} />
        ) : (
          text
        )}
      </button>
    </div>
  );
}
