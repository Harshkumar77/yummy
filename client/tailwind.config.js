const colors = require('tailwindcss/colors')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: "#FF7800",
      secondary: "#FFE300",
      filler: "#F7F7F7",
    },
    extend: {},
  },

  plugins: [],
}
