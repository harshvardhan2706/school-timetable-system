import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        page: '#0F172A',
        surface: '#1E293B',
        panel: '#111827',
        accent: '#3B82F6',
        accent2: '#8B5CF6',
        surfaceLight: '#273449',
        text: '#F8FAFC',
        success: '#22C55E',
        warning: '#F59E0B',
      },
      boxShadow: {
        soft: '0 20px 50px rgba(15,23,42,0.26)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top, rgba(59,130,246,0.18), transparent 35%), radial-gradient(circle at 10% 20%, rgba(139,92,246,0.14), transparent 25%)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
