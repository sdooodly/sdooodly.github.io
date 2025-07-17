import React from 'react';

// Main App component for the portfolio
const App = () => {
  // Define social links and their icons (using Lucide React for modern icons)
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/sdooodly', icon: 'M15 22v-4a4.8 4.8 0 0 0-1-3.2V9.5c0-1.2.7-2 2-2s2 .8 2 2v2.5a4.8 4.8 0 0 0-1 3.2v4M8 20v-4a4.8 4.8 0 0 1-1-3.2V9.5c0-1.2.7-2 2-2s2 .8 2 2v2.5a4.8 4.8 0 0 1-1 3.2v4M12 2a4 4 0 0 0-4 4c0 1.2.7 2 2 2s2-.8 2-2c0-1.2-.7-2-2-2M12 22a4 4 0 0 0 4-4c0-1.2-.7-2-2-2s-2 .8-2 2c0 1.2.7 2 2 2' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/gayathri-gireesh-sujatha-3606ba189', icon: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
  ];

  // Define skills categories and their items
  const skills = {
    'Frontend': ['React', 'Next.js', 'Tailwind CSS', 'JavaScript (ES6+)'],
    'Backend': ['Node.js', 'Express.js', 'Python', 'Django', 'Flask'],
    'Databases': ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase Firestore'],
    'Tools & DevOps': ['Git', 'Docker', 'AWS (S3, EC2)', 'Netlify', 'Vercel'],
  };

  // Define project examples
  const projects = [
    {
      title: 'Project Alpha',
      description: 'A cutting-edge web application for managing complex data flows with real-time updates. Built with React, Node.js, and MongoDB.',
      techStack: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      githubLink: 'https://github.com/your-username/project-alpha',
      liveLink: 'https://project-alpha.vercel.app',
      image: 'https://placehold.co/600x400/36454F/FFFFFF?text=Project+Alpha', // Placeholder image
    },
    {
      title: 'Project Beta',
      description: 'An AI-powered content generation tool designed to streamline marketing efforts. Features include natural language processing and custom template creation.',
      techStack: ['Python', 'Django', 'TensorFlow', 'PostgreSQL'],
      githubLink: 'https://github.com/your-username/project-beta',
      liveLink: 'https://project-beta.netlify.app',
      image: 'https://placehold.co/600x400/36454F/FFFFFF?text=Project+Beta', // Placeholder image
    },
    {
      title: 'Project Gamma',
      description: 'A mobile-first e-commerce platform with a seamless user experience and robust payment integration. Optimized for performance and scalability.',
      techStack: ['Next.js', 'Tailwind CSS', 'Stripe API', 'Firebase'],
      githubLink: 'https://github.com/your-username/project-gamma',
      liveLink: 'https://project-gamma.vercel.app',
      image: 'https://placehold.co/600x400/36454F/FFFFFF?text=Project+Gamma', // Placeholder image
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-inter">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center flex-wrap">
          <a href="#home" className="text-2xl font-bold text-teal-400 rounded-lg p-2 hover:text-teal-300 transition-colors">
            Sdooodly
          </a>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#about" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">About</a>
            <a href="#projects" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Projects</a>
            <a href="#skills" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Skills</a>
            <a href="#contact" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero/About Section */}
      <section id="about" className="container mx-auto px-4 py-20 text-center md:py-32">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="w-32 h-32 md:w-48 md:h-48 bg-gray-700 rounded-full overflow-hidden shadow-xl border-4 border-teal-500">
            {/* Replace with your actual profile picture */}
            <img
              src="https://placehold.co/192x192/4A5568/FFFFFF?text=Your+Photo"
              alt="Your Profile"
              className="w-full h-full object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/192x192/4A5568/FFFFFF?text=Your+Photo'; }}
            />
          </div>
          <div className="text-center md:text-left max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
              Hi, I'm <span className="text-teal-400">Sdooodly</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Crying to code
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 text-teal-400 p-3 rounded-full shadow-lg hover:bg-teal-400 hover:text-gray-900 transition-all duration-300 transform hover:scale-110"
                  aria-label={link.name}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d={link.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="bg-gray-800 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-12">My Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-gray-700 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/36454F/FFFFFF?text=Project'; }}
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-teal-400 mb-3">{project.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="bg-gray-600 text-gray-200 text-xs px-3 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-300 hover:text-teal-200 font-medium flex items-center gap-1 transition-colors"
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
                      className="bg-teal-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-teal-600 transition-colors"
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

      {/* Skills Section */}
      <section id="skills" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-12">My Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="bg-gray-800 rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
                <h3 className="text-2xl font-semibold text-teal-400 mb-4 border-b border-gray-600 pb-2">{category}</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {items.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="w-4 h-4 text-teal-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
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

      {/* Contact Section */}
      <section id="contact" className="bg-gray-800 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Get In Touch</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact me via LinkedIn, GitHub, or email:
            <br />
            <a href="https://www.linkedin.com/in/gayathri-gireesh-sujatha-3606ba189" className="text-teal-400 hover:underline block mt-2" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com/sdooodly" className="text-teal-400 hover:underline block" target="_blank" rel="noopener noreferrer">GitHub</a>
            <span className="block text-gray-200 mt-2">Email: <a href="mailto:gayathrigs96@gmail.com" className="text-teal-400 hover:underline">gayathrigs96@gmail.com</a></span>
          </p>
          <a
            href="mailto:gayathrigs96@gmail.com"
            className="inline-flex items-center bg-teal-500 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-teal-600 transition-colors duration-300 transform hover:scale-105"
          >
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 8l7.89 5.26c.49.33 1.11.33 1.6 0L21 8M3 4h18a2 2 0 012 2v12a2 2 0 01-2 2H3a2 2 0 01-2-2V6a2 2 0 012-2z" />
            </svg>
            Email Me
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 text-center text-gray-400 text-sm">
        <div className="container mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} Sdooodly. All rights reserved.</p>
          <p className="mt-2">Built with <span className="text-red-500">&hearts;</span> and React + Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
