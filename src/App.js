import React, { lazy, Suspense, useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TerminalInterface from './components/TerminalInterface';

const ProjectsSection = lazy(() => import('./components/ProjectsSection'));
const SkillsSection = lazy(() => import('./components/SkillsSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const ReadsWritesSection = lazy(() => import('./components/ReadsWritesSection'));

const TABS = [
  { key: 'about', label: 'About' },
  { key: 'skills', label: 'Skills' },
  { key: 'projects', label: 'Projects' },
  { key: 'reads', label: 'Reads & Writes' },
  { key: 'contact', label: 'Contact' },
  { key: 'terminal', label: 'Terminal' },
];

const App = () => {
  const [activeTab, setActiveTab] = useState('about');

  const handleTabChange = useCallback((key) => {
    setActiveTab(key);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const renderTab = () => {
    switch (activeTab) {
      case 'about':
        return <HeroSection />;
      case 'skills':
        return (
          <Suspense fallback={<div className="py-16" />}>
            <SkillsSection />
          </Suspense>
        );
      case 'projects':
        return (
          <Suspense fallback={<div className="py-16" />}>
            <ProjectsSection />
          </Suspense>
        );
      case 'reads':
        return (
          <Suspense fallback={<div className="py-16" />}>
            <ReadsWritesSection />
          </Suspense>
        );
      case 'contact':
        return (
          <Suspense fallback={<div className="py-16" />}>
            <ContactSection />
          </Suspense>
        );
      case 'terminal':
        return <TerminalInterface />;
      default:
        return <HeroSection />;
    }
  };

  return (
    <div className="min-h-screen text-text font-inter overflow-x-hidden">
      <div
        className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
        style={{
          backgroundImage: `url('/assets/flower.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <Navbar tabs={TABS} activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="pt-16">
        {renderTab()}
      </main>
    </div>
  );
};

export default App;
