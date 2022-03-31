const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          ...colors.trueGray,
          900: "#1A1919",
          800: "#252424",
          700: "#2F2D2D",
        },
      },
    },
  },
  variants: {
    extend: {
      ringColor: ["hover", "active"],
    },
  },
  plugins: [],
};
