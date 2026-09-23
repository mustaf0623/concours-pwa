import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { domains, units } from '../data/domains';
import { notions } from '../data/notions';

export default function Learn() {
  const { notionId } = useParams();
  const navigate = useNavigate();
  const [activeDomain, setActiveDomain] = useState(notions.find((n) => n.id === notionId)?.domaine || domains[0].id);
  const [activeNotion, setActiveNotion] = useState(notionId || null);

  const domainUnits = units.filter((u) => u.domaine === activeDomain);
  const notion = notions.find((n) => n.id === activeNotion);

  return (
    <div>
      <h1>Apprendre</h1>
      <p>Parcourez les domaines, unités et notions. Chaque notion propose plusieurs niveaux de compréhension.</p>

      <div className="domain-tabs">
        {domains.map((d) => (
          <button
            key={d.id}
            className={'domain-tab' + (d.id === activeDomain ? ' active' : '')}
            onClick={() => { setActiveDomain(d.id); setActiveNotion(null); }}
            style={{ '--tab-color': d.couleur }}
          >
            {d.id}
          </button>
        ))}
      </div>
      <p className="domain-desc">{domains.find((d) => d.id === activeDomain)?.description}</p>

      <div className="learn-layout">
        <div className="notion-list">
          {domainUnits.map((u) => (
            <div key={u.id} className="unit-block">
              <div className="unit-title">{u.nom}</div>
              {notions.filter((n) => n.unite === u.id).map((n) => (
                <button
                  key={n.id}
                  className={'notion-item' + (n.id === activeNotion ? ' active' : '')}
                  onClick={() => setActiveNotion(n.id)}
                >
                  {n.nom}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className="notion-detail">
          {!notion && <p className="empty-hint">Sélectionnez une notion à gauche pour l'étudier.</p>}
          {notion && (
            <div className="card">
              <h2>{notion.nom}</h2>
              <section>
                <h4>Comprendre simplement</h4>
                <p>{notion.definition}</p>
              </section>
              <section>
                <h4>Comprendre scientifiquement</h4>
                <p>{notion.mecanisme}</p>
              </section>
              <section>
                <h4>Mobiliser — exemple</h4>
                <p>{notion.exemple}</p>
              </section>
              {notion.limites && (
                <section>
                  <h4>Limites</h4>
                  <p>{notion.limites}</p>
                </section>
              )}
              {notion.erreursFrequentes?.length > 0 && (
                <section>
                  <h4>Erreurs fréquentes</h4>
                  <ul>{notion.erreursFrequentes.map((e, i) => <li key={i}>{e}</li>)}</ul>
                </section>
              )}
              <button className="btn btn-primary" onClick={() => navigate('/entrainement')}>
                S'entraîner sur cette notion
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .domain-tabs { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 6px; }
        .domain-tab {
          padding: 7px 14px; border-radius: 999px; border: 1px solid var(--color-border);
          background: #fff; font-weight: 700; font-size: 0.8rem; color: var(--color-text-muted);
        }
        .domain-tab.active { background: var(--tab-color); border-color: var(--tab-color); color: #fff; }
        .domain-desc { color: var(--color-text-muted); font-size: 0.88rem; margin-bottom: 20px; }
        .learn-layout { display: grid; grid-template-columns: 260px 1fr; gap: 20px; align-items: start; }
        .unit-block { margin-bottom: 16px; }
        .unit-title { font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.02em; color: var(--color-text-muted); margin-bottom: 6px; }
        .notion-item {
          display: block; width: 100%; text-align: left; padding: 8px 10px; border-radius: 8px;
          border: 1px solid transparent; background: transparent; font-size: 0.85rem; margin-bottom: 2px;
        }
        .notion-item:hover { background: var(--color-surface-alt); }
        .notion-item.active { background: var(--color-surface); border-color: var(--color-border); font-weight: 600; }
        .notion-detail section { margin-bottom: 14px; }
        .notion-detail h4 { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.02em; color: var(--color-accent); margin-bottom: 4px; }
        .empty-hint { color: var(--color-text-muted); }
        @media (max-width: 760px) { .learn-layout { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
