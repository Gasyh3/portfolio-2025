'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

// Liste des technologies avec leur nom et chemin d'image
const TECHNOLOGIES = [
  { name: 'React', image: '/images/tech/react.svg' },
  { name: 'Next.js', image: '/images/tech/nextjs.svg' },
  { name: 'Tailwind CSS', image: '/images/tech/tailwind.svg' },
  { name: 'Node.js', image: '/images/tech/nodejs.svg' },
  { name: 'TypeScript', image: '/images/tech/typescript.svg' },
  { name: 'JavaScript', image: '/images/tech/javascript.svg' },
  { name: 'Docker', image: '/images/tech/docker.svg' },
  { name: 'Golang', image: '/images/tech/golang.svg' },
  { name: 'MongoDB', image: '/images/tech/mongodb.svg' },
  { name: 'PostgreSQL', image: '/images/tech/postgresql.svg' },
  { name: 'Git', image: '/images/tech/git.svg' },
  { name: 'GitHub', image: '/images/tech/github.svg' },
  { name: 'SCSS', image: '/images/tech/sass.svg' },
  { name: 'Kafka', image: '/images/tech/kafka.svg' },
  { name: 'Python', image: '/images/tech/python.svg' },
  { name: 'Java', image: '/images/tech/java.svg' },
  { name: 'FlutterFlow', image: '/images/tech/flutterflow.svg' },
  { name: 'WordPress', image: '/images/tech/wordpress.svg' },
  { name: 'Kubernetes', image: '/images/tech/kubernetes.svg' },
  { name: 'ArgoCD', image: '/images/tech/argocd.svg' },
];

export default function StratosphereSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Contexte pour les logos flottants
  const techIconsRef = useRef<Array<{
    name: string;
    img: HTMLImageElement;
    x: number;
    y: number;
    size: number;
    speed: number;
    rotation: number;
    rotationSpeed: number;
    loaded: boolean;
  }>>([]);
  
  // Animation des logos dans la stratosphère
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Redimensionner le canvas pour qu'il remplisse toute la section
    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Charger les images des logos
    if (techIconsRef.current.length === 0) {
      techIconsRef.current = TECHNOLOGIES.map(tech => {
        const img = new window.Image();  // Utiliser window.Image explicitement
        img.src = tech.image;
        return {
          name: tech.name,
          img: img,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 30 + Math.random() * 40, // Taille aléatoire entre 30 et 70px
          speed: 0.2 + Math.random() * 0.3, // Vitesse aléatoire
          rotation: Math.random() * Math.PI * 2, // Rotation initiale aléatoire
          rotationSpeed: (Math.random() - 0.5) * 0.01, // Vitesse de rotation aléatoire
          loaded: false
        };
      });
      
      // Marquer les images comme chargées
      techIconsRef.current.forEach(tech => {
        tech.img.onload = () => {
          tech.loaded = true;
        };
      });
    }
    
    // Animation
    const animate = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Fond dégradé pour la stratosphère
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0c164f'); // Bleu sombre/violet (espace supérieur)
      gradient.addColorStop(0.7, '#3a5cb5'); // Bleu moyen
      gradient.addColorStop(1, '#4b6cb7'); // Bleu clair (transition vers l'atmosphère)
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Mettre à jour et dessiner les logos
      techIconsRef.current.forEach(tech => {
        if (!tech.loaded) return;
        
        // Déplacer le logo
        tech.x += tech.speed;
        if (tech.x - tech.size > canvas.width) {
          tech.x = -tech.size;
        }
        
        // Faire flotter doucement les logos (mouvement vertical ondulé)
        tech.y += Math.sin(Date.now() * 0.001 + tech.x * 0.01) * 0.2;
        
        // Rotation lente
        tech.rotation += tech.rotationSpeed;
        
        // Dessiner le logo
        ctx.save();
        ctx.translate(tech.x, tech.y);
        ctx.rotate(tech.rotation);
        ctx.globalAlpha = 0.8; // Légère transparence
        
        // Dessiner un halo lumineux autour du logo
        const glowRadius = tech.size * 0.7;
        const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, glowRadius);
        glow.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
        glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(0, 0, glowRadius, 0, Math.PI * 2);
        ctx.fill();
        
        // Dessiner le logo
        const size = tech.size;
        ctx.drawImage(tech.img, -size/2, -size/2, size, size);
        
        ctx.restore();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  // Intersection Observer for scroll animations
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const contentElement = sectionRef.current?.querySelector('.content-container');
        if (contentElement && entry.isIntersecting) {
          contentElement.classList.add('opacity-100');
          contentElement.classList.remove('opacity-0', 'translate-y-10');
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
      className="relative h-screen overflow-hidden"
    >
      {/* Transition depuis l'espace */}
      <div 
        className="absolute top-0 left-0 right-0 h-48 z-10 pointer-events-none"
        style={{ 
          background: 'linear-gradient(to top, transparent, rgba(12, 22, 79, 0.5))'
        }}
      ></div>

      {/* Étoiles subtiles qui disparaissent progressivement dans la partie supérieure */}
      <div className="absolute top-0 left-0 right-0 h-64 overflow-hidden z-5 opacity-70">
        {Array.from({ length: 25 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.5 - (Math.random() * 0.3)
            }}
          />
        ))}
      </div>
      
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full" 
      />
      
      <div className="relative z-10 container mx-auto h-full flex flex-col justify-center px-4">
        <div className="content-container max-w-3xl bg-black/40 backdrop-blur-lg p-8 rounded-lg transform transition-all duration-1000 ease-out opacity-0 translate-y-10">
          <h2 className="text-4xl font-bold text-white mb-6">Domaines d'Expertise</h2>
          <p className="text-blue-100 mb-8">
            Explorer la stratosphère du développement web avec des compétences polyvalentes de l'interface à la donnée.
          </p>
          
          {/* Domaines d'expertise */}
          <div className="space-y-6">
            {/* Frontend */}
            <div className="bg-blue-900/40 backdrop-blur-sm p-5 rounded-lg border border-blue-500/30">
              <h3 className="text-xl font-bold text-blue-200 mb-2 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Développeur Frontend
              </h3>
              <p className="text-blue-100 mb-3">Création d'interfaces web modernes, interactives et responsives avec les technologies les plus récentes.</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 text-xs font-medium bg-blue-700/50 text-blue-100 rounded-full border border-blue-500/30">React</span>
                <span className="px-2 py-1 text-xs font-medium bg-blue-700/50 text-blue-100 rounded-full border border-blue-500/30">Next.js</span>
                <span className="px-2 py-1 text-xs font-medium bg-blue-700/50 text-blue-100 rounded-full border border-blue-500/30">TypeScript</span>
                <span className="px-2 py-1 text-xs font-medium bg-blue-700/50 text-blue-100 rounded-full border border-blue-500/30">Tailwind CSS</span>
                <span className="px-2 py-1 text-xs font-medium bg-blue-700/50 text-blue-100 rounded-full border border-blue-500/30">SCSS</span>
                <span className="px-2 py-1 text-xs font-medium bg-blue-700/50 text-blue-100 rounded-full border border-blue-500/30">WordPress</span>
                <span className="px-2 py-1 text-xs font-medium bg-blue-700/50 text-blue-100 rounded-full border border-blue-500/30">FlutterFlow</span>
              </div>
            </div>
            
            {/* Backend */}
            <div className="bg-blue-900/40 backdrop-blur-sm p-5 rounded-lg border border-blue-500/30">
              <h3 className="text-xl font-bold text-blue-200 mb-2 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
                Développeur Backend
              </h3>
              <p className="text-blue-100 mb-3">Architecture et développement de systèmes robustes, APIs et applications serveur performantes.</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 text-xs font-medium bg-blue-700/50 text-blue-100 rounded-full border border-blue-500/30">Node.js</span>
                <span className="px-2 py-1 text-xs font-medium bg-blue-700/50 text-blue-100 rounded-full border border-blue-500/30">Golang</span>
                <span className="px-2 py-1 text-xs font-medium bg-blue-700/50 text-blue-100 rounded-full border border-blue-500/30">Java</span>
                <span className="px-2 py-1 text-xs font-medium bg-blue-700/50 text-blue-100 rounded-full border border-blue-500/30">Python</span>
                <span className="px-2 py-1 text-xs font-medium bg-blue-700/50 text-blue-100 rounded-full border border-blue-500/30">MongoDB</span>
                <span className="px-2 py-1 text-xs font-medium bg-blue-700/50 text-blue-100 rounded-full border border-blue-500/30">PostgreSQL</span>
                <span className="px-2 py-1 text-xs font-medium bg-blue-700/50 text-blue-100 rounded-full border border-blue-500/30">Docker</span>
              </div>
            </div>
            
            {/* Data Engineer */}
            <div className="bg-blue-900/40 backdrop-blur-sm p-5 rounded-lg border border-blue-500/30">
              <h3 className="text-xl font-bold text-blue-200 mb-2 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
                Data Engineer
              </h3>
              <p className="text-blue-100 mb-3">Conception et mise en œuvre de pipelines de données, ETL et systèmes distribués pour le traitement de données à grande échelle.</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 text-xs font-medium bg-blue-700/50 text-blue-100 rounded-full border border-blue-500/30">Kafka</span>
                <span className="px-2 py-1 text-xs font-medium bg-blue-700/50 text-blue-100 rounded-full border border-blue-500/30">Python</span>
                <span className="px-2 py-1 text-xs font-medium bg-blue-700/50 text-blue-100 rounded-full border border-blue-500/30">Kubernetes</span>
                <span className="px-2 py-1 text-xs font-medium bg-blue-700/50 text-blue-100 rounded-full border border-blue-500/30">ArgoCD</span>
                <span className="px-2 py-1 text-xs font-medium bg-blue-700/50 text-blue-100 rounded-full border border-blue-500/30">PostgreSQL</span>
                <span className="px-2 py-1 text-xs font-medium bg-blue-700/50 text-blue-100 rounded-full border border-blue-500/30">Git/GitHub</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transition vers l'atmosphère */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 z-10"
        style={{ 
          background: 'linear-gradient(to bottom, transparent, rgba(75, 108, 183, 0.5))'
        }}
      ></div>
    </section>
  );
} 