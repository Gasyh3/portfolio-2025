'use client';

import React from 'react';
import {
  IconArrowUp,
  IconBolt,
  IconBrandGithub,
  IconBrandGitlab,
  IconBrandLinkedin,
  IconBrandX,
  IconMail,
  IconMapPin,
  IconSend,
} from '@tabler/icons-react';
import { useReveal } from './useReveal';

const EMAIL = 'kevin.rakotoniaina@epitech.eu';

const CONTACT_ITEMS = [
  { label: 'E-mail', value: EMAIL, href: `mailto:${EMAIL}`, Icon: IconMail },
  { label: 'Localisation', value: 'Île-de-France, France', Icon: IconMapPin },
  { label: 'Disponibilité', value: 'Ouvert aux nouvelles opportunités', Icon: IconBolt },
];

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/Gasyh3', Icon: IconBrandGithub },
  { label: 'GitLab', href: 'https://gitlab.com/Gasyh3', Icon: IconBrandGitlab },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rakoto-kevin/', Icon: IconBrandLinkedin },
  { label: 'Twitter', href: 'https://twitter.com/Gasyh3', Icon: IconBrandX },
];

// Étape 6 — Sous-terre : contact et pied de page
export default function MobileUndergroundSection() {
  const { ref, isVisible } = useReveal<HTMLDivElement>();
  const reveal = (index: number) => ({
    className: `reveal-item ${isVisible ? 'is-visible' : ''}`,
    style: { transitionDelay: `${index * 120}ms` },
  });

  const scrollToTop = () => {
    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={ref} className="mobile-section-content flex flex-col">
      <header {...reveal(0)}>
        <span className="text-[10px] font-mono tracking-widest text-amber-100/70">SOUS-TERRE · 06</span>
        <h2 className="mt-1 text-xl font-bold text-amber-300">Contact</h2>
        <p className="mt-1 text-xs text-amber-100/80">
          Creusons ensemble votre prochain projet.
        </p>
      </header>

      {/* Coordonnées */}
      <div
        className={`${reveal(1).className} mt-4 rounded-2xl border border-amber-700/30 bg-gradient-to-br from-amber-900/40 to-gray-900/40 backdrop-blur-sm p-4 space-y-3`}
        style={reveal(1).style}
      >
        {CONTACT_ITEMS.map(({ label, value, href, Icon }) => (
          <div key={label} className="flex items-center gap-3 min-w-0">
            <span className="w-9 h-9 shrink-0 rounded-lg bg-amber-400/20 flex items-center justify-center text-amber-300">
              <Icon className="w-5 h-5" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-amber-300">{label}</p>
              {href ? (
                <a href={href} className="block text-sm text-amber-50 break-all active:text-amber-300">
                  {value}
                </a>
              ) : (
                <p className="text-sm text-amber-50">{value}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Réseaux */}
      <div {...reveal(2)}>
        <div className="mt-4 flex justify-center gap-3">
          {SOCIAL_LINKS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-11 h-11 rounded-xl bg-amber-400/20 border border-amber-400/20 flex items-center justify-center text-amber-300 active:bg-amber-400/40"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>

      {/* Appel à l'action */}
      <div {...reveal(3)}>
        <a
          href={`mailto:${EMAIL}`}
          className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-amber-400 py-3 text-sm font-bold text-amber-950 shadow-[0_0_20px_rgba(251,191,36,0.35)] active:bg-amber-300"
        >
          <IconSend className="w-4 h-4" />
          M&apos;écrire un message
        </a>
      </div>

      {/* Pied de page, collé en bas de l'écran */}
      <footer className="mt-auto pt-6">
        <div className="border-t border-amber-700/30 pt-4 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="text-lg font-bold text-amber-300">kevin.</p>
            <p className="text-[11px] text-amber-100/60">
              &copy; {new Date().getFullYear()} Kevin Rakotoniaina
            </p>
            <p className="text-[11px] text-amber-100/60">
              Conçu avec <span className="text-amber-400">❤</span> et Next.js
            </p>
          </div>
          <button
            type="button"
            onClick={scrollToTop}
            className="shrink-0 flex items-center gap-1.5 rounded-full border border-amber-400/40 px-3 py-2 text-xs text-amber-200 active:bg-amber-400/20"
          >
            <IconArrowUp className="w-4 h-4" />
            Remonter
          </button>
        </div>
      </footer>
    </div>
  );
}
