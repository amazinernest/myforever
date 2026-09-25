/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FDFBF7',
          100: '#FAF6F0',
          200: '#F5EFEB',
          300: '#EFE5DD',
          400: '#E5D6C8',
        },
        burgundy: {
          50: '#FDF2F4',
          100: '#FBE8EC',
          200: '#F5C6D1',
          300: '#EB94A9',
          400: '#DE5B7E',
          500: '#C72F57',
          600: '#A91F44',
          700: '#8B1736',
          800: '#72152D',
          900: '#4D0E1E',
          950: '#2A060F',
        },
        gold: {
          100: '#FAF0D7',
          200: '#F4DE9C',
          300: '#ECC961',
          400: '#E2B32E',
          500: '#C9971D',
          600: '#A47814',
          700: '#7E5B10',
          800: '#583F0C',
        },
        velvet: {
          900: '#14060B',
          950: '#0C0306',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        script: ['"Alex Brush"', '"Great Vibes"', 'cursive'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out 2s infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
