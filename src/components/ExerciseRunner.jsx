import { useState } from 'react';
import { evaluateQcm, evaluateCourtByKeywords } from '../services/exerciseService';
import { notions as allNotions } from '../data/notions';

const LEVEL_LABEL = { N1: 'Comprendre', N2: 'Appliquer', N3: 'Raisonner', N4: 'Situation', N5: 'Concours', N6: 'Transversal' };

function notionNames(ids) {
  return ids.map((id) => allNotions.find((n) => n.id === id)?.nom || id).join(', ');
}

export default function ExerciseRunner({ exercise, onAnswered, immediateCorrection = true, questionIndex, questionTotal }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [userText, setUserText] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);

  const submitQcm = (idx) => {
    if (done) return;
    setSelectedIndex(idx);
    const correct = evaluateQcm(exercise, idx);
    if (immediateCorrection) setRevealed(true);
    setDone(true);
    onAnswered({ exercise, correct, answer: idx });
  };

  const reveal = () => setRevealed(true);

  const selfGrade = (correct) => {
    setDone(true);
    onAnswered({ exercise, correct, answer: userText });
  };

  const kwResult = exercise.motsCles ? evaluateCourtByKeywords(exercise, userText) : null;

  return (
    <div className="exruncard card">
      <div className="exrun-meta">
        {questionTotal ? <span className="pill">{questionIndex + 1} / {questionTotal}</span> : null}
        <span className="pill">{exercise.domaine}</span>
        <span className="pill">{LEVEL_LABEL[exercise.niveau] || exercise.niveau}</span>
        {exercise.competences?.map((c) => <span className="pill pill-accent" key={c}>{c}</span>)}
      </div>
      <p className="exrun-notion">{notionNames(exercise.notions)}</p>
      <h3 className="exrun-question">{exercise.question}</h3>

      {exercise.type === 'qcm' && (
        <div className="exrun-options">
          {exercise.options.map((opt, idx) => {
            let cls = 'option';
            if (revealed) {
              if (idx === exercise.correctIndex) cls += ' option-correct';
              else if (idx === selectedIndex) cls += ' option-wrong';
            } else if (idx === selectedIndex) cls += ' option-selected';
            return (
              <button key={idx} className={cls} disabled={done} onClick={() => submitQcm(idx)}>
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {['court', 'donnees'].includes(exercise.type) && (
        <div>
          <textarea
            rows={4}
            placeholder="Rédigez votre réponse…"
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
            disabled={done}
          />
          {!revealed && (
            <button className="btn btn-secondary" style={{ marginTop: 10 }} onClick={reveal} disabled={!userText.trim()}>
              Voir le corrigé
            </button>
          )}
        </div>
      )}

      {['synthese', 'argumentation'].includes(exercise.type) && (
        <div>
          <textarea
            rows={6}
            placeholder="Rédigez votre réponse…"
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
            disabled={done}
          />
          {!revealed && (
            <button className="btn btn-secondary" style={{ marginTop: 10 }} onClick={reveal} disabled={!userText.trim()}>
              Voir le corrigé et les critères
            </button>
          )}
        </div>
      )}

      {revealed && (
        <div className="exrun-correction">
          <h4>Corrigé</h4>
          {exercise.explication && <p>{exercise.explication}</p>}
          {exercise.reponseAttendue && <p><strong>Réponse attendue :</strong> {exercise.reponseAttendue}</p>}
          {exercise.corrige && <p>{exercise.corrige}</p>}

          {kwResult && (
            <p className="exrun-kw">
              Mots-clés attendus retrouvés dans votre réponse : {kwResult.hitCount}/{kwResult.total}
              {kwResult.hits.length > 0 && <> — {kwResult.hits.join(', ')}</>}
            </p>
          )}

          {exercise.criteres && (
            <div>
              <p><strong>Critères d'auto-évaluation :</strong></p>
              <ul>{exercise.criteres.map((c, i) => <li key={i}>{c}</li>)}</ul>
            </div>
          )}

          {!done && (
            <div className="exrun-selfgrade">
              <p>Après lecture du corrigé, votre réponse répondait-elle globalement à ces attentes ?</p>
              <div className="ob-actions">
                <button className="btn btn-primary" onClick={() => selfGrade(true)}>Oui, globalement réussi</button>
                <button className="btn btn-secondary" onClick={() => selfGrade(false)}>Non, à retravailler</button>
              </div>
            </div>
          )}
        </div>
      )}

      <style>{`
        .exrun-meta { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px; }
        .exrun-notion { color: var(--color-text-muted); font-size: 0.82rem; margin-bottom: 4px; }
        .exrun-question { margin-bottom: 16px; }
        .exrun-options { display: flex; flex-direction: column; gap: 8px; }
        .option {
          text-align: left; padding: 12px 14px; border-radius: var(--radius-sm);
          border: 1px solid var(--color-border); background: #fff; font-size: 0.93rem;
        }
        .option:hover:not(:disabled) { border-color: var(--color-accent); }
        .option-selected { border-color: var(--color-accent-blue); background: #EEF3F8; }
        .option-correct { border-color: var(--color-success); background: var(--color-success-bg); }
        .option-wrong { border-color: var(--color-error); background: var(--color-error-bg); }
        .exrun-correction { margin-top: 18px; padding-top: 16px; border-top: 1px dashed var(--color-border); }
        .exrun-kw { font-size: 0.85rem; color: var(--color-text-muted); }
        .exrun-selfgrade { margin-top: 12px; }
      `}</style>
    </div>
  );
}
