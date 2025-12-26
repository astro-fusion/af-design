/** @type {import('tailwindcss').Config} */
const tokens = require('@astrofusion/design-tokens');

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: tokens.colors,
      fontSize: tokens.typography.fontSize,
      fontFamily: tokens.typography.fontFamily,
      spacing: tokens.spacing,
    },
  },
  plugins: [],
}
