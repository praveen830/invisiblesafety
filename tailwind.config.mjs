/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#0D0D0D',
          luxe: '#0D0D0D',
          card: '#141414',
          surface: '#1A1A1A',
          border: 'rgba(255, 255, 255, 0.1)',
        },
        gold: {
          DEFAULT: '#C5A880',
          light: '#D4BC9B',
          dark: '#B09166',
        },
        cream: {
          DEFAULT: '#F9F8F6',
          soft: '#F4F3EF',
        },
      },
      fontFamily: {
        brand: ['Cinzel', 'Playfair Display', 'serif'],
        serif: ['Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        luxury: '0.25em',
        wide: '0.2em',
        tightest: '-0.03em',
      },
      height: {
        '100dvh': '100dvh',
      },
      minHeight: {
        '60vh': '60vh',
        '70vh': '70vh',
        '75vh': '75vh',
        '100dvh': '100dvh',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'luxury-slow': 'cubic-bezier(0.25, 1, 0.35, 1)',
      },
      transitionDuration: {
        '800': '800ms',
        '1200': '1200ms',
      },
      boxShadow: {
        'glow-white': '0 8px 24px rgba(255, 255, 255, 0.2)',
        'glow-gold': '0 8px 24px rgba(197, 168, 128, 0.25)',
        'luxe-deep': '0 20px 50px rgba(0, 0, 0, 0.7)',
      },
    },
  },
  plugins: [],
};
