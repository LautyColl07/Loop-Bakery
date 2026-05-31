/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#C4B5FD', // Violet 300
          DEFAULT: '#7C3AED', // Violet 600
          dark: '#4C1D95', // Violet 900
        },
        cream: {
          DEFAULT: '#FDFBF6', // Soft cream
          dark: '#F5F2E8', // Slightly darker cream
        },
        neutral: {
          light: '#F9FAFB',
          DEFAULT: '#6B7280',
          dark: '#1F2937',
        }
      },
    },
  },
  plugins: [],
}