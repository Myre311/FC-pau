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
        nuit: '#04091D',
        primaire: '#1A1D38',
        jaune: '#FFCC00',
        dore: '#CBA74D',
        blanc: '#FFFFFF',
        n2: '#080C1A',
        n3: '#0D1228',
        n4: '#060918',
      },
      fontFamily: {
        display: ['var(--font-big-shoulders)', 'Impact', 'sans-serif'],
        sans: ['var(--font-instrument-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.06em',
      },
      lineHeight: {
        crush: '0.85',
      },
      animation: {
        'fade-up': 'fadeUp 0.75s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in': 'fadeIn 0.6s ease-out both',
        'count-up': 'countUp 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'slide-in-right': 'slideInRight 0.7s cubic-bezier(0.16,1,0.3,1) both',
        'slide-x': 'slideX 0.85s cubic-bezier(0.16,1,0.3,1) both',
        float: 'float 7s ease-in-out infinite',
        glow: 'glow 2.5s ease-in-out infinite',
        shimmer: 'shimmer 5s linear infinite',
        'shimmer-fast': 'shimmer 3.5s linear infinite',
        marquee: 'marquee 22s linear infinite',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
        flicker: 'flicker 4s linear infinite',
        'loader-fill': 'loaderFill 1.4s cubic-bezier(0.16,1,0.3,1) 0.2s forwards',
      },
      boxShadow: {
        'y-soft': '0 6px 28px rgba(255, 204, 0, 0.28)',
        'y-strong': '0 12px 38px rgba(255, 204, 0, 0.44)',
        'g-soft': '0 6px 28px rgba(203, 167, 77, 0.28)',
        'card-hover': '0 22px 55px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,204,0,0.07)',
      },
    },
  },
  plugins: [],
};
