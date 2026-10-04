/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { cream: "#F7F4ED", ink: "#191919", leaf: "#1A8917" },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ['"Source Serif 4"', "Charter", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
