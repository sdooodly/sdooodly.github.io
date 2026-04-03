import React, { useState } from 'react';
import { featuredProjects, otherProjects } from '../data/projects';

const ProjectsSection = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <section id="projects" className="py-24 md:py-32 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-serif font-light text-center mb-16 text-text" style={{ letterSpacing: '0.04em' }}>Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuredProjects.map(project => (
          <a key={project.title} href={project.liveLink} target="_blank" rel="noopener noreferrer" className="group relative aspect-[3/4] overflow-hidden bg-card cursor-pointer">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
              <h3 className="font-serif text-lg font-normal text-text mb-1">{project.title}</h3>
              <p className="text-xs text-muted leading-relaxed mb-3 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.techStack.map(tech => (
                  <span key={tech} className="text-[10px] uppercase tracking-wider px-2 py-0.5 border border-accent/40 text-accent rounded">{tech}</span>
                ))}
              </div>
              <div className="flex gap-3">
                {project.githubLink && <span onClick={e => { e.preventDefault(); e.stopPropagation(); window.open(project.githubLink, '_blank'); }} className="text-xs text-muted hover:text-accent transition-colors cursor-pointer">GitHub ↗</span>}
                <span className="text-xs text-muted hover:text-accent transition-colors">Live ↗</span>
              </div>
            </div>
            {project.freelance && <span className="absolute top-3 right-3 text-[9px] uppercase tracking-wider px-2 py-0.5 bg-accent/90 text-bg rounded font-medium">Freelance</span>}
          </a>
        ))}
      </div>

      {/* See more */}
      <div className="mt-12 text-center">
        <button onClick={() => setShowMore(s => !s)} className="text-xs uppercase tracking-[0.15em] text-muted hover:text-accent transition-colors border-b border-transparent hover:border-accent pb-0.5">
          {showMore ? 'Show less' : `See more (${otherProjects.length})`}
        </button>
      </div>
      {showMore && (
        <div className="mt-8 space-y-3 max-w-xl mx-auto animate-fadeIn">
          {otherProjects.map(p => (
            <div key={p.title} className="flex items-center justify-between py-3 border-b border-white/5">
              <div>
                <span className="text-sm text-text/80">{p.title}</span>
                <span className="ml-3 text-[10px] text-muted">{p.techStack.join(' · ')}</span>
              </div>
              <div className="flex gap-3">
                {p.liveLink && <a href={p.liveLink} target="_blank" rel="noopener noreferrer" className="text-xs text-muted hover:text-accent transition-colors">Live ↗</a>}
                <a href={p.githubLink} target="_blank" rel="noopener noreferrer" className="text-xs text-muted hover:text-accent transition-colors">Code ↗</a>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
