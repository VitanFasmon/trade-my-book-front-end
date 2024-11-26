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
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "fade-out": {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        "slide-fade-left": {
          "0%": { transform: "translateX(100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        "slide-fade-right": {
          "0%": { transform: "translateX(-100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
      },
      animation: {
        "fade-in": "fade-in 2s ease-in-out",
        "fade-out": "fade-out 2s ease-in-out",
        "slide-fade-left": "slide-fade-left 2s ease-in-out",
        "slide-fade-right": "slide-fade-right 2s ease-in-out",
      },
    },
  },
};
