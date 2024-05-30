/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1D4ED8", // Light mode primary color
          dark: "#1E40AF", // Dark mode primary color
        },
        secondary: {
          DEFAULT: "#10B981", // Light mode secondary color
          dark: "#047857", // Dark mode secondary color
        },
        background: {
          light: "#ffffff", // Light mode background color
          dark: "#1a202c", // Dark mode background color
        },
        backgroundImage: {
          "text-gradient": "linear-gradient(to right, #10B981, #1D4ED8)",
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["dark"],
    },
  },
  // plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
