import React, { useState, useEffect, useRef } from 'react';
import { timelineEvents } from '../constants';

const Timeline: React.FC = () => {
  const [parallaxY, setParallaxY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInView) {
          const speed = 0.1; // Reduced speed for a more subtle effect
          const movement = (window.innerHeight / 2 - (rect.top + rect.height / 2)) * speed;
          setParallaxY(movement);
        }
      }
    };

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mediaQuery.matches) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (!mediaQuery.matches) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <section id="timeline" className="py-20 bg-white/5" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Our Highlights</h2>
        <div className="relative max-w-sm mx-auto md:max-w-3xl">
          {/* The line */}
          <div 
            className="absolute top-4 bottom-4 left-4 md:left-1/2 w-0.5 bg-pink-300/30" 
            aria-hidden="true"
            style={{ 
              transform: `translateX(-50%) translateY(${parallaxY}px)`,
              willChange: 'transform'
            }}
          ></div>
          
          {/* Timeline items */}
          {timelineEvents.map((event, index) => (
            <div key={event.id} className="relative mb-12">
              {/* The content card wrapper */}
              <div className={`
                ml-16 md:ml-0 
                md:flex 
                ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}
                items-center
              `}>
                <div className="md:w-1/2"></div> {/* This is the spacer for desktop */}
                <div className="md:w-1/2">
                  <div className={`bg-[var(--color-navy)] rounded-2xl shadow-xl p-6 border border-white/10`}>
                    <p className="mb-1 text-sm text-pink-300">{event.date}</p>
                    <h3 className="mb-2 font-bold text-xl">{event.title}</h3>
                    <p className="text-base leading-snug tracking-wide text-gray-300">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* The dot */}
              <div className="absolute z-20 flex items-center justify-center bg-pink-500 shadow-xl w-16 h-16 rounded-full top-1/2 -translate-y-1/2 left-4 md:left-1/2 -translate-x-1/2">
                <div className="mx-auto text-white">
                    {event.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;