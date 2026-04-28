'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/format';

export function POSInterface() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Charger les produits au montage
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await fetch('/api/admin/pos/products');
      const { data } = await res.json();
      setProducts(data || []);
    } catch (err) {
      console.error('Erreur chargement produits:', err);
    }
  };

  const addToCart = (variant, product) => {
    const existing = cart.find((item) => item.variantId === variant.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.variantId === variant.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          variantId: variant.id,
          productName: product.name,
          variantLabel: variant.size || variant.color || 'Standard',
          sku: variant.sku,
          unitPrice: variant.priceOverride || product.basePrice,
          quantity: 1,
          available: (variant.stockItem?.onHand || 0) - (variant.stockItem?.reserved || 0),
        },
      ]);
    }
  };

  const removeFromCart = (variantId) => {
    setCart(cart.filter((item) => item.variantId !== variantId));
  };

  const updateQuantity = (variantId, delta) => {
    setCart(
      cart.map((item) => {
        if (item.variantId === variantId) {
          const newQty = Math.max(1, Math.min(item.available, item.quantity + delta));
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const total = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch('/api/admin/pos/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          paymentMethod,
        }),
      });

      const { data, error } = await res.json();
      if (!res.ok || error) {
        throw new Error(error || 'Erreur lors de l\'encaissement');
      }

      // Succès
      setSuccess(true);
      setCart([]);
      loadProducts(); // Recharger pour mettre à jour le stock

      // Masquer le message de succès après 3 secondes
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.variants.some((v) => v.sku.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      {/* Catalogue produits */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Rechercher produit ou SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded border border-pau-primary/20 bg-white px-4 py-2.5 text-sm text-pau-primary placeholder:text-pau-primary/40 focus:border-pau-yellow focus:outline-none"
          />
          <span className="font-mono text-xs text-pau-primary/60">
            {filteredProducts.length} produits
          </span>
        </div>

        <div className="max-h-[600px] space-y-3 overflow-y-auto rounded border border-pau-primary/10 bg-white p-4">
          {filteredProducts.length === 0 ? (
            <p className="py-10 text-center font-mono text-xs uppercase tracking-wider text-pau-primary/40">
              Aucun produit trouvé
            </p>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="space-y-2 border-b border-pau-primary/5 pb-3 last:border-0"
              >
                <h3 className="font-display text-sm uppercase text-pau-primary">
                  {product.name}
                </h3>
                <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                  {product.variants.map((variant) => {
                    const available =
                      (variant.stockItem?.onHand || 0) - (variant.stockItem?.reserved || 0);
                    const isOutOfStock = available <= 0;
                    return (
                      <button
                        key={variant.id}
                        onClick={() => !isOutOfStock && addToCart(variant, product)}
                        disabled={isOutOfStock}
                        className={`rounded border p-2 text-left transition-colors ${
                          isOutOfStock
                            ? 'cursor-not-allowed border-pau-primary/10 bg-pau-primary/5 opacity-50'
                            : 'border-pau-primary/20 bg-white hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-mono text-xs text-pau-primary">
                              {variant.size || variant.color || 'Standard'}
                            </p>
                            <p className="font-mono text-[10px] text-pau-primary/50">
                              SKU {variant.sku}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-mono text-xs font-bold text-pau-yellow">
                              {formatPrice(variant.priceOverride || product.basePrice)}
                            </p>
                            <p
                              className={`font-mono text-[10px] ${
                                available <= 3 ? 'text-red-500' : 'text-pau-primary/50'
                              }`}
                            >
                              Stock: {available}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Panier et encaissement */}
      <div className="space-y-4">
        <div className="rounded border border-pau-primary/10 bg-white p-4">
          <h2 className="mb-4 font-mono text-xs uppercase tracking-wider text-pau-yellow">
            Panier · {cart.length} article{cart.length > 1 ? 's' : ''}
          </h2>

          {cart.length === 0 ? (
            <p className="py-10 text-center font-mono text-xs text-pau-primary/40">
              Panier vide
            </p>
          ) : (
            <ul className="mb-4 max-h-[300px] space-y-2 overflow-y-auto">
              {cart.map((item) => (
                <li
                  key={item.variantId}
                  className="rounded border border-pau-primary/10 bg-pau-primary/5 p-3"
                >
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-sans text-sm text-pau-primary">
                        {item.productName}
                      </p>
                      <p className="font-mono text-[10px] text-pau-primary/60">
                        {item.variantLabel}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.variantId)}
                      className="text-pau-primary/40 transition-colors hover:text-red-500"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.variantId, -1)}
                        className="flex h-6 w-6 items-center justify-center rounded border border-pau-primary/20 text-pau-primary  hover:bg-pau-yellow hover:text-pau-night"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-mono text-sm text-pau-primary">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.variantId, 1)}
                        disabled={item.quantity >= item.available}
                        className="flex h-6 w-6 items-center justify-center rounded border border-pau-primary/20 text-pau-primary  hover:bg-pau-yellow hover:text-pau-night disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-mono text-sm font-bold text-pau-yellow">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="border-t border-pau-primary/10 pt-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-pau-primary/60">
                Total
              </span>
              <span className="font-display text-2xl font-bold text-pau-yellow">
                {formatPrice(total)}
              </span>
            </div>

            <div className="mb-4 space-y-2">
              <label className="block font-mono text-[10px] uppercase tracking-wider text-pau-primary/60">
                Mode de paiement
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'card', label: 'CB' },
                  { value: 'cash', label: 'Espèces' },
                  { value: 'check', label: 'Chèque' },
                ].map((method) => (
                  <button
                    key={method.value}
                    onClick={() => setPaymentMethod(method.value)}
                    className={`rounded border py-2 font-mono text-xs uppercase transition-colors ${
                      paymentMethod === method.value
                        ? 'border-pau-yellow bg-pau-yellow text-pau-night'
                        : 'border-pau-primary/20 text-pau-primary '
                    }`}
                  >
                    {method.label}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleCheckout}
              disabled={cart.length === 0 || loading}
              variant="primary"
              size="lg"
              className="w-full"
            >
              {loading ? 'Encaissement...' : `Encaisser ${formatPrice(total)}`}
            </Button>

            {success && (
              <div className="mt-3 rounded border border-green-500/30 bg-green-500/10 p-3 text-center">
                <p className="font-mono text-xs uppercase tracking-wider text-green-600">
                  Vente enregistrée
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
