import React, { useState, useEffect } from 'react';

const links = [
  { href: '#projects', label: 'Projects' },
  { href: '#blog', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
  { href: 'https://sdooodly.github.io/sdooworks/', label: 'Art', external: true },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-4 transition-all duration-500 ${visible ? 'bg-bg/90 backdrop-blur-md translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
      <a href="#about" className="font-serif text-xl text-text tracking-wide font-light">Sdooodly</a>
      <ul className="hidden md:flex gap-8 list-none">
        {links.map(l => (
          <li key={l.href}>
            <a href={l.href} {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="text-muted text-xs uppercase tracking-[0.12em] hover:text-accent transition-colors">{l.label}</a>
          </li>
        ))}
      </ul>
      <button className="md:hidden p-1" onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
        {open
          ? <svg className="w-6 h-6 text-text" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" /></svg>
          : <><span className="block w-6 h-px bg-text mb-1.5" /><span className="block w-6 h-px bg-text" /></>
        }
      </button>
      {open && (
        <div className="fixed inset-0 bg-bg/95 z-40 flex flex-col items-center justify-center gap-8 md:hidden animate-fadeIn">
          <button className="absolute top-5 right-6" onClick={() => setOpen(false)} aria-label="Close">
            <svg className="w-6 h-6 text-text" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          {links.map(l => (
            <a key={l.href} href={l.href} {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="text-text text-sm uppercase tracking-[0.12em] hover:text-accent transition-colors" onClick={() => setOpen(false)}>{l.label}</a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
