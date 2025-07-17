import React from 'react';

const projects = [
  {
    title: 'Project Alpha',
    description: 'A cutting-edge web application for managing complex data flows with real-time updates. Built with React, Node.js, and MongoDB.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    githubLink: 'https://github.com/your-username/project-alpha',
    liveLink: 'https://project-alpha.vercel.app',
    image: 'https://placehold.co/600x400/3E2723/000000?text=Project+Alpha',
  },
  {
    title: 'Project Beta',
    description: 'An AI-powered content generation tool designed to streamline marketing efforts. Features include natural language processing and custom template creation.',
    techStack: ['Python', 'Django', 'TensorFlow', 'PostgreSQL'],
    githubLink: 'https://github.com/your-username/project-beta',
    liveLink: 'https://project-beta.netlify.app',
    image: 'https://placehold.co/600x400/3E2723/000000?text=Project+Beta',
  },
  {
    title: 'Project Gamma',
    description: 'A mobile-first e-commerce platform with a seamless user experience and robust payment integration. Optimized for performance and scalability.',
    techStack: ['Next.js', 'Tailwind CSS', 'Stripe API', 'Firebase'],
    githubLink: 'https://github.com/your-username/project-gamma',
    liveLink: 'https://project-gamma.vercel.app',
    image: 'https://placehold.co/600x400/3E2723/000000?text=Project+Gamma',
  },
];

const ProjectsSection = () => (
  <section id="projects" className="bg-background py-16 md:py-24 relative overflow-hidden">
    {/* Premium overlay */}
    <div className="absolute inset-0 bg-primary/60 rounded-3xl shadow-2xl pointer-events-none" style={{zIndex:1}}></div>
    <div className="container mx-auto px-4 relative z-10">
      <h2 className="text-4xl font-bold text-center text-accent mb-12">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div key={index} className="bg-primary rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 border border-gray">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/3E2723/000000?text=Project'; }}
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-accent mb-3">{project.title}</h3>
              <p className="text-gray text-sm mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech, i) => (
                  <span key={i} className="bg-background text-accent text-xs px-3 py-1 rounded-full border border-gray">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-secondary font-medium flex items-center gap-1 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2V9.5c0-1.2.7-2 2-2s2 .8 2 2v2.5a4.8 4.8 0 0 0-1 3.2v4M8 20v-4a4.8 4.8 0 0 1-1-3.2V9.5c0-1.2.7-2 2-2s2 .8 2 2v2.5a4.8 4.8 0 0 1-1 3.2v4M12 2a4 4 0 0 0-4 4c0 1.2.7 2 2 2s2-.8 2-2c0-1.2-.7-2-2-2M12 22a4 4 0 0 0 4-4c0-1.2-.7-2-2-2s-2 .8-2 2c0 1.2.7 2 2 2" />
                  </svg>
                  GitHub
                </a>
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent text-primary px-4 py-2 rounded-md shadow-md hover:bg-secondary hover:text-accent transition-colors"
                >
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection; 