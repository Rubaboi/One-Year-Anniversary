
import React, { useState } from 'react';

// A simple confetti particle component
const ConfettiPiece: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
  <div className="absolute w-2 h-4" style={style}></div>
);

const Rsvp: React.FC = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle form submission here (e.g., send to an API)
    console.log({ name, message, fileName });
    setSubmitted(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000); // Confetti lasts 5 seconds
  };
  
  const confettiPieces = Array.from({ length: 100 }).map((_, i) => {
    const style: React.CSSProperties = {
      left: `${Math.random() * 100}%`,
      animation: `fall ${Math.random() * 2 + 3}s linear ${Math.random() * 5}s infinite`,
      backgroundColor: ['#ff8a8a', '#a269a2', '#f5f5dc', '#ffffff'][Math.floor(Math.random() * 4)],
      transform: `rotate(${Math.random() * 360}deg)`,
    };
    return <ConfettiPiece key={i} style={style} />;
  });

  return (
    <section id="rsvp" className="py-20 relative overflow-hidden">
       {showConfetti && (
         <div className="absolute inset-0 z-0 pointer-events-none">
            <style>{`
                @keyframes fall {
                    0% { top: -10%; opacity: 1; }
                    100% { top: 110%; opacity: 0; }
                }
            `}</style>
            {confettiPieces}
         </div>
       )}
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20">
          {submitted ? (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
              <p>Your beautiful message has been sent. We appreciate you celebrating with us!</p>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-center mb-2">Leave a Message</h2>
              <p className="text-center text-gray-300 mb-6">Share a memory or send your best wishes.</p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-200">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1 block w-full bg-white/10 border-white/20 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-pink-400 focus:border-pink-400"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-200">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="mt-1 block w-full bg-white/10 border-white/20 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-pink-400 focus:border-pink-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200">Share a Photo (Optional)</label>
                  <label htmlFor="file-upload" className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-white/30 border-dashed rounded-md cursor-pointer hover:border-pink-300">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-gray-400">
                        <p className="pl-1">{fileName || 'Upload a file or drag and drop'}</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                  </label>
                </div>
                <div className="text-center">
                  <button type="submit" className="w-full px-8 py-3 text-lg font-semibold rounded-full bg-pink-500/80 backdrop-blur-sm text-white border border-pink-400 hover:bg-pink-500 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Celebrate With Us!
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Rsvp;
