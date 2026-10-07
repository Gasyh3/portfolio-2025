'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import MobileHeader from './MobileHeader';
import MobileSection from './MobileSection';
import MobileSpaceSection from './MobileSpaceSection';
import { MOBILE_SECTIONS } from './sections';

// Fond provisoire de chaque étape (reprend les couleurs de la version desktop)
const PLACEHOLDER_BACKGROUNDS: Record<string, string> = {
  competences: 'linear-gradient(to bottom, #0c164f 0%, #3a5cb5 70%, #4b6cb7 100%)',
  certifications: 'linear-gradient(to bottom, #FF512F 0%, #F09819 30%, #ff9966 70%, #ff5e62 100%)',
  projets: 'linear-gradient(to bottom, #4b6cb7 0%, #76a9e6 50%, #9be2fe 100%)',
  experience: 'linear-gradient(to bottom, #06b6d4 0%, #0ea5e9 30%, #2563eb 70%, #1e40af 100%)',
  contact: 'linear-gradient(to bottom, #15803d 0%, #78350f 50%, #111827 100%)',
};

// Contenu provisoire, remplacé étape par étape
function PlaceholderContent({ label, step }: { label: string; step: number }) {
  return (
    <div className="mobile-section-content flex flex-col items-center justify-center text-center">
      <span className="text-xs font-mono tracking-widest text-white/60 mb-2">ÉTAPE {step}</span>
      <h2 className="text-3xl font-bold text-white drop-shadow">{label}</h2>
      <p className="mt-3 text-sm text-white/70">Version mobile en préparation</p>
    </div>
  );
}

export default function MobileApp() {
  const scrollRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState(MOBILE_SECTIONS[0].id);

  // Section active = celle qui traverse le milieu de l'écran
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { root, rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    MOBILE_SECTIONS.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const navigateToSection = useCallback((id: string) => {
    const root = scrollRef.current;
    const element = document.getElementById(id);
    if (!root || !element) return;
    root.scrollTo({ top: element.offsetTop, behavior: 'smooth' });
  }, []);

  return (
    <div className="mobile-app">
      <MobileHeader activeSection={activeSection} onNavigate={navigateToSection} />

      <main ref={scrollRef} className="mobile-scroll-container">
        {/* Étape 1 — Espace */}
        <MobileSection id="home" className="bg-black">
          <MobileSpaceSection />
        </MobileSection>

        {/* Étapes 2 à 6 — à construire */}
        {MOBILE_SECTIONS.slice(1).map((section, index) => (
          <MobileSection
            key={section.id}
            id={section.id}
            style={{ background: PLACEHOLDER_BACKGROUNDS[section.id] }}
          >
            <PlaceholderContent label={section.label} step={index + 2} />
          </MobileSection>
        ))}
      </main>
    </div>
  );
}
