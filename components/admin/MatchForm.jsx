'use client';

import { useState } from 'react';

export function MatchForm({ match, action, deleteAction }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const kickoffDate = match
    ? new Date(match.kickoffAt).toISOString().split('T')[0]
    : '';
  const kickoffTime = match
    ? new Date(match.kickoffAt).toTimeString().slice(0, 5)
    : '20:00';

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!confirm('Supprimer ce match définitivement ?')) return;
    setIsDeleting(true);
    const formData = new FormData();
    formData.set('id', match.id);
    await deleteAction(formData);
  };

  return (
    <div className="max-w-3xl">
      <form action={action} className="space-y-6 bg-white border border-pau-primary/10 p-8">
        {match && <input type="hidden" name="id" value={match.id} />}

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-pau-primary mb-2">
              Compétition *
            </label>
            <input
              type="text"
              name="competition"
              defaultValue={match?.competition}
              placeholder="Ligue 2 BKT"
              required
              className="w-full px-4 py-3 border border-pau-primary/20 focus:border-pau-yellow focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-pau-primary mb-2">
              Saison *
            </label>
            <input
              type="text"
              name="season"
              defaultValue={match?.season || '2025-2026'}
              placeholder="2025-2026"
              required
              className="w-full px-4 py-3 border border-pau-primary/20 focus:border-pau-yellow focus:outline-none"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-pau-primary mb-2">
              Date du match *
            </label>
            <input
              type="date"
              name="kickoffDate"
              defaultValue={kickoffDate}
              required
              className="w-full px-4 py-3 border border-pau-primary/20 focus:border-pau-yellow focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-pau-primary mb-2">
              Heure *
            </label>
            <input
              type="time"
              name="kickoffTime"
              defaultValue={kickoffTime}
              required
              className="w-full px-4 py-3 border border-pau-primary/20 focus:border-pau-yellow focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-pau-primary mb-2">
            Adversaire *
          </label>
          <input
            type="text"
            name="opponent"
            defaultValue={match?.opponent}
            placeholder="Paris FC"
            required
            className="w-full px-4 py-3 border border-pau-primary/20 focus:border-pau-yellow focus:outline-none"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-pau-primary mb-2">
              Lieu *
            </label>
            <select
              name="isHome"
              defaultValue={match?.isHome?.toString() || 'true'}
              required
              className="w-full px-4 py-3 border border-pau-primary/20 focus:border-pau-yellow focus:outline-none"
            >
              <option value="true">Domicile</option>
              <option value="false">Extérieur</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-pau-primary mb-2">
              Stade
            </label>
            <input
              type="text"
              name="venue"
              defaultValue={match?.venue || 'Nouste Camp'}
              placeholder="Nouste Camp"
              className="w-full px-4 py-3 border border-pau-primary/20 focus:border-pau-yellow focus:outline-none"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-pau-primary mb-2">
              Statut *
            </label>
            <select
              name="status"
              defaultValue={match?.status || 'scheduled'}
              required
              className="w-full px-4 py-3 border border-pau-primary/20 focus:border-pau-yellow focus:outline-none"
            >
              <option value="scheduled">Programmé</option>
              <option value="live">En cours</option>
              <option value="played">Terminé</option>
              <option value="postponed">Reporté</option>
              <option value="cancelled">Annulé</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-pau-primary mb-2">
              Diffuseur
            </label>
            <input
              type="text"
              name="broadcaster"
              defaultValue={match?.broadcaster}
              placeholder="beIN Sports 1"
              className="w-full px-4 py-3 border border-pau-primary/20 focus:border-pau-yellow focus:outline-none"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-pau-primary mb-2">
              Score Pau (si joué)
            </label>
            <input
              type="number"
              name="homeScore"
              defaultValue={match?.homeScore ?? ''}
              min="0"
              className="w-full px-4 py-3 border border-pau-primary/20 focus:border-pau-yellow focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-pau-primary mb-2">
              Score adversaire (si joué)
            </label>
            <input
              type="number"
              name="awayScore"
              defaultValue={match?.awayScore ?? ''}
              min="0"
              className="w-full px-4 py-3 border border-pau-primary/20 focus:border-pau-yellow focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-pau-primary mb-2">
            Lien billetterie
          </label>
          <input
            type="url"
            name="ticketUrl"
            defaultValue={match?.ticketUrl}
            placeholder="https://billetterie.paufc.fr/..."
            className="w-full px-4 py-3 border border-pau-primary/20 focus:border-pau-yellow focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-pau-primary mb-2">
            Logo adversaire (URL)
          </label>
          <input
            type="url"
            name="opponentLogo"
            defaultValue={match?.opponentLogo}
            placeholder="/logos/paris-fc.svg"
            className="w-full px-4 py-3 border border-pau-primary/20 focus:border-pau-yellow focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-pau-primary mb-2">
            Note (optionnelle)
          </label>
          <textarea
            name="note"
            defaultValue={match?.note}
            rows={3}
            placeholder="Huis clos, Fan Day, etc."
            className="w-full px-4 py-3 border border-pau-primary/20 focus:border-pau-yellow focus:outline-none resize-none"
          />
        </div>

        <div className="flex items-center justify-between gap-4 pt-6 border-t border-pau-primary/10">
          <div>
            {match && deleteAction && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-6 py-3 border-2 border-red-500 text-red-500 font-bold uppercase hover:bg-red-500 hover:text-white transition-colors disabled:opacity-50"
              >
                {isDeleting ? 'Suppression...' : 'Supprimer'}
              </button>
            )}
          </div>

          <div className="flex gap-3">
            <a
              href="/admin/matchs"
              className="px-6 py-3 border-2 border-pau-primary text-pau-primary font-bold uppercase hover:bg-pau-primary hover:text-white transition-colors"
            >
              Annuler
            </a>
            <button
              type="submit"
              className="bg-pau-yellow text-pau-night px-8 py-3 font-bold uppercase hover:bg-pau-yellow/90 transition-colors"
            >
              {match ? 'Mettre à jour' : 'Créer'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
