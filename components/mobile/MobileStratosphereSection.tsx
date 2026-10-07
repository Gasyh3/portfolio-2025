'use client';

import React from 'react';
import { IconChartLine, IconDeviceDesktop, IconServer } from '@tabler/icons-react';
import { useReveal } from './useReveal';

const DOMAINS = [
  {
    title: 'Développeur Frontend',
    description: 'Interfaces web modernes, interactives et responsives.',
    Icon: IconDeviceDesktop,
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'SCSS', 'WordPress', 'FlutterFlow'],
  },
  {
    title: 'Développeur Backend',
    description: 'Systèmes robustes, APIs et applications serveur performantes.',
    Icon: IconServer,
    tags: ['Node.js', 'Golang', 'Java', 'Python', 'MongoDB', 'PostgreSQL', 'Docker'],
  },
  {
    title: 'Data Engineer',
    description: 'Pipelines de données, ETL et systèmes distribués à grande échelle.',
    Icon: IconChartLine,
    tags: ['Kafka', 'Python', 'Kubernetes', 'ArgoCD', 'PostgreSQL', 'Git/GitHub'],
  },
];

// Étape 2 — Stratosphère : compétences dans une carte transparente plein écran
export default function MobileStratosphereSection() {
  const { ref, isVisible } = useReveal<HTMLDivElement>();
  // Délai d'apparition de chaque bloc, l'un après l'autre
  const reveal = (index: number) => ({
    className: `reveal-item ${isVisible ? 'is-visible' : ''}`,
    style: { transitionDelay: `${index * 120}ms` },
  });

  return (
    <div className="mobile-section-content flex flex-col">
      <div
        ref={ref}
        className="flex-1 flex flex-col rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-md px-4 py-4"
      >
        <header {...reveal(0)}>
          <span className="text-[10px] font-mono tracking-widest text-blue-200/70">STRATOSPHÈRE · 02</span>
          <h2 className="mt-1 text-xl font-bold text-white">Domaines d&apos;expertise</h2>
          <p className="mt-1 text-xs text-blue-100/80">
            Des compétences polyvalentes, de l&apos;interface à la donnée.
          </p>
        </header>

        <div className="mt-3 flex-1 flex flex-col justify-around gap-3">
          {DOMAINS.map(({ title, description, Icon, tags }, index) => {
            const { className, style } = reveal(index + 1);
            return (
              <article
                key={title}
                className={`${className} border-t border-white/10 pt-3`}
                style={style}
              >
                <h3 className="flex items-center gap-2 text-[15px] font-semibold text-blue-100">
                  <Icon className="w-5 h-5 shrink-0 text-blue-300" />
                  {title}
                </h3>
                <p className="mt-0.5 text-xs leading-snug text-blue-100/75">{description}</p>
                <ul className="mt-2 flex flex-wrap gap-1">
                  {tags.map(tag => (
                    <li
                      key={tag}
                      className="px-2 py-0.5 text-[10px] leading-4 text-blue-50 rounded-full border border-white/15 bg-white/5"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
