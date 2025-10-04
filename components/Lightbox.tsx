import React, { useEffect, useRef } from 'react';
import type { Story } from '../types';

interface LightboxProps {
  stories: Story[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ stories, currentIndex, onClose, onPrev, onNext }) => {
  const currentStory = stories[currentIndex];
  const lightboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    // Focus trapping
    const focusableElements = lightboxRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements?.[0] as HTMLElement;
    const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement;
    
    firstElement?.focus();

    const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) { /* shift + tab */
                if (document.activeElement === firstElement) {
                    lastElement?.focus();
                    e.preventDefault();
                }
            } else { /* tab */
                if (document.activeElement === lastElement) {
                    firstElement?.focus();
                    e.preventDefault();
                }
            }
        }
    };

    const currentLightbox = lightboxRef.current;
    currentLightbox?.addEventListener('keydown', handleTabKey);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      currentLightbox?.removeEventListener('keydown', handleTabKey);
      document.body.style.overflow = 'auto';
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      ref={lightboxRef}
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-caption"
    >
      <div className="relative w-full max-w-4xl p-4" onClick={(e) => e.stopPropagation()}>
        <figure className="relative">
          <img
            src={currentStory.imageUrl}
            srcSet={currentStory.imageSrcSet}
            sizes="(min-width: 1024px) 1024px, 100vw"
            alt={currentStory.caption}
            className="w-full h-auto max-h-[85vh] object-contain rounded-2xl"
            loading="lazy"
          />
          <figcaption id="lightbox-caption" className="text-center text-white text-lg mt-4 px-4">
            {currentStory.caption} {currentStory.date && <span className="opacity-75">({currentStory.date})</span>}
          </figcaption>
        </figure>
      </div>

      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 text-white hover:text-pink-300 transition-colors rounded-full bg-black/50 p-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <button
        onClick={onPrev}
        aria-label="Previous image"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-pink-300 transition-colors rounded-full bg-black/50 p-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={onNext}
        aria-label="Next image"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-pink-300 transition-colors rounded-full bg-black/50 p-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Lightbox;