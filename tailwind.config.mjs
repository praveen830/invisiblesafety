/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'sky-soft': '#EBF4FA',
        'sky-light': '#F4F9FD',
        'sand-soft': '#FDF6EE',
        'sand-accent': '#F3E5D0',
        'brand-gold': '#C6A66B',
        navy: {
          DEFAULT: '#1A365D',
          dark: '#0F233D',
          light: '#2A4A7F',
        },
        slate: {
          navy: '#1A365D',
          body: '#334155',
          muted: '#64748B',
        },
        gold: {
          DEFAULT: '#C6A66B',
          light: '#D8BE8A',
          dark: '#A8884D',
          muted: '#C5A880',
        },
        cream: {
          DEFAULT: '#FDF6EE',
          soft: '#F4F9FD',
        },
        'luxury-black': '#0F233D',
        dark: {
          DEFAULT: '#0F233D',
          pitch: '#0F233D',
          luxe: '#0F233D',
          card: '#FFFFFF',
          secondary: '#F8FAFC',
          surface: '#F4F9FD',
          border: '#E2E8F0',
          divider: '#E2E8F0',
        },
      },
      borderRadius: {
        'card-sm': '16px',
        'card': '20px',
        'card-lg': '24px',
      },
      borderColor: {
        'glass-border': 'rgba(26, 54, 93, 0.12)',
        'glass-bright': 'rgba(255, 255, 255, 0.85)',
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
        'card': '0 4px 20px -2px rgba(26, 54, 93, 0.06), 0 2px 6px -1px rgba(26, 54, 93, 0.04)',
        'card-hover': '0 16px 32px -4px rgba(26, 54, 93, 0.12), 0 6px 12px -2px rgba(26, 54, 93, 0.06)',
        'glass': '0 8px 32px 0 rgba(26, 54, 93, 0.08)',
        'glow-gold': '0 8px 24px rgba(198, 166, 107, 0.25)',
        'glow-white': '0 10px 30px rgba(255, 255, 255, 0.4)',
        'luxe-deep': '0 20px 50px rgba(15, 35, 61, 0.15)',
      },
    },
  },
  plugins: [],
};
