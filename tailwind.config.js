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
      clipPath: {
        'corner-cut': 'polygon(0 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%)',
      },
    },
  },
  plugins: [],
};
