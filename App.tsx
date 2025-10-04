
import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Stories from './components/Stories';
import Timeline from './components/Timeline';
import LoveNote from './components/LoveNote';
import Footer from './components/Footer';
import Lightbox from './components/Lightbox';
import { stories } from './constants';

const App: React.FC = () => {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const openLightbox = (index: number) => {
        setLightboxIndex(index);
    };

    const closeLightbox = () => {
        setLightboxIndex(null);
    };

    const goToNext = () => {
        if (lightboxIndex !== null) {
            setLightboxIndex((prevIndex) => (prevIndex! + 1) % stories.length);
        }
    };

    const goToPrev = () => {
        if (lightboxIndex !== null) {
            setLightboxIndex((prevIndex) => (prevIndex! - 1 + stories.length) % stories.length);
        }
    };
    
    // Add a subtle animated gradient background
    const AnimatedBackground: React.FC = () => (
      <div className="fixed inset-0 z-[-1] overflow-hidden">
        <style>{`
          @keyframes gradient-animation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animated-gradient {
            width: 200%;
            height: 200%;
            background: linear-gradient(-45deg, var(--color-navy), var(--color-pink-start), var(--color-navy), var(--color-pink-end));
            background-size: 400% 400%;
            animation: gradient-animation 30s ease infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .animated-gradient {
              animation: none;
            }
          }
        `}</style>
        <div className="animated-gradient"></div>
      </div>
    );

    return (
        <>
            <AnimatedBackground />
            <main className="relative z-10">
                <Hero />
                <Stories onImageClick={openLightbox} />
                <Timeline />
                <LoveNote />
                <Footer />
            </main>
            
            {lightboxIndex !== null && (
                <Lightbox
                    stories={stories}
                    currentIndex={lightboxIndex}
                    onClose={closeLightbox}
                    onPrev={goToPrev}
                    onNext={goToNext}
                />
            )}
        </>
    );
};

export default App;
