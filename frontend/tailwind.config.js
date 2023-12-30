/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      keyframes: {
        fadeDown: {
          "0%": { opacity: 0, transform: "translateY(-50%)" },
          "100%": { opacity: 1, transform: "translateY(0%)" },
        },
      },
      animation: {
        fadeDown: "fadeDown .5s forwards",
      },
    },
  },
  plugins: [],
};
