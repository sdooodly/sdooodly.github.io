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

const EXTERNAL_LINK = { href: 'https://sdooodly.github.io/sdooworks/', label: 'Art' };
const NAV_BASE = "px-3 py-2 rounded-md text-xs uppercase tracking-[0.12em] font-medium transition-colors cursor-pointer";
const MOBILE_BASE = "px-4 py-3 rounded-md text-sm uppercase tracking-[0.12em] font-medium transition-colors w-full text-center cursor-pointer";

const Navbar = ({ tabs, activeTab, onTabChange }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="py-2 px-4 fixed top-0 w-full z-50 border-b border-accent2/30 bg-black/70 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center flex-wrap relative">
        <button
          onClick={() => onTabChange('about')}
          className="font-bold bg-gradient-to-r from-accent to-accent2 text-transparent bg-clip-text rounded-lg p-1 transition-colors drop-shadow-[0_2px_16px_#00E0FF] text-lg md:text-2xl"
        >
          Sdooodly
        </button>

        {/* Desktop */}
        <div className="hidden md:flex flex-nowrap space-x-2 lg:space-x-4 items-center">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => onTabChange(t.key)}
              className={`${NAV_BASE} ${activeTab === t.key ? 'text-gold border-b-2 border-gold' : 'text-accent2/70 hover:text-gold'}`}
            >
              {t.label}
            </button>
          ))}
          <a href={EXTERNAL_LINK.href} target="_blank" rel="noopener noreferrer" className={`${NAV_BASE} text-accent2/70 hover:text-gold`}>
            {EXTERNAL_LINK.label}
          </a>
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center md:hidden">
          <button
            className="flex items-center p-2 focus:outline-none"
            onClick={() => setMenuOpen(m => !m)}
            aria-label="Toggle navigation menu"
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <>
            <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setMenuOpen(false)} />
            <div className="absolute top-full left-0 w-full shadow-2xl flex flex-col items-center py-4 md:hidden animate-fadeIn z-50" style={{overflow: 'hidden'}}>
              <div className="absolute inset-0 w-full h-full bg-black/70 backdrop-blur-xl z-0" />
              <div className="relative z-10 w-full flex flex-col items-center">
                {tabs.map(t => (
                  <button
                    key={t.key}
                    onClick={() => { onTabChange(t.key); setMenuOpen(false); }}
                    className={`${MOBILE_BASE} ${activeTab === t.key ? 'text-gold' : 'text-white hover:text-gold'}`}
                  >
                    {t.label}
                  </button>
                ))}
                <a
                  href={EXTERNAL_LINK.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${MOBILE_BASE} text-white hover:text-gold`}
                  onClick={() => setMenuOpen(false)}
                >
                  Art
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
