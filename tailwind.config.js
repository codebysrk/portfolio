/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./js/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lato", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      colors: {
        paper: "#F6F4F1",
        stone: "#E4DED2",
        coral: "#F95C4B",
      },
    },
  },
  plugins: [],
};
