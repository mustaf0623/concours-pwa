import { useEffect, useState } from 'react';
import { getAllMastery, getSessions, getRecentAttempts } from '../db/database';
import { domains } from '../data/domains';
import { notions } from '../data/notions';

export default function Progression() {
  const [mastery, setMastery] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    (async () => {
      setMastery(await getAllMastery());
      setSessions(await getSessions());
      setAttempts(await getRecentAttempts(200));
    })();
  }, []);

  const byDomain = domains.map((d) => {
    const domainNotionIds = notions.filter((n) => n.domaine === d.id).map((n) => n.id);
    const relevant = mastery.filter((m) => domainNotionIds.includes(m.notionId));
    const avg = relevant.length ? relevant.reduce((s, m) => s + m.score, 0) / relevant.length : 0;
    return { domain: d, avg, practiced: relevant.length, total: domainNotionIds.length };
  });

  const levelCounts = { D1: 0, D2: 0, D3: 0, D4: 0 };
  mastery.forEach((m) => { levelCounts[m.level] = (levelCounts[m.level] || 0) + 1; });

  const concoursSessions = sessions.filter((s) => s.type === 'concours' && s.results);

  return (
    <div>
      <h1>Progression</h1>
      <p>Une vue honnête et multidimensionnelle — pas une seule barre globale.</p>

      <section className="prog-section">
        <h3>Progression par domaine</h3>
        {byDomain.map(({ domain, avg, practiced, total }) => (
          <div key={domain.id} className="prog-row">
            <div className="prog-label">
              <span className="pill" style={{ background: domain.couleur, color: '#fff', borderColor: domain.couleur }}>{domain.id}</span>
              {domain.nom} <span className="prog-sub">({practiced}/{total} notions abordées)</span>
            </div>
            <div className="progress-track"><div className="progress-fill" style={{ width: `${avg}%` }} /></div>
          </div>
        ))}
      </section>

      <section className="prog-section">
        <h3>Niveaux de maîtrise (D1 → D4)</h3>
        <div className="level-grid">
          {Object.entries(levelCounts).map(([lvl, count]) => (
            <div className="card level-card" key={lvl}>
              <div className="level-count">{count}</div>
              <div className="level-label">{lvl}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="prog-section">
        <h3>Simulations concours</h3>
        {concoursSessions.length === 0 && <p className="empty-hint">Aucune simulation réalisée pour le moment.</p>}
        {concoursSessions.slice(0, 5).map((s) => (
          <div key={s.id} className="card" style={{ marginBottom: 8 }}>
            {new Date(s.startedAt).toLocaleDateString()} — {s.results.correct}/{s.results.total} bonnes réponses
          </div>
        ))}
      </section>

      <section className="prog-section">
        <h3>Activité</h3>
        <p>{attempts.length} tentative{attempts.length > 1 ? 's' : ''} enregistrée{attempts.length > 1 ? 's' : ''} au total sur cet appareil.</p>
      </section>

      <style>{`
        .prog-section { margin-bottom: 26px; }
        .prog-row { margin-bottom: 12px; }
        .prog-label { font-size: 0.88rem; margin-bottom: 4px; display: flex; align-items: center; gap: 8px; }
        .prog-sub { color: var(--color-text-muted); font-size: 0.78rem; }
        .level-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
        .level-card { text-align: center; }
        .level-count { font-family: var(--font-display); font-size: 1.6rem; font-weight: 700; color: var(--color-primary); }
        .level-label { font-size: 0.78rem; color: var(--color-text-muted); }
      `}</style>
    </div>
  );
}
