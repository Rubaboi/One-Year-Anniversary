
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/20 text-center py-8">
      <div className="container mx-auto px-4">
        <p className="text-2xl font-['Playfair_Display'] mb-4">Forever To Go</p>
        <div className="flex justify-center space-x-6 mb-4">
          {/* Replace # with your actual social media links */}
          <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
          </a>
        </div>
        <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Our Anniversary. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
