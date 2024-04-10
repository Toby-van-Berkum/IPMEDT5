/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    colors: {
      black: 'var(--color-black)',
      darkgray: 'var(--color-darkgray)',
      gray: 'var(--color-gray)',
      white: 'var(--color-white)',
      green: 'var(--color-green)',
      orange: 'var(--color-orange)',
      blue: 'var(--color-blue)',
    },
    extend: {
      fontFamily: ["inter", "sans-serif"],
    },
  },
  variants: 'all',
  plugins: [],
}