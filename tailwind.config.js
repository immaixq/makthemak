/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 25s linear infinite',
        marquee2: 'marquee2 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
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
