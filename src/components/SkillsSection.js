import React, { useState } from 'react';
import { skills } from '../data/skills';
import SkillsRadarChart from './SkillsRadarChart';

const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches;

const SkillsSection = () => {
  const [openIdx, setOpenIdx] = useState(null);
  const categories = Object.entries(skills);

  if (isMobile) {
    return (
      <section id="skills" className="py-16 md:py-24 relative overflow-visible pb-32">
        <div className="relative z-10 bg-glass/80 backdrop-blur-glass border border-accent2 shadow-lg rounded-3xl p-6 md:p-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-text/90 font-inter" style={{textShadow: '0 2px 8px rgba(0,224,255,0.12)'}}>Skills</h2>
          <div className="overflow-visible min-h-[340px] mt-4">
            <SkillsRadarChart />
          </div>
          <div className="flex flex-col gap-4 mt-8">
            {categories.map(([category, items], idx) => (
              <div key={category} className="bg-glass/80 border border-accent2 rounded-xl shadow-lg">
                <button
                  className="w-full flex items-center justify-between px-6 py-4 focus:outline-none"
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                  aria-expanded={openIdx === idx}
                  aria-controls={`skills-panel-${idx}`}
                >
                  <span className="text-lg font-bold text-text/90 font-inter">{category}</span>
                  <svg
                    className={`w-6 h-6 text-accent2 transform transition-transform duration-300 ${openIdx === idx ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  id={`skills-panel-${idx}`}
                  className={`overflow-visible transition-all duration-300 ${openIdx === idx ? 'max-h-[600px] py-2 px-6' : 'max-h-0 px-6 py-0'}`}
                  style={{
                    transitionProperty: 'max-height, padding',
                    overflowY: openIdx === idx ? 'auto' : 'hidden',
                  }}
                >
                  {openIdx === idx && (
                    <ul className="list-disc list-inside text-base text-accent2/90 space-y-3">
                      {items.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <svg className="w-4 h-4 text-accent2 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {item.name || item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Desktop: original grid
  return (
    <section id="skills" className="py-16 md:py-24 relative overflow-visible">
      <div className="relative z-10 bg-glass/80 backdrop-blur-glass border border-accent2 shadow-lg rounded-3xl p-10 md:p-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-text/90 font-inter" style={{textShadow: '0 2px 8px rgba(0,224,255,0.12)'}}>Skills</h2>
        <SkillsRadarChart />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
          {categories.map(([category, items]) => (
            <div key={category} className="bg-glass/80 backdrop-blur-glass border border-accent2 rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl md:text-2xl font-bold text-text/90 mb-5 border-b border-accent2 pb-2 font-inter">{category}</h3>
              <ul className="list-disc list-inside text-base text-accent2/90 space-y-3">
                {items.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="w-4 h-4 text-accent2 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {item.name || item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection; 