/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      red: colors.red,
      green: colors.green
    },
    extend: {
      fontFamily: ["inter", "sans-serif"],
      colors: {
        black: 'var(--color-black)',
        darkgray: 'var(--color-darkgray)',
        gray: 'var(--color-gray)',
        white: 'var(--color-white)',
        green: 'var(--color-green)',
        orange: 'var(--color-orange)',
        blue: 'var(--color-blue)',
      },
    },
  },
  variants: 'all',
  plugins: [],
}
