'use client';

import React, { useState, useEffect } from 'react';

interface LoaderProps {
  onLoadingComplete: () => void;
}

export function Loader({ onLoadingComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Chargement des ressources...');

  useEffect(() => {
    // Simuler le chargement des ressources
    const resources = [
      'images',
      'animations',
      'polices',
      'composants',
      'styles'
    ];

    let currentResource = 0;
    const totalResources = resources.length;
    const interval = setInterval(() => {
      if (currentResource < totalResources) {
        const newProgress = Math.round(((currentResource + 1) / totalResources) * 100);
        setProgress(newProgress);
        setLoadingText(`Chargement de ${resources[currentResource]}...`);
        currentResource++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          onLoadingComplete();
        }, 500); // Petit délai pour une transition plus fluide
      }
    }, 800); // Intervalle entre chaque ressource

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
      <div className="relative w-64 h-64">
        {/* Cercle de progression */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Cercle de fond */}
          <circle
            className="text-gray-700"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
          />
          {/* Cercle de progression */}
          <circle
            className="text-white"
            strokeWidth="8"
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
            style={{
              strokeDasharray: `${2 * Math.PI * 40}`,
              strokeDashoffset: `${2 * Math.PI * 40 * (1 - progress / 100)}`,
              transform: 'rotate(-90deg)',
              transformOrigin: '50% 50%',
            }}
          />
        </svg>
        {/* Pourcentage au centre */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">{progress}%</span>
        </div>
      </div>
      {/* Texte de chargement */}
      <p className="mt-8 text-white text-lg font-light tracking-wider">
        {loadingText}
      </p>
      {/* Logo */}
      <div className="mt-8 text-white text-4xl font-bold tracking-wider">
        kevin.
        <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-xl"></span>
      </div>
    </div>
  );
} 