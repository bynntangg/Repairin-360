/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        repair: {
          primary: '#167D5A',
          secondary: '#105C45',
          accent: '#E5F3EC',
          surface: '#F5F7F6',
          text: '#26332D',
          warning: '#E9A23B',
          danger: '#D9534F',
          dark: '#11221B',
          light: '#F8FAF9'
        }
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        sans: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
