// Corpus d'exercices. Types: qcm, court, association, calcul, synthese (auto-évaluée), argumentation (auto-évaluée)
let _id = 0;
const id = (prefix) => `${prefix}-${(++_id).toString().padStart(3, '0')}`;

export const exercises = [
  // ---- PV ----
  {
    id: id('EX'), notions: ['N-PV-01'], competences: ['Comprendre'], domaine: 'PV', niveau: 'N1', type: 'qcm',
    question: "Où se déroule la phase claire de la photosynthèse ?",
    options: ["Dans le stroma du chloroplaste", "Dans les thylakoïdes du chloroplaste", "Dans les mitochondries", "Dans le noyau"],
    correctIndex: 1,
    explication: "La phase claire se déroule dans les membranes des thylakoïdes, où se trouvent les pigments photosynthétiques.",
  },
  {
    id: id('EX'), notions: ['N-PV-01'], competences: ['Analyser'], domaine: 'PV', niveau: 'N3', type: 'court',
    question: "Un agriculteur augmente fortement l'éclairement artificiel sous serre, mais le rendement stagne. Proposez deux hypothèses explicatives.",
    reponseAttendue: "Un autre facteur limitant (CO2, température, eau, nutriments) plafonne la photosynthèse malgré la lumière suffisante ; ou la répartition des assimilats vers les organes récoltés (indice de récolte) ne s'améliore pas même si la photosynthèse augmente.",
    motsCles: ['facteur limitant', 'CO2', 'indice de récolte', 'répartition des assimilats'],
    explication: "La loi du facteur limitant de Blackman explique qu'augmenter un seul facteur (lumière) ne lève pas le plafond si un autre facteur (CO2, eau...) est devenu limitant.",
  },
  {
    id: id('EX'), notions: ['N-PV-02'], competences: ['Comprendre'], domaine: 'PV', niveau: 'N1', type: 'qcm',
    question: "Quelle hormone déclenche la fermeture des stomates en cas de stress hydrique ?",
    options: ["Auxine", "Acide abscissique (ABA)", "Gibbérelline", "Éthylène"],
    correctIndex: 1,
    explication: "L'ABA est synthétisée en réponse au stress hydrique et déclenche la fermeture stomatique.",
  },
  {
    id: id('EX'), notions: ['N-PV-02'], competences: ['Mobiliser'], domaine: 'PV', niveau: 'N2', type: 'court',
    question: "Pourquoi la période de floraison du maïs est-elle qualifiée de 'période critique' vis-à-vis du stress hydrique ?",
    reponseAttendue: "Un stress hydrique pendant la floraison perturbe la fécondation et réduit fortement le nombre de grains formés, avec un impact direct et difficilement rattrapable sur le rendement.",
    motsCles: ['fécondation', 'nombre de grains', 'rendement'],
    explication: "Contrairement à un stress en phase végétative (compensable), un stress à floraison affecte directement la composante rendement la plus sensible.",
  },
  {
    id: id('EX'), notions: ['N-PV-03'], competences: ['Comprendre'], domaine: 'PV', niveau: 'N1', type: 'qcm',
    question: "Le bilan azoté sert principalement à :",
    options: ["Calculer le prix de l'engrais", "Ajuster la dose d'azote aux besoins réels de la culture", "Mesurer le pH du sol", "Prévoir la météo"],
    correctIndex: 1,
    explication: "Le bilan azoté compare besoins et fournitures pour calculer une dose d'apport ajustée.",
  },
  {
    id: id('EX'), notions: ['N-PV-03', 'N-ENV-02'], competences: ['Analyser', 'Connecter les disciplines'], domaine: 'PV', niveau: 'N4', type: 'court',
    question: "Expliquez pourquoi un excès d'azote apporté au printemps sur un sol sableux et drainant est plus risqué pour l'environnement qu'un même excès sur un sol argileux.",
    reponseAttendue: "Un sol sableux draine rapidement et retient peu les nitrates, qui sont donc davantage lessivés vers les nappes ; un sol argileux retient mieux l'eau et les éléments, limitant la lixiviation à court terme.",
    motsCles: ['lixiviation', 'drainage', 'texture du sol', 'nitrates'],
    explication: "Ce raisonnement relie la fertilisation (PV) au cycle de l'azote et à la texture du sol (ENV) : c'est un exercice interdisciplinaire.",
  },
  {
    id: id('EX'), notions: ['N-PV-04'], competences: ['Comprendre'], domaine: 'PV', niveau: 'N1', type: 'qcm',
    question: "Que décrit la texture d'un sol ?",
    options: ["L'organisation des agrégats", "Les proportions d'argile, limon et sable", "La couleur du sol", "La teneur en matière organique"],
    correctIndex: 1,
    explication: "La texture est définie par les proportions des trois fractions granulométriques : argile, limon, sable.",
  },
  {
    id: id('EX'), notions: ['N-PV-04'], competences: ['Comparer'], domaine: 'PV', niveau: 'N2', type: 'court',
    question: "Comparez en une phrase le comportement hydrique d'un sol argileux et d'un sol sableux.",
    reponseAttendue: "Le sol argileux retient beaucoup d'eau mais draine mal, tandis que le sol sableux draine vite mais retient peu d'eau.",
    motsCles: ['rétention', 'drainage'],
    explication: "C'est la conséquence directe de la taille des particules et de la porosité associée.",
  },

  // ---- PA ----
  {
    id: id('EX'), notions: ['N-PA-01'], competences: ['Comprendre'], domaine: 'PA', niveau: 'N1', type: 'qcm',
    question: "Chez la vache, l'ovulation est déclenchée par :",
    options: ["Un pic de FSH", "Un pic de LH", "Une baisse de progestérone seule", "L'ocytocine"],
    correctIndex: 1,
    explication: "Le pic de LH déclenche l'ovulation après la phase de croissance folliculaire stimulée par la FSH.",
  },
  {
    id: id('EX'), notions: ['N-PA-01'], competences: ['Analyser'], domaine: 'PA', niveau: 'N3', type: 'court',
    question: "Un éleveur constate un taux de réussite à l'insémination artificielle en baisse depuis un an. Quelles causes envisageriez-vous en priorité ?",
    reponseAttendue: "Détection tardive ou imprécise des chaleurs, déséquilibre nutritionnel (bilan énergétique négatif), stress thermique, ou problème sanitaire affectant la cyclicité.",
    motsCles: ['détection des chaleurs', 'bilan énergétique', 'stress thermique'],
    explication: "Ce sont les causes les plus fréquentes de baisse de fertilité en élevage laitier, à hiérarchiser selon le contexte de l'exploitation.",
  },
  {
    id: id('EX'), notions: ['N-PA-02'], competences: ['Comprendre'], domaine: 'PA', niveau: 'N1', type: 'qcm',
    question: "Le bilan énergétique négatif en début de lactation signifie que :",
    options: ["La vache mange trop", "Les besoins dépassent l'ingestion possible, la vache mobilise ses réserves", "La ration contient trop de fibres", "La vache est en gestation avancée"],
    correctIndex: 1,
    explication: "En début de lactation, la production laitière augmente plus vite que la capacité d'ingestion, créant un déficit comblé par les réserves corporelles.",
  },
  {
    id: id('EX'), notions: ['N-PA-02', 'N-PA-01'], competences: ['Connecter les disciplines'], domaine: 'PA', niveau: 'N4', type: 'court',
    question: "Expliquez le lien entre bilan énergétique négatif et retard de reprise de cyclicité chez la vache laitière.",
    reponseAttendue: "Un déficit énergétique important retarde la reprise des cycles ovariens car l'organisme priorise le maintien des fonctions vitales et la lactation avant la fonction de reproduction.",
    motsCles: ['priorité physiologique', 'reprise de cyclicité', 'réserves corporelles'],
    explication: "C'est un exemple classique de compromis physiologique entre production et reproduction.",
  },

  // ---- ENV ----
  {
    id: id('EX'), notions: ['N-ENV-01'], competences: ['Comprendre'], domaine: 'ENV', niveau: 'N1', type: 'qcm',
    question: "L'évapotranspiration réelle (ETR) diffère de l'évapotranspiration potentielle (ETP) car elle dépend en plus :",
    options: ["Du prix de l'eau", "De l'eau réellement disponible dans le sol et du stade de la culture", "De la latitude uniquement", "Du type de semoir utilisé"],
    correctIndex: 1,
    explication: "L'ETR est l'ETP corrigée par la disponibilité en eau du sol et par le coefficient cultural.",
  },
  {
    id: id('EX'), notions: ['N-ENV-01'], competences: ['Analyser'], domaine: 'ENV', niveau: 'N3', type: 'donnees',
    question: "Un sol a une réserve utile de 100 mm. L'ETR journalière est de 4 mm et il n'y a pas eu de pluie depuis 15 jours. Combien de mm d'eau reste-t-il disponible dans le sol, et que recommandez-vous ?",
    reponseAttendue: "15 jours × 4 mm = 60 mm consommés. Il reste 100 − 60 = 40 mm disponibles. Selon le seuil de déclenchement retenu, une irrigation peut déjà être recommandée pour éviter d'atteindre le point de flétrissement.",
    motsCles: ['40 mm', 'irrigation', 'réserve utile'],
    explication: "Ce calcul simplifié illustre le principe du pilotage de l'irrigation par bilan hydrique.",
  },
  {
    id: id('EX'), notions: ['N-ENV-02'], competences: ['Comprendre'], domaine: 'ENV', niveau: 'N1', type: 'qcm',
    question: "La nitrification transforme :",
    options: ["Le diazote atmosphérique en ammonium", "L'ammonium en nitrates", "Les nitrates en diazote", "Les nitrates en ammonium"],
    correctIndex: 1,
    explication: "La nitrification est l'oxydation biologique de l'ammonium (NH4+) en nitrates (NO3-).",
  },
  {
    id: id('EX'), notions: ['N-ENV-02'], competences: ['Proposer'], domaine: 'ENV', niveau: 'N3', type: 'court',
    question: "Proposez une pratique agricole limitant la lixiviation des nitrates en interculture, et expliquez son mécanisme.",
    reponseAttendue: "Implanter une culture intermédiaire piège à nitrates (CIPAN) : elle absorbe l'azote minéral résiduel du sol pendant l'interculture, l'immobilisant dans sa biomasse au lieu qu'il soit lessivé par les pluies hivernales.",
    motsCles: ['CIPAN', 'culture intermédiaire', 'azote résiduel'],
    explication: "Les CIPAN sont une pratique agroécologique courante et bien documentée pour limiter les pertes d'azote.",
  },
  {
    id: id('EX'), notions: ['N-ENV-03'], competences: ['Comprendre'], domaine: 'ENV', niveau: 'N1', type: 'qcm',
    question: "La biodiversité fonctionnelle désigne :",
    options: ["Toute la biodiversité d'une région", "Les organismes rendant des services écologiques utiles à la production", "Uniquement les espèces protégées", "La diversité génétique des variétés cultivées"],
    correctIndex: 1,
    explication: "Elle se concentre sur les organismes (auxiliaires, pollinisateurs...) dont l'activité rend un service à l'agroécosystème.",
  },
  {
    id: id('EX'), notions: ['N-ENV-03', 'N-PAY-01'], competences: ['Connecter les disciplines'], domaine: 'ENV', niveau: 'N4', type: 'court',
    question: "En quoi les écorégimes de la PAC peuvent-ils encourager la biodiversité fonctionnelle ?",
    reponseAttendue: "En rémunérant des pratiques comme le maintien de haies ou de bandes fleuries, les écorégimes incitent économiquement les agriculteurs à conserver des infrastructures agroécologiques favorables aux auxiliaires de cultures.",
    motsCles: ['écorégimes', 'infrastructures agroécologiques', 'incitation économique'],
    explication: "Ce lien illustre comment une politique publique (PAY) peut influencer des pratiques agroécologiques (ENV).",
  },

  // ---- BIO ----
  {
    id: id('EX'), notions: ['N-BIO-01'], competences: ['Comprendre'], domaine: 'BIO', niveau: 'N1', type: 'qcm',
    question: "L'héritabilité d'un caractère mesure :",
    options: ["La proportion de la variation due au milieu", "La proportion de la variation phénotypique due aux facteurs génétiques", "Le nombre de gènes impliqués", "La vitesse de reproduction de l'espèce"],
    correctIndex: 1,
    explication: "L'héritabilité est la part de variance phénotypique expliquée par la variance génétique dans une population donnée.",
  },
  {
    id: id('EX'), notions: ['N-BIO-01'], competences: ['Argumenter'], domaine: 'BIO', niveau: 'N3', type: 'argumentation',
    question: "Un éleveur veut sélectionner uniquement sur le critère 'production laitière maximale'. Quels risques lui signaleriez-vous ?",
    criteres: ["Mentionne le risque de consanguinité / perte de diversité génétique", "Mentionne le risque de corrélations défavorables avec d'autres caractères (fertilité, santé)", "Propose un objectif de sélection plus équilibré"],
    corrige: "Une sélection trop étroite sur un seul caractère réduit la diversité génétique du troupeau (risque de consanguinité) et peut dégrader d'autres caractères corrélés négativement, comme la fertilité ou la résistance aux maladies. Il est généralement recommandé d'inclure plusieurs critères dans l'objectif de sélection (index composite).",
  },

  // ---- AA ----
  {
    id: id('EX'), notions: ['N-AA-01'], competences: ['Comprendre'], domaine: 'AA', niveau: 'N1', type: 'qcm',
    question: "Un CCP (point critique pour la maîtrise) dans une démarche HACCP est :",
    options: ["Un simple point de contrôle qualité", "Une étape où un danger doit impérativement être maîtrisé pour éviter un risque sanitaire", "Une étape administrative", "Le nom d'un logiciel de traçabilité"],
    correctIndex: 1,
    explication: "Le CCP est une étape où l'absence de maîtrise entraînerait un risque inacceptable pour la sécurité alimentaire.",
  },
  {
    id: id('EX'), notions: ['N-AA-01'], competences: ['Mobiliser'], domaine: 'AA', niveau: 'N2', type: 'court',
    question: "Pourquoi la pasteurisation du lait est-elle considérée comme un CCP et pas simplement comme un point de contrôle ordinaire ?",
    reponseAttendue: "Parce qu'une température ou une durée insuffisante ne détruirait pas les pathogènes visés, créant un risque sanitaire direct et non rattrapable en aval : c'est donc une étape indispensable à la maîtrise du danger.",
    motsCles: ['destruction des pathogènes', 'risque sanitaire', 'irréversible en aval'],
    explication: "Un CCP se distingue par le caractère indispensable de sa maîtrise pour éviter un danger, contrairement à un simple contrôle qualité.",
  },

  // ---- PAY ----
  {
    id: id('EX'), notions: ['N-PAY-01'], competences: ['Comprendre'], domaine: 'PAY', niveau: 'N1', type: 'qcm',
    question: "Le premier pilier de la PAC concerne principalement :",
    options: ["Le développement rural", "Les aides directes et les mesures de marché", "La formation agricole", "La recherche agronomique"],
    correctIndex: 1,
    explication: "Le premier pilier regroupe les paiements directs aux agriculteurs et les mesures de marché ; le second pilier finance le développement rural.",
  },

  // ---- TR : Synthèse de documents ----
  {
    id: id('EX'), notions: ['N-TR-01'], competences: ['Comprendre'], domaine: 'TR', niveau: 'N1', type: 'qcm',
    question: "Que doit éviter absolument une synthèse de documents ?",
    options: ["Reformuler les idées", "Introduire une opinion personnelle", "Hiérarchiser les idées", "Confronter les documents entre eux"],
    correctIndex: 1,
    explication: "La synthèse est un exercice de restitution neutre : elle ne doit contenir aucun avis personnel, contrairement à une note argumentée.",
  },
  {
    id: id('EX'), notions: ['N-TR-01', 'N-TR-02'], competences: ['Synthétiser'], domaine: 'TR', niveau: 'N5', type: 'synthese',
    question: "Deux documents sont proposés : Document A affirme que l'irrigation goutte-à-goutte permet une économie d'eau significative mais nécessite un investissement initial important. Document B souligne que dans les zones à faible pression foncière, cet investissement est rarement rentabilisé à court terme. Rédigez en 5 à 8 lignes une synthèse confrontant ces deux documents.",
    criteres: ["Ne résume pas chaque document séparément mais les confronte", "Reste neutre, sans opinion personnelle", "Reformule sans citer de longs passages", "Identifie le point de tension : bénéfice environnemental vs. rentabilité économique"],
    corrige: "Les deux documents s'accordent sur l'intérêt technique de l'irrigation goutte-à-goutte pour économiser l'eau, mais divergent sur sa pertinence économique : le document A met en avant le gain hydrique, tandis que le document B relativise l'investissement dans les contextes où le foncier n'est pas sous tension. La synthèse doit donc mettre en évidence ce compromis entre bénéfice environnemental et rentabilité, sans trancher personnellement.",
  },
  {
    id: id('EX'), notions: ['N-TR-02'], competences: ['Analyser'], domaine: 'TR', niveau: 'N3', type: 'court',
    question: "Proposez un plan en trois axes pour analyser un document traitant des impacts du changement climatique sur l'agriculture d'une région.",
    reponseAttendue: "Par exemple : (1) constat et manifestations du changement climatique dans la région, (2) impacts sur les systèmes de production agricole, (3) stratégies d'adaptation évoquées par les acteurs.",
    motsCles: ['constat', 'impacts', 'adaptation'],
    explication: "Ce plan 'constat / impacts / réponses' est transposable à beaucoup de documents traitant d'un problème et de ses solutions.",
  },

  // ---- TR : Anglais ----
  {
    id: id('EX'), notions: ['N-TR-03'], competences: ['Comprendre'], domaine: 'TR', niveau: 'N1', type: 'qcm',
    question: "Comment traduit-on 'rendement' (agricole) en anglais ?",
    options: ["Income", "Yield", "Revenue", "Output only"],
    correctIndex: 1,
    explication: "'Yield' est le terme technique standard pour le rendement d'une culture.",
  },
  {
    id: id('EX'), notions: ['N-TR-03'], competences: ['Comprendre'], domaine: 'TR', niveau: 'N1', type: 'qcm',
    question: "'Precision agriculture relies on sensors and data analysis to optimize inputs.' Que signifie 'inputs' dans ce contexte ?",
    options: ["Les données saisies dans un logiciel", "Les intrants agricoles (engrais, eau, semences...)", "Les entrées d'un capteur électronique uniquement", "Les revenus de l'exploitation"],
    correctIndex: 1,
    explication: "En contexte agricole, 'inputs' désigne les intrants : engrais, eau, semences, produits phytosanitaires.",
  },
  {
    id: id('EX'), notions: ['N-TR-03'], competences: ['Expliquer'], domaine: 'TR', niveau: 'N2', type: 'court',
    question: "Traduisez en anglais : 'Le stress hydrique réduit la photosynthèse en fermant les stomates.'",
    reponseAttendue: "Water stress reduces photosynthesis by closing the stomata.",
    motsCles: ['water stress', 'photosynthesis', 'stomata'],
    explication: "Vérifiez le vocabulaire technique clé : water stress, photosynthesis, stomata (pluriel de stoma).",
  },
  {
    id: id('EX'), notions: ['N-TR-03'], competences: ['Argumenter'], domaine: 'TR', niveau: 'N4', type: 'argumentation',
    question: "In English, explain in 3-4 sentences why precision agriculture can help reduce nitrogen losses to the environment.",
    criteres: ["Uses relevant vocabulary (sensors, data, nitrogen, inputs)", "Explains the mechanism (adjusting doses to real needs)", "Grammatically understandable, even if imperfect"],
    corrige: "Precision agriculture uses sensors and data analysis to measure the real needs of each part of a field. This allows farmers to adjust nitrogen doses more precisely instead of applying a uniform rate everywhere. As a result, excess nitrogen that could be lost to the environment through leaching is reduced.",
  },

  // ---- TR : Projet professionnel / entretien ----
  {
    id: id('EX'), notions: ['N-TR-04'], competences: ['Comprendre'], domaine: 'TR', niveau: 'N1', type: 'qcm',
    question: "Un projet professionnel cohérent doit avant tout :",
    options: ["Être impressionnant sur le papier", "Relier formation, expériences, compétences et objectif de façon logique", "Éviter de mentionner les doutes ou réorientations", "Reprendre exactement les mots du site de l'école"],
    correctIndex: 1,
    explication: "La cohérence vient du lien explicite entre le parcours vécu et l'objectif visé, pas de la forme ou du vocabulaire employé.",
  },
  {
    id: id('EX'), notions: ['N-TR-04'], competences: ['Argumenter'], domaine: 'TR', niveau: 'N4', type: 'argumentation',
    question: "Présentez en 5-6 phrases pourquoi votre parcours en AgroTIC est cohérent avec un projet vers Bordeaux Sciences Agro, en vous appuyant sur une expérience ou un projet concret que vous avez mené.",
    criteres: ["Mentionne une expérience ou un projet concret et vécu", "Relie explicitement cette expérience à une compétence ou un intérêt", "Explique pourquoi Bordeaux Sciences Agro / AgroTIC prolonge logiquement ce parcours", "Évite les formules vagues ('j'aime l'agriculture')"],
    corrige: "Il n'y a pas de corrigé unique : la qualité de la réponse dépend de la précision et de la sincérité du lien entre votre parcours réel et votre projet. Relisez les critères pour vous auto-évaluer, en vérifiant que chaque affirmation s'appuie sur un fait concret de votre parcours plutôt que sur une généralité.",
  },
];
