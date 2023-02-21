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
      screens: {
        s: "480px",

        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
  plugins: [],
};
