'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Hook pour détecter si un élément est visible dans le viewport
 * Utile pour lazy loading de composants ou animations au scroll
 */
export function useInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setIsInView(inView);

        if (inView && !hasBeenInView) {
          setHasBeenInView(true);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '50px',
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [hasBeenInView, options]);

  return { ref, isInView, hasBeenInView };
}

/**
 * Composant wrapper pour lazy load basé sur intersection
 */
export function IntersectionWrapper({
  children,
  fallback = null,
  once = true,
  className = '',
  ...options
}) {
  const { ref, isInView, hasBeenInView } = useInView(options);

  const shouldRender = once ? hasBeenInView : isInView;

  return (
    <div ref={ref} className={className}>
      {shouldRender ? children : fallback}
    </div>
  );
}
