'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function MobileSpaceSection() {
  const [stars, setStars] = useState<Array<{ x: number; y: number; size: number; opacity: number }>>([]);

  // Generate stars on component mount
  useEffect(() => {
    const newStars = Array.from({ length: 100 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.8 + 0.2
    }));
    setStars(newStars);
  }, []);

  return (
    <div
      className="relative h-screen w-full bg-black overflow-hidden section-container"
      id="home"
      style={{ height: '100vh', minHeight: '100vh' }}
    >
      {/* Star background */}
      <div className="absolute inset-0 z-0">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
        <h1 className="text-4xl font-bold text-white mb-4">
          KEVIN RAKOTONIAINA
        </h1>
        <p className="text-lg text-gray-300 max-w-xs tracking-widest">
          EXPLORATEUR DE L'UNIVERS NUMÉRIQUE
        </p>
        <div className="mt-8 h-px w-16 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
      </div>

      {/* About button - fixed position, ne fait plus rien */}
      <button
        className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-30 w-16 h-16 rounded-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, rgba(56,182,255,0.8) 0%, rgba(11,43,79,0.9) 100%)',
          boxShadow: '0 0 15px 5px rgba(0,191,255,0.5), inset 0 0 10px 2px rgba(255,255,255,0.4)',
          border: '2px solid rgba(136,220,255,0.6)'
        }}
        tabIndex={-1}
        aria-hidden="true"
        type="button"
        disabled
      >
        <Image
          src="/images/stuff/badge.png"
          alt="À propos"
          width={48}
          height={48}
          className="object-contain"
        />
      </button>

      {/* Transition gradient overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-5 opacity-90"
        style={{
          background: 'linear-gradient(to bottom, transparent, #0c164f)',
          boxShadow: '0 -10px 30px 30px rgba(12, 22, 79, 0.15)'
        }}
      ></div>
    </div>
  );
} 