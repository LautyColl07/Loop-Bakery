/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Loop Bakery - Violeta & Crema
        primary: {
          DEFAULT: '#7B4B94',
          50:  '#FAF5FC',
          100: '#F2E6F8',
          200: '#E8D4F1',
          300: '#D5B3E5',
          400: '#C08ED6',
          500: '#A96CC4',
          600: '#9050AD',
          700: '#7B4B94',  // principal
          800: '#5D3570',
          900: '#3E214D',
          950: '#2D1B2E',
        },
        cream: {
          DEFAULT: '#FFF8F3',
          50:  '#FFFFFF',
          100: '#FFF8F3',
          200: '#FFF0E4',
          300: '#FFE6D0',
          400: '#F5D5B8',
          500: '#E8C4A0',
        },
        lila: {
          DEFAULT: '#C8A2D8',
          light: '#E8D4F1',
          dark: '#9B6BB0',
        },
        purple: {
          deep: '#2D1B2E',
          dark: '#3E214D',
          mid: '#5D3570',
        },
        muted: {
          DEFAULT: '#F5EBE0',
          foreground: '#6B5A6E',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-bakery': 'linear-gradient(135deg, #7B4B94 0%, #9B6BB0 50%, #C8A2D8 100%)',
        'gradient-soft': 'linear-gradient(180deg, #FFF8F3 0%, #F5EBE0 100%)',
        'gradient-hero': 'linear-gradient(135deg, #3E214D 0%, #7B4B94 60%, #C8A2D8 100%)',
      },
      boxShadow: {
        'glow-purple': '0 0 20px rgba(123, 75, 148, 0.3)',
        'glow-lila':   '0 0 15px rgba(200, 162, 216, 0.4)',
        'card':        '0 4px 24px rgba(45, 27, 46, 0.08)',
        'card-hover':  '0 8px 32px rgba(123, 75, 148, 0.2)',
      },
      animation: {
        'fade-in':    'fadeIn 0.4s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-up':   'slideUp 0.3s ease-out',
        'float':      'float 3s ease-in-out infinite',
        'shimmer':    'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
