import React from 'react';
import { skills } from '../data/skills';

const SkillsSection = () => (
  <section id="skills" className="py-16 md:py-24 relative overflow-visible mt-20">
    <div className="relative z-10 bg-glass/80 backdrop-blur-glass border border-accent2 shadow-lg rounded-3xl p-10 md:p-20">
      <h2 className="text-4xl font-bold text-center mb-12 text-text">My Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="bg-glass/80 backdrop-blur-glass border border-accent2 rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold text-text mb-4 border-b border-accent2 pb-2">{category}</h3>
            <ul className="list-disc list-inside text-accent2 space-y-2">
              {items.map((item, index) => (
                <li key={index} className="flex items-center">
                  <svg className="w-4 h-4 text-accent2 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsSection; 