import React, { useState, useEffect, useRef, useCallback } from 'react';
import { stories } from '../constants';

interface StoriesProps {
    onImageClick: (index: number) => void;
}

const getSlidesPerView = () => {
    if (typeof window === 'undefined') return 1;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
};

const Stories: React.FC<StoriesProps> = ({ onImageClick }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView());
    const timeoutRef = useRef<number | null>(null);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    useEffect(() => {
        const handleResize = () => {
            setSlidesPerView(getSlidesPerView());
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxIndex = stories.length > slidesPerView ? stories.length - slidesPerView : 0;
    
    useEffect(() => {
        if (currentIndex > maxIndex) {
            setCurrentIndex(maxIndex);
        }
    }, [currentIndex, maxIndex]);

    const resetTimeout = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }, []);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
    }, [maxIndex]);

    useEffect(() => {
        resetTimeout();
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (!isPaused && stories.length > slidesPerView && !mediaQuery.matches) {
            timeoutRef.current = window.setTimeout(() => {
                nextSlide();
            }, 3000);
        }
        return () => {
            resetTimeout();
        };
    }, [currentIndex, isPaused, resetTimeout, nextSlide, slidesPerView]);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? maxIndex : prevIndex - 1));
    };
    
    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(Math.min(slideIndex, maxIndex));
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.targetTouches[0].clientX;
    };
    
    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };
    
    const handleTouchEnd = () => {
        if (touchStartX.current - touchEndX.current > 50) {
            nextSlide();
        }
    
        if (touchStartX.current - touchEndX.current < -50) {
            prevSlide();
        }
    };

    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => setIsPaused(false);

    return (
        <section id="stories" className="py-20 bg-transparent">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Story in Pictures</h2>
                <p className="max-w-3xl mx-auto text-lg text-gray-300 mb-12">
                    A collection of moments from our incredible year together.
                </p>
                <div 
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div
                        className="overflow-hidden"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div
                            className="flex transition-transform ease-in-out duration-500"
                            style={{ transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)` }}
                        >
                            {stories.map((story, index) => (
                                <div 
                                    key={story.id} 
                                    className="flex-shrink-0 px-2 box-border"
                                    style={{ width: `${100 / slidesPerView}%` }}
                                >
                                    <figure
                                        onClick={() => onImageClick(index)}
                                        className="cursor-pointer relative group aspect-video w-full"
                                        aria-label={`View image: ${story.caption}`}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onImageClick(index)}
                                    >
                                        <img
                                            src={story.imageUrl}
                                            srcSet={story.imageSrcSet}
                                            sizes={
                                                slidesPerView === 1 ? '100vw' :
                                                slidesPerView === 2 ? '50vw' : '33vw'
                                            }
                                            alt={story.caption}
                                            className="w-full h-full object-cover rounded-2xl shadow-2xl"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 rounded-2xl flex items-end p-4 md:p-6">
                                            <div>
                                                <p className="text-white text-lg md:text-xl font-bold">{story.caption}</p>
                                                {story.date && <p className="text-white/80 text-sm">{story.date}</p>}
                                            </div>
                                        </div>
                                    </figure>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Arrows */}
                    {stories.length > slidesPerView && (
                        <>
                            <button onClick={prevSlide} className="absolute top-1/2 left-0 md:-left-4 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors text-white z-10" aria-label="Previous slide">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            <button onClick={nextSlide} className="absolute top-1/2 right-0 md:-right-4 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors text-white z-10" aria-label="Next slide">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </>
                    )}
                    {/* Dot Navigation */}
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
                        {stories.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all ${
                                    index >= currentIndex && index < currentIndex + slidesPerView 
                                    ? 'bg-white scale-125' 
                                    : 'bg-white/50'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Stories;
