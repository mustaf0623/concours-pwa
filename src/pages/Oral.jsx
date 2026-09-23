import { useEffect, useState } from 'react';
import { oralCategories, oralQuestions } from '../data/oralQuestions';
import { recordOralSession, getOralSessions } from '../db/database';

export default function Oral() {
  const [category, setCategory] = useState(oralCategories[0].id);
  const [active, setActive] = useState(null);
  const [notes, setNotes] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [running]);

  useEffect(() => {
    if (active) {
      getOralSessions(active.id).then(setHistory);
    }
  }, [active]);

  const pick = (q) => {
    setActive(q);
    setNotes('');
    setSeconds(0);
    setRunning(true);
  };

  const save = async () => {
    setRunning(false);
    await recordOralSession({ questionId: active.id, notes, durationSeconds: seconds });
    setHistory(await getOralSessions(active.id));
  };

  const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div>
      <h1>Préparation orale</h1>
      <p>Entretien de 30 minutes : parcours, motivation, projet professionnel, questions scientifiques et mises en situation.</p>

      <div className="oral-cats">
        {oralCategories.map((c) => (
          <button key={c.id} className={'chip' + (c.id === category ? ' chip-active' : '')} onClick={() => setCategory(c.id)}>
            {c.nom}
          </button>
        ))}
      </div>

      <div className="oral-layout">
        <div className="oral-list">
          {oralQuestions.filter((q) => q.categorie === category).map((q) => (
            <button key={q.id} className={'notion-item' + (active?.id === q.id ? ' active' : '')} onClick={() => pick(q)}>
              {q.question}
            </button>
          ))}
        </div>

        <div>
          {!active && <p className="empty-hint">Choisissez une question pour vous entraîner.</p>}
          {active && (
            <div className="card">
              <div className="exrun-meta"><span className="pill pill-warning">⏱ {mmss(seconds)}</span></div>
              <h3>{active.question}</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                Répondez à voix haute comme à l'oral, puis notez ci-dessous les points clés de votre réponse et ce que vous amélioreriez.
              </p>
              <textarea rows={5} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes sur votre réponse…" />
              <div className="ob-actions" style={{ marginTop: 10 }}>
                <button className="btn btn-secondary" onClick={() => setRunning((r) => !r)}>{running ? 'Pause' : 'Reprendre'}</button>
                <button className="btn btn-primary" onClick={save}>Enregistrer cette simulation</button>
              </div>

              {history.length > 0 && (
                <div style={{ marginTop: 18, borderTop: '1px dashed var(--color-border)', paddingTop: 12 }}>
                  <h4>Historique sur cette question</h4>
                  {history.map((h) => (
                    <div key={h.id} style={{ fontSize: '0.82rem', marginBottom: 8 }}>
                      <span className="pill">{new Date(h.date).toLocaleDateString()}</span> — {h.notes || <em>(sans note)</em>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .oral-cats { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }
        .oral-layout { display: grid; grid-template-columns: 280px 1fr; gap: 20px; }
        .oral-list { display: flex; flex-direction: column; gap: 4px; }
        @media (max-width: 760px) { .oral-layout { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
