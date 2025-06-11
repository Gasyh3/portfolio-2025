'use client';

import React, { useState, useEffect } from 'react';
import { Header } from './Header';

interface MobileLayoutProps {
  children: React.ReactNode;
}

export function MobileLayout({ children }: MobileLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const sections = React.Children.toArray(children);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left' && currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1);
    } else if (direction === 'right' && currentSection > 0) {
      setCurrentSection(prev => prev - 1);
    }
  };

  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > 50) {
        handleSwipe(diff > 0 ? 'left' : 'right');
      }
    };

    if (isMobile) {
      document.addEventListener('touchstart', handleTouchStart);
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile, currentSection]);

  if (!isMobile) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 flex flex-col bg-black overflow-hidden">
      <Header />
      <main className="flex-1 relative">
        <div
          className="absolute inset-0 transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentSection * 100}%)` }}
        >
          {sections.map((section, index) => (
            <div
              key={index}
              className="absolute inset-0 w-full h-full"
              style={{ left: `${index * 100}%` }}
            >
              {section}
            </div>
          ))}
        </div>
      </main>
      <div className="flex justify-center space-x-2 py-4 bg-black/50">
        {sections.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              currentSection === index ? 'bg-white' : 'bg-white/30'
            }`}
            onClick={() => setCurrentSection(index)}
          />
        ))}
      </div>
    </div>
  );
} 