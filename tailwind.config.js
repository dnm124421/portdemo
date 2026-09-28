/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Instrument Serif"', '"Cormorant Garamond"', 'serif'],
        sans: ['"Inter"', '"Geist"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        brand: {
          bg: '#081014',
          surface: 'rgba(255, 255, 255, 0.05)',
          surfaceHover: 'rgba(255, 255, 255, 0.12)',
          border: 'rgba(255, 255, 255, 0.15)',
          borderHover: 'rgba(255, 255, 255, 0.35)',
          accent: '#7be3b4',
          sky: '#a5c4d4',
          moss: '#3b5e4a',
          light: '#f8f7f2',
          muted: 'rgba(248, 247, 242, 0.65)',
        }
      },
      backdropBlur: {
        glass: '16px',
        deep: '24px',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '0.45', transform: 'scale(0.98)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
};
