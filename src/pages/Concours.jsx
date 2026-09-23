import { useEffect, useRef, useState } from 'react';
import { exercises } from '../data/exercises';
import { recordAttempt, startSession, endSession } from '../db/database';
import { evaluateQcm, evaluateCourtByKeywords } from '../services/exerciseService';

const DURATIONS = [
  { label: '10 min · 5 questions', minutes: 10, count: 5 },
  { label: '20 min · 8 questions', minutes: 20, count: 8 },
  { label: '30 min · 12 questions', minutes: 30, count: 12 },
];

export default function Concours() {
  const [phase, setPhase] = useState('setup'); // setup | running | analysis
  const [config, setConfig] = useState(DURATIONS[1]);
  const [list, setList] = useState([]);
  const [answers, setAnswers] = useState({}); // index -> value
  const [current, setCurrent] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [sessionId, setSessionId] = useState(null);
  const [graded, setGraded] = useState({}); // index -> boolean
  const timerRef = useRef(null);

  useEffect(() => () => clearInterval(timerRef.current), []);

  const start = async () => {
    const shuffled = [...exercises].sort(() => Math.random() - 0.5).slice(0, config.count);
    const id = await startSession('concours');
    setSessionId(id);
    setList(shuffled);
    setAnswers({});
    setCurrent(0);
    setGraded({});
    setSecondsLeft(config.minutes * 60);
    setPhase('running');
  };

  useEffect(() => {
    if (phase !== 'running') return;
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current);
          finish();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const finish = () => {
    clearInterval(timerRef.current);
    setPhase('analysis');
  };

  const setAnswer = (val) => setAnswers((a) => ({ ...a, [current]: val }));

  const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const gradeItem = async (idx, correct) => {
    const ex = list[idx];
    await recordAttempt({ exerciseId: ex.id, notions: ex.notions, correct, sessionId });
    setGraded((g) => ({ ...g, [idx]: correct }));
  };

  // Auto-correction des QCM à l'entrée en phase d'analyse (une seule fois par question).
  useEffect(() => {
    if (phase !== 'analysis') return;
    list.forEach((ex, idx) => {
      if (ex.type === 'qcm' && graded[idx] === undefined) {
        gradeItem(idx, evaluateQcm(ex, answers[idx]));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, list]);

  const finalizeSession = async () => {
    const total = list.length;
    const correctCount = Object.values(graded).filter(Boolean).length;
    await endSession(sessionId, { total, correct: correctCount });
    setPhase('done');
  };

  if (phase === 'setup') {
    return (
      <div>
        <h1>Mode concours</h1>
        <p>Conditions proches du concours : temps limité, navigation libre entre questions, aucune correction avant la fin.</p>
        <div className="card">
          {DURATIONS.map((d) => (
            <label key={d.label} className="radio-row">
              <input type="radio" checked={config.label === d.label} onChange={() => setConfig(d)} />
              {d.label}
            </label>
          ))}
          <button className="btn btn-primary" style={{ marginTop: 14 }} onClick={start}>Démarrer la simulation</button>
        </div>
        <style>{`.radio-row { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; font-weight: 500; }`}</style>
      </div>
    );
  }

  if (phase === 'running') {
    const ex = list[current];
    return (
      <div>
        <div className="concours-bar">
          <span className="pill pill-warning">⏱ {mmss(secondsLeft)}</span>
          <span className="pill">{current + 1} / {list.length}</span>
        </div>
        <div className="nav-grid">
          {list.map((_, i) => (
            <button
              key={i}
              className={'nav-dot' + (i === current ? ' active' : '') + (answers[i] !== undefined ? ' answered' : '')}
              onClick={() => setCurrent(i)}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className="card">
          <h3>{ex.question}</h3>
          {ex.type === 'qcm' ? (
            <div className="exrun-options">
              {ex.options.map((opt, idx) => (
                <button
                  key={idx}
                  className={'option' + (answers[current] === idx ? ' option-selected' : '')}
                  onClick={() => setAnswer(idx)}
                >
                  {opt}
                </button>
              ))}
            </div>
          ) : (
            <textarea rows={5} value={answers[current] || ''} onChange={(e) => setAnswer(e.target.value)} placeholder="Rédigez votre réponse…" />
          )}
        </div>
        <div className="concours-actions">
          <button className="btn btn-secondary" disabled={current === 0} onClick={() => setCurrent((c) => c - 1)}>Précédent</button>
          {current + 1 < list.length ? (
            <button className="btn btn-secondary" onClick={() => setCurrent((c) => c + 1)}>Suivant</button>
          ) : (
            <button className="btn btn-primary" onClick={finish}>Terminer et corriger</button>
          )}
        </div>
        <style>{`
          .concours-bar { display: flex; gap: 8px; margin-bottom: 12px; }
          .nav-grid { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
          .nav-dot { width: 30px; height: 30px; border-radius: 8px; border: 1px solid var(--color-border); background: #fff; font-size: 0.8rem; }
          .nav-dot.answered { background: var(--color-surface-alt); }
          .nav-dot.active { border-color: var(--color-accent-blue); font-weight: 700; }
          .concours-actions { display: flex; justify-content: space-between; margin-top: 16px; }
        `}</style>
      </div>
    );
  }

  if (phase === 'analysis') {
    return (
      <div>
        <h1>Correction de la simulation</h1>
        <p>Corrigez chaque question puis validez pour enregistrer votre progression.</p>
        {list.map((ex, idx) => {
          const kw = ex.motsCles ? evaluateCourtByKeywords(ex, answers[idx] || '') : null;
          return (
            <div className="card analysis-item" key={ex.id}>
              <div className="exrun-meta"><span className="pill">Q{idx + 1}</span><span className="pill">{ex.domaine}</span></div>
              <h3>{ex.question}</h3>
              {ex.type === 'qcm' ? (
                <div className="exrun-options">
                  {ex.options.map((opt, oi) => {
                    let cls = 'option';
                    if (oi === ex.correctIndex) cls += ' option-correct';
                    else if (oi === answers[idx]) cls += ' option-wrong';
                    return <div key={oi} className={cls}>{opt}</div>;
                  })}
                </div>
              ) : (
                <p><strong>Votre réponse :</strong> {answers[idx] || <em>(non répondu)</em>}</p>
              )}
              <div className="exrun-correction">
                {ex.explication && <p>{ex.explication}</p>}
                {ex.reponseAttendue && <p><strong>Réponse attendue :</strong> {ex.reponseAttendue}</p>}
                {ex.corrige && <p>{ex.corrige}</p>}
                {kw && <p className="exrun-kw">Mots-clés retrouvés : {kw.hitCount}/{kw.total}</p>}
                {ex.criteres && <ul>{ex.criteres.map((c, i) => <li key={i}>{c}</li>)}</ul>}
              </div>
              {ex.type !== 'qcm' && graded[idx] === undefined && (
                <div className="ob-actions">
                  <button className="btn btn-primary" onClick={() => gradeItem(idx, true)}>Globalement réussi</button>
                  <button className="btn btn-secondary" onClick={() => gradeItem(idx, false)}>À retravailler</button>
                </div>
              )}
              {graded[idx] !== undefined && (
                <span className={'pill ' + (graded[idx] ? 'pill-success' : 'pill-error')}>{graded[idx] ? 'Réussi' : 'À revoir'}</span>
              )}
            </div>
          );
        })}
        <button
          className="btn btn-primary"
          disabled={Object.keys(graded).length < list.length}
          onClick={finalizeSession}
        >
          Valider la session
        </button>
      </div>
    );
  }

  // done
  const total = list.length;
  const correctCount = Object.values(graded).filter(Boolean).length;
  const byDomain = {};
  list.forEach((ex, idx) => {
    byDomain[ex.domaine] = byDomain[ex.domaine] || { total: 0, correct: 0 };
    byDomain[ex.domaine].total += 1;
    if (graded[idx]) byDomain[ex.domaine].correct += 1;
  });
  return (
    <div>
      <h1>Résultat de la simulation</h1>
      <div className="card" style={{ marginBottom: 16 }}>
        <h3>{correctCount} / {total} questions réussies</h3>
        <p>Répartition par domaine :</p>
        {Object.entries(byDomain).map(([d, v]) => (
          <div key={d} style={{ marginBottom: 8 }}>
            <span className="pill">{d}</span> {v.correct}/{v.total}
            <div className="progress-track" style={{ marginTop: 4 }}><div className="progress-fill" style={{ width: `${(v.correct / v.total) * 100}%` }} /></div>
          </div>
        ))}
      </div>
      <button className="btn btn-primary" onClick={() => setPhase('setup')}>Nouvelle simulation</button>
    </div>
  );
}
