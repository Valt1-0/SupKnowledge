/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pacifico: ["Pacifico", "cursive"],
        righteous: ["Righteous", "cursive"],
      },

      animation: {
        cards: "cards 0.5s",
      },
      keyframes: {
        cards: {
          "0%": { transform: "translateY(10px)" },
          "100%": { transform: "translateY(0px)" },
        },
      },
    },
  },
  plugins: [],
};
