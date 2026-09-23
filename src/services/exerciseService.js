// Évalue une réponse selon le type d'exercice.
// Pour les types ouverts (court/synthese/argumentation), on ne peut pas juger
// automatiquement la qualité rédactionnelle sans moteur externe : on affiche le
// corrigé et on demande une auto-évaluation honnête, comme le ferait un candidat
// qui se corrige avec le corrigé d'un concours.

export function evaluateQcm(exercise, selectedIndex) {
  return selectedIndex === exercise.correctIndex;
}

export function evaluateCourtByKeywords(exercise, userText) {
  if (!exercise.motsCles || exercise.motsCles.length === 0) return null; // nécessite auto-évaluation
  const normalized = userText.toLowerCase();
  const hits = exercise.motsCles.filter((k) => normalized.includes(k.toLowerCase()));
  return {
    hitCount: hits.length,
    total: exercise.motsCles.length,
    hits,
    // Seuil indicatif : plus de la moitié des mots-clés présents -> correct provisoire,
    // mais l'utilisateur confirme toujours lui-même après lecture du corrigé.
    suggestedCorrect: hits.length >= Math.ceil(exercise.motsCles.length / 2),
  };
}
