import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllMastery, getReviewQueue } from '../db/database';
import { getNotionsFragiles, getNotionsJamaisPratiquees } from '../services/adaptiveEngine';
import { notions } from '../data/notions';

export default function Review() {
  const [mastery, setMastery] = useState([]);
  const [dueQueue, setDueQueue] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setMastery(await getAllMastery());
      setDueQueue(await getReviewQueue());
    })();
  }, []);

  const fragiles = getNotionsFragiles(mastery);
  const jamaisPratiquees = getNotionsJamaisPratiquees(mastery);

  return (
    <div>
      <h1>À revoir</h1>
      <p>Les notions qui ont le plus besoin de votre attention en ce moment.</p>

      <section className="review-section">
        <h3>Réactivation programmée ({dueQueue.length})</h3>
        {dueQueue.length === 0 && <p className="empty-hint">Rien de programmé pour l'instant.</p>}
        <div className="review-grid">
          {dueQueue.map((r) => {
            const n = notions.find((x) => x.id === r.notionId);
            if (!n) return null;
            return <div className="card review-item" key={r.notionId}><strong>{n.nom}</strong><span className="pill pill-warning">à revoir</span></div>;
          })}
        </div>
      </section>

      <section className="review-section">
        <h3>Notions fragiles ({fragiles.length})</h3>
        {fragiles.length === 0 && <p className="empty-hint">Aucune notion fragile identifiée.</p>}
        <div className="review-grid">
          {fragiles.map((m) => {
            const n = notions.find((x) => x.id === m.notionId);
            if (!n) return null;
            return (
              <div className="card review-item" key={m.notionId}>
                <strong>{n.nom}</strong>
                <div className="progress-track" style={{ marginTop: 6 }}><div className="progress-fill" style={{ width: `${m.score}%`, background: 'var(--color-error)' }} /></div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="review-section">
        <h3>Jamais pratiquées ({jamaisPratiquees.length})</h3>
        <div className="review-grid">
          {jamaisPratiquees.slice(0, 8).map((n) => (
            <div className="card review-item" key={n.id}><strong>{n.nom}</strong><span className="pill">découverte</span></div>
          ))}
        </div>
      </section>

      <button className="btn btn-primary" onClick={() => navigate('/entrainement')}>Lancer un entraînement recommandé</button>

      <style>{`
        .review-section { margin-bottom: 28px; }
        .review-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .review-item { display: flex; flex-direction: column; gap: 6px; }
        @media (max-width: 700px) { .review-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
