import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    // Check for prefers-reduced-motion before applying parallax effect
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mediaQuery.matches) {
       const headerHeight = document.querySelector('header')?.clientHeight || 0;
      // Only apply effect when hero is in view
      if (window.pageYOffset <= headerHeight) {
        setOffsetY(window.pageYOffset);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Calculate opacity for fade-out effect, ensuring it doesn't go below 0
  const contentOpacity = Math.max(0, 1 - offsetY / 400);

  return (
    <header className="relative h-screen min-h-[550px] flex items-center justify-center text-center text-[var(--color-cream)] overflow-hidden">
      <style>{`
        /* --- Animation Enhancements --- */

        /* Keyframes for a staggered fade-in effect on text elements */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Keyframes for a subtle pulse on the call-to-action buttons */
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        /* Base classes to apply animations */
        .animate-fade-in {
          opacity: 0; /* Start hidden */
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-button-pulse {
          animation: pulse 1.5s ease-in-out forwards;
        }
        
        /* Staggering animation delays */
        .delay-subheading { animation-delay: 0.3s; }
        .delay-buttons-container { animation-delay: 0.6s; }
        .delay-buttons-pulse { animation-delay: 1.2s; }
        
        /* Respect user's motion preferences */
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in,
          .animate-button-pulse,
          .parallax-effect {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat parallax-effect"
        style={{
          backgroundImage: `url(https://i.ibb.co/BVYDvQD0/Messenger-creation-3-E96-C518-E84-B-428-E-AC5-D-38-F710052659.jpg)`,
          transform: `translateY(${offsetY * 0.4}px) scale(${1 + offsetY / 5000})`,
          willChange: 'transform',
        }}
        aria-hidden="true"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/50" aria-hidden="true"></div>
      <div 
        className="relative z-10 p-4 parallax-effect"
        style={{
          transform: `translateY(${offsetY * 0.2}px)`,
          opacity: contentOpacity,
          willChange: 'transform, opacity',
        }}
      >
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight animate-fade-in"
        >
          One Year Together
        </h1>
        <p
          className="mt-4 text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto animate-fade-in delay-subheading"
        >
          A year of memories, laughter, and love.
        </p>
        <div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in delay-buttons-container"
        >
          <button
            onClick={() => scrollToSection('stories')}
            className="px-6 py-3 text-base sm:px-8 sm:text-lg font-semibold rounded-full bg-white/20 backdrop-blur-sm text-[var(--color-cream)] border border-white/30 hover:bg-white/30 transition-transform duration-300 transform hover:scale-105 shadow-lg animate-button-pulse delay-buttons-pulse"
          >
            Our Story
          </button>
          <button
            onClick={() => scrollToSection('note')}
            className="px-6 py-3 text-base sm:px-8 sm:text-lg font-semibold rounded-full bg-pink-500/80 backdrop-blur-sm text-white border border-pink-400 hover:bg-pink-500 transition-transform duration-300 transform hover:scale-105 shadow-lg animate-button-pulse delay-buttons-pulse"
          >
            Message from Tajwar
          </button>
        </div>
      </div>
    </header>
  );
};

export default Hero;