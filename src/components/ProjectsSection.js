import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { projects } from '../data/projects';

const getVisibleCount = () => {
  if (typeof window !== 'undefined') {
    if (window.innerWidth >= 1024) return 5;
    if (window.innerWidth >= 640) return 3;
    return 1;
  }
  return 1;
};

const PROJECT_DOTS = Array.from({ length: projects.length }, (_, i) => ({ idx: i }));

const AUTOPLAY_INTERVAL = 4000;
const SWIPE_DURATION = 600;
const DRAG_THRESHOLD = 60;

const ProjectsSection = () => {
  const [centerIdx, setCenterIdx] = useState(0);
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);
  const hoverRef = useRef(false);

  const dragStartX = useRef(null);
  const dragging = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = useCallback((auto = false) => {
    setAnimating(prev => {
      if (prev && !auto) return prev;
      setAnimating(true);
      setTimeout(() => {
        setCenterIdx(idx => (idx + 1) % projects.length);
        setAnimating(false);
      }, SWIPE_DURATION);
      return true;
    });
  }, []);

  // Autoplay logic with proper dependency array
  useEffect(() => {
    if (hoverRef.current) return;
    timerRef.current = setTimeout(() => {
      handleNext(true);
    }, AUTOPLAY_INTERVAL);
    return () => clearTimeout(timerRef.current);
  }, [centerIdx, handleNext]);

  const handlePrev = useCallback(() => {
    setAnimating(prev => {
      if (prev) return prev;
      setAnimating(true);
      setTimeout(() => {
        setCenterIdx(idx => (idx - 1 + projects.length) % projects.length);
        setAnimating(false);
      }, SWIPE_DURATION);
      return true;
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    hoverRef.current = true;
    clearTimeout(timerRef.current);
  }, []);

  const handleMouseLeave = useCallback(() => {
    hoverRef.current = false;
    timerRef.current = setTimeout(() => {
      handleNext(true);
    }, AUTOPLAY_INTERVAL);
  }, [handleNext]);

  const handleDragStart = useCallback(e => {
    if (animating) return;
    dragging.current = true;
    dragStartX.current = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
  }, [animating]);

  const handleDragMove = useCallback(e => {
    if (!dragging.current) return;
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const delta = clientX - dragStartX.current;
    if (Math.abs(delta) > DRAG_THRESHOLD) {
      dragging.current = false;
      if (delta < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  }, [handleNext, handlePrev]);

  const handleDragEnd = useCallback(() => {
    dragging.current = false;
  }, []);

  const half = Math.floor(visibleCount / 2);
  const getProjectAt = offset => {
    let idx = (centerIdx + offset + projects.length) % projects.length;
    return projects[idx];
  };
  const visibleProjects = Array.from({ length: visibleCount }, (_, i) => getProjectAt(i - half));

  const getCardStyle = idx => {
    const pos = idx - half;
    if (visibleCount === 1) {
      return 'z-20 scale-100 blur-0 opacity-100';
    }
    if (pos === 0) {
      return 'z-20 scale-100 blur-0 opacity-100';
    } else if (Math.abs(pos) === 1) {
      return 'z-10 scale-90 blur-sm opacity-80';
    } else if (Math.abs(pos) === 2) {
      return 'z-0 scale-75 blur-md opacity-60';
    } else {
      return 'hidden';
    }
  };

  const handleCardClick = (idx, isCenter) => {
    if (isCenter) {
      window.open(visibleProjects[idx].liveLink, '_blank');
    } else if (!animating) {
      setAnimating(true);
      const pos = idx - half;
      setTimeout(() => {
        setCenterIdx(current => (current + pos + projects.length) % projects.length);
        setAnimating(false);
      }, SWIPE_DURATION);
    }
  };

  return (
    <section id="projects" className="py-20 md:py-32 relative overflow-visible">
      <div className="max-w-6xl mx-auto relative z-10 bg-glass/80 backdrop-blur-glass shadow-2xl rounded-3xl p-6 md:p-16 lg:p-24 overflow-hidden">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light font-serif text-center mb-16 text-text/90" style={{textShadow: '0 2px 8px rgba(0,224,255,0.12)', letterSpacing: '0.04em'}}>Projects</h2>
        <div
          className="flex items-center justify-center gap-4 mb-10 select-none"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            onClick={handlePrev}
            className="p-2 rounded-full bg-black/40 text-background shadow hover:bg-black/70 transition-colors"
            aria-label="Previous projects"
            disabled={animating}
          >
            &#8592;
          </button>
          <div
            className="relative flex items-center justify-center w-full touch-pan-x"
            style={{ minWidth: 0, height: 440, cursor: dragging.current ? 'grabbing' : 'grab' }}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={() => { if (dragging.current) handleDragEnd(); }}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            {visibleProjects.map((project, idx) => {
              const pos = idx - half;
              const isCenter = pos === 0;
              return (
                <div
                  key={project.title + idx}
                  className={`absolute left-1/2 top-0 w-[320px] md:w-[360px] lg:w-[400px] h-[420px] rounded-2xl overflow-hidden shadow-xl bg-black/60 group transition-all duration-[${SWIPE_DURATION}ms] ease-[cubic-bezier(.33,1.5,.68,1)] cursor-${isCenter ? 'pointer' : 'pointer'} ${getCardStyle(idx)}`}
                  style={{
                    transform: `translateX(calc(-50% + ${pos * 60}%)) scale(${isCenter ? 1 : Math.abs(pos) === 1 ? 0.9 : 0.75})`,
                    transition: `all ${SWIPE_DURATION}ms cubic-bezier(.33,1.5,.68,1)`
                  }}
                  onClick={() => handleCardClick(idx, isCenter)}
                >
                  {/* Image covers entire card */}
                  <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                      backgroundImage: `url(${project.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: 'brightness(1.18) contrast(1.08)',
                    }}
                  />
                  <div className="absolute inset-0 pointer-events-none" style={{
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.00) 30%)'
                  }} />
                  <div className="absolute inset-0 pointer-events-none" style={{
                    background: 'linear-gradient(to bottom, rgba(10,10,20,0.0) 50%, rgba(10,10,20,0.97) 100%)'
                  }} />
                  <div
                    className={`absolute bottom-0 left-0 w-full px-6 pb-10 pt-10 flex flex-row items-center justify-center gap-3 transition-opacity duration-1000 ${isCenter ? 'opacity-100' : 'opacity-0'}`}
                    style={{ zIndex: 2 }}
                  >
                    <div
                      className="absolute left-1/2 bottom-0 translate-x-[-50%] mb-8 w-[90%] h-14 bg-accent2/80 rounded-xl backdrop-blur-sm"
                      style={{ zIndex: 1 }}
                    />
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                      className="github-icon text-accent2 hover:text-accent transition-colors drop-shadow-lg text-2xl"
                      onClick={e => e.stopPropagation()}
                      aria-label="GitHub Repository"
                      style={{ zIndex: 2 }}
                >
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.186 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.686-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.593 1.028 2.686 0 3.847-2.338 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .268.18.579.688.481C19.138 20.204 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
                  </svg>
                    </a>
                    <h3 className="text-base md:text-lg font-semibold text-text/90 text-center mb-0 font-inter relative z-10">{project.title}</h3>
              </div>
            </div>
              );
            })}
          </div>
          <button
            onClick={handleNext}
            className="p-2 rounded-full bg-black/40 text-background shadow hover:bg-black/70 transition-colors"
            aria-label="Next projects"
            disabled={animating}
          >
            &#8594;
          </button>
        </div>
        <div className="flex justify-center gap-2 mt-2">
          {PROJECT_DOTS.map(({ idx }) => (
            <span
              key={idx}
              className={`inline-block w-2 h-2 rounded-full ${idx === centerIdx ? 'bg-accent2' : 'bg-accent3'} transition-colors`}
            />
        ))}
      </div>
    </div>
  </section>
);
};

export default ProjectsSection; 