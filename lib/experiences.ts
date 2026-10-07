// Expériences professionnelles (source : CV) — partagées par les versions desktop et mobile
export interface Experience {
  role: string;
  company: string;
  contract: 'CDD' | 'CDI' | 'Alternance';
  period: string;
  highlights: string[];
  skills: string[];
}

export const EXPERIENCES: Experience[] = [
  {
    role: 'Développeur Full Stack',
    company: 'Mastore',
    contract: 'CDD',
    period: 'Juillet 2025 – Juillet 2026',
    highlights: [
      "Accompagnement et encadrement technique des alternants de l'équipe.",
      'Mise à jour et structuration de la documentation technique.',
      'Pilotage de la migration progressive de la base de code JavaScript vers TypeScript.',
      'Conteneurisation des applications avec Docker et participation aux déploiements.',
      'Conception et développement de services backend en Golang.',
    ],
    skills: ['TypeScript', 'Go', 'React', 'Docker', 'ArgoCD'],
  },
  {
    role: 'Développeur Full Stack',
    company: 'Mastore',
    contract: 'Alternance',
    period: 'Décembre 2023 – Juillet 2025',
    highlights: [
      "Maintenance et évolution de l'ERP interne.",
      'Migration progressive du code JavaScript vers TypeScript.',
      'Conception et développement de services backend en Golang.',
    ],
    skills: ['Go', 'TypeScript', 'React', 'PostgreSQL', 'GitLab'],
  },
  {
    role: 'Chef de projet & Développeur Full Stack Mobile',
    company: 'WAA-Agropro',
    contract: 'Alternance',
    period: 'Mars 2023 – Décembre 2023',
    highlights: [
      "Pilotage de bout en bout de la conception et du développement d'une application.",
      "Coordination des parties prenantes et suivi de l'avancement du projet.",
      'Rédaction des spécifications techniques et fonctionnelles.',
      'Maintenance et évolution de la boutique e-commerce.',
    ],
    skills: ['FlutterFlow', 'Firebase', 'PrestaShop', 'Figma'],
  },
];
