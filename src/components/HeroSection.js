import React from 'react';
import { socialLinks } from '../constants/socialLinks';
import profileImg from '../assets/gaya.png';

const HeroSection = () => (
  <section id="about" className="relative min-h-screen flex flex-col justify-center items-center text-center px-6">
    <div className="animate-fadeUp">
      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border border-white/10 mb-10 mx-auto">
        <img src={profileImg} alt="Sdooodly" className="w-full h-full object-cover" />
      </div>
      <h1 className="text-6xl md:text-8xl font-serif font-light mb-4 text-text leading-none">Sdooodly</h1>
      <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-muted mb-10 font-light">
        Developer · System Designer · Builder
      </p>
      <p className="max-w-md mx-auto text-muted/80 text-sm leading-relaxed mb-12">
        From structural blueprints to architecting digital foundations on Linux, I build things that work.
      </p>
      <div className="flex justify-center gap-6 mb-16">
        {socialLinks.map(link => (
          <a key={link.name} href={link.url} target={link.url.startsWith('mailto:') ? undefined : '_blank'} rel={link.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'} className="text-muted/50 hover:text-accent transition-colors" aria-label={link.name}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d={link.icon} /></svg>
          </a>
        ))}
      </div>
    </div>
    <a href="#projects" className="absolute bottom-10 flex flex-col items-center gap-2 text-muted/40 hover:text-accent transition-colors group">
      <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
      <span className="block w-px h-8 bg-current group-hover:h-12 transition-all duration-300" />
    </a>
  </section>
);

export default HeroSection;
