/**
 * Utilitaires pour optimisation images
 */

/**
 * Génère une data URL placeholder blur pour Image next/image
 * @param {number} width - Largeur
 * @param {number} height - Hauteur
 * @returns {string} Data URL SVG
 */
export function shimmer(width, height) {
  return `
<svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#04091D" offset="20%" />
      <stop stop-color="#1A1D38" offset="50%" />
      <stop stop-color="#04091D" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="#04091D" />
  <rect id="r" width="${width}" height="${height}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${width}" to="${width}" dur="1s" repeatCount="indefinite"  />
</svg>`;
}

/**
 * Convertit SVG en data URL base64
 * @param {string} svg - SVG string
 * @returns {string} Data URL
 */
export function toBase64(str) {
  return typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);
}

/**
 * Génère un placeholder blur pour next/image
 * @param {number} w - Largeur
 * @param {number} h - Hauteur
 * @returns {string} Data URL complète
 */
export function getBlurDataURL(w = 700, h = 475) {
  const svg = shimmer(w, h);
  return `data:image/svg+xml;base64,${toBase64(svg)}`;
}

/**
 * Génère les sizes appropriés pour responsive images
 * @param {object} breakpoints - { mobile, tablet, desktop }
 * @returns {string} Sizes string pour next/image
 */
export function generateSizes(breakpoints = {}) {
  const defaults = {
    mobile: '100vw',
    tablet: '50vw',
    desktop: '33vw',
  };

  const sizes = { ...defaults, ...breakpoints };

  return `
    (max-width: 640px) ${sizes.mobile},
    (max-width: 1024px) ${sizes.tablet},
    ${sizes.desktop}
  `.trim();
}

/**
 * Optimise URL Unsplash avec paramètres de qualité
 * @param {string} url - URL Unsplash
 * @param {object} options - { width, height, quality, format }
 * @returns {string} URL optimisée
 */
export function optimizeUnsplashURL(url, options = {}) {
  const { width = 1200, height, quality = 85, format = 'auto' } = options;

  if (!url || !url.includes('unsplash.com')) return url;

  const params = new URLSearchParams();
  params.set('w', width);
  if (height) params.set('h', height);
  params.set('q', quality);
  params.set('fm', format);
  params.set('fit', 'crop');

  return `${url}?${params.toString()}`;
}
