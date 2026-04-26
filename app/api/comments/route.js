import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request) {
  try {
    const { articleId, content, guestName, guestEmail } = await request.json();

    // Validation
    if (!articleId || !content?.trim() || !guestName?.trim()) {
      return NextResponse.json(
        { error: 'Données manquantes' },
        { status: 400 }
      );
    }

    // Vérifier que l'article existe
    const article = await prisma.article.findUnique({
      where: { id: articleId },
    });

    if (!article) {
      return NextResponse.json(
        { error: 'Article introuvable' },
        { status: 404 }
      );
    }

    // Créer le commentaire (non approuvé par défaut = modération)
    const comment = await prisma.comment.create({
      data: {
        articleId,
        content: content.trim(),
        guestName: guestName.trim(),
        guestEmail: guestEmail?.trim() || null,
        approved: false, // Modération obligatoire
      },
    });

    return NextResponse.json({ comment }, { status: 201 });
  } catch (error) {
    console.error('Comment creation error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du commentaire' },
      { status: 500 }
    );
  }
}
