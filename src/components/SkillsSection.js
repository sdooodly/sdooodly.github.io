import React, { useState } from 'react';
import { skills } from '../data/skills';
import SkillsRadarChart from './SkillsRadarChart';

// Inline SVGs for common tech icons
const SkillIcon = ({ icon, name }) => {
  switch (icon) {
    case 'react':
      return <svg className="w-5 h-5 mr-2 text-cyan-400 inline-block align-middle" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="2.5" fill="currentColor"/><g stroke="currentColor" strokeWidth="1.5" fill="none"><ellipse rx="10" ry="4.5" cx="12" cy="12"/><ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(60 12 12)"/><ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(120 12 12)"/></g></svg>;
    case 'javascript':
      return <svg className="w-5 h-5 mr-2 text-yellow-400 inline-block align-middle" viewBox="0 0 32 32" fill="currentColor"><rect width="32" height="32" rx="6" fill="#F7DF1E"/><path d="M19.5 23.5c.5.8 1.2 1.5 2.4 1.5 1.1 0 1.8-.5 1.8-1.3 0-.9-.7-1.2-2-1.7l-.7-.3c-2-.7-3.3-1.6-3.3-3.5 0-1.7 1.3-3 3.4-3 1.5 0 2.6.5 3.4 1.9l-1.8 1.1c-.4-.7-.8-1-1.6-1-.7 0-1.1.4-1.1 1 0 .7.4 1 1.5 1.4l.7.3c2.3.8 3.6 1.7 3.6 3.7 0 2.1-1.7 3.2-4 3.2-2.2 0-3.6-1-4.3-2.3l1.9-1.1zm-7.2.2c.4.7.8 1.3 1.7 1.3.8 0 1.3-.3 1.3-1.6v-7.1h2.3v7.2c0 2.4-1.4 3.5-3.4 3.5-1.8 0-2.8-.9-3.3-2l1.9-1.1z" fill="#222"/></svg>;
    case 'typescript':
      return <svg className="w-5 h-5 mr-2 text-blue-500 inline-block align-middle" viewBox="0 0 32 32" fill="currentColor"><rect width="32" height="32" rx="6" fill="#3178C6"/><path d="M13.2 14.7v1.7h2.2v7.1h2.3v-7.1h2.2v-1.7h-6.7zm7.7 4.2c0-1.2.7-2 2.1-2 1.2 0 2 .6 2.1 1.7l-1.7.7c-.1-.4-.3-.6-.7-.6-.4 0-.7.2-.7.6 0 .4.3.6.8.7l.7.2c1.5.4 2.2 1.1 2.2 2.3 0 1.5-1.2 2.3-2.6 2.3-1.3 0-2.2-.7-2.4-1.8l1.7-.7c.1.5.4.8.9.8.5 0 .8-.2.8-.7 0-.4-.3-.6-.9-.8l-.7-.2c-1.2-.3-1.8-1-1.8-2.1z" fill="#fff"/></svg>;
    case 'html':
      return <svg className="w-5 h-5 mr-2 text-orange-500 inline-block align-middle" viewBox="0 0 32 32" fill="currentColor"><rect width="32" height="32" rx="6" fill="#fff"/><path d="M8 6l2 18 6 2 6-2 2-18H8zm14 2l-1.7 15.1-4.3 1.4-4.3-1.4L10 8h12zm-6 2v10l3.2-.9.2-2.1H16v-2h3.1l.2-2.1H16v-2h3.3l.2-2.1H16z" fill="#E44D26"/></svg>;
    case 'tailwind':
      return <svg className="w-5 h-5 mr-2 text-sky-400 inline-block align-middle" viewBox="0 0 32 32" fill="none"><path d="M16 12c2.7-4 8-4 10.7 0 1.3 2 1.3 4 0 6-2.7 4-8 4-10.7 0-1.3-2-1.3-4 0-6z" fill="currentColor"/><path d="M5.3 18c2.7-4 8-4 10.7 0 1.3 2 1.3 4 0 6-2.7 4-8 4-10.7 0-1.3-2-1.3-4 0-6z" fill="currentColor"/></svg>;
    case 'python':
      return <svg className="w-5 h-5 mr-2 text-yellow-400 inline-block align-middle" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="6" fill="#fff"/><path d="M16 6c-2.2 0-4 1.8-4 4v2h8V10c0-2.2-1.8-4-4-4zm-4 4v2H8c-2.2 0-4 1.8-4 4v2c0 2.2 1.8 4 4 4h2v-2H8c-1.1 0-2-.9-2-2v-2c0-1.1.9-2 2-2h2zm8 0v2h2c2.2 0 4 1.8 4 4v2c0 2.2-1.8 4-4 4h-2v-2h2c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2h-2zm-8 8v2c0 2.2 1.8 4 4 4s4-1.8 4-4v-2h-8z" fill="#3776AB"/></svg>;
    case 'nodejs':
      return <svg className="w-5 h-5 mr-2 text-green-500 inline-block align-middle" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="6" fill="#fff"/><path d="M16 6l10 6v8l-10 6-10-6V12l10-6zm0 2.2L8.7 12 16 15.8 23.3 12 16 8.2zm-8 5.3v5.1l8 4.8v-5.1l-8-4.8zm10 9.9l8-4.8v-5.1l-8 4.8v5.1z" fill="#3C873A"/></svg>;
    case 'git':
      return <svg className="w-5 h-5 mr-2 text-orange-600 inline-block align-middle" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="6" fill="#fff"/><path d="M25.7 14.3l-8-8a2 2 0 00-2.8 0l-2.1 2.1 2.8 2.8a1.5 1.5 0 11-1.4 1.4l-2.8-2.8-4.2 4.2a2 2 0 000 2.8l8 8a2 2 0 002.8 0l4.2-4.2-2.8-2.8a1.5 1.5 0 111.4-1.4l2.8 2.8 2.1-2.1a2 2 0 000-2.8z" fill="#F05133"/></svg>;
    // Add more SVGs for other icons as needed
    default:
      // Fallback: concentric circle
      return (
        <svg className="w-5 h-5 mr-2 text-accent2 inline-block align-middle" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1" fill="none" />
          <circle cx="12" cy="12" r="2.5" fill="currentColor" />
        </svg>
      );
  }
};

const SkillsSection = () => {
  const [openIdx, setOpenIdx] = useState(null);
  const categories = Object.entries(skills);

  return (
    <section id="skills" className="py-16 md:py-24 relative overflow-visible pb-32">
      <div className="relative z-10 bg-glass/80 backdrop-blur-glass border-0 md:border border-accent2 shadow-lg rounded-3xl p-6 md:p-16 lg:p-24 max-w-4xl lg:max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-10 md:mb-14 text-text/90 font-inter" style={{textShadow: '0 2px 8px rgba(0,224,255,0.12)'}}>Skills</h2>
        <div className="overflow-visible min-h-[340px] mt-4">
          <SkillsRadarChart />
        </div>
        <div className="flex flex-col gap-4 mt-8">
          {categories.map(([category, items], idx) => (
            <div key={category} className="bg-glass/80 border border-accent2 rounded-xl shadow-lg">
              <button
                className="w-full flex items-center justify-between px-6 py-4 focus:outline-none hover:bg-accent2/10 transition-colors duration-200"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                aria-expanded={openIdx === idx}
                aria-controls={`skills-panel-${idx}`}
              >
                <span className="text-lg md:text-xl lg:text-2xl font-bold text-text/90 font-inter">{category}</span>
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
                  <ul className="list-disc list-inside text-base md:text-lg text-accent2/90 space-y-3">
                    {items.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center hover:underline hover:text-accent2 transition-colors"
                        >
                          <SkillIcon icon={item.icon} name={item.name} />
                          {item.name}
                        </a>
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
};

export default SkillsSection; 