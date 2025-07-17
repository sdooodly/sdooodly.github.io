import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import RoadmapSection from './components/RoadmapSection';
import { socialLinks } from './data/socialLinks';
import { skills } from './data/skills';
import { projects } from './data/projects';

// Main App component for the portfolio
const App = () => {
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
      <div className="space-y-12 md:space-y-16 pt-20">
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <RoadmapSection />
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
};

export default App;
