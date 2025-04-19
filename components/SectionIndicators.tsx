'use client';

import React, { useState, useEffect } from 'react';

const sections = [
  { id: 'home', label: 'Accueil' },
  { id: 'competences', label: 'Compétences' },
  { id: 'projets', label: 'Projets' },
  { id: 'experience', label: 'Expérience' },
  { id: 'contact', label: 'Contact' }
];

export default function SectionIndicators() {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(true);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  // Observer pour détecter la section active
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3, // Élément visible à 30%
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    // Observer toutes les sections
    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => {
      // Nettoyer l'observer quand le composant est démonté
      sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  // Effet pour gérer la visibilité basée sur le défilement
  useEffect(() => {
    // Fonction pour gérer le défilement
    const handleScroll = () => {
      // Montrer les indicateurs pendant le défilement
      setIsVisible(true);
      
      // Effacer le timeout précédent s'il existe
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      // Définir un nouveau timeout pour masquer les indicateurs après 1 seconde
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 1000);
      
      setScrollTimeout(timeout);
    };

    // Ajouter l'écouteur d'événement
    window.addEventListener('scroll', handleScroll);
    
    // Masquer initialement les indicateurs après 2 secondes
    const initialTimeout = setTimeout(() => {
      setIsVisible(false);
    }, 2000);
    
    return () => {
      // Nettoyer
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      clearTimeout(initialTimeout);
    };
  }, [scrollTimeout]);

  // Navigation entre les sections
  const navigateToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Classes CSS déterminées par l'état de visibilité
  const containerClasses = `fixed right-6 top-1/2 transform -translate-y-1/2 z-50 transition-opacity duration-300 ${
    isVisible ? 'opacity-100' : 'opacity-0'
  }`;

  return (
    <div className={containerClasses} onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
      <div className="flex flex-col space-y-3">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => navigateToSection(section.id)}
            aria-label={`Naviguer vers la section ${section.label}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 ${
              activeSection === section.id
                ? 'bg-blue-500 scale-125'
                : 'bg-gray-400 hover:bg-gray-300'
            }`}
            title={section.label}
          />
        ))}
      </div>
    </div>
  );
} 