import React, { useState, useMemo, memo } from 'react';
import { socialLinks } from '../constants/socialLinks';
import { useIsMobile } from '../hooks/useMediaQuery';

const SVG_LINES = Array.from({ length: 8 }, (_, idx) => ({
  idx,
  top: `${10 + idx * 12}%`,
  opacity: 0.13 + 0.09 * Math.abs(Math.sin(idx)),
}));

const CircleSVG = memo(({ isMobile, isHovered, onMouseEnter, onMouseLeave }) => {
  const isDesktop = !isMobile;
  const size = isDesktop ? 220 : 120;
  const center = size / 2;
  
  const circleData = isDesktop
    ? [
        { r: 100, sw: 3, opacity: 0.28 },
        { r: 70, sw: 2.5, opacity: 0.32 },
        { r: 40, sw: 2, opacity: 0.38 },
      ]
    : [
        { r: 52, sw: 2.2, opacity: 0.28 },
        { r: 36, sw: 1.7, opacity: 0.32 },
        { r: 20, sw: 1.2, opacity: 0.38 },
      ];

  return (
    <svg
      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-500 ${
        isHovered ? 'scale-110' : 'scale-100'
      }`}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{
        zIndex: 1,
        filter: isHovered
          ? `drop-shadow(0 0 ${isDesktop ? 48 : 24}px #fff) drop-shadow(0 0 ${isDesktop ? 24 : 12}px #fff)`
          : `drop-shadow(0 0 ${isDesktop ? 24 : 12}px #fff8)`,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-hidden="true"
    >
      {circleData.map((circle, i) => (
        <circle
          key={i}
          cx={center}
          cy={center}
          r={circle.r}
          stroke="white"
          strokeWidth={circle.sw}
          opacity={circle.opacity}
          fill="none"
        />
      ))}
      <circle cx={center} cy={center} r={isDesktop ? 16 : 8} fill="white" opacity="0.18" />
    </svg>
  );
});

CircleSVG.displayName = 'CircleSVG';

const HeroSection = () => {
  const [circleHover, setCircleHover] = useState(false);
  const isMobile = useIsMobile();
  
  return (
    <section id="about" className="max-w-4xl lg:max-w-6xl mx-auto px-4 py-24 md:py-36 text-center md:text-left relative overflow-visible">
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {SVG_LINES.map(({ idx, top, opacity }) => (
          <svg
            key={idx}
            className="absolute left-0 w-full h-8"
            style={{
              top,
              filter: 'drop-shadow(0 0 12px #fff) drop-shadow(0 0 6px #fff)',
              opacity,
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
      <div className="relative z-10 bg-glass/80 backdrop-blur-glass border border-accent2 shadow-lg rounded-3xl p-8 md:p-16 lg:p-24 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
        <div className="relative w-32 h-32 md:w-48 md:h-48 flex items-center justify-center mb-8 md:mb-0">
          <CircleSVG 
            isMobile={isMobile}
            isHovered={circleHover}
            onMouseEnter={() => setCircleHover(true)}
            onMouseLeave={() => setCircleHover(false)}
          />
          <div className="w-32 h-32 md:w-48 md:h-48 bg-accent2 rounded-full overflow-hidden shadow-xl border-4 border-accent relative z-10">
            <img
              src="/assets/flower.jpg"
              alt="Your Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="text-center md:text-left max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold md:font-extrabold mb-8 leading-tight tracking-tight text-text/90 font-inter">
            Hi, I'm <span>Sdooodly</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-text/80 mb-12 leading-relaxed font-inter">
          From structural blueprints to architecting digital foundations on Linux, I like to build things that work. I'm obsessed with elegant system design, flowcharts that sing, and seamless integration!
          </p>
          {/* Social icons removed */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 