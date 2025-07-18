import React, { useState } from 'react';
import { socialLinks } from '../constants/socialLinks';

const HeroSection = () => {
  const [circleHover, setCircleHover] = useState(false);
  return (
    <section id="about" className="container mx-auto px-4 py-20 text-center md:py-32 relative overflow-visible">
      {/* Glowy horizontal squiggly lines behind content */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {[...Array(8)].map((_, idx) => (
          <svg
            key={idx}
            className="absolute left-0 w-full h-8"
            style={{
              top: `${10 + idx * 12}%`,
              filter: 'drop-shadow(0 0 12px #fff) drop-shadow(0 0 6px #fff)',
              opacity: 0.13 + 0.09 * Math.abs(Math.sin(idx)),
            }}
            viewBox="0 0 1200 32"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M0 16 Q150 0 300 16 Q450 32 600 16 Q750 0 900 16 Q1050 32 1200 16"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="1"
            />
          </svg>
        ))}
      </div>
      <div className="relative z-10 bg-glass/80 backdrop-blur-glass border border-accent2 shadow-lg rounded-3xl p-10 md:p-20 flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="relative w-32 h-32 md:w-48 md:h-48 flex items-center justify-center">
          {/* Glowy concentric circles under profile image */}
          <svg
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-500 ${circleHover ? 'scale-110' : 'scale-100'} hidden md:block`}
            width="220" height="220" viewBox="0 0 220 220"
            style={{ zIndex: 1, filter: circleHover ? 'drop-shadow(0 0 48px #fff) drop-shadow(0 0 24px #fff)' : 'drop-shadow(0 0 24px #fff8)' }}
            onMouseEnter={() => setCircleHover(true)}
            onMouseLeave={() => setCircleHover(false)}
            aria-hidden="true"
          >
            <circle cx="110" cy="110" r="100" stroke="white" strokeWidth="3" opacity="0.28" />
            <circle cx="110" cy="110" r="70" stroke="white" strokeWidth="2.5" opacity="0.32" />
            <circle cx="110" cy="110" r="40" stroke="white" strokeWidth="2" opacity="0.38" />
            <circle cx="110" cy="110" r="16" fill="white" opacity="0.18" />
          </svg>
          {/* Smaller circle for mobile */}
          <svg
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-500 ${circleHover ? 'scale-110' : 'scale-100'} md:hidden`}
            width="120" height="120" viewBox="0 0 120 120"
            style={{ zIndex: 1, filter: circleHover ? 'drop-shadow(0 0 24px #fff) drop-shadow(0 0 12px #fff)' : 'drop-shadow(0 0 12px #fff8)' }}
            onMouseEnter={() => setCircleHover(true)}
            onMouseLeave={() => setCircleHover(false)}
            aria-hidden="true"
          >
            <circle cx="60" cy="60" r="52" stroke="white" strokeWidth="2.2" opacity="0.28" />
            <circle cx="60" cy="60" r="36" stroke="white" strokeWidth="1.7" opacity="0.32" />
            <circle cx="60" cy="60" r="20" stroke="white" strokeWidth="1.2" opacity="0.38" />
            <circle cx="60" cy="60" r="8" fill="white" opacity="0.18" />
          </svg>
          <div className="w-32 h-32 md:w-48 md:h-48 bg-accent2 rounded-full overflow-hidden shadow-xl border-4 border-accent relative z-10">
            <img
              src="/assets/flower.jpg"
              alt="Your Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="text-center md:text-left max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-semibold md:font-extrabold mb-6 leading-tight tracking-tight text-text/90 font-inter">
            Hi, I'm <span>Sdooodly</span>
          </h1>
          <p className="text-lg md:text-xl text-text/80 mb-10 leading-relaxed font-inter">
          From structural blueprints to architecting digital foundations on Linux, I like to build things that work. I'm obsessed with elegant system design, flowcharts that sing, and seamless integration!
          </p>
          {/* Social icons removed */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 