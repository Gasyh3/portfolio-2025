'use client';

import React, { useRef, useEffect, useState } from 'react';

// Interface pour les expériences professionnelles
interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
}

export default function EarthSection() {
  const earthRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Animation de rotation de la Terre
  useEffect(() => {
    const earthElement = earthRef.current;
    if (!earthElement) return;
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const elementTop = earthElement.getBoundingClientRect().top + scrollTop;
      const offset = scrollTop - elementTop;
      
      if (offset > -window.innerHeight && offset < window.innerHeight) {
        const rotation = offset * 0.05;
        earthElement.style.transform = `rotate(${rotation}deg)`;
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
      role: "Senior Front-end Developer",
      company: "Tech Innovations Inc.",
      period: "2022 - Présent",
      description: "Développement d'applications web avec React et Next.js. Leader technique pour l'équipe front-end. Mise en place d'architectures évolutives et maintenables.",
      skills: ["React", "Next.js", "TypeScript", "GraphQL", "UI/UX"]
    },
    {
      role: "Full-Stack Developer",
      company: "Digital Solutions Group",
      period: "2019 - 2022",
      description: "Développement complet d'applications web, de l'interface utilisateur aux API et bases de données. Implémentation de fonctionnalités innovantes et optimisation des performances.",
      skills: ["JavaScript", "Node.js", "MongoDB", "Express", "React"]
    },
    {
      role: "Junior Web Developer",
      company: "WebCraft Agency",
      period: "2017 - 2019",
      description: "Création de sites web et d'applications pour divers clients. Participation active aux processus de conception et développement dans une équipe agile.",
      skills: ["HTML/CSS", "JavaScript", "WordPress", "PHP", "Responsive Design"]
    }
  ];

  // State to track if we're on client-side
  const [isClient, setIsClient] = useState(false);
  
  // Set isClient to true once component mounts (client-side only)
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="relative py-20 overflow-hidden" ref={sectionRef}>
      {/* Dégradé de fond avec transition depuis AtmosphereSection */}
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          background: 'linear-gradient(to bottom, #06b6d4 0%, #0ea5e9 20%, #10b981 60%, #22c55e 100%)' 
        }}
      />
      
      {/* Éléments décoratifs terrestres */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Cercle représentant la Terre */}
        <div ref={earthRef} className="earth absolute -right-[30%] top-[10%] w-[60%] aspect-square rounded-full bg-gradient-to-br from-blue-700 via-green-600 to-blue-500 opacity-20"></div>
        
        {/* Éléments représentant des continents */}
        <div className="continent continent-1 absolute top-[20%] left-[10%] w-[10%] h-[15%] bg-green-700/30 rounded-[40%] transform rotate-12"></div>
        <div className="continent continent-2 absolute top-[30%] left-[25%] w-[15%] h-[10%] bg-green-700/30 rounded-[60%] transform -rotate-6"></div>
        <div className="continent continent-3 absolute bottom-[25%] left-[15%] w-[20%] h-[12%] bg-green-700/30 rounded-[50%] transform rotate-25"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title text-4xl font-bold text-white mb-4 transition-all duration-1000 ease-out opacity-0 translate-y-5">Parcours Professionnel</h2>
            <p className="text-green-100 max-w-2xl mx-auto transition-all duration-1000 ease-out opacity-0 translate-y-5" style={{ transitionDelay: '100ms' }}>
              Mon voyage sur Terre en tant que développeur web, avec les entreprises qui m'ont fait confiance.
            </p>
          </div>
          
          {/* Timeline d'expériences */}
          <div className="relative border-l-4 border-white/40 ml-4 md:ml-0 md:mx-auto">
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
                {/* Ligne du temps */}
                <div className="absolute -left-2 md:static md:mr-8 md:w-40 md:flex md:flex-col md:items-end">
                  <div className="w-4 h-4 rounded-full bg-white border-4 border-green-600 absolute -left-[10px] md:relative md:left-auto md:mb-2"></div>
                  <span className="hidden md:block text-white font-semibold">{exp.period}</span>
                </div>
                
                {/* Contenu */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/20 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                      <p className="text-green-100 mb-4">{exp.company} · <span className="md:hidden">{exp.period}</span></p>
                    </div>
                  </div>
                  
                  <p className="text-white/80 mb-4">{exp.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 text-xs font-medium text-white bg-green-600/40 rounded-full">
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
              className="inline-flex items-center px-6 py-3 bg-white/90 hover:bg-white text-green-700 font-semibold rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Télécharger mon CV
            </a>
          </div>
        </div>
      </div>
      
      {/* Transition gradient overlay vers la section Contact */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 z-5 opacity-90"
        style={{ 
          background: 'linear-gradient(to bottom, transparent, #1f2937)', 
          boxShadow: '0 -10px 30px 30px rgba(31, 41, 55, 0.15)'
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
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=%22100%25%22 height=%22100%25%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cdefs%3E%3ClinearGradient id=%22a%22 gradientUnits=%22userSpaceOnUse%22 x1=%220%22 x2=%220%22 y1=%220%22 y2=%22100%25%22%3E%3Cstop offset=%220%22 stop-color=%22%231f2937%22 stop-opacity=%220%22/%3E%3Cstop offset=%22100%25%22 stop-color=%22%231f2937%22 stop-opacity=%22.5%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d=%22M0 40 Q 25 20 50 40 T 100 40 V 100 H 0 Z%22 fill=%22url(%23a)%22/%3E%3C/svg%3E")',
              backgroundSize: '100% 100%',
              opacity: 0.7
            }}
          >
          </div>
        </div>
      </div>
    </section>
  );
} 