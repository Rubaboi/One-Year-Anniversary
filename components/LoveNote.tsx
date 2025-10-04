import React, { useState, useEffect, useRef } from 'react';

const LoveNote: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsVisible(true);
      return;
    }

    const currentRef = sectionRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(currentRef);
        }
      },
      { threshold: 0.3 } // Trigger when 30% of the element is visible
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, []);

  const message = `Thank you for the most incredible first year. I cherish every moment and I can't wait to see what the future holds for us. One year down, a lifetime to go.
I love you more than words can say.
With All My Heart`;

  // Split the message into words and whitespace to preserve formatting
  const messageParts = message.split(/(\s+)/);
  let wordCounter = 0;

  // Calculate delay for the signature to appear after the message
  const signatureDelay = (message.split(' ').length * 80) + 1200; // time per word + initial delay

  return (
    <section id="note" className="py-20 flex items-center justify-center" ref={sectionRef}>
      <style>{`
        .love-note-card {
          opacity: 0;
          transform: translateY(30px) scale(0.98);
          transition: opacity 1s cubic-bezier(0.19, 1, 0.22, 1) 0.2s, transform 1s cubic-bezier(0.19, 1, 0.22, 1) 0.2s;
        }

        .love-note-card.is-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        
        /* Staggered children animations */
        .fade-in-child {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s cubic-bezier(0.6, 0.04, 0.98, 0.335), transform 0.8s cubic-bezier(0.6, 0.04, 0.98, 0.335);
        }

        .is-visible .fade-in-child {
          opacity: 1;
          transform: translateY(0);
        }

        .word-reveal {
          display: inline-block;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .is-visible .word-reveal {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .love-note-card, .fade-in-child, .word-reveal {
            transition: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
      <div className={`container mx-auto px-4 max-w-3xl`}>
        <div className={`
          love-note-card text-center
          bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl
          shadow-2xl shadow-pink-500/10 p-8 md:p-12
          ${isVisible ? 'is-visible' : ''}
        `}>
          <div 
            className={`fade-in-child ${isVisible ? 'is-visible' : ''}`} 
            style={{ transitionDelay: '0.6s' }}
          >
            <svg className="mx-auto h-12 w-auto text-pink-300 mb-2" viewBox="0 0 162 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 15.5C1.5 15.5 15.5 2.5 40.5 5.5C65.5 8.5 103 -6.5 160.5 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </div>

          <h2 className={`
            text-3xl md:text-4xl font-bold mb-6 text-[var(--color-cream)] 
            fade-in-child ${isVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.8s' }}
          >
            To Many More Years...
          </h2>

          <div 
            className={`
              font-['Dancing_Script',_cursive] text-2xl md:text-3xl text-gray-200 
              leading-relaxed mb-8 whitespace-pre-line
              fade-in-child ${isVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '1s' }}
          >
            {messageParts.map((part, index) => {
              if (part.trim() !== '') {
                const currentWordIndex = wordCounter;
                wordCounter++;
                return (
                  <span
                    key={index}
                    className="word-reveal"
                    style={{ transitionDelay: `${currentWordIndex * 80}ms` }}
                  >
                    {part}
                  </span>
                );
              }
              return <React.Fragment key={index}>{part}</React.Fragment>;
            })}
          </div>

          <p 
            className={`
              font-['Dancing_Script',_cursive] text-3xl md:text-4xl italic text-pink-300
              fade-in-child ${isVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: `${signatureDelay}ms`}}
          >
            -Your Tajwar&lt;3
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoveNote;