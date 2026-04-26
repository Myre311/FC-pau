/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // LIGHT MODE - Palette Pau FC Officielle
        // Couleurs principales
        'pau-blue': '#1E40AF',      // Bleu primaire club (bleu 700)
        'pau-blue-dark': '#1E3A8A', // Bleu foncé (bleu 800)
        'pau-blue-light': '#3B82F6', // Bleu clair (bleu 500)

        // Backgrounds
        white: '#FFFFFF',
        'gray-50': '#F9FAFB',
        'gray-100': '#F3F4F6',
        'gray-200': '#E5E7EB',

        // Textes
        'gray-900': '#111827',
        'gray-800': '#1F2937',
        'gray-700': '#374151',
        'gray-600': '#4B5563',
        'gray-500': '#6B7280',
        'gray-400': '#9CA3AF',
        'gray-300': '#D1D5DB',

        // Accents bleu
        'blue-50': '#EFF6FF',
        'blue-100': '#DBEAFE',
        'blue-200': '#BFDBFE',
        'blue-600': '#2563EB',

        // Accents fonctionnels
        'red-500': '#EF4444',
        'green-500': '#10B981',
        'orange-500': '#F97316',

        // Aliases legacy (pour compatibilité)
        primaire: '#1E40AF',
        accent: '#3B82F6',
      },
      fontFamily: {
        display: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-roboto-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.03em',
        'display-tight': '-0.02em',
        'display-base': '-0.01em',
      },
      lineHeight: {
        crush: '0.88',
        'crush-medium': '0.92',
        'crush-soft': '1.05',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '104': '26rem',
        '128': '32rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.75s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in': 'fadeIn 0.6s ease-out both',
        'count-up': 'countUp 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'slide-in-right': 'slideInRight 0.7s cubic-bezier(0.16,1,0.3,1) both',
        'slide-in-left': 'slideInLeft 0.7s cubic-bezier(0.16,1,0.3,1) both',
        'slide-x': 'slideX 0.85s cubic-bezier(0.16,1,0.3,1) both',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.16,1,0.3,1) both',
        float: 'float 7s ease-in-out infinite',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
        shimmer: 'shimmer 5s linear infinite',
        'shimmer-fast': 'shimmer 3.5s linear infinite',
        marquee: 'marquee 22s linear infinite',
        'marquee-slow': 'marquee 45s linear infinite',
        ripple: 'ripple 0.6s ease-out',
        countdown: 'countdown 1s steps(1) infinite',
        'cascade-1': 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.05s both',
        'cascade-2': 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.10s both',
        'cascade-3': 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.15s both',
        'cascade-4': 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.20s both',
        'cascade-5': 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.25s both',
      },
      boxShadow: {
        'blue-soft': '0 4px 20px rgba(30, 64, 175, 0.15)',
        'blue-medium': '0 8px 30px rgba(30, 64, 175, 0.25)',
        'blue-strong': '0 12px 40px rgba(30, 64, 175, 0.35)',
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'focus-ring': '0 0 0 3px rgba(59, 130, 246, 0.3)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};
