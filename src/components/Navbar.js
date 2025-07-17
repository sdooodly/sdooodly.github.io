import React from 'react';

const Navbar = () => (
  <nav className="bg-primary p-4 shadow-lg sticky top-0 z-50">
    <div className="container mx-auto flex justify-between items-center flex-wrap">
      <a href="#home" className="text-2xl font-bold text-accent rounded-lg p-2 hover:text-secondary transition-colors">
        Sdooodly
      </a>
      <div className="flex space-x-4 mt-2 md:mt-0">
        <a href="#about" className="text-accent hover:text-accent/80 px-3 py-2 rounded-md text-sm font-medium transition-colors">About</a>
        <a href="#projects" className="text-accent hover:text-accent/80 px-3 py-2 rounded-md text-sm font-medium transition-colors">Projects</a>
        <a href="#skills" className="text-accent hover:text-accent/80 px-3 py-2 rounded-md text-sm font-medium transition-colors">Skills</a>
        <a href="#contact" className="text-accent hover:text-accent/80 px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</a>
      </div>
    </div>
  </nav>
);

export default Navbar; 