/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      fontFamily: {
        default: ['var(--font-roboto)'],
      }
    },
  },
  future: {
    hoverOnlyWhenSupported: true
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
}
