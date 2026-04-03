import React, { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TerminalInterface from './components/TerminalInterface';

const ProjectsSection = lazy(() => import('./components/ProjectsSection'));
const BlogSection = lazy(() => import('./components/BlogSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));

const App = () => (
  <div className="min-h-screen text-text overflow-x-hidden pb-12">
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none" style={{ backgroundImage: `url('/assets/flower.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      <div className="absolute inset-0 bg-black/50" />
    </div>
    <Navbar />
    <HeroSection />
    <Suspense fallback={<div className="py-16" />}><ProjectsSection /></Suspense>
    <Suspense fallback={<div className="py-16" />}><BlogSection /></Suspense>
    <Suspense fallback={<div className="py-16" />}><ContactSection /></Suspense>
    <TerminalInterface />
  </div>
);

export default App;
