import React from 'react';

const Footer = () => (
  <footer className="py-3 text-center text-accent2 text-sm bg-black/40">
    <div className="container mx-auto px-4">
      <p className="bg-gradient-to-r from-accent to-accent2 text-transparent bg-clip-text">&copy; {new Date().getFullYear()} Sdooodly. All rights reserved.</p>
      <p className="mt-1">Built with <span className="text-accent">&hearts;</span> and React + Tailwind CSS.</p>
    </div>
  </footer>
);

export default Footer; 