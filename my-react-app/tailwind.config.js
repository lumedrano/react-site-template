/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        code: ["Fira Code", "monospace"],
      },
    },
  },
  plugins: [],
};