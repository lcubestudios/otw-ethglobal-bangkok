const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Adelle Sans', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'otw-white': '#FFFFFF',
        'otw-gray': '#F5F5F5',
        'otw-black': '#000000',
        'otw-red': '#D53C5E',
        'otw-yellow': '#FFCB05'
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
