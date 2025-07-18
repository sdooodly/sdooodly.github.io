import React, { useRef, useEffect, useState } from 'react';

const roadmapIcon = (
  <svg className="w-8 h-8 text-accent2 drop-shadow-[0_0_8px_rgba(0,224,255,0.4)]" fill="none" viewBox="0 0 32 32">
    <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="16" cy="16" r="2" fill="currentColor" fillOpacity="0.7" />
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </svg>
);

const roadmap = [
  {
    period: '2014 - 2018',
    role: 'B.E. Civil Engineering',
    org: 'LBS Institute of Technology',
    icon: roadmapIcon,
  },
  {
    period: '2020 - 2022',
    role: 'M.E Infrastructure Engineering',
    org: 'BITS Pilani',
    icon: roadmapIcon,
  },
  {
    period: 'Jan 2022 - Jun 2022',
    role: 'Software Engineer Intern',
    org: 'Arup',
    icon: roadmapIcon,
  },
  {
    period: 'Jun 2022 - Jan 2025',
    role: 'Software Engineer',
    org: 'Arup',
    icon: roadmapIcon,
  },
  {
    period: 'Feb 2025 - Present',
    role: 'Member of Technical Staff II',
    org: 'Nielsen',
    icon: roadmapIcon,
  },
];

// Parallax/floating shapes
const ParallaxShapes = () => (
  <>
    <div className="absolute top-10 left-10 w-24 h-24 bg-accent2/10 rounded-full blur-2xl animate-float1" />
    <div className="absolute bottom-10 right-10 w-32 h-32 bg-accent3/10 rounded-full blur-2xl animate-float2" />
    <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent/10 rounded-full blur-2xl animate-float3" />
  </>
);

const RoadmapSection = () => {
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(Array(roadmap.length).fill(false));
  const [lineHeight, setLineHeight] = useState(0);

  // Intersection Observer for reveal
  useEffect(() => {
    const items = document.querySelectorAll('.timeline-item');
    const observer = new window.IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-idx'));
            setVisible(v => {
              const copy = [...v];
              copy[idx] = true;
              return copy;
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    items.forEach(item => observer.observe(item));
    return () => items.forEach(item => observer.unobserve(item));
  }, []);

  // Animate vertical line grow
  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const winH = window.innerHeight;
      // Calculate how much of the section is visible, but allow line to reach 100% at the bottom
      const scrollY = window.scrollY || window.pageYOffset;
      const sectionTop = rect.top + scrollY;
      const sectionHeight = rect.height;
      const windowBottom = scrollY + winH;
      let percent = (windowBottom - sectionTop) / (sectionHeight * 1.4); // slower line
      percent = Math.max(0, Math.min(percent, 1));
      setLineHeight(percent * 100);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="roadmap" className="py-16 md:py-24 relative overflow-visible" ref={containerRef}>
      <div className="relative z-10 bg-glass/80 backdrop-blur-glass shadow-lg rounded-3xl p-8 md:p-16 max-w-3xl mx-auto overflow-visible">
        <ParallaxShapes />
        <h2 className="text-3xl md:text-4xl font-bold mb-14 md:mb-16 text-center text-text/90 font-inter" style={{textShadow: '0 2px 8px rgba(0,224,255,0.12)'}}>Roadmap</h2>
        {/* Mobile: Card-based layout */}
        <div className="relative flex flex-col gap-8 md:hidden">
          {/* Animated vertical line with moving circle on the left */}
          <div className="absolute left-4 top-0 h-full w-1 bg-gradient-to-b from-accent2/80 to-accent3/40 rounded-full z-10 overflow-hidden">
            <div
              className="absolute left-0 top-0 w-full bg-gradient-to-b from-accent2 to-accent3 rounded-full transition-all duration-200"
              style={{ height: `${lineHeight}%`, minHeight: 40, maxHeight: '100%' }}
            />
            {/* Moving accent circle at the tip */}
            <div
              className="absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-accent2 rounded-full border-4 border-background shadow-lg transition-all duration-200"
              style={{ top: `calc(${lineHeight}% - 12px)` }}
            />
          </div>
          {roadmap.map((item, i) => (
            <div key={i} className="relative flex items-start bg-black/30 rounded-xl shadow-lg border border-accent2/30 pl-4 pr-4 py-6">
              {/* Removed accent bar and dot */}
              <div className="flex flex-col pl-6 w-full">
                <div className="text-accent2 font-semibold text-base mb-1">{item.period}</div>
                <div className="text-lg font-bold text-text/90 mb-1 font-inter">{item.role}</div>
                <div className="text-text/70 text-base font-medium mb-2">{item.org}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Desktop: Original timeline */}
        <div className="relative flex-col items-center hidden md:flex">
          {/* Glowy threads behind desktop timeline */}
          {[...Array(40)].map((_, idx) => (
            <svg
              key={idx}
              className="absolute top-0 h-full w-2 pointer-events-none z-0"
              style={{
                left: `calc(50% + ${(idx - 20) * 3}px)`,
                filter: 'drop-shadow(0 0 16px #fff) drop-shadow(0 0 8px #fff)',
                opacity: 0.13 + 0.09 * Math.abs(Math.sin(idx)),
              }}
              viewBox="0 0 4 1200"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 0 Q4 60 2 120 Q0 180 2 240 Q4 300 2 360 Q0 420 2 480 Q4 540 2 600 Q0 660 2 720 Q4 780 2 840 Q0 900 2 960 Q4 1020 2 1080 Q0 1140 2 1200"
                stroke="white"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="1"
              />
            </svg>
          ))}
          {/* Animated vertical line (desktop only) */}
          <div className="absolute left-1/2 top-0 h-full w-2 bg-gradient-to-b from-accent2/80 to-accent3/40 rounded-full -translate-x-1/2 z-10 overflow-hidden">
            <div
              className="absolute left-0 top-0 w-full bg-gradient-to-b from-accent2 to-accent3 rounded-full transition-all duration-200"
              style={{ height: `${lineHeight}%`, minHeight: 40, maxHeight: '100%' }}
            />
          </div>
          <ol className="relative z-10 w-full space-y-20 md:space-y-24">
            {roadmap.map((item, i) => {
              const isCurrent = i === roadmap.length - 1;
              return (
                <li
                  key={i}
                  data-idx={i}
                  className="timeline-item group w-full relative md:min-h-[120px] min-h-[100px]"
                >
                  {/* Desktop: alternating content sides, centered dot */}
                  <div className="hidden md:flex w-full items-center relative">
                    {/* Left content */}
                    <div className={`w-1/2 pr-8 flex flex-col items-end text-right ${i % 2 === 0 ? '' : 'opacity-0 pointer-events-none'}`}
                         style={{zIndex: 1}}>
                      <div className="text-accent2 font-semibold text-base md:text-lg mb-1">{item.period}</div>
                      <div className="text-lg md:text-xl font-bold text-text/90 mb-1 font-inter md:whitespace-nowrap">{item.role}</div>
                      <div className="text-text/70 text-base md:text-lg font-medium mb-2">{item.org}</div>
                    </div>
                    {/* Centered dot: remove extra outline for last item */}
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 flex flex-col items-center z-10" style={{marginBottom: 0}}>
                      <div className={`bg-background border-4 ${isCurrent ? 'border-accent2' : 'border-accent2'} rounded-full flex items-center justify-center shadow-lg mb-2 transition-all duration-200`}>
                        {item.icon}
                      </div>
                    </div>
                    {/* Right content */}
                    <div className={`w-1/2 pl-8 flex flex-col items-start text-left ${i % 2 !== 0 ? '' : 'opacity-0 pointer-events-none'}`}
                         style={{zIndex: 1}}>
                      <div className="text-accent2 font-semibold text-base md:text-lg mb-1">{item.period}</div>
                      <div className="text-lg md:text-xl font-bold text-text/90 mb-1 font-inter md:whitespace-nowrap">{item.role}</div>
                      <div className="text-text/70 text-base md:text-lg font-medium mb-2">{item.org}</div>
                    </div>
                  </div>
                  {/* Mobile: stacked content */}
                  <div className="md:hidden flex flex-col px-0 md:px-8 py-2 md:py-4 transition-all duration-200 text-center md:pl-0 pl-2 ml-auto mr-auto" style={{zIndex: 1}}>
                    <div className="text-accent2 font-semibold text-base md:text-lg mb-1">{item.period}</div>
                    <div className="text-lg md:text-xl font-bold text-text/90 mb-1 font-inter md:whitespace-nowrap">{item.role}</div>
                    <div className="text-text/70 text-base md:text-lg font-medium mb-2">{item.org}</div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
      {/* Parallax/floating shapes keyframes */}
      <style>{`
        @keyframes float1 { 0%{transform:translateY(0);} 50%{transform:translateY(-20px);} 100%{transform:translateY(0);} }
        @keyframes float2 { 0%{transform:translateY(0);} 50%{transform:translateY(20px);} 100%{transform:translateY(0);} }
        @keyframes float3 { 0%{transform:translateX(0);} 50%{transform:translateX(20px);} 100%{transform:translateX(0);} }
        .animate-float1 { animation: float1 7s ease-in-out infinite; }
        .animate-float2 { animation: float2 9s ease-in-out infinite; }
        .animate-float3 { animation: float3 11s ease-in-out infinite; }
        .animate-pulse-glow { box-shadow: 0 0 0 0 #00E0FF80, 0 0 16px 8px #FF2D9580; animation: pulseGlow 1.5s infinite alternate; }
        .animate-pulse-glow2 { animation: pulseGlow2 1.5s infinite alternate; }
        @keyframes pulseGlow { 0%{box-shadow:0 0 0 0 #00E0FF80,0 0 16px 8px #FF2D9580;} 100%{box-shadow:0 0 24px 12px #00E0FF40,0 0 32px 16px #FF2D9540;} }
        @keyframes pulseGlow2 { 0%{opacity:0.5;} 100%{opacity:1;} }
      `}</style>
    </section>
  );
};

export default RoadmapSection; 