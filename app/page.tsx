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
// Test de l'outil edit_file

export default function Home() {
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
