'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal - Animation au scroll minimaliste
 * Fade in + translate Y subtil quand l'élément entre dans le viewport
 *
 * @param {ReactNode} children - Contenu à animer
 * @param {number} delay - Délai en ms (pour stagger)
 * @param {string} className - Classes Tailwind supplémentaires
 */
export function ScrollReveal({ children, delay = 0, className = '' }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Une fois visible, on arrête d'observer
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1, // Trigger quand 10% de l'élément est visible
        rootMargin: '0px 0px -50px 0px', // Trigger légèrement avant d'entrer
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/**
 * ScrollRevealList - Stagger animation pour listes/grilles
 * Chaque enfant apparaît avec un délai croissant
 */
export function ScrollRevealList({ children, staggerDelay = 50, className = '' }) {
  return (
    <div className={className}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <ScrollReveal key={index} delay={index * staggerDelay}>
              {child}
            </ScrollReveal>
          ))
        : children}
    </div>
  );
}
