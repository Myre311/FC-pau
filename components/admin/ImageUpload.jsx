'use client';

import { useState } from 'react';
import Image from 'next/image';
import { createSupabaseClient } from '@/lib/supabase/client';

export function ImageUpload({
  currentUrl,
  onUploadComplete,
  bucket = 'images',
  folder = 'uploads',
  label = 'Image'
}) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentUrl);
  const [error, setError] = useState('');

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
      setError('Seuls les fichiers image sont acceptés');
      return;
    }

    // Vérifier la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('L\'image ne doit pas dépasser 5 MB');
      return;
    }

    setError('');
    setUploading(true);

    try {
      const supabase = createSupabaseClient();

      // Générer un nom de fichier unique
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      // Upload vers Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Obtenir l'URL publique
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      setPreview(publicUrl);
      onUploadComplete?.(publicUrl);

    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message || 'Erreur lors de l\'upload');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview('');
    onUploadComplete?.('');
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-gray-900 mb-2">
        {label}
      </label>

      {preview ? (
        <div className="relative">
          <div className="relative aspect-video w-full max-w-md overflow-hidden border border-gray-200/20 bg-pau-night">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="mt-2 px-4 py-2 text-sm bg-red-500/20 border border-red-500 text-red-500 hover:bg-red-500 hover:text-gray-900 transition-colors"
          >
            Supprimer l'image
          </button>
        </div>
      ) : (
        <div>
          <label className="flex flex-col items-center justify-center w-full max-w-md h-64 border-2 border-dashed border-gray-200/20 cursor-pointer hover:border-pau-yellow/50 transition-colors bg-pau-night/50">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-10 h-10 mb-3 text-gray-900/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-900/60">
                <span className="font-semibold">Cliquez pour uploader</span>
              </p>
              <p className="text-xs text-gray-900/40">
                PNG, JPG, GIF, WebP (max 5MB)
              </p>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
        </div>
      )}

      {uploading && (
        <div className="flex items-center gap-2 text-sm text-pau-yellow">
          <div className="h-4 w-4 animate-spin border-2 border-pau-yellow border-t-transparent rounded-full" />
          Upload en cours...
        </div>
      )}

      {error && (
        <div className="text-sm text-red-500">
          {error}
        </div>
      )}
    </div>
  );
}
