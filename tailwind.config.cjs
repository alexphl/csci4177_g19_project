const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-custom)', ...fontFamily.sans],
      },
      transitionTimingFunction: {
        'rubber': 'cubic-bezier(0.25, 0.8, 0.25, 1.4)',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-0.3deg)' },
          '50%': { transform: 'rotate(0.3deg)' },
        }
      },
      animation: {
        wiggle: 'wiggle 0.22s ease-in-out infinite',
      }
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
