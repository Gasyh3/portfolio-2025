'use client';

import React, { useEffect, useState } from 'react';
import { IconBrandGithub, IconBrandGitlab, IconBrandLinkedin, IconMenu2, IconX } from '@tabler/icons-react';
import { MOBILE_SECTIONS } from './sections';

interface MobileHeaderProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

export default function MobileHeader({ activeSection, onNavigate }: MobileHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const active = MOBILE_SECTIONS.find(s => s.id === activeSection) ?? MOBILE_SECTIONS[0];

  // Fermer le menu avec la touche Échap
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isMenuOpen]);

  const handleSelect = (id: string) => {
    setIsMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        className={`mobile-header fixed top-0 left-0 right-0 z-50 backdrop-blur-sm text-white transition-colors duration-500 ${
          isMenuOpen ? 'bg-transparent' : active.headerClass
        }`}
      >
        <div className="h-14 px-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => handleSelect('home')}
            className="text-2xl font-bold"
            aria-label="Retour à l'accueil"
          >
            kevin.
          </button>

          <div className="flex items-center gap-3 min-w-0">
            {!isMenuOpen && (
              <span className="text-sm text-white/80 truncate">{active.label}</span>
            )}
            <button
              type="button"
              onClick={() => setIsMenuOpen(open => !open)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 active:bg-white/20"
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <IconX className="w-6 h-6" /> : <IconMenu2 className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Menu plein écran */}
      <nav
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-md flex flex-col justify-center px-8 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isMenuOpen}
      >
        <ul className="space-y-5">
          {MOBILE_SECTIONS.map((section, index) => {
            const isActive = section.id === activeSection;
            return (
              <li key={section.id}>
                <button
                  type="button"
                  tabIndex={isMenuOpen ? 0 : -1}
                  onClick={() => handleSelect(section.id)}
                  className={`flex items-center gap-4 text-2xl font-semibold ${
                    isActive ? 'text-white' : 'text-white/60'
                  }`}
                >
                  <span className="text-xs font-mono text-white/40 w-6">0{index + 1}</span>
                  <span className={`w-2 h-2 rounded-full ${isActive ? section.accentClass : 'bg-white/20'}`}></span>
                  {section.label}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 flex gap-4 text-white/70">
          <a href="https://github.com/Gasyh3" target="_blank" rel="noopener noreferrer" aria-label="GitHub" tabIndex={isMenuOpen ? 0 : -1}>
            <IconBrandGithub className="w-6 h-6" />
          </a>
          <a href="https://gitlab.com/Gasyh3" target="_blank" rel="noopener noreferrer" aria-label="GitLab" tabIndex={isMenuOpen ? 0 : -1}>
            <IconBrandGitlab className="w-6 h-6" />
          </a>
          <a href="https://www.linkedin.com/in/rakoto-kevin/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" tabIndex={isMenuOpen ? 0 : -1}>
            <IconBrandLinkedin className="w-6 h-6" />
          </a>
        </div>
      </nav>
    </>
  );
}
