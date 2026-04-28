'use client';

import { useState } from 'react';

export function CommentsList({ articleId, initialComments = [] }) {
  const [comments, setComments] = useState(initialComments);
  const [content, setContent] = useState('');
  const [guestName, setGuestName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || !guestName.trim()) return;

    setSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          articleId,
          content: content.trim(),
          guestName: guestName.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: 'success', text: 'Commentaire soumis avec succès ! Il sera visible après modération.' });
        setContent('');
        setGuestName('');
      } else {
        setMessage({ type: 'error', text: data.error || 'Erreur lors de l\'envoi du commentaire' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur réseau' });
    } finally {
      setSubmitting(false);
    }
  };

  const approvedComments = comments.filter((c) => c.approved && !c.parentId);

  return (
    <div className="border-t-4 border-gray-300 bg-gray-50 py-12">
      <div className="container-pau">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 font-display text-2xl font-bold uppercase text-pau-night">
            Commentaires ({approvedComments.length})
          </h2>

          {/* Formulaire nouveau commentaire */}
          <form onSubmit={handleSubmit} className="mb-12 border-2 border-gray-300 bg-white p-6">
            <h3 className="mb-4 font-display text-lg font-bold uppercase text-pau-night">
              Ajouter un commentaire
            </h3>

            {message && (
              <div
                className={`mb-4 border-2 p-4 ${
                  message.type === 'success'
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : 'border-red-500 bg-red-50 text-red-800'
                }`}
              >
                {message.text}
              </div>
            )}

            <div className="mb-4">
              <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-wider text-gray-700">
                Votre nom
              </label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full border-2 border-gray-300 px-4 py-3 font-sans text-pau-night focus:border-pau-night focus:outline-none"
                required
                disabled={submitting}
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-wider text-gray-700">
                Commentaire
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                className="w-full border-2 border-gray-300 px-4 py-3 font-sans text-pau-night focus:border-pau-night focus:outline-none"
                required
                disabled={submitting}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-3 border-2 border-pau-night bg-pau-night px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-pau-yellow hover:border-pau-yellow hover:text-pau-night disabled:opacity-50"
            >
              {submitting ? 'Envoi...' : 'Publier'}
            </button>
          </form>

          {/* Liste commentaires */}
          {approvedComments.length === 0 ? (
            <p className="text-center text-gray-500">
              Aucun commentaire pour le moment. Soyez le premier à réagir !
            </p>
          ) : (
            <div className="space-y-6">
              {approvedComments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CommentItem({ comment }) {
  return (
    <div className="border-l-4 border-pau-yellow/30 bg-white p-6">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center border-2 border-pau-night bg-pau-night font-display text-sm font-bold uppercase text-pau-yellow">
          {(comment.guestName || comment.user?.firstName || 'U')[0]}
        </div>
        <div>
          <p className="font-display text-sm font-bold uppercase text-pau-night">
            {comment.guestName || `${comment.user?.firstName} ${comment.user?.lastName}`}
          </p>
          <p className="font-mono text-xs text-gray-500">
            {new Date(comment.createdAt).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>
      <p className="text-gray-800">{comment.content}</p>
    </div>
  );
}
