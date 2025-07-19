import React from 'react';

const Footer = () => (
  <footer className="py-6 md:py-8 text-center text-accent2 text-sm bg-black/40">
    <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-2">
      <p className="bg-gradient-to-r from-accent to-accent2 text-transparent bg-clip-text text-base md:text-lg">&copy; {new Date().getFullYear()} Sdooodly. All rights reserved.</p>
      <p className="mt-1 text-xs md:text-sm">Built with <span className="text-accent">&hearts;</span> and React + Tailwind CSS.</p>
    </div>
  </footer>
);

export default Footer; 