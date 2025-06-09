'use client';

import React, { useState, useEffect } from 'react';

// Définition des sections avec leurs IDs correspondant à la structure dans app/page.tsx
const sections = [
  { id: 'home', label: 'Accueil' },        // SpaceSection n'a pas d'ID explicite dans la page
  { id: 'competences', label: 'Compétences' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'projets', label: 'Projets' },
  { id: 'experience', label: 'Expérience' },
  { id: 'contact', label: 'Contact' }
];

export default function SectionIndicators() {
  const [activeSection, setActiveSection] = useState('home');
  const [sectionsReady, setSectionsReady] = useState(false);

  // Effet pour trouver les sections si elles ne sont pas directement accessibles par ID
  useEffect(() => {
    // Assurons-nous que le code s'exécute uniquement côté client
    if (typeof window === 'undefined') return;
    
    // Déterminer les éléments pour chaque section
    const sectionElements = [];
    
    // SpaceSection est le premier enfant de .scroll-container
    const scrollContainer = document.querySelector('.scroll-container');
    if (scrollContainer && scrollContainer.firstElementChild) {
      sectionElements.push({
        id: 'home',
        element: scrollContainer.firstElementChild as HTMLElement
      });
    }
    
    // Les autres sections ont des IDs explicites
    sections.slice(1).forEach(section => {
      const element = document.getElementById(section.id);
      if (element) {
        sectionElements.push({
          id: section.id,
          element
        });
      }
    });
    
    // Si contact n'a pas d'ID explicite, c'est peut-être le dernier enfant
    if (!document.getElementById('contact') && scrollContainer) {
      const children = Array.from(scrollContainer.children);
      if (children.length > 0) {
        const lastChild = children[children.length - 1] as HTMLElement;
        // Remplacer ou ajouter à sectionElements
        const contactIndex = sectionElements.findIndex(s => s.id === 'contact');
        if (contactIndex >= 0) {
          sectionElements[contactIndex] = { id: 'contact', element: lastChild };
        } else {
          sectionElements.push({ id: 'contact', element: lastChild });
        }
      }
    }
    
    // Marquer que les sections sont prêtes à être observées
    if (sectionElements.length > 0) {
      setSectionsReady(true);
    }
  }, []);

  // Observer pour détecter la section active
  useEffect(() => {
    if (!sectionsReady || typeof window === 'undefined') return;
    
    const options = {
      root: null,
      rootMargin: '-10% 0px -10% 0px', // Ajuster la marge pour une meilleure détection
      threshold: [0.2, 0.3, 0.4], // Multiple thresholds pour une meilleure détection
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
          // Identifions la section par l'ID ou par la position
          const target = entry.target as HTMLElement;
          let sectionId = target.id || getSectionIdByElement(target);
          
          // Vérifier également les éléments dans les conteneurs de section
          if (!sectionId && target.querySelector('[id]')) {
            sectionId = target.querySelector('[id]')?.id || '';
          }
          
          // Vérifier les parents pour les sections imbriquées
          if (!sectionId && target.parentElement && target.parentElement.id) {
            sectionId = target.parentElement.id;
          }
          
          if (sectionId) {
            // Vérifier si la section existe dans notre liste de sections
            const sectionExists = sections.some(section => section.id === sectionId);
            if (sectionExists) {
              setActiveSection(sectionId);
            }
          }
        }
      });
    }, options);
    
    // Observer toutes les sections principales
    const mainSections = document.querySelectorAll('section[id]');
    mainSections.forEach(section => {
      observer.observe(section);
    });
    
    // Observer tous les conteneurs de section
    const sectionContainers = document.querySelectorAll('.section-container');
    sectionContainers.forEach(container => {
      observer.observe(container);
    });
    
    // Observez également les éléments créés spécifiquement dans chaque section
    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });
    
    return () => {
      // Nettoyer l'observer quand le composant est démonté
      mainSections.forEach(section => {
        observer.unobserve(section);
      });
      
      sectionContainers.forEach(container => {
        observer.unobserve(container);
      });
      
      sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) observer.unobserve(element);
      });
    };
  }, [sectionsReady]);
  
  // Fonction pour déterminer l'ID d'une section par sa position
  const getSectionIdByElement = (element: HTMLElement): string | null => {
    const mainContent = document.querySelector('.scroll-container');
    if (!mainContent) return null;
    
    const children = Array.from(mainContent.children);
    const index = children.indexOf(element);
    
    if (index === 0) return 'home';
    if (index === 1) return 'competences';
    if (index === 2) return 'certifications';
    if (index === 3) return 'projets';
    if (index === 4) return 'experience';
    if (index === 5) return 'contact';
    
    return null;
  };

  // Navigation entre les sections
  const navigateToSection = (sectionId: string) => {
    // Gérer le cas de la première section qui peut ne pas avoir d'ID
    if (sectionId === 'home') {
      const scrollContainer = document.querySelector('.scroll-container');
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
      return;
    }
    
    // Pour les autres sections, utiliser l'ID
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
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