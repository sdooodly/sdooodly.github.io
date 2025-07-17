import React from 'react';

const Footer = () => (
  <footer className="bg-primary py-8 text-center text-accent text-sm">
    <div className="container mx-auto px-4">
      <p>&copy; {new Date().getFullYear()} Sdooodly. All rights reserved.</p>
      <p className="mt-2">Built with <span className="text-accent">&hearts;</span> and React + Tailwind CSS.</p>
    </div>
  </footer>
);

export default Footer; 