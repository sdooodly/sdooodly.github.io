import React, { memo } from 'react';

const CERTIFICATIONS = [
  {
    name: 'Microsoft Azure',
    issuer: 'Microsoft',
    icon: '☁️',
    description: 'Cloud Platform Expertise'
  },
  {
    name: 'Full Stack Developer',
    issuer: 'Professional',
    icon: '🚀',
    description: 'Frontend & Backend'
  },
  {
    name: 'DevOps Specialist',
    issuer: 'Professional',
    icon: '⚙️',
    description: 'CI/CD & Automation'
  },
  {
    name: 'Web Technologies',
    issuer: 'Expert',
    icon: '💻',
    description: 'JavaScript & TypeScript'
  }
];

const CertificationBadges = memo(() => {
  return (
    <div className="mt-12 pt-12 border-t border-accent2/30">
      <h3 className="text-xl md:text-2xl font-bold text-text/90 mb-6 font-inter">Certifications & Specializations</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {CERTIFICATIONS.map((cert, idx) => (
          <div
            key={idx}
            className="group hover-lift bg-gradient-to-br from-accent/10 to-accent2/10 border border-accent2/30 rounded-lg p-4 text-center transition-all duration-300 cursor-default"
          >
            <div className="text-4xl mb-2">{cert.icon}</div>
            <h4 className="font-bold text-text/90 text-sm md:text-base mb-1">{cert.name}</h4>
            <p className="text-xs text-accent2/70 mb-2">{cert.issuer}</p>
            <p className="text-xs text-text/60 leading-tight">{cert.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
});

CertificationBadges.displayName = 'CertificationBadges';

export default CertificationBadges;
