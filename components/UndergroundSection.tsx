'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import MiniSnake from './MiniSnake';

export default function UndergroundSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const currentYear = new Date().getFullYear();
  
  // Animation des éléments au scroll
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const observerOptions = {
      threshold: 0.2,
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
          
          const contactElements = sectionRef.current?.querySelectorAll('.contact-item');
          contactElements?.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('opacity-100', 'translate-y-0');
              item.classList.remove('opacity-0', 'translate-y-10');
            }, 100 + index * 150);
          });
          
          const formElement = sectionRef.current?.querySelector('.contact-form');
          if (formElement) {
            setTimeout(() => {
              formElement.classList.add('opacity-100');
              formElement.classList.remove('opacity-0', 'translate-y-10');
            }, 400);
          }
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
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);
    
    // Simuler un envoi de formulaire
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simuler une réponse de succès
    setIsSubmitting(false);
    setSubmitResult({ 
      success: true, 
      message: 'Votre message a été envoyé avec succès ! Je vous répondrai dans les plus brefs délais.' 
    });
    
    // Réinitialiser le formulaire
    setFormState({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <section 
      ref={sectionRef} 
      id="contact" 
      className="relative py-16 bg-gradient-to-b from-green-700 via-amber-900 to-gray-900 overflow-hidden min-h-screen"
    >
      {/* Éléments décoratifs du sous-sol */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Couches de terrain */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-green-600 to-transparent opacity-40"></div>
        
        {/* Cristaux et minéraux */}
        {Array.from({ length: 12 }, (_, i) => (
          <div 
            key={i}
            className="absolute bg-amber-400/30 transform rotate-45"
            style={{
              width: `${Math.random() * 40 + 10}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 30}%`,
              opacity: Math.random() * 0.3 + 0.1,
              boxShadow: '0 0 20px rgba(251, 191, 36, 0.3)',
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
            }}
          ></div>
        ))}
        
        {/* Particules de poussière */}
        {Array.from({ length: 60 }, (_, i) => (
          <div 
            key={`dust-${i}`}
            className="absolute rounded-full bg-amber-100/20"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.4,
              animation: `float-slow ${Math.random() * 10 + 20}s linear infinite`
            }}
          ></div>
        ))}
      </div>
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
            <h2 className="section-title text-4xl font-bold text-amber-300 mb-4 transition-all duration-1000 ease-out opacity-0 translate-y-5">
              Contact & Exploration
            </h2>
            <p className="text-amber-100/80 max-w-2xl mx-auto transition-all duration-1000 ease-out" style={{ transitionDelay: '200ms' }}>
              Creusez plus profondément et découvrez comment nous pouvons collaborer ensemble sur votre prochain projet.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="col-span-1 md:col-span-2">
              {/* Informations de contact */}
              <div className="bg-gradient-to-br from-amber-900/40 to-gray-900/40 backdrop-blur-sm p-8 rounded-xl border border-amber-700/20 h-full flex flex-col">
                <h3 className="text-xl font-bold text-amber-300 mb-6">Coordonnées</h3>
                
                <div className="space-y-6 flex-grow">
                  <div className="contact-item flex items-start opacity-0 translate-y-10 transition-all duration-700">
                    <div className="bg-amber-400/20 p-3 rounded-lg mr-4">
                      <svg className="w-5 h-5 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-amber-300">E-mail</h4>
                      <a href="mailto:contact@kevin-rakotoniaina.com" className="text-amber-100 hover:text-amber-300 transition-colors">
                        kevin.rakotoniaina@epitech.eu
                      </a>
                    </div>
                  </div>
                  
                  <div className="contact-item flex items-start opacity-0 translate-y-10 transition-all duration-700">
                    <div className="bg-amber-400/20 p-3 rounded-lg mr-4">
                      <svg className="w-5 h-5 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-amber-300">Localisation</h4>
                      <p className="text-amber-100">Lyon, France</p>
                    </div>
                  </div>

                    {/* Éléments décoratifs supplémentaires */}
                    <div className="relative h-24 mt-8">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-1 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent"></div>
                    </div>
                    {Array.from({ length: 5 }, (_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-amber-400/40 rounded-full"
                        style={{
                          left: `${20 + i * 15}%`,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          animation: `pulse ${2 + i * 0.5}s infinite`
                        }}
                      ></div>
                    ))}
                  </div>
                  
                  <div className="contact-item flex items-start opacity-0 translate-y-10 transition-all duration-700">
                    <div className="bg-amber-400/20 p-3 rounded-lg mr-4">
                      <svg className="w-5 h-5 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-amber-300">Disponibilité</h4>
                      <p className="text-amber-100">Ouvert aux nouvelles opportunités</p>
                    </div>
                  </div>
                </div>
                
                <div className="contact-item mt-8 pt-6 border-t border-amber-700/30 opacity-0 translate-y-10 transition-all duration-700">
                  <h4 className="text-sm font-semibold text-amber-300 mb-4">Réseaux sociaux</h4>
                  <div className="flex space-x-4">
                    <a href="https://github.com/Gasyh3" target="_blank" rel="noopener noreferrer" className="bg-amber-400/20 p-2 rounded-lg text-amber-300 hover:bg-amber-400/40 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                    <a href="https://gitlab.com/Gasyh3" target="_blank" rel="noopener noreferrer" className="bg-amber-400/20 p-2 rounded-lg text-amber-300 hover:bg-amber-400/40 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"/>
                      </svg>
                    </a>
                    <a href="https://www.linkedin.com/in/rakoto-kevin/" target="_blank" rel="noopener noreferrer" className="bg-amber-400/20 p-2 rounded-lg text-amber-300 hover:bg-amber-400/40 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-span-1 md:col-span-1">
              {/* Élément décoratif de remplacement */}
              <div className="contact-form bg-gradient-to-br from-amber-900/40 to-gray-900/40 backdrop-blur-sm p-8 rounded-xl border border-amber-700/20 h-full opacity-0 translate-y-10 transition-all duration-700">
                <h3 className="text-xl font-bold text-amber-300 mb-6">Mini Exploration</h3>
                
                <div className="space-y-6">
                  {/* Mini-jeu Snake */}
                  <div className="bg-amber-900/20 rounded-lg p-4 border border-amber-700/20">
                    <MiniSnake />
                  </div>

                
                </div>
              </div>
            </div>
          </div>
          
          {/* Section footer */}
          <div className="border-t border-amber-700/30 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <Link href="/" className="inline-block mb-4">
                  <span className="text-2xl font-bold text-amber-300">Kevin.</span>
                </Link>
                <p className="text-amber-100/60 max-w-xs text-sm">
                  Développeur web passionné, spécialisé dans la création d'expériences numériques modernes et innovantes.
                </p>
              </div>
              
              <div className="md:col-span-1">
                <h4 className="text-sm font-semibold text-amber-300 mb-4">Navigation</h4>
                <nav className="grid grid-cols-2 gap-2 text-sm">
                  <Link href="#home" className="text-amber-100/60 hover:text-amber-300 transition-colors">Accueil</Link>
                  <Link href="#competences" className="text-amber-100/60 hover:text-amber-300 transition-colors">Compétences</Link>
                  <Link href="#projets" className="text-amber-100/60 hover:text-amber-300 transition-colors">Projets</Link>
                  <Link href="#experience" className="text-amber-100/60 hover:text-amber-300 transition-colors">Expérience</Link>
                  <Link href="#contact" className="text-amber-100/60 hover:text-amber-300 transition-colors">Contact</Link>
                </nav>
              </div>
              
              <div className="md:col-span-1">
                <h4 className="text-sm font-semibold text-amber-300 mb-4">Légal</h4>
                <nav className="space-y-2 text-sm">
                  <Link href="/mentions-legales" className="text-amber-100/60 hover:text-amber-300 transition-colors block">Mentions légales</Link>
                  <Link href="/politique-confidentialite" className="text-amber-100/60 hover:text-amber-300 transition-colors block">Politique de confidentialité</Link>
                </nav>
              </div>
            </div>
            
            <div className="border-t border-amber-700/30 mt-1 pt-2 flex flex-col md:flex-row justify-between items-center">
              <p className="text-amber-100/60 text-sm mb-4 md:mb-0">
                &copy; {currentYear} Kevin Rakotoniaina. Tous droits réservés.
              </p>
              
              <p className="text-amber-100/60 text-sm">
                Conçu et développé avec passion
                <span className="inline-block mx-1 text-amber-400">❤</span>
                et Next.js
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Couche finale pour la transition entre l'Underground et le sol */}
      <div className="absolute top-0 left-0 right-0 h-32 z-20 pointer-events-none" style={{ 
        background: 'linear-gradient(to top, transparent, rgba(22, 101, 52, 0.3))' 
      }}></div>
    </section>
  );
} 