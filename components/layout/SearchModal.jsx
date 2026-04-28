'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ articles: [], products: [], players: [] });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults({ articles: [], products: [], players: [] });
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (query.length >= 2) {
        setLoading(true);
        try {
          const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
          const data = await res.json();
          setResults(data.data || { articles: [], products: [], players: [] });
        } catch (error) {
          console.error('Search error:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setResults({ articles: [], products: [], players: [] });
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  if (!isOpen) return null;

  const totalResults = results.articles.length + results.products.length + results.players.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-pau-night/95 p-4 pt-20">
      <div className="w-full max-w-2xl border-2 border-pau-yellow bg-white">
        {/* Header */}
        <div className="flex items-center gap-4 border-b-2 border-gray-300 p-4">
          <svg className="h-6 w-6 text-pau-night" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un article, produit ou joueur..."
            className="flex-1 bg-transparent font-display text-lg font-bold uppercase text-pau-night placeholder-gray-400 outline-none"
          />
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center border-2 border-pau-night text-pau-night transition-colors hover:bg-pau-night hover:text-white"
            aria-label="Fermer"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Résultats */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {query.length < 2 ? (
            <p className="text-center font-mono text-sm text-gray-500">
              Tapez au moins 2 caractères pour rechercher
            </p>
          ) : loading ? (
            <p className="text-center font-mono text-sm text-gray-500">Recherche...</p>
          ) : totalResults === 0 ? (
            <p className="text-center font-mono text-sm text-gray-500">Aucun résultat trouvé</p>
          ) : (
            <div className="space-y-6">
              {/* Articles */}
              {results.articles.length > 0 && (
                <div>
                  <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-pau-night">
                    Actualités ({results.articles.length})
                  </h3>
                  <div className="space-y-2">
                    {results.articles.map((article) => (
                      <Link
                        key={article.id}
                        href={`/actualites/${article.slug}`}
                        onClick={onClose}
                        className="block border-l-4 border-transparent px-3 py-2 transition-colors  hover:bg-gray-50"
                      >
                        <p className="font-display text-sm font-bold uppercase text-pau-night">{article.title}</p>
                        <p className="mt-1 line-clamp-1 text-xs text-gray-600">{article.excerpt}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Produits */}
              {results.products.length > 0 && (
                <div>
                  <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-pau-night">
                    Boutique ({results.products.length})
                  </h3>
                  <div className="space-y-2">
                    {results.products.map((product) => (
                      <Link
                        key={product.id}
                        href={`/boutique/${product.slug}`}
                        onClick={onClose}
                        className="flex gap-3 border-l-4 border-transparent px-3 py-2 transition-colors  hover:bg-gray-50"
                      >
                        {product.images[0] && (
                          <div className="relative h-12 w-12 flex-shrink-0 border border-gray-200">
                            <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="font-display text-sm font-bold uppercase text-pau-night">{product.name}</p>
                          <p className="mt-1 font-mono text-xs font-bold text-pau-yellow">
                            {(product.basePrice / 100).toFixed(2)} €
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Joueurs */}
              {results.players.length > 0 && (
                <div>
                  <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-pau-night">
                    Équipe ({results.players.length})
                  </h3>
                  <div className="space-y-2">
                    {results.players.map((player) => (
                      <Link
                        key={player.id}
                        href={`/equipe#${player.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-3 border-l-4 border-transparent px-3 py-2 transition-colors  hover:bg-gray-50"
                      >
                        {player.photoUrl && (
                          <div className="relative h-12 w-12 flex-shrink-0 border border-gray-200">
                            <Image src={player.photoUrl} alt={`${player.firstName} ${player.lastName}`} fill className="object-cover" />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="font-display text-sm font-bold uppercase text-pau-night">
                            {player.shirtNumber && <span className="text-pau-yellow">#{player.shirtNumber} </span>}
                            {player.firstName} {player.lastName}
                          </p>
                          {player.position && (
                            <p className="mt-1 font-mono text-xs uppercase text-gray-600">{player.position}</p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
