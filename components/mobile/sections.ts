// Étapes du site mobile — mêmes ids et même ordre que la version desktop (app/page.tsx)
export interface MobileSectionConfig {
  id: string;
  label: string;
  // Couleur du header quand la section est active (même palette que Header.tsx)
  headerClass: string;
  // Couleur d'accent (indicateurs, menu)
  accentClass: string;
}

export const MOBILE_SECTIONS: MobileSectionConfig[] = [
  { id: 'home', label: 'Accueil', headerClass: 'bg-black/80', accentClass: 'bg-white' },
  { id: 'competences', label: 'Compétences', headerClass: 'bg-blue-900/80', accentClass: 'bg-blue-400' },
  { id: 'certifications', label: 'Certifications', headerClass: 'bg-orange-600/80', accentClass: 'bg-orange-400' },
  { id: 'projets', label: 'Projets', headerClass: 'bg-blue-600/80', accentClass: 'bg-blue-300' },
  { id: 'experience', label: 'Expérience', headerClass: 'bg-sky-700/80', accentClass: 'bg-sky-400' },
  { id: 'contact', label: 'Contact', headerClass: 'bg-amber-900/80', accentClass: 'bg-amber-400' },
];
