'use client';

import { useEffect, useState } from 'react';
import { TracingBeam } from "@/components/ui/tracing-beam";
import { TimelineSchool } from "@/components/Timeline";
import { FloatingSocial } from "@/components/FloatingSocial";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { Header } from "@/components/Header";
import { SectionObserver } from "@/components/SectionObserver";
import SpaceSection from "@/components/SpaceSection";
import StratosphereSection from "@/components/StratosphereSection";
import MesosphereSection from "@/components/MesosphereSection";
import AtmosphereSection from "@/components/AtmosphereSection";
import EarthSection from "@/components/EarthSection";
import UndergroundSection from "@/components/UndergroundSection";
import MaintenancePage from "@/components/MaintenancePage";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    setIsLoading(false);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isLoading) {
    return null; // ou un loader si nécessaire
  }

  if (isMobile) {
    return <MaintenancePage />;
  }

  return (
    <>
      {/* Header est géré séparément pour garder la navigation flottante */}
      <Header />
      
      {/* Conteneur principal avec défilement optimisé */}
      <main className="scroll-container">
        <SectionObserver>
          {/* Section Espace - Page d'accueil */}
          <SpaceSection />
          
          {/* Section Stratosphère - Compétences */}
          <div id="competences" className="section-container section-transition">
            <StratosphereSection />
          </div>
          
          {/* Section Mésosphère - Certifications */}
          <div id="certifications" className="section-container section-transition">
            <MesosphereSection />
          </div>
          
          {/* Section Atmosphère - Projets */}
          <div id="projets" className="section-container section-transition">
            <AtmosphereSection />
          </div>
          
          {/* Section Terre - Expérience */}
          <div id="experience" className="section-container section-transition">
            <EarthSection />
          </div>
          
          {/* Section Sous-Terre - Contact & Footer */}
          <div id="contact" className="section-container section-transition">
            <UndergroundSection />
          </div>
        </SectionObserver>
      </main>
    </>
  );
}
