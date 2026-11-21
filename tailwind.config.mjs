/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Step 1: Ultra-Attractive Architectural Palette
        // Primary: Deep royal Navy '#0F233D' (for H1s and strong actions)
        primary: {
          DEFAULT: '#0F233D',
          dark: '#0A182A',
          light: '#1A365D',
          hover: '#1A365D',
        },
        navy: {
          DEFAULT: '#0F233D',
          dark: '#0A182A',
          light: '#1A365D',
        },

        // Secondary: Soft Sky Blue '#F0F5FA' and bright azure '#2D89EF' for trust sections
        secondary: {
          DEFAULT: '#2D89EF',
          light: '#F0F5FA',
          sky: '#F0F5FA',
          azure: '#2D89EF',
        },
        azure: {
          DEFAULT: '#2D89EF',
          light: '#EBF4FE',
          hover: '#1C74D9',
        },
        sky: {
          DEFAULT: '#F0F5FA',
          soft: '#F0F5FA',
          light: '#F0F5FA',
        },
        'sky-soft': '#F0F5FA',
        'sky-light': '#F0F5FA',

        // Accents: Pure Amber/Gold '#C6A66B' (for badges/borders), warm peach/sand '#FDF6EE', and natural WhatsApp green '#25D366'
        accent: {
          DEFAULT: '#C6A66B',
          gold: '#C6A66B',
          amber: '#C6A66B',
          sand: '#FDF6EE',
          peach: '#FDF6EE',
          whatsapp: '#25D366',
        },
        gold: {
          DEFAULT: '#C6A66B',
          light: '#D8BE8A',
          dark: '#A8884D',
          muted: '#C5A880',
          amber: '#C6A66B',
        },
        amber: {
          DEFAULT: '#C6A66B',
          light: '#D8BE8A',
          dark: '#A8884D',
        },
        'brand-gold': '#C6A66B',
        sand: {
          DEFAULT: '#FDF6EE',
          soft: '#FDF6EE',
          warm: '#FDF6EE',
          accent: '#FDF6EE',
        },
        peach: {
          DEFAULT: '#FDF6EE',
          soft: '#FDF6EE',
        },
        'sand-soft': '#FDF6EE',
        'sand-accent': '#FDF6EE',
        cream: {
          DEFAULT: '#FDF6EE',
          soft: '#FAFCFE',
        },
        whatsapp: {
          DEFAULT: '#25D366',
          hover: '#20BA5A',
          light: '#DCFCE7',
        },

        // Neutral: Pristine white '#FFFFFF', off-white '#FAFCFE', and high-contrast Slate text '#1E293B'
        neutral: {
          white: '#FFFFFF',
          offwhite: '#FAFCFE',
          slate: '#1E293B',
          text: '#1E293B',
          muted: '#64748B',
          border: '#E2E8F0',
        },
        offwhite: '#FAFCFE',
        slate: {
          DEFAULT: '#1E293B',
          navy: '#0F233D',
          body: '#1E293B',
          text: '#1E293B',
          muted: '#64748B',
          light: '#334155',
        },

        // Clean light architectural tokens (eliminating all dark theme defaults)
        'luxury-black': '#0F233D',
        dark: {
          DEFAULT: '#0F233D',
          pitch: '#0F233D',
          luxe: '#0F233D',
          card: '#FFFFFF',
          secondary: '#FAFCFE',
          surface: '#F0F5FA',
          border: '#E2E8F0',
          divider: '#E2E8F0',
        },
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        'card-sm': '16px',
        'card': '16px',
        'card-lg': '24px',
      },
      borderColor: {
        'glass-border': 'rgba(15, 35, 61, 0.08)',
        'glass-bright': 'rgba(255, 255, 255, 0.90)',
        'gold-accent': '#C6A66B',
        'azure-accent': '#2D89EF',
      },
      fontFamily: {
        brand: ['Cinzel', 'Playfair Display', 'serif'],
        serif: ['Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'Cinzel', 'serif'],
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
        // Elegant architectural shadows
        'card': '0 4px 20px -2px rgba(15, 35, 61, 0.05)',
        'card-hover': '0 12px 30px -4px rgba(15, 35, 61, 0.12)',
        'hover': '0 12px 30px -4px rgba(15, 35, 61, 0.12)',
        'glass': '0 8px 32px 0 rgba(15, 35, 61, 0.06)',
        'glow-gold': '0 8px 24px rgba(198, 166, 107, 0.25)',
        'glow-white': '0 10px 30px rgba(255, 255, 255, 0.4)',
        'luxe-deep': '0 20px 50px rgba(15, 35, 61, 0.10)',
      },
    },
  },
  plugins: [],
};
