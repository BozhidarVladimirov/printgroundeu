import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E3A5F',
          50: '#E8EDF3',
          100: '#C5D3E3',
          200: '#9FB5CD',
          300: '#7897B7',
          400: '#5279A1',
          500: '#1E3A5F',
          600: '#1A3354',
          700: '#152B47',
          800: '#11233A',
          900: '#0C1B2D',
        },
        accent: {
          DEFAULT: '#F97316',
          50: '#FFF4EC',
          100: '#FFE4D1',
          200: '#FFC9A3',
          300: '#FFAD75',
          400: '#FF9247',
          500: '#F97316',
          600: '#CC5A10',
          700: '#99410B',
          800: '#662806',
          900: '#330F03',
        },
        surface: '#FFFFFF',
        background: '#FAFBFC',
        border: '#E2E8F0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-up': 'fadeUp 0.5s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
