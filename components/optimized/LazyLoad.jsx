'use client';

import { Suspense, lazy } from 'react';

/**
 * Wrapper pour lazy loading de composants lourds
 * Avec fallback skeleton élégant
 */
export function LazyLoad({
  loader,
  fallback = <LazyLoadSkeleton />,
  ...props
}) {
  const Component = lazy(loader);

  return (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  );
}

/**
 * Skeleton générique durant chargement
 */
function LazyLoadSkeleton() {
  return (
    <div className="flex items-center justify-center bg-pau-night/5 p-12">
      <div className="space-y-4 text-center">
        <div className="mx-auto h-12 w-12 animate-spin border-4 border-pau-yellow border-t-transparent" />
        <p className="font-mono text-xs uppercase tracking-wider text-gray-500">
          Chargement...
        </p>
      </div>
    </div>
  );
}
