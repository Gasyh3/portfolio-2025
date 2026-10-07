'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import MobileHeader from './MobileHeader';
import MobileSection from './MobileSection';
import MobileSpaceSection from './MobileSpaceSection';
import MobileStratosphereSection from './MobileStratosphereSection';
import MobileMesosphereSection from './MobileMesosphereSection';
import MobileAtmosphereSection from './MobileAtmosphereSection';
import MobileEarthSection from './MobileEarthSection';
import MobileUndergroundSection from './MobileUndergroundSection';
import { MOBILE_SECTIONS } from './sections';

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

        {/* Étape 2 — Stratosphère */}
        <MobileSection
          id="competences"
          style={{ background: 'linear-gradient(to bottom, #0c164f 0%, #3a5cb5 70%, #4b6cb7 100%)' }}
        >
          <MobileStratosphereSection />
        </MobileSection>

        {/* Étape 3 — Mésosphère */}
        <MobileSection
          id="certifications"
          style={{ background: 'linear-gradient(to bottom, #FF512F 0%, #F09819 30%, #ff9966 70%, #ff5e62 100%)' }}
        >
          <MobileMesosphereSection />
        </MobileSection>

        {/* Étape 4 — Atmosphère */}
        <MobileSection
          id="projets"
          style={{ background: 'linear-gradient(to bottom, #4b6cb7 0%, #76a9e6 50%, #9be2fe 100%)' }}
        >
          <MobileAtmosphereSection />
        </MobileSection>

        {/* Étape 5 — Terre */}
        <MobileSection
          id="experience"
          style={{ background: 'linear-gradient(to bottom, #06b6d4 0%, #0ea5e9 30%, #2563eb 70%, #1e40af 100%)' }}
        >
          <MobileEarthSection />
        </MobileSection>

        {/* Étape 6 — Sous-terre */}
        <MobileSection id="contact" className="bg-gradient-to-b from-green-700 via-amber-900 to-gray-900">
          <MobileUndergroundSection />
        </MobileSection>
      </main>
    </div>
  );
}
