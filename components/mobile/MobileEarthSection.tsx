'use client';

import React from 'react';
import { IconBriefcase } from '@tabler/icons-react';
import { EXPERIENCES, Experience } from '@/lib/experiences';
import { useReveal } from './useReveal';

// Une carte par expérience, qui apparaît en douceur quand elle arrive à l'écran
function ExperienceCard({ experience }: { experience: Experience }) {
  const { ref, isVisible } = useReveal<HTMLElement>(0.2);

  return (
    <article
      ref={ref}
      className={`reveal-item ${isVisible ? 'is-visible' : ''} relative rounded-2xl border border-white/25 bg-sky-950/35 backdrop-blur-md p-4`}
    >
      {/* Point de la ligne du temps */}
      <span className="absolute -left-[1.4rem] top-5 w-3 h-3 rounded-full bg-white border-2 border-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.9)]"></span>

      <div className="flex items-center justify-between gap-2 text-[11px]">
        <span className="font-mono text-sky-100/90">{experience.period}</span>
        <span className="shrink-0 px-2 py-0.5 rounded-full bg-sky-400/25 border border-sky-300/40 text-sky-50 font-medium">
          {experience.contract}
        </span>
      </div>

      <h3 className="mt-2 text-base font-bold leading-tight text-white">{experience.role}</h3>
      <p className="mt-0.5 flex items-center gap-1.5 text-sm font-medium text-sky-200">
        <IconBriefcase className="w-4 h-4 shrink-0" />
        {experience.company}
      </p>

      <ul className="mt-3 space-y-1.5">
        {experience.highlights.map(highlight => (
          <li key={highlight} className="flex gap-2 text-xs leading-snug text-white/85">
            <span className="mt-1.5 w-1 h-1 shrink-0 rounded-full bg-sky-300"></span>
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      <ul className="mt-3 flex flex-wrap gap-1">
        {experience.skills.map(skill => (
          <li key={skill} className="px-2 py-0.5 text-[10px] leading-4 text-white rounded-full border border-white/20 bg-white/10">
            {skill}
          </li>
        ))}
      </ul>
    </article>
  );
}

// Étape 5 — Terre : parcours professionnel, une carte par expérience
export default function MobileEarthSection() {
  const { ref, isVisible } = useReveal<HTMLElement>();

  return (
    <div className="mobile-section-content">
      <header ref={ref} className={`reveal-item ${isVisible ? 'is-visible' : ''}`}>
        <span className="text-[10px] font-mono tracking-widest text-white/80">TERRE · 05</span>
        <h2 className="mt-1 text-xl font-bold text-white drop-shadow">Parcours professionnel</h2>
      </header>

      {/* Ligne du temps */}
      <div className="relative mt-4 ml-3 pl-4 border-l-2 border-sky-200/40 space-y-4">
        {EXPERIENCES.map(experience => (
          <ExperienceCard key={`${experience.company}-${experience.period}`} experience={experience} />
        ))}
      </div>
    </div>
  );
}
