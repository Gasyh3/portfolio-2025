'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import MobileSpaceSection from './MobileSpaceSection';

// Dialog component pour l'À Propos
const AboutDialog = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop avec effet de flou stellaire */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Contenu du dialog - Carte d'identité spatiale */}
      <div
        className="relative max-w-2xl w-full mx-auto z-10 overflow-hidden animate-card-reveal"
        style={{
          background: 'linear-gradient(135deg, #051937 0%, #082b4d 50%, #0b3860 100%)',
          borderRadius: '16px',
          boxShadow: '0 0 30px rgba(0, 195, 255, 0.5), 0 0 60px rgba(0, 90, 187, 0.3)',
          border: '1px solid rgba(0, 217, 255, 0.4)'
        }}
      >
        {/* Effet d'initialisation - scan vertical */}
        <div
          className="absolute inset-0 z-30 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(6, 182, 212, 0.4) 0%, transparent 20%, transparent 80%, rgba(6, 182, 212, 0.4) 100%)',
            animation: 'scan-reveal 1s ease-in-out forwards',
            opacity: 0,
          }}
        ></div>

        {/* Lignes de scan horizontales */}
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 h-px bg-cyan-400/30"
              style={{
                top: `${(i + 1) * 5}%`,
                animation: `scan-line 1.2s ease-in-out ${i * 0.05}s`,
                opacity: 0,
              }}
            ></div>
          ))}
        </div>

        {/* Effet de circuit imprimé holographique */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.7\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
            backgroundSize: '20px 20px'
          }}
        ></div>

        {/* En-tête de la carte */}
        <div className="flex justify-between items-center border-b border-cyan-400/30 px-6 py-3 animate-reveal-top">
          <div className="flex items-center">
            <div
              className="w-10 h-10 mr-2 flex items-center justify-center rounded-full animate-pulse-slow"
              style={{
                background: 'radial-gradient(circle, rgba(6,182,212,0.9) 0%, rgba(6,182,212,0.4) 70%, rgba(6,182,212,0.1) 100%)',
                boxShadow: '0 0 10px rgba(6,182,212,0.7)'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div className="text-cyan-200 text-xs font-mono tracking-widest">CONFIDENTIEL</div>
              <div className="text-white text-xs font-medium">ADMINISTRATION SPATIALE UNIVERSELLE</div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-xs text-cyan-200 font-mono tracking-wider">ID#: X-0092741</div>
            <div className="text-xs text-white">CLEARANCE: NIVEAU 3</div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row p-6 animate-reveal-content">
          {/* Section photo et info principale */}
          <div className="md:w-1/3 flex flex-col items-center space-y-4">
            {/* Photo du profil avec effet holographique */}
            <div className="relative group">
              <div
                className="absolute inset-0 rounded-xl opacity-50 group-hover:opacity-80 transition-all duration-700"
                style={{
                  background: 'linear-gradient(45deg, rgba(6,182,212,0.3) 0%, rgba(45,212,191,0.3) 100%)',
                  filter: 'blur(4px)',
                  animation: 'pulse-slow 4s infinite'
                }}
              ></div>
              <div className="relative w-40 h-48 rounded-xl overflow-hidden border-2 border-cyan-400/50">
                <div
                  className="absolute inset-0 z-10 opacity-30"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, rgba(6,182,212,0.2) 0px, rgba(6,182,212,0.2) 1px, transparent 1px, transparent 10px)',
                    backgroundSize: '10px 100%'
                  }}
                ></div>
                <Image
                  src="/images/stuff/id_pic.png"
                  alt="Kevin Rakotoniaina"
                  fill
                  className="object-cover z-0"
                  sizes="(max-width: 768px) 100vw, 160px"
                />
              </div>
              <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-cyan-400 animate-pulse-slow"></div>
            </div>

            {/* Informations d'identification */}
            <div className="space-y-2 w-full">
              <div className="border border-cyan-700/40 rounded-lg px-3 py-2 bg-cyan-900/10">
                <div className="text-xs text-cyan-300 font-mono">NOM</div>
                <div className="text-sm text-white font-mono tracking-wider flex items-center">
                  RAKOTONIAINA KEVIN
                  <div className="ml-2 w-5 h-5 relative overflow-hidden rounded-full" title="Madagascar">
                    <img
                      src="https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/mg.svg"
                      alt="Drapeau de Madagascar"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>
              <div className="border border-cyan-700/40 rounded-lg px-3 py-2 bg-cyan-900/10">
                <div className="text-xs text-cyan-300 font-mono">RANG</div>
                <div className="text-sm text-white font-mono tracking-wider animate-neon-flicker">SPACE EXPLORER</div>
              </div>
              <div className="bg-cyan-900/10 border border-cyan-700/40 rounded-lg px-3 py-2">
                <div className="text-xs text-cyan-300 font-mono">AGE</div>
                <div className="text-sm text-white font-mono tracking-wider">25 années</div>
              </div>
            </div>
          </div>

          {/* Section Description et compétences */}
          <div className="md:w-2/3 md:pl-6 mt-6 md:mt-0">
            <div className="space-y-4">
              {/* Description */}
              <div className="border border-cyan-700/40 rounded-lg p-3 bg-cyan-900/10">
                <div className="text-xs text-cyan-300 font-mono mb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  DESCRIPTION
                </div>
                <p className="text-white text-sm">
                  Jeune malgache
                   fraîchement diplômé, passionné par l'univers numérique et le développement web. Curieux, motivé et déterminé à repousser les frontières du possible. À la recherche constante de nouveaux défis et d'opportunités pour apprendre et grandir dans le domaine du web.
                </p>
              </div>

              {/* Hobbies */}
              <div className="border border-cyan-700/40 rounded-lg p-3 bg-cyan-900/10">
                <div className="text-xs text-cyan-300 font-mono mb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  HOBBIES
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="text-white text-xs bg-cyan-900/20 px-2 py-1 rounded border border-cyan-700/20 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mr-2"></div>
                    Manga & Anime
                  </div>
                  <div className="text-white text-xs bg-cyan-900/20 px-2 py-1 rounded border border-cyan-700/20 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mr-2"></div>
                    Jeux Vidéos
                  </div>
                  <div className="text-white text-xs bg-cyan-900/20 px-2 py-1 rounded border border-cyan-700/20 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mr-2"></div>
                    Basket
                  </div>
                  <div className="text-white text-xs bg-cyan-900/20 px-2 py-1 rounded border border-cyan-700/20 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mr-2"></div>
                    Calisthénie
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="border border-cyan-700/40 rounded-lg p-3 bg-cyan-900/10">
                <div className="text-xs text-cyan-300 font-mono mb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  TITRES & ACHIEVEMENTS
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-3 py-1 bg-amber-600/50 rounded-full text-xs text-white/90 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    ELDEN LORD
                  </span>
                  <span className="px-3 py-1 bg-blue-600/50 rounded-full text-xs text-white/90 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z"></path>
                    </svg>
                    SPACE COWBOY
                  </span>
                  <span className="px-3 py-1 bg-purple-600/50 rounded-full text-xs text-white/90 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                    CODE WIZARD
                  </span>
                  <span className="px-3 py-1 bg-green-600/50 rounded-full text-xs text-white/90 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z"></path>
                    </svg>
                    PIXEL PIONEER
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pied de la carte avec signature numérique */}
        <div className="border-t border-cyan-700/30 px-6 py-3 bg-cyan-900/20 flex justify-between items-center animate-reveal-bottom">
          <div className="text-xs text-cyan-200 font-mono">DATE D'ÉMISSION: 2187-04-12</div>
          <div className="text-xs text-cyan-300 font-mono flex items-center">
            <div className="w-16 h-6 bg-cyan-900/40 mr-2 rounded overflow-hidden relative">
              <div
                className="absolute inset-0 opacity-70"
                style={{
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' viewBox=\'0 0 6 6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%2309617e\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M5 0h1L0 5v1H0V0h5z\'/%3E%3C/g%3E%3C/svg%3E")'
                }}
              ></div>
            </div>
            SIGNATURE CRYPTOGRAPHIQUE
          </div>
        </div>
      </div>
    </div>
  );
};

export default function SpaceSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return <MobileSpaceSection />;
  }

  const scrollRef = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState<Array<{ x: number; y: number; size: number; opacity: number; speed: number }>>([]);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [aboutBtnPosition, setAboutBtnPosition] = useState({ x: 0, y: 0 });
  const aboutBtnRef = useRef<HTMLButtonElement>(null);

  // Generate stars on component mount
  useEffect(() => {
    const newStars = Array.from({ length: 200 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.05 + 0.01
    }));
    setStars(newStars);
  }, []);

  // Animate stars
  useEffect(() => {
    const animateStars = () => {
      setStars(prevStars =>
        prevStars.map(star => ({
          ...star,
          opacity: star.opacity + Math.sin(Date.now() * star.speed) * 0.01
        }))
      );
      requestAnimationFrame(animateStars);
    };

    const animation = requestAnimationFrame(animateStars);
    return () => cancelAnimationFrame(animation);
  }, []);

  // Random movement for the About button
  useEffect(() => {
    const updatePosition = () => {
      if (!scrollRef.current || !aboutBtnRef.current) return;

      const sectionRect = scrollRef.current.getBoundingClientRect();
      const btnRect = aboutBtnRef.current.getBoundingClientRect();

      // Calculate safe area to keep button fully visible
      const maxX = sectionRect.width - btnRect.width - 40;
      const maxY = sectionRect.height - btnRect.height - 40;

      // Random position within safe bounds
      const newX = 40 + Math.random() * maxX;
      const newY = 40 + Math.random() * maxY;

      setAboutBtnPosition({ x: newX, y: newY });
    };

    // Initial position
    updatePosition();

    // Update position periodically
    const interval = setInterval(() => {
      updatePosition();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleScrollDown = useCallback(() => {
    if (typeof window !== 'undefined') {
      const stratosphereSection = document.getElementById('competences');
      if (stratosphereSection) {
        stratosphereSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  // Ajouter les animations CSS pour l'apparition futuriste du dialog
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes card-reveal {
        0% {
          opacity: 0;
          transform: scaleY(0.05) scaleX(0.3);
          filter: brightness(2);
        }
        20% {
          opacity: 0.5;
          transform: scaleY(0.2) scaleX(0.8);
          filter: brightness(1.5);
        }
        100% {
          opacity: 1;
          transform: scaleY(1) scaleX(1);
          filter: brightness(1);
        }
      }
      
      @keyframes scan-reveal {
        0% {
          opacity: 0;
        }
        10% {
          opacity: 0.8;
        }
        70% {
          opacity: 0.8;
        }
        100% {
          opacity: 0;
        }
      }
      
      @keyframes scan-line {
        0% {
          opacity: 0;
          transform: scaleX(0);
        }
        20% {
          opacity: 0.7;
          transform: scaleX(1);
        }
        75% {
          opacity: 0.7;
        }
        100% {
          opacity: 0;
        }
      }
      
      @keyframes reveal-top {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes reveal-content {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      
      @keyframes reveal-bottom {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .animate-card-reveal {
        animation: card-reveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        transform-origin: center;
      }
      
      .animate-reveal-top {
        animation: reveal-top 0.4s ease-out 0.5s forwards;
        opacity: 0;
      }
      
      .animate-reveal-content {
        animation: reveal-content 0.5s ease-out 0.6s forwards;
        opacity: 0;
      }
      
      .animate-reveal-bottom {
        animation: reveal-bottom 0.4s ease-out 0.7s forwards;
        opacity: 0;
      }
    `;
    document.head.appendChild(style);
    return () => {
      if (style && document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div
      className="relative h-screen w-full bg-black overflow-hidden section-container"
      ref={scrollRef}
      id="home"
      style={{ height: '100vh', minHeight: '100vh' }}
    >
      {/* Star background */}
      <div className="absolute inset-0 z-0">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity
            }}
          />
        ))}
      </div>

      {/* Bouton À Propos flottant */}
      <button
        ref={aboutBtnRef}
        onClick={() => setIsAboutOpen(true)}
        className="absolute z-30 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-1000 hover:scale-110 animate-pulse-slow overflow-hidden"
        style={{
          transform: `translate(${aboutBtnPosition.x}px, ${aboutBtnPosition.y}px)`,
          transition: 'transform 3s ease-in-out',
          background: 'linear-gradient(135deg, rgba(56,182,255,0.8) 0%, rgba(11,43,79,0.9) 100%)',
          boxShadow: '0 0 15px 5px rgba(0,191,255,0.5), inset 0 0 10px 2px rgba(255,255,255,0.4)',
          border: '2px solid rgba(136,220,255,0.6)'
        }}
      >
        <Image
          src="/images/stuff/badge.png"
          alt="À propos"
          width={64}
          height={64}
          className="object-contain"
        />
      </button>

      {/* Main title */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-pulse">
          KEVIN RAKOTONIAINA
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl animate-fade-in tracking-widest">
          EXPLORATEUR DE L'UNIVERS NUMÉRIQUE
        </p>
        <div className="mt-16 h-px w-24 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
      </div>

      {/* Scroll down button */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center z-10">
        <div className="relative">
          <p
            className="text-xs md:text-sm text-cyan-400 font-semibold tracking-wider animate-neon-flicker relative z-10 mb-6"
            style={{
              textShadow: '0 0 7px rgba(6, 182, 212, 0.9), 0 0 10px rgba(6, 182, 212, 0.8), 0 0 21px rgba(6, 182, 212, 0.7)'
            }}
          >
            Cliquez sur la soucoupe lumineuse pour en savoir plus sur moi
          </p>
          {/* Effet de halo derrière le texte */}
          <div className="absolute inset-0 blur-md bg-cyan-900/20 rounded-lg -z-10 scale-110"></div>
        </div>
        <div
          className="cursor-pointer animate-bounce"
          onClick={handleScrollDown}
        >
          <div className="text-white opacity-70 text-center">
            <span className="text-xs uppercase tracking-widest block mb-1">Scroll</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Transition gradient overlay to stratosphere section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-5 opacity-90"
        style={{
          background: 'linear-gradient(to bottom, transparent, #0c164f)',
          boxShadow: '0 -10px 30px 30px rgba(12, 22, 79, 0.15)'
        }}
      ></div>

      {/* Subtle atmospheric particles for transition */}
      <div className="absolute bottom-0 left-0 right-0 h-48 z-6 overflow-hidden">
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-300/30 blur-sm transition-particle"
            style={{
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              bottom: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0,
              animationDelay: `${i * 120}ms`,
              animation: `float-slow ${Math.random() * 4 + 6}s ease-in-out infinite alternate, particle-fade-in 1.5s ease-out forwards ${i * 120}ms`
            }}
          />
        ))}
      </div>

      {/* Éléments de transition dynamiques */}
      <div className="absolute bottom-0 left-0 right-0 z-7">
        <div className="relative h-24 overflow-hidden">
          <div
            className="absolute h-24 w-full"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=%22100%25%22 height=%22100%25%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cdefs%3E%3ClinearGradient id=%22a%22 gradientUnits=%22userSpaceOnUse%22 x1=%220%22 x2=%220%22 y1=%220%22 y2=%22100%25%22%3E%3Cstop offset=%220%22 stop-color=%22%230c164f%22 stop-opacity=%220%22/%3E%3Cstop offset=%22100%25%22 stop-color=%22%230c164f%22 stop-opacity=%22.5%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d=%22M0 40 Q 25 20 50 40 T 100 40 V 100 H 0 Z%22 fill=%22url(%23a)%22/%3E%3C/svg%3E")',
              backgroundSize: '100% 100%',
              opacity: 0.7
            }}
          >
          </div>
        </div>
      </div>

      {/* Dialog À Propos */}
      <AboutDialog isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </div>
  );
} 