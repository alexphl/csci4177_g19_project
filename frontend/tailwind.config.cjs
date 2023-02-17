const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'SF Pro', 'var(--font-custom)', ...fontFamily.sans],
      },
      transitionTimingFunction: {
        'rubber': 'cubic-bezier(0.25, 0.8, 0.25, 1.4)',
      }
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
