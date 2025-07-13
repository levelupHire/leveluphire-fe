/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4A90E2', // light blue from the arrow
          DEFAULT: '#1565C0', // main blue from the arrow and text
          dark: '#003366', // dark blue from the base
        },
        black: '#222222', // for the "Hire" text
      },
    },
  },
  plugins: [],
}

