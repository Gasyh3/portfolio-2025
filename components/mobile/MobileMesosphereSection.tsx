'use client';

import React from 'react';
import Image from 'next/image';
import { IconCertificate, IconSchool } from '@tabler/icons-react';
import { useReveal } from './useReveal';

const CERTIFICATIONS = [
  {
    title: 'Master of Science Pro Big Data & IA',
    organization: 'EPITECH Lyon',
    date: '2025',
    description: 'Spécialisation en intelligence artificielle et analyse de données massives.',
    image: '/images/logo/epitech.png',
    Icon: IconSchool,
  },
  {
    title: 'Certification Développeur Full Stack',
    organization: 'OpenClassrooms',
    date: '2022',
    description: 'Titre RNCP Niveau 5 (Bac+2) en programmation Web.',
    image: '/images/logo/openclassrooms.png',
    Icon: IconCertificate,
  },
  {
    title: 'Licence Mathématiques et Informatique',
    organization: 'Université de Lyon 1',
    date: '2021',
    description: 'Bac +2 spécialité Informatique.',
    image: '/images/logo/lyon1.png',
    Icon: IconCertificate,
  },
];

// Étape 3 — Mésosphère : 3 cartes empilées qui se partagent la hauteur de l'écran
export default function MobileMesosphereSection() {
  const { ref, isVisible } = useReveal<HTMLDivElement>();
  const reveal = (index: number) => ({
    className: `reveal-item ${isVisible ? 'is-visible' : ''}`,
    style: { transitionDelay: `${index * 120}ms` },
  });

  return (
    <div ref={ref} className="mobile-section-content flex flex-col">
      <header {...reveal(0)}>
        <span className="text-[10px] font-mono tracking-widest text-amber-50/80">MÉSOSPHÈRE · 03</span>
        <h2 className="mt-1 text-xl font-bold text-white drop-shadow">Diplômes & Certifications</h2>
      </header>

      <div className="mt-3 flex-1 flex flex-col gap-3">
        {CERTIFICATIONS.map(({ title, organization, date, description, image, Icon }, index) => {
          const { className, style } = reveal(index + 1);
          return (
            <article
              key={title}
              className={`${className} flex-1 min-h-0 flex items-center gap-3 rounded-2xl border border-white/30 bg-black/15 backdrop-blur-md p-3`}
              style={style}
            >
              {/* Logo de l'établissement */}
              <div className="relative w-[4.5rem] h-16 shrink-0 rounded-xl bg-white/90 shadow-md">
                <Image src={image} alt={organization} fill sizes="72px" className="object-contain p-1" />
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center bg-gradient-to-br from-amber-400 to-rose-600 border-2 border-white/70 text-white">
                  <Icon className="w-3.5 h-3.5" />
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold leading-tight text-white">{title}</h3>
                <p className="mt-1 text-xs font-medium text-amber-100">
                  {organization} • {date}
                </p>
                <p className="mt-1 text-xs leading-snug text-white/85">{description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
