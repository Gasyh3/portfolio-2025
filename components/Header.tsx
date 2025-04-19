'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IconBrandGithub, IconBrandGitlab, IconBrandX, IconMenu2, IconX } from "@tabler/icons-react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fermer le menu mobile lors du clic sur un lien
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Détecter si l'utilisateur a scrollé
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);

      // Détecter la section active
      const sections = document.querySelectorAll('.section-container');
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.id;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Exécuter une fois au chargement pour initialiser
    handleScroll();
    
    // Empêcher le défilement du body quand le menu mobile est ouvert
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Déterminer les classes de style en fonction de la section active et du scroll
  const getHeaderStyles = () => {
    if (!scrolled && !mobileMenuOpen) {
      return 'bg-transparent text-white';
    }

    switch (activeSection) {
      case 'home':
        return 'bg-black/80 text-white';
      case 'competences':
        return 'bg-blue-900/80 text-white';
      case 'projets':
        return 'bg-blue-600/80 text-white';
      case 'experience':
        return 'bg-green-600/80 text-white';
      case 'contact':
        return 'bg-amber-900/80 text-white shadow-sm';
      case 'footer':
        return 'bg-gray-900/95 text-white';
      default:
        return 'bg-black/80 text-white';
    }
  };

  const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out backdrop-blur-sm ${getHeaderStyles()} ${scrolled || mobileMenuOpen ? 'header-scrolled' : ''}`;
  const logoClasses = `text-2xl font-bold group-hover:text-blue-300 transition-colors duration-300 relative text-white`;
  const linkBaseClasses = `nav-link transition-colors duration-300`;
  
  const getLinkClasses = (section: string, isMobile = false) => {
    const isActive = activeSection === section;
    
    if (isMobile) {
      return `${linkBaseClasses} ${isActive ? 'active font-semibold' : ''} text-white py-3 block w-full text-center text-lg`;
    }
    
    return `${linkBaseClasses} ${isActive ? 'active font-semibold' : ''} text-white/70 hover:text-white`;
  };
  
  const socialLinkClasses = 'text-white/70 hover:text-white transition-colors duration-300';

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group">
          <span className={logoClasses}>
            kevin.
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></span>
          </span>
        </Link>

        {/* Navigation Desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#home" className={getLinkClasses('home')} onClick={handleLinkClick}>
            Accueil
          </Link>
          <Link href="#competences" className={getLinkClasses('competences')} onClick={handleLinkClick}>
            Compétences
          </Link>
          <Link href="#projets" className={getLinkClasses('projets')} onClick={handleLinkClick}>
            Projets
          </Link>
          <Link href="#experience" className={getLinkClasses('experience')} onClick={handleLinkClick}>
            Expérience
          </Link>
          <Link href="#contact" className={getLinkClasses('contact')} onClick={handleLinkClick}>
            Contact
          </Link>
        </nav>

        {/* Social Links */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={socialLinkClasses}
          >
            <IconBrandGithub className="w-6 h-6" />
          </Link>
          <Link
            href="https://gitlab.com"
            target="_blank"
            rel="noopener noreferrer"
            className={socialLinkClasses}
          >
            <IconBrandGitlab className="w-6 h-6" />
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className={socialLinkClasses}
          >
            <IconBrandX className="w-6 h-6" />
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {mobileMenuOpen ? (
            <IconX className="w-6 h-6" />
          ) : (
            <IconMenu2 className="w-6 h-6" />
          )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-black/95 z-40 flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${
          mobileMenuOpen 
            ? 'opacity-100 pointer-events-auto translate-y-0' 
            : 'opacity-0 pointer-events-none -translate-y-8'
        }`}
        style={{ top: '4rem' }}
      >
        <nav className="flex flex-col items-center space-y-6 w-full py-8">
          <Link href="#home" className={getLinkClasses('home', true)} onClick={handleLinkClick}>
            Accueil
          </Link>
          <Link href="#competences" className={getLinkClasses('competences', true)} onClick={handleLinkClick}>
            Compétences
          </Link>
          <Link href="#projets" className={getLinkClasses('projets', true)} onClick={handleLinkClick}>
            Projets
          </Link>
          <Link href="#experience" className={getLinkClasses('experience', true)} onClick={handleLinkClick}>
            Expérience
          </Link>
          <Link href="#contact" className={getLinkClasses('contact', true)} onClick={handleLinkClick}>
            Contact
          </Link>
          
          <div className="flex items-center space-x-8 mt-8 pt-8 border-t border-white/20 w-48">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors duration-300"
            >
              <IconBrandGithub className="w-6 h-6" />
            </Link>
            <Link
              href="https://gitlab.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors duration-300"
            >
              <IconBrandGitlab className="w-6 h-6" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors duration-300"
            >
              <IconBrandX className="w-6 h-6" />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
} 