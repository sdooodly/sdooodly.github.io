import React, { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TerminalInterface from './components/TerminalInterface';

const SkillsSection = lazy(() => import('./components/SkillsSection'));
const ProjectsSection = lazy(() => import('./components/ProjectsSection'));
const BlogSection = lazy(() => import('./components/BlogSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));

const SECTIONS = [
  { key: 'hero', Component: HeroSection, lazy: false },
  { key: 'skills', Component: SkillsSection, lazy: true },
  { key: 'projects', Component: ProjectsSection, lazy: true },
  { key: 'blog', Component: BlogSection, lazy: true },
  { key: 'contact', Component: ContactSection, lazy: true },
];

const App = () => (
  <div className="min-h-screen text-text font-inter overflow-x-hidden pb-14">
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none" style={{ backgroundImage: `url('/assets/flower.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      <div className="absolute inset-0 bg-black/40" />
    </div>
    <Navbar />
    <div className="space-y-4 md:space-y-8 pt-16">
      {SECTIONS.map(({ key, Component, lazy: isLazy }) => (
        <div key={key}>
          {isLazy ? (
            <Suspense fallback={<div className="py-16" />}><Component /></Suspense>
          ) : (
            <Component />
          )}
        </div>
      ))}
    </div>
    <TerminalInterface />
  </div>
);

export default App;
