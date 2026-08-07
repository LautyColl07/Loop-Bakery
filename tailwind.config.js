/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Bruma Cafe — Retro Cálida
        bruma: {
          blue:       '#5B8296',   // Azul retro principal
          'blue-dark':'#4A6D7E',   // Azul hover/activo
          teal:       '#88C0C7',   // Celeste / Aqua claro
          'teal-light':'#B5D9DE',  // Celeste suave para fondos
          cream:      '#FAF2E1',   // Fondo principal
          'cream-dark':'#F0E5CE',  // Tarjetas, inputs
          'cream-mid':'#E8D9C0',   // Bordes suaves
          brown:      '#402E23',   // Texto principal / trazos
          'brown-light':'#6B4E3B', // Texto secundario
          'brown-muted':'#9A7E6B', // Texto muted / placeholders
        },
        // Aliases para migración sencilla (mapeo directo)
        primary: {
          DEFAULT: '#5B8296',
          50:  '#F0F6F8',
          100: '#DDE9EE',
          200: '#B5D0D9',
          300: '#88C0C7',
          400: '#6FA8B5',
          500: '#5B8296',
          600: '#5B8296',
          700: '#5B8296',
          800: '#4A6D7E',
          900: '#3B5766',
          950: '#2C414D',
        },
        cream: {
          DEFAULT: '#FAF2E1',
          50:  '#FEFCF6',
          100: '#FAF2E1',
          200: '#F0E5CE',
          300: '#E8D9C0',
          400: '#D4C4A8',
          500: '#C0AF90',
        },
        muted: {
          DEFAULT: '#F0E5CE',
          foreground: '#6B4E3B',
        },
        // Reemplazos para eliminar rastro violeta
        purple: {
          deep: '#402E23',
          dark: '#5B4230',
          mid: '#6B4E3B',
        },
        lila: {
          DEFAULT: '#88C0C7',
          light: '#B5D9DE',
          dark: '#5B8296',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-bakery': 'linear-gradient(135deg, #5B8296 0%, #88C0C7 50%, #B5D9DE 100%)',
        'gradient-soft': 'linear-gradient(180deg, #FAF2E1 0%, #F0E5CE 100%)',
        'gradient-hero': 'linear-gradient(135deg, #402E23 0%, #5B8296 60%, #88C0C7 100%)',
      },
      boxShadow: {
        'glow-purple': '0 0 20px rgba(91, 130, 150, 0.3)',
        'glow-lila':   '0 0 15px rgba(136, 192, 199, 0.4)',
        'card':        '0 4px 24px rgba(64, 46, 35, 0.08)',
        'card-hover':  '0 8px 32px rgba(91, 130, 150, 0.18)',
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
