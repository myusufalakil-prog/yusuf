/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'emerald': {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        forest: {
          50: '#f0fdf0',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        champagne: {
          50: '#fdf8ee',
          100: '#faefd3',
          200: '#f4dda5',
          300: '#ecc66d',
          400: '#e4aa3c',
          500: '#d4922a',
          600: '#c07920',
          700: '#9d5f1c',
          800: '#7e4c1d',
          900: '#683f1b',
          950: '#3c200c',
        },
        ivory: '#f9f6ef',
        walnut: '#5c3d2e',
        midnight: '#0a0f0d',
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'fog-move': 'fogMove 20s ease-in-out infinite',
        'leaf-fall': 'leafFall 8s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'sunrise': 'sunrise 3s ease-out forwards',
        'bird-fly': 'birdFly 15s linear infinite',
        'cursor-blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fogMove: {
          '0%, 100%': { transform: 'translateX(0) scaleX(1)', opacity: '0.3' },
          '50%': { transform: 'translateX(5%) scaleX(1.05)', opacity: '0.5' },
        },
        leafFall: {
          '0%': { transform: 'translateY(-10px) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 5px #d4922a40' },
          '50%': { boxShadow: '0 0 30px #d4922a80, 0 0 60px #d4922a40' },
        },
        sunrise: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        birdFly: {
          '0%': { transform: 'translateX(-100px) translateY(0)' },
          '25%': { transform: 'translateX(25vw) translateY(-30px)' },
          '50%': { transform: 'translateX(50vw) translateY(10px)' },
          '75%': { transform: 'translateX(75vw) translateY(-20px)' },
          '100%': { transform: 'translateX(110vw) translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'gold': '0 0 20px rgba(212, 146, 42, 0.3), 0 0 60px rgba(212, 146, 42, 0.1)',
        'emerald': '0 0 20px rgba(16, 185, 129, 0.3)',
        'luxury': '0 25px 50px -12px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,146,42,0.1)',
        'card': '0 10px 40px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
}
