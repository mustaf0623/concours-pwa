import { useEffect, useState } from 'react';
import { getProjectData, saveProjectData } from '../db/database';

const FIELDS = [
  { key: 'formation', label: 'Formation', placeholder: 'L2 AgroTIC, USSEIN…' },
  { key: 'competences', label: 'Compétences développées', placeholder: 'Développement logiciel, analyse de données, gestion de projet…' },
  { key: 'experiences', label: 'Expériences concrètes', placeholder: 'Stages, projets, associations…' },
  { key: 'interets', label: 'Problèmes agricoles qui vous intéressent', placeholder: "Ex : pollinisateurs, irrigation de précision…" },
  { key: 'technologies', label: 'Technologies qui vous intéressent', placeholder: 'Capteurs, IA, SIG, IoT…' },
  { key: 'metiers', label: 'Métiers visés', placeholder: 'Conseil agro-numérique, data agronome…' },
  { key: 'objectifs', label: 'Objectifs à 5 ans', placeholder: '…' },
  { key: 'texteProjet', label: 'Brouillon de présentation du projet (pour l\'oral)', placeholder: 'Rédigez librement…', big: true },
];

export default function Project({ profile }) {
  const [data, setData] = useState({});
  const [saved, setSaved] = useState(false);

  useEffect(() => { getProjectData().then((d) => setData(d || {})); }, []);

  const update = (key, val) => { setData((d) => ({ ...d, [key]: val })); setSaved(false); };

  const save = async () => {
    await saveProjectData(data);
    setSaved(true);
  };

  return (
    <div>
      <h1>Mon projet professionnel</h1>
      <p>
        Construisez progressivement la cohérence : <strong>formation → compétences → expériences → intérêts → Bordeaux Sciences Agro / AgroTIC → objectif professionnel.</strong>
        {profile?.prenom && <> Ce texte servira de base pour vos réponses à l'oral, {profile.prenom}.</>}
      </p>

      <div className="card">
        {FIELDS.map((f) => (
          <div className="field" key={f.key}>
            <label>{f.label}</label>
            <textarea rows={f.big ? 6 : 3} value={data[f.key] || ''} onChange={(e) => update(f.key, e.target.value)} placeholder={f.placeholder} />
          </div>
        ))}
        <button className="btn btn-primary" onClick={save}>Enregistrer</button>
        {saved && <span className="pill pill-success" style={{ marginLeft: 10 }}>Enregistré</span>}
      </div>
    </div>
  );
}
