import { useState } from 'react';
import { exercises } from '../data/exercises';
import { recordAttempt, startSession, endSession } from '../db/database';
import ExerciseRunner from '../components/ExerciseRunner.jsx';

const transversalExercises = exercises.filter(
  (e) => e.competences.includes('Connecter les disciplines') || e.notions.length > 1
);

export default function Defi() {
  const [session, setSession] = useState(null);
  const [summary, setSummary] = useState(null);

  const start = async () => {
    const shuffled = [...transversalExercises].sort(() => Math.random() - 0.5).slice(0, 6);
    const sessionId = await startSession('defi');
    setSession({ list: shuffled, index: 0, sessionId, correctCount: 0 });
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
        <button className="btn-ghost" onClick={() => setSession(null)}>&larr; Quitter</button>
        <ExerciseRunner key={exercise.id} exercise={exercise} onAnswered={handleAnswered} questionIndex={session.index} questionTotal={session.list.length} />
        <div style={{ marginTop: 16 }}>
          <button className="btn btn-primary" onClick={next}>
            {session.index + 1 >= session.list.length ? 'Terminer' : 'Situation suivante'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Défi transversal</h1>
      <p>
        Des situations qui mobilisent plusieurs domaines à la fois — comprendre, identifier les informations
        pertinentes, mobiliser plusieurs connaissances, interpréter, puis justifier une réponse.
      </p>
      {summary && (
        <div className="card" style={{ marginBottom: 20 }}>
          <h3>Défi terminé</h3>
          <p>{summary.correct} / {summary.total} situations réussies.</p>
        </div>
      )}
      <div className="card">
        <p>{transversalExercises.length} situations interdisciplinaires disponibles dans le corpus actuel.</p>
        <button className="btn btn-primary" onClick={start} disabled={transversalExercises.length === 0}>
          Lancer un défi transversal
        </button>
      </div>
    </div>
  );
}
