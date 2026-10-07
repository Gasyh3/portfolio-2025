'use client';

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { IconX } from '@tabler/icons-react';

const HOBBIES = ['Manga & Anime', 'Jeux Vidéos', 'Basket', 'Calisthénie'];

const BADGES = [
  { label: 'ELDEN LORD', className: 'bg-amber-600/50' },
  { label: 'SPACE COWBOY', className: 'bg-blue-600/50' },
  { label: 'CODE WIZARD', className: 'bg-purple-600/50' },
  { label: 'PIXEL PIONEER', className: 'bg-green-600/50' },
];

interface MobileIdCardProps {
  isOpen: boolean;
  onClose: () => void;
}

// Carte d'identité spatiale (« À propos ») en plein écran, défilement vertical uniquement
export default function MobileIdCard({ isOpen, onClose }: MobileIdCardProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    closeBtnRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Carte d'identité de Kevin Rakotoniaina"
    >
      {/* Barre du haut avec le bouton de sortie, toujours visible */}
      <div className="id-card-topbar absolute top-0 left-0 right-0 z-20 flex items-end justify-end px-4 pb-3 bg-black/95 backdrop-blur-md border-b border-cyan-400/20">
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          className="flex items-center gap-1.5 h-10 pl-3 pr-4 rounded-full bg-cyan-950/90 border border-cyan-400/50 text-cyan-100 text-sm font-mono active:bg-cyan-800"
          aria-label="Fermer la carte d'identité"
        >
          <IconX className="w-4 h-4" />
          FERMER
        </button>
      </div>

      <div className="id-card-scroll h-full w-full overflow-y-auto overflow-x-hidden overscroll-contain">
        <div
          className="relative w-full overflow-hidden animate-id-card-reveal"
          style={{
            background: 'linear-gradient(135deg, #051937 0%, #082b4d 50%, #0b3860 100%)',
            borderRadius: '16px',
            boxShadow: '0 0 30px rgba(0, 195, 255, 0.5), 0 0 60px rgba(0, 90, 187, 0.3)',
            border: '1px solid rgba(0, 217, 255, 0.4)'
          }}
        >
          {/* Effet de scan à l'ouverture */}
          <div
            className="absolute inset-0 z-30 pointer-events-none animate-id-card-scan"
            style={{
              background: 'linear-gradient(to bottom, rgba(6, 182, 212, 0.4) 0%, transparent 20%, transparent 80%, rgba(6, 182, 212, 0.4) 100%)'
            }}
          ></div>

          {/* En-tête */}
          <div className="flex items-center gap-3 border-b border-cyan-400/30 px-4 py-3 animate-id-card-content">
            <div
              className="w-9 h-9 shrink-0 flex items-center justify-center rounded-full animate-pulse-slow"
              style={{
                background: 'radial-gradient(circle, rgba(6,182,212,0.9) 0%, rgba(6,182,212,0.4) 70%, rgba(6,182,212,0.1) 100%)',
                boxShadow: '0 0 10px rgba(6,182,212,0.7)'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="text-cyan-200 text-[10px] font-mono tracking-widest">CONFIDENTIEL</div>
              <div className="text-white text-[11px] font-medium leading-tight">ADMINISTRATION SPATIALE UNIVERSELLE</div>
              <div className="mt-1 text-[10px] text-cyan-200 font-mono">ID#: X-0092741 · CLEARANCE: NIVEAU 3</div>
            </div>
          </div>

          <div className="p-4 space-y-4 animate-id-card-content">
            {/* Photo + identité */}
            <div className="flex gap-4">
              <div className="relative w-28 h-36 shrink-0 rounded-xl overflow-hidden border-2 border-cyan-400/50">
                <div
                  className="absolute inset-0 z-10 opacity-30"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, rgba(6,182,212,0.2) 0px, rgba(6,182,212,0.2) 1px, transparent 1px, transparent 10px)'
                  }}
                ></div>
                <Image
                  src="/images/stuff/id_pic.png"
                  alt="Kevin Rakotoniaina"
                  fill
                  className="object-cover"
                  sizes="112px"
                />
                <div className="absolute top-2 right-2 z-20 w-3 h-3 rounded-full bg-cyan-400 animate-pulse-slow"></div>
              </div>

              <div className="flex-1 min-w-0 space-y-2">
                <div className="border border-cyan-700/40 rounded-lg px-2.5 py-1.5 bg-cyan-900/10">
                  <div className="text-[10px] text-cyan-300 font-mono">NOM</div>
                  <div className="text-xs text-white font-mono flex items-center gap-1.5">
                    <span className="truncate">RAKOTONIAINA KEVIN</span>
                    <img
                      src="https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/mg.svg"
                      alt="Drapeau de Madagascar"
                      className="w-4 h-3 shrink-0 object-cover rounded-sm"
                    />
                  </div>
                </div>
                <div className="border border-cyan-700/40 rounded-lg px-2.5 py-1.5 bg-cyan-900/10">
                  <div className="text-[10px] text-cyan-300 font-mono">RANG</div>
                  <div className="text-xs text-white font-mono">SPACE EXPLORER</div>
                </div>
                <div className="border border-cyan-700/40 rounded-lg px-2.5 py-1.5 bg-cyan-900/10">
                  <div className="text-[10px] text-cyan-300 font-mono">AGE</div>
                  <div className="text-xs text-white font-mono">26 années</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="border border-cyan-700/40 rounded-lg p-3 bg-cyan-900/10">
              <div className="text-[10px] text-cyan-300 font-mono mb-1">DESCRIPTION</div>
              <p className="text-white text-sm leading-relaxed">
                Jeune malgache fraîchement diplômé, passionné par l&apos;univers numérique et le développement web. Curieux, motivé et déterminé à repousser les frontières du possible. À la recherche constante de nouveaux défis et d&apos;opportunités pour apprendre et grandir dans le domaine du web.
              </p>
            </div>

            {/* Hobbies */}
            <div className="border border-cyan-700/40 rounded-lg p-3 bg-cyan-900/10">
              <div className="text-[10px] text-cyan-300 font-mono mb-2">HOBBIES</div>
              <div className="grid grid-cols-2 gap-2">
                {HOBBIES.map(hobby => (
                  <div key={hobby} className="text-white text-xs bg-cyan-900/20 px-2 py-1 rounded border border-cyan-700/20 flex items-center min-w-0">
                    <span className="w-2 h-2 shrink-0 rounded-full bg-cyan-400 mr-2"></span>
                    <span className="min-w-0 break-words">{hobby}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Titres */}
            <div className="border border-cyan-700/40 rounded-lg p-3 bg-cyan-900/10">
              <div className="text-[10px] text-cyan-300 font-mono mb-2">TITRES & ACHIEVEMENTS</div>
              <div className="flex flex-wrap gap-2">
                {BADGES.map(badge => (
                  <span key={badge.label} className={`px-3 py-1 rounded-full text-[11px] text-white/90 ${badge.className}`}>
                    {badge.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Pied de carte */}
          <div className="border-t border-cyan-700/30 px-4 py-3 bg-cyan-900/20 flex flex-wrap justify-between items-center gap-2 animate-id-card-content">
            <div className="text-[10px] text-cyan-200 font-mono">DATE D&apos;ÉMISSION: 2188-04-12</div>
            <div className="text-[10px] text-cyan-300 font-mono">SIGNATURE CRYPTOGRAPHIQUE</div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
