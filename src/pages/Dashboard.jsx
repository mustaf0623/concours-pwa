import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllMastery, getReviewQueue, getErrorStats, getRecentAttempts } from '../db/database';
import { getNotionsFragiles, getNotionsJamaisPratiquees } from '../services/adaptiveEngine';
import { notions } from '../data/notions';

export default function Dashboard({ profile }) {
  const [mastery, setMastery] = useState([]);
  const [dueQueue, setDueQueue] = useState([]);
  const [, setErrorStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setMastery(await getAllMastery());
      setDueQueue(await getReviewQueue());
      setErrorStats(await getErrorStats());
      setRecent(await getRecentAttempts(5));
    })();
  }, []);

  const fragiles = getNotionsFragiles(mastery).slice(0, 3);
  const jamaisPratiquees = getNotionsJamaisPratiquees(mastery).slice(0, 3);
  const overallScore = mastery.length ? Math.round(mastery.reduce((s, m) => s + m.score, 0) / mastery.length) : 0;

  return (
    <div>
      <h1>{profile?.prenom ? `Bonjour ${profile.prenom}` : 'Tableau de bord'}</h1>
      <p>Voici où vous en êtes et ce qui mérite votre attention aujourd'hui.</p>

      <div className="dash-grid">
        <div className="card">
          <h3>Objectif du jour</h3>
          {dueQueue.length > 0 ? (
            <p>{dueQueue.length} notion{dueQueue.length > 1 ? 's' : ''} programmée{dueQueue.length > 1 ? 's' : ''} pour réactivation.</p>
          ) : fragiles.length > 0 ? (
            <p>Consolider {fragiles.length} notion{fragiles.length > 1 ? 's' : ''} fragile{fragiles.length > 1 ? 's' : ''}.</p>
          ) : (
            <p>Continuer à découvrir de nouvelles notions et progresser.</p>
          )}
          <button className="btn btn-primary" onClick={() => navigate('/entrainement')}>Continuer l'entraînement</button>
        </div>

        <div className="card">
          <h3>Maîtrise globale</h3>
          <div className="progress-track" style={{ marginBottom: 8 }}><div className="progress-fill" style={{ width: `${overallScore}%` }} /></div>
          <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
            {mastery.length} notion{mastery.length > 1 ? 's' : ''} pratiquée{mastery.length > 1 ? 's' : ''} sur {notions.length}. Cette valeur reflète la maîtrise mesurée, pas une prédiction de réussite au concours.
          </p>
        </div>

        <div className="card">
          <h3>Notions fragiles</h3>
          {fragiles.length === 0 && <p className="empty-hint">Aucune notion fragile identifiée.</p>}
          <ul className="plain-list">
            {fragiles.map((m) => {
              const n = notions.find((x) => x.id === m.notionId);
              return n && <li key={m.notionId}>{n.nom}</li>;
            })}
          </ul>
          {fragiles.length > 0 && <button className="btn btn-secondary" onClick={() => navigate('/erreurs')}>Voir mes erreurs</button>}
        </div>

        <div className="card">
          <h3>À découvrir</h3>
          <ul className="plain-list">
            {jamaisPratiquees.map((n) => <li key={n.id}>{n.nom}</li>)}
          </ul>
          <button className="btn btn-secondary" onClick={() => navigate('/apprendre')}>Aller apprendre</button>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3>Activité récente</h3>
        {recent.length === 0 && <p className="empty-hint">Aucune activité pour l'instant — lancez votre premier entraînement.</p>}
        {recent.map((a) => (
          <div key={a.id} className="recent-row">
            <span className={'pill ' + (a.correct ? 'pill-success' : 'pill-error')}>{a.correct ? 'Réussi' : 'À revoir'}</span>
            <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>{new Date(a.timestamp).toLocaleString()}</span>
          </div>
        ))}
      </div>

      <style>{`
        .dash-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .plain-list { margin: 0 0 10px; padding-left: 18px; font-size: 0.88rem; }
        .recent-row { display: flex; gap: 10px; align-items: center; padding: 6px 0; border-bottom: 1px solid var(--color-border); }
        @media (max-width: 700px) { .dash-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
