'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { IconChevronLeft, IconChevronRight, IconExternalLink } from '@tabler/icons-react';
import { useReveal } from './useReveal';

const PROJECTS = [
  {
    title: 'ESFORMA',
    type: 'Client',
    description: 'Site d’une entreprise spécialisée dans la formation sécurité des entreprises.',
    imageSrc: '/images/stuff/esforma_miniature.png',
    tags: ['WordPress', 'PHP', 'CSS', 'HTML', 'JavaScript'],
    link: 'https://www.esforma.fr/',
  },
  {
    title: 'MASTORE',
    type: 'Pro',
    description: 'Module statistiques de l’ERP d’un bureau d’études spécialisé dans les réseaux de magasins.',
    imageSrc: '/images/stuff/mastore_miniature.png',
    tags: ['Go', 'PostgreSQL', 'React', 'CI/CD', 'Docker'],
    link: 'https://mastore.vercel.app/',
  },
  {
    title: 'Booki',
    type: 'Étudiant',
    description: 'Site de réservation de locations de vacances.',
    imageSrc: '/images/stuff/booki_miniature.png',
    tags: ['HTML', 'Redux'],
    link: 'https://gasyh3.github.io/P2_website/',
  },
  {
    title: 'Ohmyfood',
    type: 'Étudiant',
    description: 'Site de réservation de restaurants.',
    imageSrc: '/images/stuff/ohmyfood_miniature.png',
    tags: ['HTML', 'SCSS', 'JavaScript'],
    link: 'https://gasyh3.github.io/P3_website/index.html',
  },
  {
    title: 'La Chouette Agence',
    type: 'Étudiant',
    description: 'Optimisation SEO d’un site d’agence web.',
    imageSrc: '/images/stuff/chouette_miniature.png',
    tags: ['SEO', 'HTML', 'JavaScript', 'SCSS'],
    link: 'https://gasyh3.github.io/P4_website/after_optimisation/',
  },
];

const SWIPE_THRESHOLD = 70; // px à parcourir pour changer de carte
const LEAVE_DURATION = 250; // ms

type Project = (typeof PROJECTS)[number];

// Carte au format carte Pokémon (ratio 5:7)
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <div className="h-full w-full rounded-[18px] p-[6px] bg-gradient-to-br from-yellow-200 via-amber-300 to-yellow-500 shadow-2xl">
      <div className="h-full w-full rounded-xl flex flex-col overflow-hidden bg-gradient-to-b from-sky-100 via-sky-200 to-blue-300 px-3 pt-2 pb-3">
        {/* Nom + numéro */}
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="min-w-0 truncate text-base font-extrabold text-slate-900">{project.title}</h3>
          <span className="shrink-0 text-[10px] font-mono font-bold text-slate-600">
            N°{String(index + 1).padStart(2, '0')}/{String(PROJECTS.length).padStart(2, '0')}
          </span>
        </div>

        {/* Illustration */}
        <div className="relative mt-1.5 flex-1 min-h-0 rounded-md border-[3px] border-slate-300 bg-slate-800 shadow-inner overflow-hidden">
          <Image
            src={project.imageSrc}
            alt={project.title}
            fill
            sizes="300px"
            className="object-cover object-top"
            draggable={false}
          />
        </div>

        {/* Type */}
        <div className="mt-1.5 flex items-center justify-between text-[10px] font-semibold text-slate-700">
          <span className="px-2 py-0.5 rounded-full bg-slate-900/80 text-yellow-200 uppercase tracking-wider">
            {project.type}
          </span>
          <span className="italic">Projet web</span>
        </div>

        {/* Technos */}
        <ul className="mt-2 flex flex-wrap gap-1">
          {project.tags.map(tag => (
            <li key={tag} className="px-1.5 py-px text-[10px] font-medium rounded bg-white/70 text-slate-800 border border-slate-400/40">
              {tag}
            </li>
          ))}
        </ul>

        {/* Description */}
        <p className="mt-2 text-[11px] leading-snug italic text-slate-800 border-t border-slate-500/30 pt-1.5 line-clamp-3">
          {project.description}
        </p>

        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-lg bg-slate-900 py-1.5 text-xs font-semibold text-yellow-200 active:bg-slate-700"
          draggable={false}
        >
          Voir le projet
          <IconExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}

// Étape 4 — Atmosphère : paquet de cartes projets à faire glisser
export default function MobileAtmosphereSection() {
  const { ref, isVisible } = useReveal<HTMLDivElement>();
  const [current, setCurrent] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [leaving, setLeaving] = useState<-1 | 0 | 1>(0);

  // Suivi du geste : on ne prend la main que si le geste est horizontal
  const gesture = useRef<{ x: number; y: number; axis: 'x' | 'y' | null; id: number } | null>(null);
  const hasDragged = useRef(false);

  const total = PROJECTS.length;
  // Carte révélée derrière : la précédente si on glisse vers la droite, sinon la suivante
  const behind = dragX > 0 || leaving === 1 ? (current - 1 + total) % total : (current + 1) % total;

  const goTo = (direction: 1 | -1) => {
    if (leaving) return;
    setLeaving(direction === 1 ? -1 : 1); // suivant = la carte part à gauche
    window.setTimeout(() => {
      setCurrent(c => (c + direction + total) % total);
      setLeaving(0);
      setDragX(0);
    }, LEAVE_DURATION);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (leaving) return;
    gesture.current = { x: e.clientX, y: e.clientY, axis: null, id: e.pointerId };
    hasDragged.current = false;
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const g = gesture.current;
    if (!g || g.id !== e.pointerId) return;
    const dx = e.clientX - g.x;
    const dy = e.clientY - g.y;
    if (!g.axis) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      g.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      if (g.axis === 'x') e.currentTarget.setPointerCapture(e.pointerId);
    }
    if (g.axis === 'x') {
      hasDragged.current = true;
      setDragX(dx);
    }
  };

  const onPointerEnd = () => {
    const g = gesture.current;
    gesture.current = null;
    if (!g || g.axis !== 'x') return;
    if (dragX <= -SWIPE_THRESHOLD) goTo(1);
    else if (dragX >= SWIPE_THRESHOLD) goTo(-1);
    else setDragX(0);
  };

  const isDragging = gesture.current?.axis === 'x';
  const offset = leaving ? leaving * 140 : 0; // en % de la largeur de la carte
  const topCardStyle: React.CSSProperties = {
    transform: leaving
      ? `translateX(${offset}%) rotate(${leaving * 18}deg)`
      : `translateX(${dragX}px) rotate(${dragX / 18}deg)`,
    transition: isDragging ? 'none' : `transform ${LEAVE_DURATION}ms ease-out`,
  };
  // La carte suivante se rapproche à mesure que l'on fait glisser
  const progress = leaving ? 1 : Math.min(Math.abs(dragX) / SWIPE_THRESHOLD, 1);

  return (
    <div ref={ref} className="mobile-section-content flex flex-col">
      <header className={`reveal-item ${isVisible ? 'is-visible' : ''}`}>
        <span className="text-[10px] font-mono tracking-widest text-white/80">ATMOSPHÈRE · 04</span>
        <h2 className="mt-1 text-xl font-bold text-white drop-shadow">Mes Projets</h2>
      </header>

      {/* Paquet de cartes */}
      <div
        className={`reveal-item ${isVisible ? 'is-visible' : ''} flex-1 min-h-0 flex items-center justify-center py-3`}
        style={{ transitionDelay: '120ms' }}
      >
        <div className="project-card-size relative">
          {/* Carte suivante, derrière */}
          <div
            className="absolute inset-0"
            style={{
              transform: `scale(${0.92 + 0.08 * progress}) rotate(${4 - 4 * progress}deg)`,
              opacity: 0.6 + 0.4 * progress,
              transition: isDragging ? 'none' : `transform ${LEAVE_DURATION}ms ease-out, opacity ${LEAVE_DURATION}ms ease-out`,
            }}
            aria-hidden="true"
          >
            <ProjectCard project={PROJECTS[behind]} index={behind} />
          </div>

          {/* Carte du dessus, à faire glisser */}
          <div
            key={current}
            className="absolute inset-0 cursor-grab active:cursor-grabbing select-none"
            style={{ ...topCardStyle, touchAction: 'pan-y' }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerEnd}
            onPointerCancel={onPointerEnd}
            onClickCapture={e => {
              // Un glissement ne doit pas ouvrir le lien
              if (hasDragged.current) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            aria-roledescription="carte"
            aria-label={`Projet ${current + 1} sur ${total} : ${PROJECTS[current].title}`}
          >
            <ProjectCard project={PROJECTS[current]} index={current} />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => goTo(-1)}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white active:bg-white/40"
          aria-label="Projet précédent"
        >
          <IconChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center gap-1.5">
          <div className="flex gap-1.5">
            {PROJECTS.map((project, index) => (
              <span
                key={project.title}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === current ? 'w-5 bg-white' : 'w-1.5 bg-white/40'
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] text-white/80">Glisse la carte</span>
        </div>

        <button
          type="button"
          onClick={() => goTo(1)}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white active:bg-white/40"
          aria-label="Projet suivant"
        >
          <IconChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
