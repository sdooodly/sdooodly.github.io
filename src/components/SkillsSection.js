import React from 'react';
import { skills } from '../data/skills';

const CATEGORY_COLORS = {
  Frontend: 'border-cyan-400/40 text-cyan-300',
  Backend: 'border-accent/40 text-accent',
  DevOps: 'border-accent3/40 text-accent3',
  Tools: 'border-gold/40 text-gold',
};

const SkillsSection = () => {
  const categories = Object.entries(skills);

  return (
    <section id="skills" className="py-20 md:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-light font-serif text-center mb-14 text-text/90"
          style={{ letterSpacing: '0.04em' }}
        >
          Skills
        </h2>
        <div className="space-y-10">
          {categories.map(([category, items]) => (
            <div key={category}>
              <h3 className="text-sm uppercase tracking-[0.15em] text-text/50 mb-4 font-medium">
                {category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {items.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 hover:scale-105 hover:bg-white/5 ${CATEGORY_COLORS[category] || 'border-accent2/40 text-accent2'}`}
                  >
                    {item.name}
                    {item.proficiency === 'Expert' && (
                      <span className="ml-2 text-xs opacity-50">●</span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-text/30 mt-8">● = expert level</p>
      </div>
    </section>
  );
};

export default SkillsSection;
