'use client';

import React, { useState, useEffect, useRef } from 'react';

interface SectionObserverProps {
  children: React.ReactNode;
}

export function SectionObserver({ children }: SectionObserverProps) {
  const [visibleSections, setVisibleSections] = useState<{[key: string]: boolean}>({
    home: true,
    competences: false,
    projets: false,
    experience: false,
    contact: false
  });
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentSectionRef = useRef('home');

  // Gérer le défilement fluide entre les sections
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;
      
      // Empêcher le comportement par défaut du défilement
      e.preventDefault();
      
      // Marquer comme en cours de défilement pour éviter les défilements rapides
      setIsScrolling(true);
      
      // Déterminer la direction du défilement
      const direction = e.deltaY > 0 ? 'down' : 'up';
      
      // Obtenir toutes les sections dans l'ordre
      const sectionIds = ['home', 'competences', 'projets', 'experience', 'contact'];
      
      // Trouver l'index de la section actuelle
      const currentIndex = sectionIds.indexOf(currentSectionRef.current);
      
      // Calculer l'index de la section cible
      let targetIndex = currentIndex;
      if (direction === 'down' && currentIndex < sectionIds.length - 1) {
        targetIndex = currentIndex + 1;
      } else if (direction === 'up' && currentIndex > 0) {
        targetIndex = currentIndex - 1;
      }
      
      // Si l'index a changé, faire défiler vers la nouvelle section
      if (targetIndex !== currentIndex) {
        const targetSection = document.getElementById(sectionIds[targetIndex]);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
          currentSectionRef.current = sectionIds[targetIndex];
        }
      }
      
      // Réinitialiser le verrouillage du défilement après un délai
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1000); // Délai de 1 seconde entre les défilements
    };
    
    // Ajouter l'écouteur d'événements
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      // Nettoyer les écouteurs et les timeouts
      window.removeEventListener('wheel', handleWheel);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [isScrolling]);

  // Set up intersection observer for sections
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.6, // Element is considered visible when 60% is in view
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        const id = entry.target.id;
        if (id) {
          if (entry.isIntersecting) {
            currentSectionRef.current = id;
          }
          
          setVisibleSections(prev => ({
            ...prev,
            [id]: entry.isIntersecting
          }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section[id], div[id].section-container');
    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  return <>{children}</>;
} 