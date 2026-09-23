import { exercises } from '../data/exercises';
import { notions } from '../data/notions';
import { getAllMastery, getReviewQueue } from '../db/database';

// Moteur adaptatif simple (volontairement) : priorise la révision des notions
// fragiles ou en attente de réactivation, puis introduit des notions jamais
// pratiquées, et propose du transfert pour les notions déjà maîtrisées.
// Logique : forte réussite -> augmenter difficulté ; erreur répétée -> remédiation ;
// notion fragile -> priorité ; notion jamais pratiquée -> découverte ; notion maîtrisée -> transfert.

const LEVEL_ORDER = ['N1', 'N2', 'N3', 'N4', 'N5', 'N6'];

export async function buildRecommendedSession(size = 8, filters = {}) {
  const mastery = await getAllMastery();
  const masteryByNotion = Object.fromEntries(mastery.map((m) => [m.notionId, m]));
  const dueForReview = new Set((await getReviewQueue()).map((r) => r.notionId));

  let pool = exercises.slice();
  if (filters.domaine) pool = pool.filter((e) => e.domaine === filters.domaine);
  if (filters.notionId) pool = pool.filter((e) => e.notions.includes(filters.notionId));
  if (filters.niveau) pool = pool.filter((e) => e.niveau === filters.niveau);
  if (filters.competence) pool = pool.filter((e) => e.competences.includes(filters.competence));

  const scored = pool.map((ex) => {
    let score = 0;
    const notionStates = ex.notions.map((n) => masteryByNotion[n]);
    const hasDueReview = ex.notions.some((n) => dueForReview.has(n));
    const neverPracticed = notionStates.every((s) => !s);
    const fragile = notionStates.some((s) => s && s.score < 40);
    const mastered = notionStates.every((s) => s && s.score >= 70);

    if (hasDueReview) score += 50;
    if (fragile) score += 40;
    if (neverPracticed) score += 20;
    if (mastered) score += 5; // transfert : priorité plus basse, mais toujours proposé

    // Cohérence de niveau : viser un niveau légèrement au-dessus du niveau moyen de maîtrise
    const avgScore = notionStates.filter(Boolean).length
      ? notionStates.filter(Boolean).reduce((s, m) => s + m.score, 0) / notionStates.filter(Boolean).length
      : 0;
    const targetLevelIdx = Math.min(LEVEL_ORDER.length - 1, Math.floor(avgScore / 20));
    const exLevelIdx = LEVEL_ORDER.indexOf(ex.niveau);
    score -= Math.abs(exLevelIdx - targetLevelIdx) * 5;

    // Petit bruit pour éviter une session toujours identique
    score += Math.random() * 3;

    return { ex, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, size).map((s) => s.ex);
}

export function getNotionsFragiles(mastery) {
  return mastery.filter((m) => m.score < 40).sort((a, b) => a.score - b.score);
}

export function getNotionsJamaisPratiquees(mastery) {
  const practiced = new Set(mastery.map((m) => m.notionId));
  return notions.filter((n) => !practiced.has(n.id));
}

export function classifyErrorType(exercise, attempt) {
  // Classification simple par heuristique de mots-clés / type d'exercice.
  if (exercise.type === 'qcm') return 'confusion';
  if (exercise.type === 'calcul' || exercise.type === 'donnees') return 'calcul';
  if (exercise.type === 'synthese') return 'methode-synthese';
  if (exercise.type === 'argumentation') return 'argumentation';
  if (attempt?.selfReportedType) return attempt.selfReportedType;
  return 'raisonnement';
}
