#!/bin/bash

# Script pour ajouter .catch() à toutes les requêtes Prisma sans gestion d'erreur

files=(
  "app/admin/clients/page.js"
  "app/admin/codes-promo/page.js"
  "app/admin/newsletter/page.js"
  "app/admin/partenaires/page.js"
  "app/admin/stock/page.js"
  "app/admin/personnalisations/page.js"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "Traitement de $file..."
    # Ajouter .catch(() => []) après findMany
    sed -i 's/\.findMany([^)]*));/.findMany\([\n    ]*[^)]*\)\).catch(() => []);/g' "$file"
    # Ajouter .catch(() => 0) après count
    sed -i 's/\.count([^)]*));/.count\([^)]*\)\).catch(() => 0);/g' "$file"
  fi
done

echo "Terminé!"
