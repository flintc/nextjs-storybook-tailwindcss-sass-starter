const colors = require("tailwindcss/colors");

console.log(Object.keys(colors));

module.exports = {
  purge: {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
  },
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: { colors },
  },
  variants: {},
  plugins: [require("tailwindcss-interaction-variants")],
};
