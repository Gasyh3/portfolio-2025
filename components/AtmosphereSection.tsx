'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

// Composant de carte de projet
interface ProjectCardProps {
  title: string;
  description: string;
  imageSrc: string;
  tags: string[];
  link: string;
  isActive: boolean;
  onNavigate: (direction: 'prev' | 'next') => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, imageSrc, tags, link, isActive, onNavigate }) => {
  return (
    <div 
      className={`
        relative overflow-hidden rounded-xl shadow-xl transition-all duration-500 ease-out h-[600px] w-full
        ${isActive ? 'opacity-100 scale-100 z-20' : 'opacity-50 scale-95 z-10'}
      `}
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-800/60 to-transparent z-10"></div>
      
      {/* Image */}
      <div className="relative h-full w-full">
        <div className="absolute inset-0 bg-blue-900/20"></div>
        <Image 
          src={imageSrc} 
          alt={title} 
          className="object-cover transition-transform duration-500 ease-out" 
          style={{ transform: isActive ? 'scale(1.05)' : 'scale(1)' }}
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 60vw"
        />
      </div>
      
      {/* Content */}
      <div className={`
        absolute bottom-0 left-0 right-0 p-8 z-20 transform transition-all duration-500 ease-out
        ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-90'}
      `}>
        <h3 className="font-bold text-3xl text-white mb-4">{title}</h3>
        <p className="text-blue-100 text-lg mb-6 line-clamp-3 max-w-2xl">{description}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag, index) => (
            <span key={index} className="text-sm px-3 py-1 bg-blue-700/70 backdrop-blur-sm text-blue-50 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <a 
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center py-3 px-6 bg-white text-blue-700 font-semibold rounded-lg transition-colors hover:bg-blue-50"
          >
            Voir le projet
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          
          {/* Navigation buttons */}
          <div className="flex space-x-2">
            <button 
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onNavigate('prev');
              }}
              aria-label="Projet précédent"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onNavigate('next');
              }}
              aria-label="Projet suivant"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AtmosphereSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Fonction pour démarrer ou redémarrer le timer
  const startAutoPlayTimer = () => {
    // Nettoyer le timer existant si présent
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Créer un nouveau timer
    timerRef.current = setInterval(() => {
      setActiveProject(prev => (prev + 1) % projects.length);
    }, 8000);
    
    return timerRef.current;
  };
  
  // Navigation du slider avec réinitialisation du timer
  const navigate = (direction: 'prev' | 'next') => {
    if (direction === 'next') {
      setActiveProject(prev => (prev + 1) % projects.length);
    } else {
      setActiveProject(prev => (prev - 1 + projects.length) % projects.length);
    }
    
    // Réinitialiser le timer après la navigation manuelle
    startAutoPlayTimer();
  };
  
  // Intersection Observer for scroll animations
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const titleElement = sectionRef.current?.querySelector('.section-title');
          if (titleElement) {
            titleElement.classList.add('opacity-100');
            titleElement.classList.remove('opacity-0', 'translate-y-5');
          }
          
          const sliderElement = sectionRef.current?.querySelector('.slider-container');
          if (sliderElement) {
            sliderElement.classList.add('opacity-100');
            sliderElement.classList.remove('opacity-0', 'translate-y-10');
          }
          
          // Auto-play du slider avec le nouveau système de timer
          const timer = startAutoPlayTimer();
          
          return () => {
            if (timer) clearInterval(timer);
          };
        }
      });
    }, observerOptions);
    
    observer.observe(sectionRef.current);
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      
      // Nettoyer le timer lors du démontage du composant
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  
  // Exemple de projets
  const projects = [
    {
      title: "Dashboard Analytics",
      description: "Application de visualisation de données avec des graphiques interactifs et tableaux de bord personnalisables. Cette solution offre des insights précieux sur les performances commerciales et permet de prendre des décisions basées sur les données en temps réel.",
      imageSrc: "/images/projects/placeholder1.jpg",
      tags: ["React", "D3.js", "TypeScript", "Redux", "API REST"],
      link: "#"
    },
    {
      title: "E-commerce Platform",
      description: "Plateforme e-commerce complète avec panier d'achat, passerelle de paiement sécurisée et système de gestion des commandes. Le site offre une expérience utilisateur fluide et responsive sur tous les appareils, avec des temps de chargement optimisés.",
      imageSrc: "/images/projects/placeholder2.jpg",
      tags: ["Next.js", "Stripe", "MongoDB", "Tailwind CSS", "Redux"],
      link: "#"
    },
    {
      title: "AI Content Assistant",
      description: "Outil d'aide à la rédaction utilisant l'intelligence artificielle pour suggérer du contenu optimisé pour le SEO. Cette application permet aux créateurs de contenu d'améliorer leur productivité tout en maintenant une haute qualité éditoriale.",
      imageSrc: "/images/projects/placeholder3.jpg",
      tags: ["Vue.js", "Node.js", "OpenAI", "Express", "PostgreSQL"],
      link: "#"
    },
    {
      title: "Social Media Analytics",
      description: "Plateforme d'analyse pour les réseaux sociaux qui permet de suivre l'engagement, la croissance des abonnés et l'impact des publications. L'outil offre des rapports détaillés et des recommandations personnalisées basées sur les données collectées.",
      imageSrc: "/images/projects/placeholder4.png",
      tags: ["React", "Firebase", "GraphQL", "Material UI", "Chart.js"],
      link: "#"
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden min-h-screen flex flex-col" ref={sectionRef}>
      {/* Arrière-plan de l'atmosphère avec transition douce depuis la stratosphère */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(to bottom, #4b6cb7 0%, #76a9e6 50%, #9be2fe 100%)'
        }}
      />
      
      {/* Nuages décoratifs avec animation */}
      <div className="absolute inset-0 z-0 opacity-20">
        {/* Nuage 1 - en haut à gauche */}
        <div className="cloud-shape absolute top-[10%] left-[5%] animate-float-slow">
          <div className="relative">
            <div className="w-48 h-16 bg-white rounded-full"></div>
          </div>
        </div>
        
        {/* Nuage 2 - en haut à droite */}
        <div className="cloud-shape absolute top-[20%] right-[15%] animate-float-medium">
          <div className="relative">
            <div className="w-64 h-20 bg-white rounded-full"></div>
            <div className="w-40 h-22 bg-white rounded-full absolute top-[-15px] left-[30px]"></div>
            <div className="w-36 h-18 bg-white rounded-full absolute top-[-5px] left-[12px]"></div>
          </div>
        </div>
        
        {/* Nuage 3 - en bas à gauche */}
        <div className="cloud-shape absolute top-[70%] left-[25%] animate-float-slow">
          <div className="relative">
            <div className="w-56 h-14 bg-white rounded-full"></div>
            <div className="w-36 h-16 bg-white rounded-full absolute top-[-10px] left-[20px]"></div>
            <div className="w-24 h-12 bg-white rounded-full absolute top-[-6px] left-[40px]"></div>
          </div>
        </div>
        
        {/* Nuage 4 - au milieu à droite */}
        <div className="cloud-shape absolute top-[40%] right-[5%] animate-float-medium">
          <div className="relative">
            <div className="w-40 h-12 bg-white rounded-full"></div>
            <div className="w-28 h-14 bg-white rounded-full absolute top-[-8px] left-[14px]"></div>
            <div className="w-20 h-10 bg-white rounded-full absolute top-[-5px] left-[28px]"></div>
          </div>
        </div>
      </div>
      
      {/* Structure principale avec disposition verticale */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col h-full">
        {/* Titre en haut */}
        <div className="text-center mb-16 pt-10">
          <h2 className="section-title text-5xl font-bold text-white transition-all duration-1000 ease-out opacity-0 translate-y-5">Mes Projets</h2>
          <p className="text-blue-100 max-w-2xl mx-auto transition-all duration-1000 ease-out opacity-0 translate-y-5" style={{ transitionDelay: '100ms' }}>
            Découvrez mon portfolio de projets innovants qui démontrent mes compétences en développement web.
          </p>
        </div>
        
        {/* Slider de projets - centré et occupant 80% de la largeur */}
        <div className="slider-container w-4/5 mx-auto flex-grow flex flex-col items-center justify-center transition-all duration-1000 ease-out opacity-0 translate-y-10 relative" ref={sliderRef}>
          {/* Slider content */}
          <div className="w-full mx-auto relative">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                  index === activeProject ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
              >
                <ProjectCard 
                  title={project.title}
                  description={project.description}
                  imageSrc={project.imageSrc}
                  tags={project.tags}
                  link={project.link}
                  isActive={index === activeProject}
                  onNavigate={navigate}
                />
              </div>
            ))}
          </div>
          
          {/* Pagination dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveProject(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeProject 
                    ? 'bg-white scale-125' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Aller au projet ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Lien GitHub en bas */}
        <div className="mt-12 text-center mb-10 opacity-0 translate-y-5 transition-all duration-1000 ease-out" style={{ transitionDelay: '400ms' }}>
          <a 
            href="https://github.com/yourusername" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg text-white transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            Voir plus de projets sur GitHub
          </a>
        </div>
      </div>
      
      {/* Transition gradient overlay vers la section Earth */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 z-5 opacity-90"
        style={{ 
          background: 'linear-gradient(to bottom, transparent, #06b6d4)', 
          boxShadow: '0 -10px 30px 30px rgba(6, 182, 212, 0.15)'
        }}
      ></div>
      
      {/* Éléments de transition vers Earth */}
      <div className="absolute bottom-0 left-0 right-0 h-48 z-6 overflow-hidden">
        {Array.from({ length: 15 }, (_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-green-300/30 blur-sm transition-particle"
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
      
      {/* Vague de transition vers Earth */}
      <div className="absolute bottom-0 left-0 right-0 z-7">
        <div className="relative h-24 overflow-hidden">
          <div 
            className="absolute h-24 w-full" 
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=%22100%25%22 height=%22100%25%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cdefs%3E%3ClinearGradient id=%22a%22 gradientUnits=%22userSpaceOnUse%22 x1=%220%22 x2=%220%22 y1=%220%22 y2=%22100%25%22%3E%3Cstop offset=%220%22 stop-color=%22%2306b6d4%22 stop-opacity=%220%22/%3E%3Cstop offset=%22100%25%22 stop-color=%22%2306b6d4%22 stop-opacity=%22.5%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d=%22M0 40 Q 25 20 50 40 T 100 40 V 100 H 0 Z%22 fill=%22url(%23a)%22/%3E%3C/svg%3E")',
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