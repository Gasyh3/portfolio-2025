'use client';

import React from 'react';
import Link from 'next/link';

export default function HeaderMobile() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group">
          <span className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
            kevin.
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></span>
          </span>
        </Link>

      
      </div>
    </header>
  );
} 