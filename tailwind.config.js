/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark:  '#1C3A5E',
          mid:   '#2A5298',
          light: '#EEF3FA',
          red:   '#CC0000',
        },
        surface: '#F7F8FA',
        line:    '#D4D9E1',
        cta:     '#1C3A5E',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
