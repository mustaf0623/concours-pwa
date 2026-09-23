import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="landing">
      <div className="landing-hero">
        <div className="landing-eyebrow">AgroTIC · USSEIN → Bordeaux Sciences Agro</div>
        <h1>Se préparer sérieusement au concours, pas simplement réviser.</h1>
        <p className="landing-lead">
          Un environnement d'entraînement personnel : analyse et synthèse de documents, anglais,
          culture scientifique agricole, préparation de l'entretien et du projet professionnel —
          avec une vraie mémoire de votre parcours, stockée sur votre appareil.
        </p>
        <button className="btn btn-primary landing-cta" onClick={() => navigate('/onboarding')}>
          Créer mon espace de préparation
        </button>
        <p className="landing-note">Aucune donnée n'est envoyée à un serveur : tout reste sur cet appareil (IndexedDB).</p>
      </div>

      <div className="landing-loop">
        {['Apprendre', 'S\'entraîner', 'Se tromper', 'Comprendre', 'Corriger', 'Transférer', 'Réactiver', 'Simuler'].map((step, i) => (
          <div className="loop-step" key={step}>
            <span className="loop-index">{i + 1}</span>
            <span>{step}</span>
          </div>
        ))}
      </div>

      <div className="landing-grid">
        <div className="card">
          <h3>Synthèse & argumentation</h3>
          <p>La véritable épreuve écrite du concours voie Apprentissage : analyser, confronter et restituer des documents sans opinion personnelle.</p>
        </div>
        <div className="card">
          <h3>Anglais appliqué</h3>
          <p>Vocabulaire agricole et numérique, traduction, compréhension — utile pour les documents comme pour l'entretien.</p>
        </div>
        <div className="card">
          <h3>Mémoire de votre erreur</h3>
          <p>Chaque erreur est analysée, expliquée et reprogrammée pour révision — jamais simplement notée « faux ».</p>
        </div>
        <div className="card">
          <h3>Entretien & projet</h3>
          <p>Un espace dédié pour construire un projet professionnel cohérent et s'entraîner aux questions d'oral.</p>
        </div>
      </div>

      <style>{`
        .landing { max-width: 880px; margin: 0 auto; padding: 56px 24px 80px; }
        .landing-eyebrow { color: var(--color-accent); font-weight: 600; font-size: 0.85rem; margin-bottom: 14px; }
        .landing-hero h1 { font-size: 2.3rem; max-width: 14ch; margin-bottom: 18px; }
        .landing-lead { max-width: 58ch; color: var(--color-text-muted); font-size: 1.02rem; }
        .landing-cta { margin: 8px 0 10px; font-size: 1rem; padding: 13px 24px; }
        .landing-note { font-size: 0.8rem; color: var(--color-text-muted); }
        .landing-loop {
          display: flex; flex-wrap: wrap; gap: 8px; margin: 40px 0 44px;
          border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border);
          padding: 18px 0;
        }
        .loop-step { display: flex; align-items: center; gap: 6px; font-size: 0.82rem; color: var(--color-text-muted); }
        .loop-index {
          width: 20px; height: 20px; border-radius: 50%; background: var(--color-surface-alt);
          display: flex; align-items: center; justify-content: center; font-size: 0.68rem; font-weight: 700;
          color: var(--color-primary-dark);
        }
        .landing-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        @media (max-width: 640px) { .landing-grid { grid-template-columns: 1fr; } .landing-hero h1 { font-size: 1.7rem; } }
      `}</style>
    </div>
  );
}
