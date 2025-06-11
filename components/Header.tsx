'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IconBrandGithub, IconBrandGitlab, IconBrandX } from "@tabler/icons-react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Fermer le menu mobile lors du clic sur un lien
  const handleLinkClick = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  // Définition des sections à surveiller
  const sectionIds = ['home', 'competences', 'certifications', 'projets', 'experience', 'contact'];

  useEffect(() => {
    const handleScroll = () => {
      // Détecter si l'utilisateur a scrollé
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);

      // Point de référence pour la détection - utiliser le centre de la fenêtre
      const currentPos = window.scrollY + window.innerHeight / 2;
      
      // Récupérer les positions de chaque section
      let foundActive = false;
      let closestSection = { id: 'home', distance: Infinity };
      
      // Collecter d'abord toutes les sections avec leurs positions réelles
      const visibleSections = sectionIds.map(id => {
        let element;
        
        // Traitement spécial pour home qui pourrait ne pas avoir d'id
        if (id === 'home') {
          element = document.querySelector('.scroll-container')?.firstElementChild as HTMLElement;
        } else {
          // Chercher d'abord dans les conteneurs de section
          const container = document.getElementById(id);
          if (container) {
            element = container;
          } else {
            // Chercher ensuite les éléments section avec l'id directement
            element = document.querySelector(`section[id="${id}"]`) as HTMLElement;
          }
        }
        
        if (!element) return null;
        
        // Calculer les positions réelles en tenant compte du scroll
        const rect = element.getBoundingClientRect();
        const top = window.scrollY + rect.top;
        const bottom = top + rect.height;
        
        return {
          id,
          element,
          top,
          bottom,
          height: rect.height,
          // Calculer où se trouve le centre de la section
          center: top + (rect.height / 2)
        };
      }).filter(Boolean);
      
      // Parcourir les sections et trouver celle qui est active
      for (let i = 0; i < visibleSections.length; i++) {
        const section = visibleSections[i];
        if (!section) continue;
        
        // Vérifier si le point de référence est dans cette section
        if (currentPos >= section.top && currentPos <= section.bottom) {
          setActiveSection(section.id);
          foundActive = true;
          break;
        }
        
        // Calculer la distance au centre de cette section
        const distanceToCenter = Math.abs(currentPos - section.center);
        if (distanceToCenter < closestSection.distance) {
          closestSection = { id: section.id, distance: distanceToCenter };
        }
      }
      
      // Si aucune section n'est trouvée active, utiliser la plus proche
      if (!foundActive) {
        setActiveSection(closestSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Exécuter une fois pour initialiser
    setTimeout(handleScroll, 300); // Délai court pour s'assurer que le DOM est prêt
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds]);

  // Déterminer les classes de style en fonction de la section active et du scroll
  const getHeaderStyles = () => {
    if (!scrolled) {
      return 'bg-transparent text-white';
    }

    switch (activeSection) {
      case 'home':
        return 'bg-black/80 text-white';
      case 'competences':
        return 'bg-blue-900/80 text-white';
      case 'certifications':
        return 'bg-orange-600/80 text-white';
      case 'projets':
        return 'bg-blue-600/80 text-white';
      case 'experience':
        return 'bg-sky-700/80 text-white';
      case 'contact':
        return 'bg-amber-900/80 text-white shadow-sm';
      default:
        return 'bg-black/80 text-white';
    }
  };

  // Obtenir les couleurs d'accent pour chaque section
  const getSectionAccentColor = (section: string) => {
    switch (section) {
      case 'home':
        return 'bg-white';
      case 'competences':
        return 'bg-blue-400';
      case 'certifications':
        return 'bg-orange-400';
      case 'projets':
        return 'bg-blue-300';
      case 'experience':
        return 'bg-sky-400';
      case 'contact':
        return 'bg-amber-400';
      default:
        return 'bg-white';
    }
  };

  const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out backdrop-blur-sm ${getHeaderStyles()}`;
  const logoClasses = `text-2xl font-bold group-hover:text-blue-300 transition-colors duration-300 relative text-white`;
  const linkBaseClasses = `nav-link transition-all duration-300 relative group px-1`;
  
  // Génération des classes pour les liens de navigation
  const getLinkClasses = (section: string) => {
    const isActive = activeSection === section;
    return {
      container: `${linkBaseClasses} ${isActive ? 'text-white font-semibold' : 'text-white/80 hover:text-white'} pb-2 transition-all duration-500`
    };
  };
  
  const socialLinkClasses = 'text-white/70 hover:text-white transition-colors duration-300';

  // Définition des sections pour la navigation
  const navSections = [
    { id: 'home', label: 'Accueil' },
    { id: 'competences', label: 'Compétences' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'projets', label: 'Projets' },
    { id: 'experience', label: 'Expérience' },
    { id: 'contact', label: 'Contact' }
  ];

  // Après la définition navSections, ajoutons des styles globaux pour les animations
  const headerAnimationStyles = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes scaleIn {
      from { transform: scaleX(0); }
      to { transform: scaleX(1); }
    }
    
    .nav-link-active-indicator {
      transform-origin: center;
      will-change: transform, opacity;
    }
  `;

  return (
    <header className={`hidden md:flex md:z-50 ${headerClasses}`}>      {/* Style pour les animations */}
      <style jsx global>{headerAnimationStyles}</style>
      
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group">
          <span className={logoClasses}>
            kevin.
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></span>
          </span>
        </Link>

        {/* Navigation Desktop */}
        <nav className="flex items-center space-x-6">
          {navSections.map((section, index) => {
            const linkStyles = getLinkClasses(section.id);
            return (
              <div key={section.id} className="relative">
                <Link 
                  href={`#${section.id}`} 
                  className={linkStyles.container}
                  onClick={() => handleLinkClick(section.id)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {section.label}
                </Link>
              </div>
            );
          })}
        </nav>

        {/* Social Links */}
        <div className="flex items-center space-x-4">
          <Link
            href="https://github.com/Gasyh3"
            target="_blank"
            rel="noopener noreferrer"
            className={socialLinkClasses}
          >
            <IconBrandGithub className="w-5 h-5" />
          </Link>
          <Link
            href="https://gitlab.com/Gasyh3"
            target="_blank"
            rel="noopener noreferrer"
            className={socialLinkClasses}
          >
            <IconBrandGitlab className="w-5 h-5" />
          </Link>
          <Link
            href="https://twitter.com/Gasyh3"
            target="_blank"
            rel="noopener noreferrer"
            className={socialLinkClasses}
          >
            <IconBrandX className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </header>
  );
} 