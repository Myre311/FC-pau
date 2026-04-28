'use client';

import { useState } from 'react';
import Image from 'next/image';

export function VideoGrid({ videos }) {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onClick={() => setSelectedVideo(video)}
          />
        ))}
      </div>

      {/* Modal Player */}
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </>
  );
}

function VideoCard({ video, onClick }) {
  // Thumbnail YouTube par défaut si pas de thumbnail custom
  const thumbnail =
    video.thumbnailUrl ||
    (video.provider === 'youtube' && video.videoId
      ? `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`
      : 'https://placehold.co/640x360/1E40AF/FFFFFF?text=Pau+FC');

  const CATEGORY_LABELS = {
    match_highlights: 'Résumé match',
    interviews: 'Interview',
    training: 'Entraînement',
    behind_scenes: 'Coulisses',
    academy: 'Academy',
    other: 'Vidéo',
  };

  return (
    <button
      onClick={onClick}
      className="group overflow-hidden border-2 border-gray-300 bg-white text-left transition-all hover:border-pau-night"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-gray-900">
        <Image
          src={thumbnail}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-pau-night/40 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex h-16 w-16 items-center justify-center border-4 border-pau-yellow bg-pau-yellow/20">
            <svg className="h-8 w-8 text-pau-yellow" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        {video.duration && (
          <div className="absolute bottom-2 right-2 bg-pau-night/90 px-2 py-1 font-mono text-xs font-bold text-white">
            {formatDuration(video.duration)}
          </div>
        )}
        {video.featured && (
          <div className="absolute left-2 top-2 bg-pau-yellow px-2 py-1 font-mono text-xs font-bold uppercase text-pau-night">
            ⭐ À la une
          </div>
        )}
      </div>

      {/* Infos */}
      <div className="p-4">
        <div className="mb-2">
          <span className="inline-block border border-gray-300 px-2 py-1 font-mono text-xs font-bold uppercase tracking-wide text-gray-600">
            {CATEGORY_LABELS[video.category]}
          </span>
        </div>
        <h3 className="mb-2 font-display text-lg font-bold uppercase leading-tight text-pau-night group-hover:text-pau-yellow">
          {video.title}
        </h3>
        {video.description && (
          <p className="line-clamp-2 text-sm text-gray-700">{video.description}</p>
        )}
        {video.views > 0 && (
          <p className="mt-3 font-mono text-xs text-gray-500">
            ️ {video.views.toLocaleString()} vues
          </p>
        )}
      </div>
    </button>
  );
}

function VideoModal({ video, onClose }) {
  // URL embed selon le provider
  const getEmbedUrl = () => {
    if (video.provider === 'youtube' && video.videoId) {
      return `https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0`;
    }
    if (video.provider === 'vimeo' && video.videoId) {
      return `https://player.vimeo.com/video/${video.videoId}?autoplay=1`;
    }
    return video.videoUrl;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-pau-night/95 p-4"
      onClick={onClose}
    >
      <div className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="mb-4 ml-auto flex h-12 w-12 items-center justify-center border-2 border-white text-white transition-colors hover:bg-white hover:text-pau-night"
          aria-label="Fermer"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Player */}
        <div className="aspect-video border-4 border-pau-yellow bg-black">
          <iframe
            src={getEmbedUrl()}
            title={video.title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Infos */}
        <div className="mt-4 border-t-2 border-white/20 pt-4">
          <h2 className="font-display text-2xl font-bold uppercase text-white">
            {video.title}
          </h2>
          {video.description && (
            <p className="mt-2 text-white/80">{video.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
