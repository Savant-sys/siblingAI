/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        float: {
          "0%": {
            transform: "translateX(0)",
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateX(20%)",
            transform: "translateY(20%)",
          },
          "100%": {
            transform: "translateX(0)",
            transform: "translateY(0)",
          },
        },
        shake: {
          "10%, 90%": {
            transform: "translate3d(-1px, 0, 0)",
          },
          "20%, 80%": {
            transform: "translate3d(2px, 0, 0)",
          },
          "30%, 50%, 70%": {
            transform: "translate3d(-4px, 0, 0)",
          },
          "40%, 60%": {
            transform: "translate3d(4px, 0, 0)",
          },
        },
      },
      animation: {
        float: "float 3s infinite ease-in-out",
        shake: "shake 0.82s cubic-bezier(.36,.07,.19,.97) both",
      },
      colors: {
        bg_white: "#F1FAFF",
        light_blue: "#CEE8FF",
        dark_blue: "#115D9E",
        hover_blue: "#0A4C87",
        light_pink: "#F2B8EC",
        aqua: "#4DDFFD",
        light_purple: "#B49AFF",
      },
      fontSize: {
        xs: ".75rem",
        sm: ".875rem",
        tiny: ".875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        "4xl": "2.5rem",
        "5xl": "3rem",
        "6xl": "4rem",
        "7xl": "5rem",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"],
        roboto: ["var(--font-roboto)"],
      },
    },
  },
  plugins: [require("tailwindcss-3d")({ legacy: true })],
};
