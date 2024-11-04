/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      colors: {
        primary: "#252422",
        secondary: "#EB5E28",
        lightSecondary: "#f5c6b5",
        darkGray: "#403D39",
        gray: "#9c978f",
        lightGray: "#f0f0f0",
      },
    },
  },
};
