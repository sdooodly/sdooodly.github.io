import React from 'react';

const Footer = () => {
  const lastUpdated = new Date('2026-02-11').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <footer className="py-6 md:py-8 text-center text-accent2 text-sm bg-black/40">
      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-2">
        <p className="bg-gradient-to-r from-accent to-accent2 text-transparent bg-clip-text text-base md:text-lg"> All rights reserved.</p>
        <p className="mt-1 text-xs md:text-sm">Built with <span className="text-accent">&hearts;</span> and React + Tailwind CSS &copy; sdooodly.</p>
        <p className="mt-2 text-xs text-accent2/60">Last updated: {lastUpdated}</p>
      </div>
    </footer>
  );
};

export default Footer; 