import Dexie from 'dexie';

// Base locale — ne contient QUE les données utilisateur.
// Le contenu pédagogique (domaines, notions, exercices) reste dans /src/data,
// séparé volontairement pour pouvoir être mis à jour sans toucher à l'historique de l'utilisateur.
export const db = new Dexie('concoursPrepDB');

db.version(1).stores({
  profile: 'id', // singleton, id='me'
  attempts: '++id, exerciseId, timestamp, sessionId, correct',
  mastery: 'notionId, level, lastPracticed', // notionId = clé
  sessions: '++id, type, startedAt',
  reviewQueue: 'notionId, dueAt',
  oralSessions: '++id, questionId, date',
  projectData: 'id', // singleton, id='me'
});

// --- Helpers repository (couche d'accès aux données) ---
// Cette couche isole IndexedDB : une future migration vers Supabase
// n'aurait qu'à réécrire ces fonctions, pas les composants qui les appellent.

export async function getProfile() {
  return db.profile.get('me');
}

export async function saveProfile(data) {
  return db.profile.put({ id: 'me', ...data, updatedAt: new Date().toISOString() });
}

export async function getProjectData() {
  return db.projectData.get('me');
}

export async function saveProjectData(data) {
  return db.projectData.put({ id: 'me', ...data, updatedAt: new Date().toISOString() });
}

export async function recordAttempt(attempt) {
  const id = await db.attempts.add({ ...attempt, timestamp: new Date().toISOString() });
  await updateMasteryFromAttempt(attempt);
  return id;
}

const MASTERY_LEVELS = ['D1', 'D2', 'D3', 'D4'];

export async function updateMasteryFromAttempt(attempt) {
  for (const notionId of attempt.notions || []) {
    const existing = await db.mastery.get(notionId);
    const current = existing || {
      notionId, level: 'D1', score: 0, timesCorrect: 0, timesWrong: 0, streak: 0,
    };
    if (attempt.correct) {
      current.timesCorrect += 1;
      current.streak = (current.streak || 0) + 1;
      current.score = Math.min(100, (current.score || 0) + 10);
      // Progression de niveau simple : 3 réussites consécutives font avancer d'un cran
      if (current.streak >= 3) {
        const idx = MASTERY_LEVELS.indexOf(current.level);
        if (idx < MASTERY_LEVELS.length - 1) current.level = MASTERY_LEVELS[idx + 1];
        current.streak = 0;
      }
      // Retirer de la file de révision si la maîtrise est bonne
      if (current.score >= 60) {
        await db.reviewQueue.delete(notionId);
      }
    } else {
      current.timesWrong += 1;
      current.streak = 0;
      current.score = Math.max(0, (current.score || 0) - 8);
      // Programmer une réactivation à J+2
      const dueAt = new Date();
      dueAt.setDate(dueAt.getDate() + 2);
      await db.reviewQueue.put({ notionId, dueAt: dueAt.toISOString(), reason: 'erreur' });
    }
    current.lastPracticed = new Date().toISOString();
    await db.mastery.put(current);
  }
}

export async function getAllMastery() {
  return db.mastery.toArray();
}

export async function getReviewQueue() {
  const now = new Date().toISOString();
  const all = await db.reviewQueue.toArray();
  return all.filter((r) => r.dueAt <= now).sort((a, b) => a.dueAt.localeCompare(b.dueAt));
}

export async function getRecentAttempts(limit = 20) {
  return db.attempts.orderBy('timestamp').reverse().limit(limit).toArray();
}

export async function getAttemptsByNotion(notionId) {
  return db.attempts.filter((a) => (a.notions || []).includes(notionId)).toArray();
}

export async function getErrorStats() {
  const attempts = await db.attempts.toArray();
  const wrong = attempts.filter((a) => !a.correct);
  const byNotion = {};
  for (const a of wrong) {
    for (const n of a.notions || []) {
      byNotion[n] = (byNotion[n] || 0) + 1;
    }
  }
  return { totalAttempts: attempts.length, totalWrong: wrong.length, byNotion, wrong };
}

export async function startSession(type) {
  return db.sessions.add({ type, startedAt: new Date().toISOString(), endedAt: null, results: null });
}

export async function endSession(sessionId, results) {
  return db.sessions.update(sessionId, { endedAt: new Date().toISOString(), results });
}

export async function getSessions(type) {
  const all = await db.sessions.orderBy('startedAt').reverse().toArray();
  return type ? all.filter((s) => s.type === type) : all;
}

export async function recordOralSession(entry) {
  return db.oralSessions.add({ ...entry, date: new Date().toISOString() });
}

export async function getOralSessions(questionId) {
  const all = await db.oralSessions.orderBy('date').reverse().toArray();
  return questionId ? all.filter((o) => o.questionId === questionId) : all;
}

export async function resetAllData() {
  await Promise.all([
    db.attempts.clear(), db.mastery.clear(), db.sessions.clear(),
    db.reviewQueue.clear(), db.oralSessions.clear(),
  ]);
}
