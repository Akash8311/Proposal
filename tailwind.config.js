/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Playfair Display'", 'serif'],
        body: ["'Poppins'", 'sans-serif'],
      },
      colors: {
        blush: '#ff9fc7',
        peach: '#ffd9c2',
        lilac: '#c9a7ff',
        grape: '#9b6bff',
        rose: '#b6357a',
      },
      keyframes: {
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        gradientShift: 'gradientShift 14s ease infinite',
      },
    },
  },
  plugins: [],
}
