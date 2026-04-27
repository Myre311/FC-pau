'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ImageUpload } from '@/components/admin/ImageUpload';

export function ArticleForm({ article, action, deleteAction }) {
  const [slug, setSlug] = useState(article?.slug || '');
  const [title, setTitle] = useState(article?.title || '');
  const [coverImageUrl, setCoverImageUrl] = useState(article?.coverImageUrl || '');

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!article) {
      setSlug(generateSlug(newTitle));
    }
  };

  return (
    <form action={action} className="space-y-8">
      {article && <input type="hidden" name="id" value={article.id} />}

      <div className="space-y-6 rounded-lg border border-blanc/10 bg-primaire/30 p-6">
        <h2 className="font-display text-xl uppercase text-blanc">
          Informations générales
        </h2>

        <div>
          <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-blanc/60">
            Titre *
          </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleTitleChange}
            required
            className="w-full rounded border border-blanc/20 bg-nuit px-4 py-3 font-sans text-blanc placeholder-blanc/40 focus:border-jaune focus:outline-none"
            placeholder="Titre de l'article"
          />
        </div>

        <div>
          <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-blanc/60">
            Slug (URL) *
          </label>
          <input
            type="text"
            name="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            className="w-full rounded border border-blanc/20 bg-nuit px-4 py-3 font-mono text-sm text-blanc placeholder-blanc/40 focus:border-jaune focus:outline-none"
            placeholder="mon-article"
          />
          <p className="mt-1 font-mono text-xs text-blanc/40">
            URL: /actualites/{slug || 'mon-article'}
          </p>
        </div>

        <div>
          <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-blanc/60">
            Extrait (optionnel)
          </label>
          <textarea
            name="excerpt"
            defaultValue={article?.excerpt || ''}
            rows={3}
            className="w-full rounded border border-blanc/20 bg-nuit px-4 py-3 font-sans text-blanc placeholder-blanc/40 focus:border-jaune focus:outline-none"
            placeholder="Court résumé de l'article..."
          />
        </div>

        <div>
          <input type="hidden" name="coverImageUrl" value={coverImageUrl} />
          <ImageUpload
            currentUrl={coverImageUrl}
            onUploadComplete={(url) => setCoverImageUrl(url)}
            bucket="articles"
            folder="covers"
            label="Image de couverture (1200x630px recommandé)"
          />
        </div>
      </div>

      <div className="space-y-6 rounded-lg border border-blanc/10 bg-primaire/30 p-6">
        <h2 className="font-display text-xl uppercase text-blanc">Contenu</h2>

        <div>
          <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-blanc/60">
            Contenu *
          </label>
          <textarea
            name="body"
            defaultValue={article?.body || ''}
            required
            rows={15}
            className="w-full rounded border border-blanc/20 bg-nuit px-4 py-3 font-sans text-blanc placeholder-blanc/40 focus:border-jaune focus:outline-none"
            placeholder="Contenu de l'article (Markdown supporté)..."
          />
        </div>
      </div>

      <div className="space-y-6 rounded-lg border border-blanc/10 bg-primaire/30 p-6">
        <h2 className="font-display text-xl uppercase text-blanc">
          Publication
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-blanc/60">
              Catégorie *
            </label>
            <select
              name="category"
              defaultValue={article?.category || 'other'}
              required
              className="w-full rounded border border-blanc/20 bg-nuit px-4 py-3 font-sans text-blanc focus:border-jaune focus:outline-none"
            >
              <option value="matchday">Match</option>
              <option value="club">Club</option>
              <option value="transfer">Transfert</option>
              <option value="foundation">Fondation</option>
              <option value="other">Autre</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-blanc/60">
              Date de publication
            </label>
            <input
              type="datetime-local"
              name="publishedAt"
              defaultValue={
                article?.publishedAt
                  ? new Date(article.publishedAt).toISOString().slice(0, 16)
                  : new Date().toISOString().slice(0, 16)
              }
              className="w-full rounded border border-blanc/20 bg-nuit px-4 py-3 font-sans text-blanc focus:border-jaune focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="featured"
            id="featured"
            defaultChecked={article?.featured}
            className="h-4 w-4 rounded border-blanc/20 bg-nuit text-jaune focus:ring-jaune"
          />
          <label htmlFor="featured" className="font-mono text-xs uppercase tracking-wider text-blanc/60">
            Mettre en avant (À la une)
          </label>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-blanc/10 pt-6">
        {deleteAction && (
          <form action={deleteAction}>
            <input type="hidden" name="id" value={article.id} />
            <Button
              type="submit"
              variant="ghost"
              size="md"
              onClick={(e) => {
                if (!confirm('Supprimer cet article ?')) {
                  e.preventDefault();
                }
              }}
            >
              Supprimer
            </Button>
          </form>
        )}

        <div className="ml-auto flex gap-3">
          <Button type="submit" variant="primary" size="md" cornerCut>
            {article ? 'Mettre à jour' : 'Créer'}
          </Button>
        </div>
      </div>
    </form>
  );
}
