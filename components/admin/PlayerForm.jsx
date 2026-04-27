'use client';

import { useState } from 'react';

export function PlayerForm({ player, action, deleteAction }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const birthDate = player?.birthDate
    ? new Date(player.birthDate).toISOString().split('T')[0]
    : '';

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!confirm('Supprimer ce joueur définitivement ?')) return;
    setIsDeleting(true);
    const formData = new FormData();
    formData.set('id', player.id);
    await deleteAction(formData);
  };

  return (
    <div className="max-w-3xl">
      <form action={action} className="space-y-6 bg-primaire/20 border border-blanc/10 p-8">
        {player && <input type="hidden" name="id" value={player.id} />}

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-blanc mb-2">
              Numéro *
            </label>
            <input
              type="number"
              name="number"
              defaultValue={player?.number}
              required
              min="1"
              max="99"
              className="w-full px-4 py-3 bg-nuit border border-blanc/20 text-blanc focus:border-jaune focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-blanc mb-2">
              Position *
            </label>
            <select
              name="position"
              defaultValue={player?.position || 'Milieu'}
              required
              className="w-full px-4 py-3 bg-nuit border border-blanc/20 text-blanc focus:border-jaune focus:outline-none"
            >
              <option value="Gardien">Gardien</option>
              <option value="Défenseur">Défenseur</option>
              <option value="Milieu">Milieu</option>
              <option value="Attaquant">Attaquant</option>
            </select>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-blanc mb-2">
              Prénom *
            </label>
            <input
              type="text"
              name="firstName"
              defaultValue={player?.firstName}
              required
              className="w-full px-4 py-3 bg-nuit border border-blanc/20 text-blanc focus:border-jaune focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-blanc mb-2">
              Nom *
            </label>
            <input
              type="text"
              name="lastName"
              defaultValue={player?.lastName}
              required
              className="w-full px-4 py-3 bg-nuit border border-blanc/20 text-blanc focus:border-jaune focus:outline-none"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <label className="block text-sm font-semibold text-blanc mb-2">
              Taille (cm)
            </label>
            <input
              type="number"
              name="height"
              defaultValue={player?.height || ''}
              min="150"
              max="220"
              className="w-full px-4 py-3 bg-nuit border border-blanc/20 text-blanc focus:border-jaune focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-blanc mb-2">
              Poids (kg)
            </label>
            <input
              type="number"
              name="weight"
              defaultValue={player?.weight || ''}
              min="50"
              max="120"
              className="w-full px-4 py-3 bg-nuit border border-blanc/20 text-blanc focus:border-jaune focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-blanc mb-2">
              Date de naissance
            </label>
            <input
              type="date"
              name="birthDate"
              defaultValue={birthDate}
              className="w-full px-4 py-3 bg-nuit border border-blanc/20 text-blanc focus:border-jaune focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-blanc mb-2">
            Nationalité
          </label>
          <input
            type="text"
            name="nationality"
            defaultValue={player?.nationality || ''}
            placeholder="France"
            className="w-full px-4 py-3 bg-nuit border border-blanc/20 text-blanc focus:border-jaune focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-blanc mb-2">
            Photo (URL)
          </label>
          <input
            type="url"
            name="photoUrl"
            defaultValue={player?.photoUrl || ''}
            placeholder="https://..."
            className="w-full px-4 py-3 bg-nuit border border-blanc/20 text-blanc focus:border-jaune focus:outline-none"
          />
          <p className="mt-2 text-xs text-blanc/40">
            URL de la photo du joueur (Supabase Storage ou externe)
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-blanc mb-2">
            Biographie
          </label>
          <textarea
            name="bio"
            defaultValue={player?.bio || ''}
            rows={4}
            placeholder="Parcours du joueur..."
            className="w-full px-4 py-3 bg-nuit border border-blanc/20 text-blanc focus:border-jaune focus:outline-none resize-none"
          />
        </div>

        <div className="flex items-center justify-between gap-4 pt-6 border-t border-blanc/10">
          <div>
            {player && deleteAction && (
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
              href="/admin/joueurs"
              className="px-6 py-3 border-2 border-blanc/20 text-blanc font-bold uppercase hover:bg-blanc/10 transition-colors"
            >
              Annuler
            </a>
            <button
              type="submit"
              className="bg-jaune text-nuit px-8 py-3 font-bold uppercase hover:bg-jaune/90 transition-colors"
            >
              {player ? 'Mettre à jour' : 'Créer'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
