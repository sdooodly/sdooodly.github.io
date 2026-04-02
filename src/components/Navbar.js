import React, { useState } from 'react';

const HamburgerIcon = ({ open }) => (
  <svg className="w-8 h-8 text-accent2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    {open ? (
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
    )}
  </svg>
);

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
  { href: '#goodreads', label: 'Goodreads' },
  { href: '#blog', label: 'Blog' },
  { href: 'https://sdooodly.github.io/sdooworks/', label: 'Art', external: true },
  { href: '#terminal', label: 'Terminal' },
];

const NAV_LINK_CLASS = "text-accent2 hover:text-gold px-3 py-2 rounded-md text-xs uppercase tracking-[0.12em] font-medium transition-colors";
const MOBILE_LINK_CLASS = "text-white hover:text-gold px-4 py-3 rounded-md text-sm uppercase tracking-[0.12em] font-medium transition-colors w-full text-center";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="py-2 px-4 shadow-neon fixed top-0 w-full z-50 border-b border-accent2 bg-black/60 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center flex-wrap relative">
        <a href="#home" className="font-bold bg-gradient-to-r from-accent to-accent2 text-transparent bg-clip-text rounded-lg p-1 hover:text-accent2 transition-colors drop-shadow-[0_2px_16px_#00E0FF] text-lg md:text-2xl md:block hidden">
          Sdooodly
        </a>
        <a href="#home" className="font-bold bg-gradient-to-r from-accent to-accent2 text-transparent bg-clip-text rounded-lg p-1 hover:text-accent2 transition-colors drop-shadow-[0_2px_16px_#00E0FF] text-base md:hidden block">
          Sdooodly
        </a>
        <div className="hidden md:flex flex-nowrap space-x-4 lg:space-x-8 items-center overflow-x-auto">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className={NAV_LINK_CLASS}
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" className={NAV_LINK_CLASS}>Contact</a>
        </div>
        <div className="flex items-center md:hidden gap-2">
          <a href="#contact" className="hover:text-gold px-2 py-1 rounded-md transition-colors" aria-label="Contact">
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
        {menuOpen && (
          <>
            <div className="fixed inset-0 bg-black/60 z-40 md:hidden" style={{pointerEvents: 'auto'}} onClick={() => setMenuOpen(false)} />
            <div className="absolute top-full left-0 w-full shadow-2xl flex flex-col items-center py-4 md:hidden animate-fadeIn z-50" style={{overflow: 'hidden'}}>
              <div className="absolute inset-0 w-full h-full bg-black/70 backdrop-blur-xl z-0" />
              <div className="relative z-10 w-full flex flex-col items-center">
                {navLinks.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className={MOBILE_LINK_CLASS}
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
    </nav>
  );
};

export default Navbar;
