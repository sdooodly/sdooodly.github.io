import React, { useState } from 'react';

const SunIcon = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 7.07l-1.41-1.41M6.34 6.34L4.93 4.93m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41"/></svg>
);
const MoonIcon = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>
);
const HamburgerIcon = ({ open }) => (
  <svg className="w-8 h-8 text-accent2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    {open ? (
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
    )}
  </svg>
);

// Mail/Envelope icon for contact
const MailIcon = () => (
  <svg className="w-7 h-7 text-accent2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#roadmap', label: 'Roadmap' },
  { href: '#blog', label: 'Blog' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="py-0.5 px-3 shadow-neon fixed top-0 w-full z-50 border-b border-accent2 bg-black/50 backdrop-blur-md">
      <div className="container mx-auto flex justify-between items-center flex-wrap relative">
        <a href="#home" className="font-bold bg-gradient-to-r from-accent to-accent2 text-transparent bg-clip-text rounded-lg p-1 hover:text-accent2 transition-colors drop-shadow-[0_2px_16px_#00E0FF] text-lg md:text-2xl md:block hidden">
          Sdooodly
        </a>
        <a href="#home" className="font-bold bg-gradient-to-r from-accent to-accent2 text-transparent bg-clip-text rounded-lg p-1 hover:text-accent2 transition-colors drop-shadow-[0_2px_16px_#00E0FF] text-base md:hidden block">
          Sdooodly
        </a>
        {/* Desktop nav */}
        <div className="hidden md:flex flex-nowrap space-x-2 md:space-x-4 items-center overflow-x-auto">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} className="text-accent2 hover:text-accent px-2 py-1 rounded-md text-sm font-medium transition-colors">
              {link.label}
            </a>
          ))}
          <a href="#contact" className="text-accent2 hover:text-accent px-2 py-1 rounded-md text-sm font-medium transition-colors">Contact</a>
        </div>
        {/* Hamburger for mobile and Contact button */}
        <div className="flex items-center md:hidden">
          <a href="#contact" className="hover:text-accent px-2 py-1 rounded-md transition-colors mr-2" aria-label="Contact">
            <MailIcon />
          </a>
          <button
            className="flex items-center p-2 focus:outline-none"
            onClick={() => setMenuOpen(m => !m)}
            aria-label="Toggle navigation menu"
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
        {/* Mobile dropdown menu */}
        {menuOpen && (
          <>
            {/* Overlay to dim the page */}
            <div className="fixed inset-0 bg-black/60 z-40 md:hidden" style={{pointerEvents: 'auto'}} onClick={() => setMenuOpen(false)} />
            <div className="absolute top-full left-0 w-full shadow-2xl flex flex-col items-center py-4 md:hidden animate-fadeIn z-50" style={{overflow: 'hidden'}}>
              {/* Blurry dark layer for contrast */}
              <div className="absolute inset-0 w-full h-full bg-black/70 backdrop-blur-xl z-0" />
              <div className="relative z-10 w-full flex flex-col items-center">
                {navLinks.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-white hover:text-accent px-4 py-2 rounded-md text-base font-medium transition-colors w-full text-center"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: none; } }
        .animate-fadeIn { animation: fadeIn 0.2s ease; }
      `}</style>
    </nav>
  );
};

export default Navbar; 