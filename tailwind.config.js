
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          'primary': '#6366F1',
          'secondary': '#818CF8',
        },
        'dark': {
          '900': '#111827',
          '800': '#1F2937',
          '700': '#374151',
          '600': '#4B5563',
        },
      },
    },
  },
  plugins: [],
}
