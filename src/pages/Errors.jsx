import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getErrorStats, getAllMastery } from '../db/database';
import { notions } from '../data/notions';

export default function Errors() {
  const [stats, setStats] = useState(null);
  const [mastery, setMastery] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setStats(await getErrorStats());
      setMastery(await getAllMastery());
    })();
  }, []);

  if (!stats) return <p>Chargement…</p>;

  const rows = Object.entries(stats.byNotion)
    .map(([notionId, count]) => ({
      notion: notions.find((n) => n.id === notionId),
      count,
      mastery: mastery.find((m) => m.notionId === notionId),
    }))
    .filter((r) => r.notion)
    .sort((a, b) => b.count - a.count);

  return (
    <div>
      <h1>Mes erreurs</h1>
      <p>
        {stats.totalWrong} réponse{stats.totalWrong > 1 ? 's' : ''} à retravailler sur {stats.totalAttempts} tentative{stats.totalAttempts > 1 ? 's' : ''}.
        Une erreur n'est jamais qu'un « faux » : elle indique une notion à consolider.
      </p>

      {rows.length === 0 && <p className="empty-hint">Aucune erreur enregistrée pour le moment — commencez un entraînement.</p>}

      <div className="error-list">
        {rows.map((r) => (
          <div className="card error-row" key={r.notion.id}>
            <div>
              <div className="error-row-title">{r.notion.nom}</div>
              <div className="error-row-sub">{r.count} erreur{r.count > 1 ? 's' : ''} · domaine {r.notion.domaine}</div>
              {r.mastery && <div className="progress-track" style={{ marginTop: 8, width: 160 }}>
                <div className="progress-fill" style={{ width: `${r.mastery.score}%` }} />
              </div>}
            </div>
            <button className="btn btn-secondary" onClick={() => navigate('/entrainement')}>
              Remédiation
            </button>
          </div>
        ))}
      </div>

      <style>{`
        .error-list { display: flex; flex-direction: column; gap: 10px; }
        .error-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .error-row-title { font-weight: 600; }
        .error-row-sub { font-size: 0.82rem; color: var(--color-text-muted); }
      `}</style>
    </div>
  );
}
