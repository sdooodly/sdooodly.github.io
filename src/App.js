import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import RoadmapSection from './components/RoadmapSection';
import BlogSection from './components/BlogSection';
import { motion } from 'framer-motion';

const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches;

const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: isMobile ? 0.7 : 1.4, ease: [0.33, 1, 0.68, 1] } },
};
const bgVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { duration: isMobile ? 0.6 : 1.2, ease: [0.33, 1, 0.68, 1] } },
};

const sectionBgs = [
  'bg-gradient-to-b from-background/80 to-accent2/10', // Hero
  'bg-gradient-to-b from-accent2/10 to-background/80', // Projects
  'bg-gradient-to-b from-background/80 to-accent3/10', // Skills
  'bg-gradient-to-b from-accent3/10 to-background/80', // Roadmap
  'bg-gradient-to-b from-background/80 to-accent/10', // Contact
];

const App = () => {
  const sections = [
    <HeroSection key="hero" />, 
    <SkillsSection key="skills" />,
    <RoadmapSection key="roadmap" />,
    <BlogSection key="blog" />, 
    <ProjectsSection key="projects" />, 
    <ContactSection key="contact" />
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
      <div className="space-y-12 md:space-y-16 pt-20">
        {sections.map((SectionComponent, idx) => {
          // On mobile, only keep animation for RoadmapSection (idx === 3)
          if (isMobile) {
            if (idx === 3) {
              // RoadmapSection: keep animation (handled internally)
              return (
                <section key={idx} className="relative">
                  <div
                    className={`absolute inset-0 -z-10 pointer-events-none transition-colors duration-1000 ${sectionBgs[idx]}`}
                  />
                  {SectionComponent}
                </section>
              );
            } else {
              // All other sections: no animation, no transition
              return (
                <section key={idx} className="relative">
                  <div
                    className={`absolute inset-0 -z-10 pointer-events-none ${sectionBgs[idx]}`}
                  />
                  {SectionComponent}
                </section>
              );
            }
          } else {
            // Animated on desktop
            return (
              <motion.section
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={sectionVariants}
                className="relative"
              >
                {/* Subtle animated background layer */}
                <motion.div
                  className={`absolute inset-0 -z-10 pointer-events-none transition-colors duration-1000 ${sectionBgs[idx]}`}
                  variants={bgVariants}
                  initial="hidden"
                  animate="visible"
                />
                {SectionComponent}
              </motion.section>
            );
          }
        })}
      </div>
      <Footer />
    </div>
  );
};

export default App;
