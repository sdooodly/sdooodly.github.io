import React from 'react';
import { socialLinks } from '../constants/socialLinks';
import profileImg from '../assets/gaya.png';

const HeroSection = () => (
  <section id="about" className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-20 animate-fadeUp">
    <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border border-white/10 mb-8 shadow-lg">
      <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
    </div>
    <h1 className="text-5xl md:text-7xl font-serif font-light mb-4 text-text">Sdooodly</h1>
    <p className="text-sm md:text-base uppercase tracking-[0.2em] text-muted mb-8 font-light">Developer · Designer · Builder</p>
    <p className="max-w-xl text-muted text-sm md:text-base leading-relaxed mb-10">
      From structural blueprints to architecting digital foundations on Linux, I build things that work. Obsessed with elegant system design, flowcharts that sing, and seamless integration.
    </p>
    <div className="flex gap-6">
      {socialLinks.map(link => (
        <a key={link.name} href={link.url} target={link.url.startsWith('mailto:') ? undefined : '_blank'} rel={link.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'} className="text-muted hover:text-accent transition-colors" aria-label={link.name}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d={link.icon} /></svg>
        </a>
      ))}
    </div>
    <div className="mt-16 animate-bounce">
      <span className="block w-5 h-8 border border-muted/40 rounded-full relative">
        <span className="absolute top-1.5 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-muted/50 rounded-full" />
      </span>
    </div>
  </section>
);

export default HeroSection;
