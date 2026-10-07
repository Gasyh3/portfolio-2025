'use client';

import React from 'react';

interface MobileSectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// Conteneur d'une étape mobile : au moins un écran de haut, défilement vertical
// uniquement, rien ne peut dépasser en largeur.
export default function MobileSection({ id, children, className = '', style }: MobileSectionProps) {
  return (
    <section id={id} className={`mobile-section ${className}`} style={style}>
      {children}
    </section>
  );
}
