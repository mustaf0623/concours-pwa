// Contenu pédagogique — domaines. Choix pédagogique de la PWA (non un document officiel du concours).
export const domains = [
  {
    id: 'PV',
    nom: 'Productions végétales',
    description: "Physiologie des plantes cultivées, itinéraires techniques, sol et fertilisation.",
    couleur: '#3F7D5C',
  },
  {
    id: 'PA',
    nom: 'Productions animales',
    description: "Élevage, reproduction, nutrition et bien-être animal.",
    couleur: '#8B6F47',
  },
  {
    id: 'ENV',
    nom: 'Environnement, eau et sol',
    description: "Cycles biogéochimiques, ressource en eau, gestion des sols et biodiversité.",
    couleur: '#2E7D6B',
  },
  {
    id: 'BIO',
    nom: 'Biologie, biotechnologies et santé',
    description: "Génétique, physiologie, biotechnologies appliquées à l'agriculture.",
    couleur: '#3A6EA5',
  },
  {
    id: 'AA',
    nom: 'Agroalimentaire',
    description: "Transformation, qualité, sécurité sanitaire des aliments.",
    couleur: '#B4532A',
  },
  {
    id: 'PAY',
    nom: 'Paysage, territoire et aménagement',
    description: "Occupation des sols, politiques agricoles, dynamiques territoriales.",
    couleur: '#6B5B95',
  },
  {
    id: 'TR',
    nom: 'Transversal — Méthode, synthèse & anglais',
    description: "Analyse et synthèse de documents, argumentation, anglais — les épreuves réelles du concours voie Apprentissage.",
    couleur: '#1F4B3F',
  },
];

export const units = [
  { id: 'PV-1', domaine: 'PV', nom: 'Physiologie végétale' },
  { id: 'PV-2', domaine: 'PV', nom: 'Sol et fertilisation' },
  { id: 'PA-1', domaine: 'PA', nom: 'Reproduction et nutrition animale' },
  { id: 'ENV-1', domaine: 'ENV', nom: 'Cycles et ressource en eau' },
  { id: 'ENV-2', domaine: 'ENV', nom: 'Biodiversité et agroécologie' },
  { id: 'BIO-1', domaine: 'BIO', nom: 'Génétique et sélection' },
  { id: 'AA-1', domaine: 'AA', nom: 'Sécurité sanitaire des aliments' },
  { id: 'PAY-1', domaine: 'PAY', nom: 'Territoires et politiques agricoles' },
  { id: 'TR-1', domaine: 'TR', nom: 'Méthodologie de synthèse de documents' },
  { id: 'TR-2', domaine: 'TR', nom: 'Anglais — compréhension et expression' },
  { id: 'TR-3', domaine: 'TR', nom: "Projet professionnel et entretien" },
];
