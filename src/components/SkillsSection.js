import React from 'react';
import { skills } from '../data/skills';

const SkillsSection = () => (
  <section id="skills" className="py-24 md:py-32 px-6 max-w-3xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-serif font-light text-center mb-16 text-text" style={{ letterSpacing: '0.04em' }}>Skills</h2>
    <div className="space-y-10">
      {Object.entries(skills).map(([category, items]) => (
        <div key={category}>
          <h3 className="text-xs uppercase tracking-[0.15em] text-muted mb-4">{category}</h3>
          <div className="flex flex-wrap gap-2">
            {items.map(item => (
              <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 text-sm border border-white/8 text-text/70 rounded hover:border-accent hover:text-accent transition-all duration-200">
                {item.name}
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default SkillsSection;
