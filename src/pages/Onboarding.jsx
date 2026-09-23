import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const STEPS = ['identite', 'parcours', 'objectifs'];

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    prenom: '', formation: '', etablissement: '',
    dateCible: '', domainesARenforcer: [], notes: '',
  });
  const navigate = useNavigate();

  const update = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const toggleDomaine = (d) => {
    setForm((f) => ({
      ...f,
      domainesARenforcer: f.domainesARenforcer.includes(d)
        ? f.domainesARenforcer.filter((x) => x !== d)
        : [...f.domainesARenforcer, d],
    }));
  };

  const finish = async () => {
    await onComplete(form);
    navigate('/');
  };

  return (
    <div className="onboarding">
      <div className="onboarding-progress">
        {STEPS.map((s, i) => (
          <div key={s} className={'ob-dot' + (i <= step ? ' filled' : '')} />
        ))}
      </div>

      {step === 0 && (
        <section className="card ob-card">
          <h2>Faisons connaissance</h2>
          <p>Ces informations personnalisent votre tableau de bord et votre entretien oral.</p>
          <div className="field">
            <label>Prénom</label>
            <input type="text" value={form.prenom} onChange={(e) => update('prenom', e.target.value)} placeholder="Mouhamadou" />
          </div>
          <div className="field">
            <label>Formation actuelle</label>
            <input type="text" value={form.formation} onChange={(e) => update('formation', e.target.value)} placeholder="L2 AgroTIC" />
          </div>
          <div className="field">
            <label>Établissement</label>
            <input type="text" value={form.etablissement} onChange={(e) => update('etablissement', e.target.value)} placeholder="USSEIN" />
          </div>
          <button className="btn btn-primary" disabled={!form.prenom} onClick={() => setStep(1)}>Continuer</button>
        </section>
      )}

      {step === 1 && (
        <section className="card ob-card">
          <h2>Votre échéance</h2>
          <p>Cela permet d'adapter le rythme de recommandation d'entraînement.</p>
          <div className="field">
            <label>Date visée du concours (si connue)</label>
            <input type="date" value={form.dateCible} onChange={(e) => update('dateCible', e.target.value)} />
          </div>
          <div className="field">
            <label>Domaines que vous sentez comme prioritaires à renforcer</label>
            <div className="chip-row">
              {['PV', 'PA', 'ENV', 'BIO', 'AA', 'PAY', 'TR'].map((d) => (
                <button
                  type="button"
                  key={d}
                  className={'chip' + (form.domainesARenforcer.includes(d) ? ' chip-active' : '')}
                  onClick={() => toggleDomaine(d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div className="ob-actions">
            <button className="btn btn-secondary" onClick={() => setStep(0)}>Retour</button>
            <button className="btn btn-primary" onClick={() => setStep(2)}>Continuer</button>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="card ob-card">
          <h2>Une chose en plus ?</h2>
          <p>Facultatif — une note sur votre situation, vos doutes, ou ce que vous attendez de cet entraînement.</p>
          <div className="field">
            <textarea rows={4} value={form.notes} onChange={(e) => update('notes', e.target.value)} placeholder="Écrivez librement…" />
          </div>
          <div className="ob-actions">
            <button className="btn btn-secondary" onClick={() => setStep(1)}>Retour</button>
            <button className="btn btn-primary" onClick={finish}>Créer mon espace</button>
          </div>
        </section>
      )}

      <style>{`
        .onboarding { max-width: 560px; margin: 60px auto; padding: 0 20px; }
        .onboarding-progress { display: flex; gap: 6px; margin-bottom: 24px; }
        .ob-dot { width: 30px; height: 4px; border-radius: 2px; background: var(--color-border); }
        .ob-dot.filled { background: var(--color-accent); }
        .ob-card { display: flex; flex-direction: column; }
        .ob-actions { display: flex; gap: 10px; }
        .chip-row { display: flex; flex-wrap: wrap; gap: 8px; }
        .chip { padding: 7px 14px; border-radius: 999px; border: 1px solid var(--color-border); background: #fff; font-size: 0.85rem; font-weight: 600; color: var(--color-text-muted); }
        .chip-active { background: var(--color-primary); border-color: var(--color-primary); color: #fff; }
      `}</style>
    </div>
  );
}
