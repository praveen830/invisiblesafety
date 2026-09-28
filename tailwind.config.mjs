/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'luxury-black': '#070707',
        dark: {
          DEFAULT: '#070707',
          pitch: '#070707',
          luxe: '#070707',
          card: '#0F0F0F',
          secondary: '#0F0F0F',
          surface: '#141414',
          border: '#141414',
          divider: '#141414',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E5C158',
          dark: '#B08D24',
          muted: '#C5A880',
        },
        cream: {
          DEFAULT: '#F9F8F6',
          soft: '#F4F3EF',
        },
      },
      borderColor: {
        'glass-border': 'rgba(255, 255, 255, 0.15)',
        'glass-bright': 'rgba(255, 255, 255, 0.7)',
      },
      fontFamily: {
        brand: ['Cinzel', 'Playfair Display', 'serif'],
        serif: ['Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        luxury: '0.25em',
        editorial: '0.3em',
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
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'luxury-slow': 'cubic-bezier(0.25, 1, 0.35, 1)',
      },
      transitionDuration: {
        '800': '800ms',
        '900': '900ms',
        '1200': '1200ms',
      },
      boxShadow: {
        'glow-white': '0 10px 30px rgba(255, 255, 255, 0.15)',
        'glow-gold': '0 8px 24px rgba(212, 175, 55, 0.25)',
        'luxe-deep': '0 20px 50px rgba(0, 0, 0, 0.9)',
      },
    },
  },
  plugins: [],
};
