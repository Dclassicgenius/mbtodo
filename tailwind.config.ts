/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "primary-pink": "#c273ff",
        "primary-orange": "#ff9d00",
        "primary-gray": "#666666",
        "primary-blue": "#00b7ff",
        "primary-dark": "#101315",
        "primary-light": "#eeeeee",
      },
    },
  },
  plugins: [],
};
