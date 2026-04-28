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
        // CHARTE OFFICIELLE PAU FC
        nuit: '#04091D',       // Header, footer, fond boutique (noir bleuté)
        primaire: '#1A1D38',   // Surfaces identité club (bleu nuit)
        jaune: '#FFCC00',      // Accent identité club (jaune vif)
        dore: '#CBA74D',       // EXCLUSIVEMENT espace partenaires
        blanc: '#FFFFFF',      // Fonds clairs

        // Variantes avec préfixe "pau-" pour clarté
        'pau-night': '#04091D',
        'pau-primary': '#1A1D38',
        'pau-primary-hover': '#252A4D',
        'pau-yellow': '#FFCC00',
        'pau-gold': '#CBA74D',
        'pau-gold-hover': '#B89640',
        'pau-white': '#FFFFFF',

        // BLEUS DOMINANTS (couleur principale)
        'blue-600': '#1E40AF',
        'blue-700': '#1E3A8A',
        'blue-800': '#1E3A8A',
        'blue-900': '#1E3A8A',

        // Nuances pour interfaces
        'nuit-soft': '#0A1028',
        'primaire-light': '#252A48',

        // Grays neutres
        'gray-50': '#F9FAFB',
        'gray-100': '#F3F4F6',
        'gray-200': '#E5E7EB',
        'gray-300': '#D1D5DB',
        'gray-400': '#9CA3AF',
        'gray-500': '#6B7280',
        'gray-600': '#4B5563',
        'gray-700': '#374151',
        'gray-800': '#1F2937',
        'gray-900': '#111827',

        // Fonctionnels
        'red-500': '#EF4444',
        'green-500': '#10B981',
        'orange-500': '#F97316',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
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
        'fade-in-up': 'fadeInUp 0.6s ease-out both',
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
