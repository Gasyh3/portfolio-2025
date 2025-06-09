'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

// Interface pour les expériences professionnelles
interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
  isApprenticeship: boolean;
}

export default function EarthSection() {
  const buildingsRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Effet de parallaxe pour les buildings
  useEffect(() => {
    const handleScroll = () => {
      if (!buildingsRef.current || !roadRef.current || !sectionRef.current) return;
      
      const sectionTop = sectionRef.current.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;
      
      // Calculer la progression du scroll dans la section
      // -1 quand on est au-dessus, 0 quand on entre, 1 quand on sort par le bas
      const scrollProgress = -sectionTop / viewportHeight;
      
      if (scrollProgress >= -0.5 && scrollProgress <= 1.5) {
        // Effet parallaxe: les buildings se déplacent plus lentement que le scroll
        buildingsRef.current.style.transform = `translateY(${scrollProgress * 30}px)`;
        
        // La route se déplace plus vite pour donner l'impression de mouvement
        roadRef.current.style.backgroundPositionY = `${scrollProgress * 200}px`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Intersection Observer for fade-in animations
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '-50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const titleElement = sectionRef.current?.querySelector('.section-title');
          if (titleElement) {
            titleElement.classList.add('opacity-100');
            titleElement.classList.remove('opacity-0', 'translate-y-5');
          }
          
          const timelineItems = sectionRef.current?.querySelectorAll('.timeline-item');
          timelineItems?.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('opacity-100', 'translate-x-0');
              item.classList.remove('opacity-0');
              
              if (window.innerWidth >= 768) {
                // Desktop animation
                if (index % 2 === 0) {
                  item.classList.remove('-translate-x-10');
                } else {
                  item.classList.remove('translate-x-10');
                }
              } else {
                // Mobile animation
                item.classList.remove('translate-y-10');
              }
            }, index * 200);
          });
        }
      });
    }, observerOptions);
    
    observer.observe(sectionRef.current);
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  // Expériences professionnelles
  const experiences: Experience[] = [
    {
      role: "Développeur Fullstack",
      company: "MASTORE SARL",
      period: "Décembre 2023 - Juillet 2025",
      description: "Maintenance évolutive de l'ERP interne et développement d'un module statistique en Go, PostgreSQL et React. Participation aux revues de code, CI/CD avec GitLab, et mise en production via ArgoCD. Collaboration en équipe agile (sprints hebdomadaires).",
      skills: ["Go", "React", "PostgreSQL", "Docker", "GitLab", "ArgoCD"],
      isApprenticeship: true
    },
    {
      role: "Développeur Web & Mobile",
      company: "WAA-AGROPRO",
      period: "Mars 2023 - Décembre 2023",
      description: "Création d'une application mobile FlutterFlow pour la plateforme de petites annonces MESBONAF. Intégration Firebase (authentification, base de données, notifications), maintenance du site e-commerce sous Prestashop et développement d'interfaces interactives.",
      skills: ["FlutterFlow", "Firebase", "React", "PHP", "PrestaShop", "Figma"],
      isApprenticeship: true
    },
  ];
  

  // State to track if we're on client-side
  const [isClient, setIsClient] = useState(false);
  
  // Set isClient to true once component mounts (client-side only)
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="relative pt-20 pb-32 overflow-hidden min-h-screen" ref={sectionRef} id="experience">
      {/* Arrière-plan urbain avec dégradé de ciel */}
      <div 
        className="absolute inset-0 z-0 overflow-hidden"
        style={{ 
          background: 'linear-gradient(to bottom, #06b6d4 0%, #0ea5e9 30%, #2563eb 70%, #1e40af 100%)' 
        }}
      />
      
      {/* SVG des buildings comme skyline */}
      <div 
        ref={buildingsRef}
        className="absolute inset-0 z-1 overflow-hidden pointer-events-none"
      >
        <div className="absolute bottom-0 left-0 right-0 w-full">
          <img 
            src="/images/stuff/building.svg" 
            alt="Urban Skyline" 
            className="w-full h-auto object-cover object-bottom min-w-[1200px]"
            style={{ opacity: 0.8 }}
          />
        </div>
        
        {/* Effet de lueur nocturne urbaine */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-700/30 to-transparent mix-blend-overlay"></div>
      </div>
      
      {/* Route goudronnée avec marquage */}
      <div 
        ref={roadRef}
        className="absolute bottom-0 left-0 right-0 h-[15vh] z-3"
        style={{
          background: 'linear-gradient(to bottom, #1e1e24, #0f0f12)',
          boxShadow: 'inset 0 5px 10px rgba(0,0,0,0.5)'
        }}
      >
        {/* Marquage central */}
        <div className="absolute top-1/2 left-0 right-0 h-[6px] transform -translate-y-1/2">
          {Array.from({ length: 20 }, (_, i) => (
            <div 
              key={i}
              className="absolute h-full w-[40px] bg-yellow-400"
              style={{ left: `${i * 5}%` }}
            ></div>
          ))}
        </div>
        
        {/* Grilles d'égout */}
        <div className="absolute top-[20%] left-[30%] w-[60px] h-[15px] bg-gray-700 rounded-sm border border-gray-600"></div>
        <div className="absolute top-[60%] left-[70%] w-[60px] h-[15px] bg-gray-700 rounded-sm border border-gray-600"></div>
        
        {/* Effet de texture */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/5 mix-blend-overlay"></div>
      </div>
      
      {/* Lumières de phares qui passent */}
      <div className="absolute bottom-[6vh] left-[-100px] z-3 animate-car-passing">
        <div className="w-[15px] h-[15px] bg-white rounded-full opacity-80 blur-[2px]"></div>
        <div className="w-[15px] h-[15px] bg-white rounded-full opacity-80 blur-[2px] ml-[30px] -mt-[15px]"></div>
      </div>
      
      {/* Contenu principal */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title text-4xl font-bold text-white mb-4 drop-shadow-lg transition-all duration-1000 ease-out opacity-0 translate-y-5">Parcours Professionnel</h2>
            <p className="text-gray-100 max-w-2xl mx-auto drop-shadow-lg transition-all duration-1000 ease-out opacity-0 translate-y-5" style={{ transitionDelay: '100ms' }}>
              Mon voyage à travers le monde professionnel, bâtissant ma carrière dans l'écosystème urbain du développement web.
            </p>
          </div>
          
          {/* Timeline d'expériences */}
          <div className="relative border-l-4 border-sky-400/50 ml-4 md:ml-0 md:mx-auto backdrop-blur-sm p-6 rounded-lg bg-sky-900/50">
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className={`timeline-item mb-12 ml-8 md:ml-0 md:flex transition-all duration-700 ease-out opacity-0 ${
                  isClient && typeof window !== 'undefined' 
                    ? (window.innerWidth >= 768 
                      ? index % 2 === 0 ? '-translate-x-10' : 'translate-x-10'
                      : 'translate-y-10')
                    : 'translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Ligne du temps avec effet néon */}
                <div className="absolute -left-2 md:static md:mr-8 md:w-40 md:flex md:flex-col md:items-end">
                  <div className="w-4 h-4 rounded-full bg-white border-4 border-sky-400 absolute -left-[10px] md:relative md:left-auto md:mb-2 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
                  <span className="hidden md:block text-white font-semibold drop-shadow-[0_0_2px_rgba(255,255,255,0.8)]">{exp.period}</span>
                </div>
                
                {/* Contenu avec effet verre */}
                <div className="bg-sky-800/60 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-sky-700/70 flex-1 hover:bg-sky-800/70 transition-all group">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">{exp.role}</h3>
                      <p className="text-blue-200 mb-4">
                        {exp.company} · <span className="md:hidden">{exp.period}</span>
                        {exp.isApprenticeship && (
                          <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-blue-500/30 text-blue-200 rounded-full border border-blue-400/30">
                            Alternance
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-4">{exp.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 text-xs font-medium text-white bg-blue-600/40 rounded-full border border-blue-500/30 hover:bg-blue-600/60 transition-colors">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12 opacity-0 translate-y-5 transition-all duration-1000 ease-out" style={{ transitionDelay: '600ms' }}>
            <a 
              href="/cv.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600/80 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all shadow-[0_0_15px_rgba(37,99,235,0.5)] hover:shadow-[0_0_20px_rgba(37,99,235,0.7)]"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Télécharger mon CV
            </a>
          </div>
        </div>
      </div>
      
      {/* Lampadaires urbains avec effet lumineux */}
      <div className="absolute bottom-[15vh] left-[20%] z-4 w-[4px] h-[25vh] bg-gray-700">
        <div className="absolute top-0 w-[20px] h-[8px] bg-gray-600 left-[-8px]"></div>
        <div className="absolute top-[8px] w-[6px] h-[6px] bg-amber-300 left-[-1px] shadow-[0_0_12px_rgba(217,119,6,0.9)]"></div>
      </div>
      
      <div className="absolute bottom-[15vh] right-[30%] z-4 w-[4px] h-[25vh] bg-gray-700">
        <div className="absolute top-0 w-[20px] h-[8px] bg-gray-600 left-[-8px]"></div>
        <div className="absolute top-[8px] w-[6px] h-[6px] bg-amber-300 left-[-1px] shadow-[0_0_12px_rgba(217,119,6,0.9)]"></div>
      </div>
      
      {/* Lumières des fenêtres clignotantes */}
      <div className="absolute bottom-[30vh] left-0 right-0 z-2 pointer-events-none">
        {Array.from({ length: 20 }, (_, i) => (
          <div 
            key={i}
            className="absolute w-[6px] h-[6px] bg-yellow-100"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 30 + 10}vh`,
              opacity: 0.7,
              filter: 'blur(1px)',
              animation: `blink ${Math.random() * 3 + 2}s ease-in-out infinite alternate`
            }}
          />
        ))}
      </div>
      
      {/* Transition gradient overlay vers la section Contact */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 z-5 opacity-90"
        style={{ 
          background: 'linear-gradient(to bottom, transparent, #1e3a8a)', 
          boxShadow: '0 -10px 30px 30px rgba(30, 58, 138, 0.15)'
        }}
      ></div>
      
      {/* Éléments de transition vers Contact */}
      <div className="absolute bottom-0 left-0 right-0 h-48 z-6 overflow-hidden">
        {Array.from({ length: 15 }, (_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-gray-500/20 blur-sm transition-particle"
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
      
      {/* Vague de transition vers Contact */}
      <div className="absolute bottom-0 left-0 right-0 z-7">
        <div className="relative h-24 overflow-hidden">
          <div 
            className="absolute h-24 w-full" 
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=%22100%25%22 height=%22100%25%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cdefs%3E%3ClinearGradient id=%22a%22 gradientUnits=%22userSpaceOnUse%22 x1=%220%22 x2=%220%22 y1=%220%22 y2=%22100%25%22%3E%3Cstop offset=%220%22 stop-color=%22%231e3a8a%22 stop-opacity=%220%22/%3E%3Cstop offset=%22100%25%22 stop-color=%22%231e3a8a%22 stop-opacity=%22.5%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d=%22M0 40 Q 25 20 50 40 T 100 40 V 100 H 0 Z%22 fill=%22url(%23a)%22/%3E%3C/svg%3E")',
              backgroundSize: '100% 100%',
              opacity: 0.7
            }}
          >
          </div>
        </div>
      </div>
      
      {/* Style global pour l'animation des lumières clignotantes */}
      <style jsx global>{`
        @keyframes blink {
          0%, 80% { opacity: 0.7; }
          100% { opacity: 0.1; }
        }
        
        @keyframes car-passing {
          0% { transform: translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(calc(100vw + 200px)); opacity: 0; }
        }
        
        .animate-car-passing {
          animation: car-passing 8s linear infinite;
        }
        
        @keyframes float-slow {
          0% { transform: translateY(0); }
          100% { transform: translateY(-15px); }
        }
        
        @keyframes particle-fade-in {
          0% { opacity: 0; }
          100% { opacity: 0.7; }
        }
        
        .transition-particle {
          transition: opacity 1s ease-out;
        }
      `}</style>
    </section>
  );
} 