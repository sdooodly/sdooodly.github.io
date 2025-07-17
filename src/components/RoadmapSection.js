import React, { useRef, useEffect, useState } from 'react';

const roadmap = [
  {
    period: '2014 - 2018',
    role: 'Undergraduate in Civil Engineering',
    org: 'LBS Institute of Technology',
    icon: (
      <svg className="w-8 h-8 text-accent2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2v20m0 0l-4-4m4 4l4-4" /></svg>
    ),
  },
  {
    period: '2020 - 2022',
    role: 'M.E Infrastructure Engineering',
    org: 'BITS Pilani',
    icon: (
      <svg className="w-8 h-8 text-accent2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /></svg>
    ),
  },
  {
    period: 'Jan 2022 - Jun 2022',
    role: 'Software Engineer Intern',
    org: 'Arup',
    icon: (
      <svg className="w-8 h-8 text-accent2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" /></svg>
    ),
  },
  {
    period: 'Jun 2022 - Jan 2025',
    role: 'Software Engineer',
    org: 'Arup',
    icon: (
      <svg className="w-8 h-8 text-accent2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 0v10l6 3" /></svg>
    ),
  },
  {
    period: 'Feb 2025 - Present',
    role: 'Member of Technical Staff II',
    org: 'Nielsen',
    icon: (
      <svg className="w-8 h-8 text-accent2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2v20m0 0l4-4m-4 4l-4-4" /></svg>
    ),
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
      let percent = (windowBottom - sectionTop) / sectionHeight;
      percent = Math.max(0, Math.min(percent, 1));
      setLineHeight(percent * 100);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="roadmap" className="py-16 md:py-24 relative overflow-visible mt-20">
      <div className="relative z-10 bg-glass/80 backdrop-blur-glass shadow-lg rounded-3xl p-8 md:p-16 max-w-3xl mx-auto overflow-visible" ref={containerRef}>
        <ParallaxShapes />
        <h2 className="text-3xl md:text-4xl font-bold mb-10 md:mb-12 text-center text-text">Roadmap</h2>
        <div className="relative flex flex-col items-center">
          {/* Animated vertical line */}
          <div className="absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-accent2/60 to-accent3/30 rounded-full -translate-x-1/2 z-0 overflow-hidden">
            <div
              className="absolute left-0 top-0 w-full bg-gradient-to-b from-accent2 to-accent3 rounded-full transition-all duration-700"
              style={{ height: `${lineHeight}%`, minHeight: 40, maxHeight: '100%' }}
            />
          </div>
          <ol className="relative z-10 w-full space-y-20 md:space-y-24">
            {roadmap.map((item, i) => {
              const isLeft = i % 2 === 0;
              const isCurrent = i === roadmap.length - 1;
              return (
                <li
                  key={i}
                  data-idx={i}
                  className={`timeline-item group flex flex-col md:flex-row items-center w-full relative ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  style={{ minHeight: 100 }}
                >
                  {/* Icon and line */}
                  <div className="flex flex-col items-center md:w-1/2 md:justify-center md:items-end md:pr-8 md:pl-0 md:order-none order-2">
                    <div className={`relative z-10 bg-background border-4 ${isCurrent ? 'border-accent animate-pulse-glow' : 'border-accent2'} rounded-full flex items-center justify-center shadow-lg mb-2 transition-all duration-500`}>
                      {item.icon}
                      {isCurrent && <span className="absolute inset-0 rounded-full border-4 border-accent2/40 animate-pulse-glow2" />}
                    </div>
                  </div>
                  {/* Content */}
                  <div
                    className={`md:w-1/2 flex flex-col items-${isLeft ? 'start' : 'end'} md:items-${isLeft ? 'start' : 'end'} px-0 md:px-8 py-2 md:py-4 transition-all duration-700 ${visible[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${isLeft ? 'md:text-left' : 'md:text-right'} text-center`}
                  >
                    <div className="text-accent2 font-semibold text-base md:text-lg mb-1">{item.period}</div>
                    <div className="text-lg md:text-xl font-bold text-text mb-1">{item.role}</div>
                    <div className="text-text/70 text-sm md:text-base font-medium">{item.org}</div>
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