'use client';

import Image from 'next/image';
import { useState } from 'react';

/**
 * Composant Image optimisé avec :
 * - Lazy loading natif
 * - Placeholder blur durant chargement
 * - Formats AVIF/WebP automatiques
 * - Transition fade-in
 */
export function OptimizedImage({
  src,
  alt,
  className = '',
  priority = false,
  fill = false,
  sizes,
  width,
  height,
  objectFit = 'cover',
  quality = 85,
  ...props
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        sizes={sizes}
        quality={quality}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        className={`
          duration-500 ease-in-out
          ${isLoading ? 'scale-105 blur-sm' : 'scale-100 blur-0'}
          ${fill ? 'object-cover' : ''}
        `}
        style={!fill && objectFit ? { objectFit } : undefined}
        onLoad={() => setIsLoading(false)}
        {...props}
      />
    </div>
  );
}
