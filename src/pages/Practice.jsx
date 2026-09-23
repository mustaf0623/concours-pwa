import { useState } from 'react';
import { domains } from '../data/domains';
import { notions } from '../data/notions';
import { exercises } from '../data/exercises';
import { buildRecommendedSession } from '../services/adaptiveEngine';
import { recordAttempt, startSession, endSession } from '../db/database';
import ExerciseRunner from '../components/ExerciseRunner.jsx';

const COMPETENCES = ['Comprendre', 'Expliquer', 'Analyser', 'Synthétiser', 'Mobiliser', 'Argumenter', 'Comparer', 'Évaluer', 'Proposer', 'Connecter les disciplines'];

export default function Practice() {
  const [filters, setFilters] = useState({ domaine: '', notionId: '', competence: '' });
  const [session, setSession] = useState(null); // { exercises, index, sessionId, results }
  const [summary, setSummary] = useState(null);

  const start = async (mode) => {
    let list;
    if (mode === 'smart') {
      list = await buildRecommendedSession(8, {});
    } else {
      list = await buildRecommendedSession(8, filters);
      if (list.length === 0) {
        list = exercises.filter((e) =>
          (!filters.domaine || e.domaine === filters.domaine) &&
          (!filters.notionId || e.notions.includes(filters.notionId)) &&
          (!filters.competence || e.competences.includes(filters.competence))
        ).slice(0, 8);
      }
    }
    if (list.length === 0) {
      alert("Aucun exercice ne correspond à ces filtres pour l'instant.");
      return;
    }
    const sessionId = await startSession('practice');
    setSession({ list, index: 0, sessionId, correctCount: 0 });
    setSummary(null);
  };

  const handleAnswered = async ({ exercise, correct }) => {
    await recordAttempt({ exerciseId: exercise.id, notions: exercise.notions, correct, sessionId: session.sessionId });
    setSession((s) => ({ ...s, correctCount: s.correctCount + (correct ? 1 : 0) }));
  };

  const next = async () => {
    if (session.index + 1 >= session.list.length) {
      await endSession(session.sessionId, { total: session.list.length, correct: session.correctCount });
      setSummary({ total: session.list.length, correct: session.correctCount });
      setSession(null);
    } else {
      setSession((s) => ({ ...s, index: s.index + 1 }));
    }
  };

  if (session) {
    const exercise = session.list[session.index];
    return (
      <div>
        <button className="btn-ghost" onClick={() => setSession(null)}>&larr; Quitter la session</button>
        <ExerciseRunner
          key={exercise.id}
          exercise={exercise}
          onAnswered={handleAnswered}
          questionIndex={session.index}
          questionTotal={session.list.length}
        />
        <div style={{ marginTop: 16 }}>
          <button className="btn btn-primary" onClick={next}>
            {session.index + 1 >= session.list.length ? 'Terminer la session' : 'Question suivante'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>S'entraîner</h1>
      <p>Choisissez un entraînement ciblé, ou laissez le moteur adaptatif sélectionner ce qui compte le plus en ce moment.</p>

      {summary && (
        <div className="card" style={{ marginBottom: 20, borderColor: 'var(--color-accent)' }}>
          <h3>Session terminée</h3>
          <p>{summary.correct} / {summary.total} exercices réussis.</p>
        </div>
      )}

      <div className="card" style={{ marginBottom: 20 }}>
        <h3>Entraînement intelligent</h3>
        <p>Sélectionne automatiquement les notions fragiles, en attente de révision, jamais pratiquées ou prêtes pour le transfert.</p>
        <button className="btn btn-primary" onClick={() => start('smart')}>Lancer une session recommandée</button>
      </div>

      <div className="card">
        <h3>Entraînement ciblé</h3>
        <div className="filter-grid">
          <div className="field">
            <label>Domaine</label>
            <select value={filters.domaine} onChange={(e) => setFilters((f) => ({ ...f, domaine: e.target.value, notionId: '' }))}>
              <option value="">Tous</option>
              {domains.map((d) => <option key={d.id} value={d.id}>{d.nom}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Notion</label>
            <select value={filters.notionId} onChange={(e) => setFilters((f) => ({ ...f, notionId: e.target.value }))}>
              <option value="">Toutes</option>
              {notions.filter((n) => !filters.domaine || n.domaine === filters.domaine).map((n) => (
                <option key={n.id} value={n.id}>{n.nom}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Compétence</label>
            <select value={filters.competence} onChange={(e) => setFilters((f) => ({ ...f, competence: e.target.value }))}>
              <option value="">Toutes</option>
              {COMPETENCES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => start('filtered')}>Lancer cet entraînement</button>
      </div>

      <style>{`
        .filter-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 14px; }
        @media (max-width: 700px) { .filter-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
