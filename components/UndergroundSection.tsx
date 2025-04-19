'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

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
          <div className="text-center mb-12">
            <h2 className="section-title text-4xl font-bold text-amber-300 mb-4 transition-all duration-1000 ease-out opacity-0 translate-y-5">
              Contact & Exploration
            </h2>
            <p className="text-amber-100/80 max-w-2xl mx-auto transition-all duration-1000 ease-out" style={{ transitionDelay: '200ms' }}>
              Creusez plus profondément et découvrez comment nous pouvons collaborer ensemble sur votre prochain projet.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="col-span-1 md:col-span-1">
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
                        contact@kevin-rakotoniaina.com
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
                      <p className="text-amber-100">Paris, France</p>
                    </div>
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
                    <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="bg-amber-400/20 p-2 rounded-lg text-amber-300 hover:bg-amber-400/40 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-0.547-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                      </svg>
                    </a>
                    <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="bg-amber-400/20 p-2 rounded-lg text-amber-300 hover:bg-amber-400/40 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.006 10.006 0 01-3.127 1.195A4.936 4.936 0 0016.343 2c-3.053 0-5.273 2.855-4.588 5.823-3.908-.19-7.38-2.07-9.695-4.92a4.93 4.93 0 001.523 6.574 4.903 4.903 0 01-2.229-.616c-.054 2.28 1.581 4.415 3.95 4.89a4.936 4.936 0 01-2.224.084 4.928 4.928 0 004.6 3.42A9.9 9.9 0 010 19.54a14.01 14.01 0 007.548 2.213c9.142 0 14.307-7.721 13.995-14.647A10.025 10.025 0 0024 4.56z" />
                      </svg>
                    </a>
                    <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="bg-amber-400/20 p-2 rounded-lg text-amber-300 hover:bg-amber-400/40 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-span-1 md:col-span-2">
              {/* Formulaire de contact */}
              <div className="contact-form bg-gradient-to-br from-amber-900/40 to-gray-900/40 backdrop-blur-sm p-8 rounded-xl border border-amber-700/20 opacity-0 translate-y-10 transition-all duration-700">
                <h3 className="text-xl font-bold text-amber-300 mb-6">Envoyez-moi un message</h3>
                
                {submitResult && (
                  <div className={`mb-6 p-4 rounded-lg ${submitResult.success ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'}`}>
                    {submitResult.message}
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-amber-300 mb-1">Nom</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full bg-amber-900/20 border border-amber-700/30 text-amber-100 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Votre nom"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-amber-300 mb-1">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full bg-amber-900/20 border border-amber-700/30 text-amber-100 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Votre email"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-amber-300 mb-1">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full bg-amber-900/20 border border-amber-700/30 text-amber-100 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Votre message..."
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-gray-900 font-medium rounded-lg transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                  </button>
                </form>
              </div>
            </div>
          </div>
          
          {/* Section footer */}
          <div className="border-t border-amber-700/30 pt-8 mt-16">
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
            
            <div className="border-t border-amber-700/30 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
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