import React from 'react';

const SunIcon = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 7.07l-1.41-1.41M6.34 6.34L4.93 4.93m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41"/></svg>
);
const MoonIcon = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>
);

const Navbar = () => (
  <nav className="py-0.5 px-3 shadow-neon fixed top-0 w-full z-50 border-b border-accent2 bg-black/40">
    <div className="container mx-auto flex justify-between items-center flex-wrap">
      <a href="#home" className="font-bold bg-gradient-to-r from-accent to-accent2 text-transparent bg-clip-text rounded-lg p-1 hover:text-accent2 transition-colors drop-shadow-[0_2px_16px_#00E0FF] text-lg md:text-2xl md:block hidden">
        Sdooodly
      </a>
      <a href="#home" className="font-bold bg-gradient-to-r from-accent to-accent2 text-transparent bg-clip-text rounded-lg p-1 hover:text-accent2 transition-colors drop-shadow-[0_2px_16px_#00E0FF] text-base md:hidden block">
        Sdooodly
      </a>
      <div className="flex flex-nowrap space-x-2 md:space-x-4 items-center overflow-x-auto">
        <a href="#about" className="text-accent2 hover:text-accent px-2 py-1 rounded-md text-sm font-medium transition-colors">About</a>
        <a href="#skills" className="text-accent2 hover:text-accent px-2 py-1 rounded-md text-sm font-medium transition-colors">Skills</a>
        <a href="#projects" className="text-accent2 hover:text-accent px-2 py-1 rounded-md text-sm font-medium transition-colors">Projects</a>
        <a href="#roadmap" className="text-accent2 hover:text-accent px-2 py-1 rounded-md text-sm font-medium transition-colors">Roadmap</a>
        <a href="#blog" className="text-accent2 hover:text-accent px-2 py-1 rounded-md text-sm font-medium transition-colors">Blog</a>
        <a href="#contact" className="text-accent2 hover:text-accent px-2 py-1 rounded-md text-sm font-medium transition-colors">Contact</a>
      </div>
    </div>
  </nav>
);

export default Navbar; 