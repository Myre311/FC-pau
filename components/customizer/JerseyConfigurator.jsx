'use client';

import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { useCart } from '@/stores/cart';
import { Button } from '@/components/ui/Button';
import { JerseyScene2DFallback } from '@/components/customizer/JerseyScene2DFallback';
import {
  JERSEY_FONTS,
  MAX_NAME_LENGTH,
  MIN_NUMBER,
  MAX_NUMBER,
  sanitizeJerseyName,
  sanitizeJerseyNumber,
} from '@/lib/customization';
import { formatPrice } from '@/lib/format';

// Le composant Three.js est importé dynamiquement sans SSR
// (react-three-fiber accède à window au mount).
const JerseyScene = dynamic(
  () => import('@/components/customizer/JerseyScene').then((m) => m.JerseyScene),
  { ssr: false, loading: () => <SceneSkeleton /> },
);

// =====================================================================
// Configurateur 3D — wrapper client.
// 3 colonnes desktop : preview 3D / form / récap. Empilé en mobile.
// =====================================================================

const FLOCKING_PRICE = 1500; // 15€ supplément flocage

export function JerseyConfigurator({ product, variants }) {
  // Détection WebGL au mount — fallback 2D si KO.
  const [webglOk, setWebglOk] = useState(true);
  useEffect(() => {
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl') || c.getContext('experimental-webgl');
    setWebglOk(Boolean(gl));
  }, []);

  const inStock = variants.filter(
    (v) => (v.stockItem?.onHand ?? 0) - (v.stockItem?.reserved ?? 0) > 0,
  );

  const [variantId, setVariantId] = useState(inStock[0]?.id ?? variants[0]?.id ?? null);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [font, setFont] = useState('club');
  const [saving, setSaving] = useState(false);
  const [savedId, setSavedId] = useState(null);
  const [error, setError] = useState(null);

  const addItem = useCart((s) => s.addItem);

  const sanitizedName = useMemo(() => sanitizeJerseyName(name), [name]);
  const sanitizedNumber = useMemo(() => sanitizeJerseyNumber(number), [number]);

  const selectedVariant = variants.find((v) => v.id === variantId);
  const unitPrice = (selectedVariant?.priceOverride ?? product.basePrice) + FLOCKING_PRICE;
  const available =
    (selectedVariant?.stockItem?.onHand ?? 0) -
    (selectedVariant?.stockItem?.reserved ?? 0);

  const SceneComponent = webglOk ? JerseyScene : JerseyScene2DFallback;

  async function saveCustomization() {
    setError(null);
    setSaving(true);
    try {
      const res = await fetch('/api/customizations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productSlug: product.slug,
          variantId: selectedVariant?.id,
          name: sanitizedName || null,
          number: sanitizedNumber,
          font,
        }),
      });
      const { data, error: apiError } = await res.json();
      if (!res.ok || !data) throw new Error(apiError ?? 'Erreur serveur');
      setSavedId(data.id);
      return data.id;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setSaving(false);
    }
  }

  async function addToCartWithFlocking() {
    if (!selectedVariant || available <= 0) return;
    const id = savedId ?? (await saveCustomization());
    if (!id) return;
    addItem({
      variantId: selectedVariant.id,
      productSlug: product.slug,
      productName: `${product.name} (flocage)`,
      variantLabel: [
        selectedVariant.size && `Taille ${selectedVariant.size}`,
        sanitizedName || sanitizedNumber != null ? `${sanitizedName}${sanitizedNumber != null ? ` · ${sanitizedNumber}` : ''}` : null,
      ]
        .filter(Boolean)
        .join(' · ') || null,
      unitPrice,
      image: product.images?.[0] ?? null,
      customizationId: id,
      quantity: 1,
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
      {/* Preview 3D */}
      <div className="flex flex-col">
        <div className="aspect-[4/5] w-full border border-blanc/10 bg-nuit lg:aspect-auto lg:flex-1 lg:min-h-[600px]">
          <SceneComponent name={sanitizedName} number={sanitizedNumber} font={font} />
        </div>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/40">
          {webglOk ? 'Aperçu 3D · Glissez pour faire pivoter' : 'Aperçu 2D (WebGL indisponible)'}
        </p>
      </div>

      {/* Formulaire */}
      <div className="space-y-6">
        <div>
          <p className="badge-mono">Configurateur flocage</p>
          <h2 className="mt-3 font-display text-4xl uppercase leading-crush tracking-tightest text-blanc md:text-5xl">
            Personnalisez
          </h2>
        </div>

        {/* Taille */}
        <div>
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/60">
            Taille
          </p>
          <div className="flex flex-wrap gap-2">
            {variants.map((v) => {
              const stock = (v.stockItem?.onHand ?? 0) - (v.stockItem?.reserved ?? 0);
              const disabled = stock <= 0;
              const active = v.id === variantId;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVariantId(v.id)}
                  disabled={disabled}
                  className={`min-w-12 px-3 py-2 font-mono text-xs uppercase tracking-[0.2em] transition-colors ${
                    active
                      ? 'border border-jaune bg-jaune text-nuit'
                      : 'border border-blanc/15 text-blanc hover:border-jaune'
                  } ${disabled ? 'cursor-not-allowed opacity-30 line-through hover:border-blanc/15' : ''}`}
                >
                  {v.size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Nom */}
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/60">
            Nom (max {MAX_NAME_LENGTH} caractères)
          </span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={MAX_NAME_LENGTH}
            placeholder="BERNARD"
            className="mt-2 block h-11 w-full border border-blanc/15 bg-transparent px-3 font-display text-xl uppercase tracking-tightest text-blanc outline-none transition-colors focus:border-jaune"
          />
          <span className="mt-1 block font-mono text-[10px] tracking-[0.15em] text-blanc/40">
            {sanitizedName.length} / {MAX_NAME_LENGTH} · majuscules sans accents
          </span>
        </label>

        {/* Numéro */}
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/60">
            Numéro ({MIN_NUMBER}–{MAX_NUMBER})
          </span>
          <input
            type="number"
            min={MIN_NUMBER}
            max={MAX_NUMBER}
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="10"
            className="mt-2 block h-11 w-full border border-blanc/15 bg-transparent px-3 font-display text-xl text-blanc outline-none transition-colors focus:border-jaune"
          />
        </label>

        {/* Police */}
        <div>
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/60">
            Police
          </p>
          <div className="space-y-2">
            {JERSEY_FONTS.map((f) => {
              const active = f.value === font;
              return (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setFont(f.value)}
                  className={`block w-full border p-3 text-left transition-colors ${
                    active ? 'border-jaune bg-jaune/10' : 'border-blanc/15 hover:border-blanc/30'
                  }`}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc">
                    {f.label}
                    {active && <span className="ml-2 text-jaune">●</span>}
                  </p>
                  <p className="mt-1 font-sans text-xs text-blanc/60">{f.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Récap prix + actions */}
        <div className="space-y-4 border-t border-blanc/10 pt-6">
          <dl className="space-y-1 font-mono text-xs">
            <Line label="Maillot" value={formatPrice(selectedVariant?.priceOverride ?? product.basePrice)} />
            <Line label="Flocage personnalisé" value={`+ ${formatPrice(FLOCKING_PRICE)}`} />
            <Line label="Total" value={formatPrice(unitPrice)} bold />
          </dl>

          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/40">
            {available <= 0
              ? 'Taille épuisée'
              : available <= 5
                ? `Plus que ${available} en stock`
                : 'En stock · livré sous 7-10 jours'}
          </p>

          {error && (
            <p className="border border-jaune/40 bg-jaune/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-jaune">
              {error}
            </p>
          )}

          <Button
            onClick={addToCartWithFlocking}
            disabled={available <= 0 || saving}
            variant="primary"
            size="lg"
            cornerCut
            className="w-full"
          >
            {saving ? 'Enregistrement…' : `Ajouter au panier · ${formatPrice(unitPrice)}`}
          </Button>

          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-blanc/40">
            Le flocage personnalisé est non-remboursable (CGV art. 6 — exception
            droit de rétractation pour produits sur-mesure).
          </p>

          <Link
            href={`/boutique/${product.slug}`}
            className="block text-center font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/50 transition-colors hover:text-jaune"
          >
            ← Retour à la fiche produit
          </Link>
        </div>
      </div>
    </div>
  );
}

function Line({ label, value, bold }) {
  return (
    <div className="flex items-center justify-between border-b border-blanc/5 py-1">
      <dt className="text-blanc/60">{label}</dt>
      <dd className={bold ? 'text-blanc' : 'text-blanc/85'}>{value}</dd>
    </div>
  );
}

function SceneSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-blanc/40">
        Chargement de la scène 3D…
      </p>
    </div>
  );
}
