'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { IconAward, IconSchool, IconCertificate, IconTrophy } from '@tabler/icons-react';

interface Certification {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  icon: 'award' | 'school' | 'certificate' | 'trophy';
  color: string;
  image: string;
}

export default function MesosphereSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleCertifications, setVisibleCertifications] = useState<string[]>([]);

  const certifications: Certification[] = [
    {
      id: 'cert1',
      title: 'Master of Science Pro Big Data & IA',
      organization: 'EPITECH Lyon',
      date: '2025',
      description: 'Spécialisation en intelligence artificielle et analyse de données massives',
      icon: 'school',
      color: 'amber',
      image: '/images/logo/epitech.png'
    },
    {
      id: 'cert2',
      title: 'Certification Développeur Full Stack',
      organization: 'OpenClassrooms',
      date: '2022',
      description: 'Titre RNCP Niveau 5 (Bac+2) en programmation Web',
      icon: 'certificate',
      color: 'rose',
      image: '/images/logo/openclassrooms.png'
    },
    {
      id: 'cert3',
      title: 'Licence Mathématiques et Informatique',
      organization: 'Université de Lyon 1',
      date: '2021',
      description: 'Bac +2 spécialité Informatique',
      icon: 'certificate',
      color: 'rose',
      image: '/images/logo/lyon1.png'
    },
    
  ];

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'award': return <IconAward className="w-8 h-8" />;
      case 'school': return <IconSchool className="w-8 h-8" />;
      case 'certificate': return <IconCertificate className="w-8 h-8" />;
      case 'trophy': return <IconTrophy className="w-8 h-8" />;
      default: return <IconCertificate className="w-8 h-8" />;
    }
  };

  const getColorClasses = (color: string) => {
    const baseClasses = "backdrop-blur-sm border p-6 rounded-lg transition-all duration-300";
    
    switch (color) {
      case 'amber': return `${baseClasses} bg-amber-600/30 border-amber-500/30 hover:bg-amber-600/40`;
      case 'rose': return `${baseClasses} bg-rose-600/30 border-rose-500/30 hover:bg-rose-600/40`;
      case 'orange': return `${baseClasses} bg-orange-600/30 border-orange-500/30 hover:bg-orange-600/40`;
      case 'pink': return `${baseClasses} bg-pink-600/30 border-pink-500/30 hover:bg-pink-600/40`;
      case 'red': return `${baseClasses} bg-red-600/30 border-red-500/30 hover:bg-red-600/40`;
      default: return `${baseClasses} bg-orange-600/30 border-orange-500/30 hover:bg-orange-600/40`;
    }
  };

  // Animation orchestration
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Fade in title
          const titleElement = sectionRef.current?.querySelector('.section-title');
          if (titleElement) {
            titleElement.classList.add('opacity-100');
            titleElement.classList.remove('opacity-0', 'translate-y-5');
          }
          
          // Animate certifications one by one with slight delay
          setTimeout(() => {
            const newVisible: string[] = [];
            certifications.forEach((cert, index) => {
              setTimeout(() => {
                newVisible.push(cert.id);
                setVisibleCertifications([...newVisible]);
              }, index * 150);
            });
          }, 300);
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

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden py-20"
    >
      {/* Arrière-plan dégradé coucher de soleil pour la Mésosphère */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(to bottom, #FF512F 0%, #F09819 30%, #ff9966 70%, #ff5e62 100%)'
        }}
      />

      {/* Nuages décoratifs */}
      <div className="absolute inset-0 z-1 opacity-40 overflow-hidden">
        {/* Nuage 1 - en haut à gauche */}
        <div className="absolute top-[10%] left-[5%] animate-float-slow">
          <div className="relative">
            <div className="w-48 h-16 bg-white rounded-full"></div>
            <div className="w-40 h-18 bg-white rounded-full absolute top-[-8px] left-[30px]"></div>
            <div className="w-36 h-14 bg-white rounded-full absolute top-[-4px] left-[12px]"></div>
          </div>
        </div>
        
        {/* Nuage 2 - au milieu à droite */}
        <div className="absolute top-[30%] right-[15%] animate-float-medium">
          <div className="relative">
            <div className="w-64 h-20 bg-white rounded-full"></div>
            <div className="w-50 h-24 bg-white rounded-full absolute top-[-10px] left-[40px]"></div>
            <div className="w-36 h-18 bg-white rounded-full absolute top-[-5px] left-[20px]"></div>
          </div>
        </div>
        
        {/* Nuage 3 - en bas à gauche */}
        <div className="absolute top-[60%] left-[25%] animate-float-slow">
          <div className="relative">
            <div className="w-56 h-14 bg-white rounded-full"></div>
            <div className="w-36 h-16 bg-white rounded-full absolute top-[-10px] left-[20px]"></div>
            <div className="w-24 h-12 bg-white rounded-full absolute top-[-6px] left-[40px]"></div>
          </div>
        </div>

        {/* Nuage 4 - en haut au centre */}
        <div className="absolute top-[15%] left-[40%] animate-float-medium">
          <div className="relative">
            <div className="w-50 h-12 bg-white rounded-full"></div>
            <div className="w-32 h-14 bg-white rounded-full absolute top-[-6px] left-[15px]"></div>
            <div className="w-28 h-10 bg-white rounded-full absolute top-[-3px] left-[25px]"></div>
          </div>
        </div>
      </div>

      {/* Rayons de soleil */}
      <div className="absolute inset-0 z-0 opacity-20">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="absolute bg-white/60"
            style={{
              height: '1px',
              width: `${Math.random() * 50 + 30}%`,
              top: `${Math.random() * 40 + 5}%`,
              left: `${Math.random() * 40}%`,
              transform: `rotate(${i * 30}deg)`,
              transformOrigin: 'left center',
              boxShadow: '0 0 15px rgba(255, 255, 255, 0.7)',
              opacity: Math.random() * 0.7 + 0.3
            }}
          />
        ))}
      </div>

      {/* Contenu de la section */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Titre de la section avec animation */}
        <div className="section-title text-center mb-16 transform translate-y-5 opacity-0 transition-all duration-700">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">Diplômes & Certifications</h2>
          <p className="text-lg text-amber-50 max-w-3xl mx-auto drop-shadow">
            Mon parcours académique et mes certifications professionnelles qui valident mes compétences techniques.
          </p>
        </div>

        {/* Grille des certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-12 max-w-7xl mx-auto">
          {certifications.map((cert, index) => (
            <div 
              key={cert.id}
              className={`relative transform ${visibleCertifications.includes(cert.id) 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'} transition-all duration-500`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className={`${getColorClasses(cert.color)} h-full flex flex-col shadow-2xl rounded-2xl min-h-[480px] pt-10`}> 
                {/* Badge Icon centré au-dessus de la card */}
                <div className="absolute left-1/2 -top-8 -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-br from-amber-400 to-rose-600 p-4 rounded-full shadow-lg border-4 border-white/60">
                    {getIconComponent(cert.icon)}
                  </div>
                </div>
                {/* Image/logo sur fond dégradé */}
                <div className="relative h-64 mb-6 overflow-hidden rounded-t-2xl flex items-center justify-center" style={{background: 'linear-gradient(135deg, #FF512F 0%, #F09819 100%)'}}>
                  <img 
                    src={cert.image} 
                    alt={cert.title}
                    className="max-h-48 max-w-full object-contain drop-shadow-xl"
                    style={{filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.15))'}}
                  />
                </div>
                <div className="flex-1 px-8 pb-8 pt-2 flex flex-col">
                  <div className="flex flex-col items-center mb-4 mt-2">
                    <h3 className="text-2xl font-bold text-white leading-tight text-center">{cert.title}</h3>
                    <p className="text-amber-100 flex items-center text-lg text-center">
                      {cert.organization} • {cert.date}
                    </p>
                  </div>
                  <p className="text-amber-100 text-lg leading-relaxed mt-2 text-center">{cert.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transition vers l'atmosphère */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 z-10"
        style={{ 
          background: 'linear-gradient(to bottom, transparent, rgba(118, 169, 230, 0.8))'
        }}
      />

      {/* Particules de transition */}
      <div className="absolute bottom-0 left-0 right-0 h-48 z-6 overflow-hidden">
        {Array.from({ length: 15 }, (_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-amber-300/30 blur-sm transition-particle"
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
    </section>
  );
} 