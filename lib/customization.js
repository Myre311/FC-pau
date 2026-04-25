// Helpers pour le configurateur maillot.
// Génération de la texture canvas du flocage (nom + numéro) qui est
// projetée sur le dos du maillot 3D.

export const JERSEY_FONTS = [
  {
    value: 'club',
    label: 'Club',
    family: '"Big Shoulders Display", Impact, sans-serif',
    weight: '900',
    description: 'Police officielle Pau FC — condensée, musclée',
  },
  {
    value: 'stadium',
    label: 'Stadium',
    family: '"Instrument Sans", system-ui, sans-serif',
    weight: '700',
    description: 'Lisibilité maximum — favori des supporters',
  },
  {
    value: 'vintage',
    label: 'Vintage',
    family: '"DM Mono", ui-monospace, monospace',
    weight: '500',
    description: 'Hommage aux maillots historiques',
  },
];

export const MAX_NAME_LENGTH = 12;
export const MIN_NUMBER = 0;
export const MAX_NUMBER = 99;

export function fontByValue(value) {
  return JERSEY_FONTS.find((f) => f.value === value) ?? JERSEY_FONTS[0];
}

// Sanitise un nom de flocage : ASCII upper + tiret + apostrophe + espace
export function sanitizeJerseyName(input) {
  return (input ?? '')
    .toString()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // accents
    .toUpperCase()
    .replace(/[^A-Z0-9 \-']/g, '')
    .slice(0, MAX_NAME_LENGTH);
}

export function sanitizeJerseyNumber(input) {
  if (input === '' || input == null) return null;
  const n = Number(input);
  if (!Number.isInteger(n)) return null;
  if (n < MIN_NUMBER || n > MAX_NUMBER) return null;
  return n;
}

// Génère une CanvasTexture (passé à useEffect côté React) pour la
// décal au dos du maillot. Renvoie le canvas brut — le caller crée
// une THREE.CanvasTexture autour.
export function drawJerseyBackCanvas({
  canvas,
  name,
  number,
  font,
  bg = '#1A1D38',
  fg = '#FFFFFF',
  accent = '#FFCC00',
}) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  const fontDef = fontByValue(font);

  // Nom au-dessus
  if (name) {
    ctx.fillStyle = fg;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${fontDef.weight} ${Math.round(h * 0.13)}px ${fontDef.family}`;
    ctx.fillText(name, w / 2, h * 0.32);
  }

  // Numéro au centre-bas, énorme
  if (number != null) {
    ctx.fillStyle = accent;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${fontDef.weight} ${Math.round(h * 0.55)}px ${fontDef.family}`;
    ctx.fillText(String(number), w / 2, h * 0.62);
  }
}
