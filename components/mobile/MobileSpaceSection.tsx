'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { IconBrandGithub, IconBrandLinkedin, IconBrandX, IconMail } from '@tabler/icons-react';

const EMAIL = 'kevin.rakotoniaina@epitech.eu';

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/Gasyh3', Icon: IconBrandGithub },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rakoto-kevin/', Icon: IconBrandLinkedin },
  { label: 'Twitter', href: 'https://twitter.com/Gasyh3', Icon: IconBrandX },
];

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
    <div className="absolute inset-0 bg-black overflow-hidden">
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

      {/* Main content — espace réservé en haut pour le header et en bas pour le badge */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-6 pt-14 pb-40">
        <h1 className="text-2xl font-bold text-white mb-2 tracking-wide">
          KEVIN RAKOTONIAINA
        </h1>
        <p className="text-xs text-gray-300 max-w-xs tracking-widest">
          EXPLORATEUR DE L&apos;UNIVERS NUMÉRIQUE
        </p>
        <div className="mt-6 h-px w-16 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>

        {/* Réseaux */}
        <div className="mt-6 flex items-center gap-4">
          {SOCIAL_LINKS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-11 h-11 flex items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80 active:bg-white/15 active:text-white transition-colors"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        {/* E-mail */}
        <a
          href={`mailto:${EMAIL}`}
          className="mt-5 inline-flex items-center gap-2 max-w-full text-sm text-blue-200 active:text-white break-all"
        >
          <IconMail className="w-4 h-4 shrink-0" />
          {EMAIL}
        </a>
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