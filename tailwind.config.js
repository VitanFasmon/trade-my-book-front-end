/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#252422",
        secondary: "#EB5E28",
        darkGray: "#403D39",
        gray: "#CCC5B9",
        lightGray: "#FFFCF2",
      },
    },
  },
  plugins: [],
};
