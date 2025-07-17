import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

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
      image: 'https://placehold.co/600x400/3E2723/000000?text=Project+Alpha', // Placeholder image
    },
    {
      title: 'Project Beta',
      description: 'An AI-powered content generation tool designed to streamline marketing efforts. Features include natural language processing and custom template creation.',
      techStack: ['Python', 'Django', 'TensorFlow', 'PostgreSQL'],
      githubLink: 'https://github.com/your-username/project-beta',
      liveLink: 'https://project-beta.netlify.app',
      image: 'https://placehold.co/600x400/3E2723/000000?text=Project+Beta', // Placeholder image
    },
    {
      title: 'Project Gamma',
      description: 'A mobile-first e-commerce platform with a seamless user experience and robust payment integration. Optimized for performance and scalability.',
      techStack: ['Next.js', 'Tailwind CSS', 'Stripe API', 'Firebase'],
      githubLink: 'https://github.com/your-username/project-gamma',
      liveLink: 'https://project-gamma.vercel.app',
      image: 'https://placehold.co/600x400/3E2723/000000?text=Project+Gamma', // Placeholder image
    },
  ];

  return (
    <div className={`min-h-screen text-text font-inter overflow-x-hidden`}>
      {/* Unsplash flower fixed background with dark overlay */}
      <div
        className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
        style={{
          backgroundImage: `url('/assets/flower.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          filter: 'none'
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <Navbar />
      <div className="space-y-12 md:space-y-16">
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
};

export default App;
