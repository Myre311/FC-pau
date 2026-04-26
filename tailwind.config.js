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
        // Couleurs principales
        nuit: '#04091D',
        primaire: '#1A1D38',
        jaune: '#FFCC00',
        dore: '#CBA74D',
        blanc: '#FFFFFF',

        // Nuances nuit
        n2: '#080C1A',
        n3: '#0D1228',
        n4: '#060918',
        'nuit-light': '#0A1030',

        // Nuances jaune (interactions)
        'jaune-light': '#FFD633',
        'jaune-dark': '#E6B800',
        'jaune-glow': 'rgba(255, 204, 0, 0.15)',

        // Nuances doré (partenaires uniquement)
        'dore-light': '#D8B85A',
        'dore-dark': '#B39A3D',

        // Blanc nuancé (accessibilité)
        'blanc-95': 'rgba(255, 255, 255, 0.95)',
        'blanc-85': 'rgba(255, 255, 255, 0.85)',
        'blanc-70': 'rgba(255, 255, 255, 0.70)',
        'blanc-60': 'rgba(255, 255, 255, 0.60)',
        'blanc-40': 'rgba(255, 255, 255, 0.40)',
        'blanc-20': 'rgba(255, 255, 255, 0.20)',
        'blanc-15': 'rgba(255, 255, 255, 0.15)',
        'blanc-10': 'rgba(255, 255, 255, 0.10)',
        'blanc-05': 'rgba(255, 255, 255, 0.05)',

        // Accents fonctionnels
        'accent-red': '#FF4444',
        'accent-green': '#00D084',
        'accent-blue': '#3B82F6',
      },
      fontFamily: {
        display: ['var(--font-big-shoulders)', 'Impact', 'sans-serif'],
        sans: ['var(--font-instrument-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'ui-monospace', 'monospace'],
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
        glow: 'glow 2.5s ease-in-out infinite',
        'logo-glow': 'logoGlow 1.8s ease-in-out infinite',
        shimmer: 'shimmer 5s linear infinite',
        'shimmer-fast': 'shimmer 3.5s linear infinite',
        marquee: 'marquee 22s linear infinite',
        'marquee-slow': 'marquee 45s linear infinite',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        flicker: 'flicker 4s linear infinite',
        'loader-fill': 'loaderFill 1.4s cubic-bezier(0.16,1,0.3,1) 0.2s forwards',
        ripple: 'ripple 0.6s ease-out',
        'cascade-1': 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.05s both',
        'cascade-2': 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.10s both',
        'cascade-3': 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.15s both',
        'cascade-4': 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.20s both',
        'cascade-5': 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.25s both',
      },
      boxShadow: {
        'y-soft': '0 6px 28px rgba(255, 204, 0, 0.28)',
        'y-strong': '0 12px 38px rgba(255, 204, 0, 0.44)',
        'y-massive': '0 18px 55px rgba(255, 204, 0, 0.55), 0 0 0 1px rgba(255, 204, 0, 0.12)',
        'g-soft': '0 6px 28px rgba(203, 167, 77, 0.28)',
        'card-hover': '0 28px 65px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,204,0,0.15)',
        'card-hover-strong': '0 35px 85px rgba(0,0,0,0.7), 0 0 0 2px rgba(255,204,0,0.25)',
        'focus-ring': '0 0 0 4px rgba(255, 204, 0, 0.2)',
        'focus-ring-strong': '0 0 0 6px rgba(255, 204, 0, 0.25)',
        'glow-ambient': '0 0 35px rgba(255, 204, 0, 0.15)',
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
