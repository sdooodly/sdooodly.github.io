import React from 'react';

const skills = {
  'Frontend': ['React', 'Next.js', 'Tailwind CSS', 'JavaScript (ES6+)'],
  'Backend': ['Node.js', 'Express.js', 'Python', 'Django', 'Flask'],
  'Databases': ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase Firestore'],
  'Tools & DevOps': ['Git', 'Docker', 'AWS (S3, EC2)', 'Netlify', 'Vercel'],
};

const SkillsSection = () => (
  <section id="skills" className="py-16 md:py-24 relative overflow-hidden">
    {/* Premium overlay */}
    <div className="absolute inset-0 bg-primary/60 rounded-3xl shadow-2xl pointer-events-none" style={{zIndex:1}}></div>
    <div className="container mx-auto px-4 relative z-10">
      <h2 className="text-4xl font-bold text-center text-accent mb-12">My Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="bg-primary rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 border border-gray">
            <h3 className="text-2xl font-semibold text-accent mb-4 border-b border-gray pb-2">{category}</h3>
            <ul className="list-disc list-inside text-accent space-y-2">
              {items.map((item, index) => (
                <li key={index} className="flex items-center">
                  <svg className="w-4 h-4 text-accent mr-2" fill="currentColor" viewBox="0 0 24 24">
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