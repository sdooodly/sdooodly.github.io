import React, { lazy, Suspense, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import { motion } from 'framer-motion';
import { useIsMobile } from './hooks/useMediaQuery';

const ProjectsSection = lazy(() => import('./components/ProjectsSection'));
const SkillsSection = lazy(() => import('./components/SkillsSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const Footer = lazy(() => import('./components/Footer'));
const RoadmapSection = lazy(() => import('./components/RoadmapSection'));
const BlogSection = lazy(() => import('./components/BlogSection'));
const GoodreadsSection = lazy(() => import('./components/GoodreadsSection'));

const SECTION_BG_CLASSES = [
  'bg-gradient-to-b from-background/80 to-accent2/10',
  'bg-gradient-to-b from-accent2/10 to-background/80',
  'bg-gradient-to-b from-background/80 to-accent3/10',
  'bg-gradient-to-b from-accent3/10 to-background/80',
  'bg-gradient-to-b from-background/80 to-accent/10',
];

const App = () => {
  const isMobile = useIsMobile();

  const sectionVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: isMobile ? 0.7 : 1.4, ease: [0.33, 1, 0.68, 1] } },
  }), [isMobile]);

  const bgVariants = useMemo(() => ({
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1, transition: { duration: isMobile ? 0.6 : 1.2, ease: [0.33, 1, 0.68, 1] } },
  }), [isMobile]);

  const sections = useMemo(() => [
    { Component: HeroSection, key: 'hero' },
    { Component: SkillsSection, key: 'skills' },
    { Component: ProjectsSection, key: 'projects' },
    { Component: RoadmapSection, key: 'roadmap' },
    { Component: BlogSection, key: 'blog' },
    { Component: GoodreadsSection, key: 'goodreads' },
    { Component: ContactSection, key: 'contact' }
  ], []);
  return (
    <div className={`min-h-screen text-text font-inter overflow-x-hidden`}>
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
        {sections.map(({ Component, key }, idx) => {
          if (isMobile) {
            if (idx === 3) {
              return (
                <section key={key} className="relative">
                  <div
                    className={`absolute inset-0 -z-10 pointer-events-none transition-colors duration-1000 ${SECTION_BG_CLASSES[idx] || ''}`}
                  />
                  <Suspense fallback={<div className="py-16" />}>
                    <Component />
                  </Suspense>
                </section>
              );
            } else {
              return (
                <section key={key} className="relative">
                  <div
                    className={`absolute inset-0 -z-10 pointer-events-none ${SECTION_BG_CLASSES[idx] || ''}`}
                  />
                  <Suspense fallback={<div className="py-16" />}>
                    <Component />
                  </Suspense>
                </section>
              );
            }
          } else {
            return (
              <motion.section
                key={key}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={sectionVariants}
                className="relative"
              >
                <motion.div
                  className={`absolute inset-0 -z-10 pointer-events-none transition-colors duration-1000 ${SECTION_BG_CLASSES[idx] || ''}`}
                  variants={bgVariants}
                  initial="hidden"
                  animate="visible"
                />
                <Suspense fallback={<div className="py-16" />}>
                  <Component />
                </Suspense>
              </motion.section>
            );
          }
        })}
      </div>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;
