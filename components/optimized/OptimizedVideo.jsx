'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Composant vidéo optimisé avec :
 * - Lazy loading via Intersection Observer
 * - Pause automatique quand hors viewport
 * - Preload metadata uniquement
 */
export function OptimizedVideo({
  src,
  poster,
  className = '',
  autoPlay = false,
  loop = false,
  muted = true,
  controls = false,
  ...props
}) {
  const videoRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);

          if (entry.isIntersecting && autoPlay) {
            video.play().catch(() => {
              // Autoplay bloqué par navigateur
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [autoPlay]);

  return (
    <video
      ref={videoRef}
      src={isInView ? src : undefined}
      poster={poster}
      className={className}
      autoPlay={false}
      loop={loop}
      muted={muted}
      controls={controls}
      playsInline
      preload="metadata"
      {...props}
    />
  );
}
