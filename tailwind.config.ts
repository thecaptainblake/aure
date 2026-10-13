import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/composables/**/*.{js,ts}',
    './app/app.vue',
    './app/error.vue',
  ],
  theme: {
    extend: {
      colors: {
        bone: '#FAF8F5',
        ink: '#1A1A1A',
        warm: '#6B6661',
        gold: '#B08D57',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
      },
      transitionDuration: {
        250: '250ms',
      },
      maxWidth: {
        page: '72rem',
      },
      keyframes: {
        'drawer-in': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
      },
      animation: {
        'drawer-in': 'drawer-in 300ms ease-out',
      },
    },
  },
  plugins: [],
} satisfies Config
