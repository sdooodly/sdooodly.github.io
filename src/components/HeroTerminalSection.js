import React from 'react';
import HeroSection from './HeroSection';
import TerminalInterface from './TerminalInterface';

const HeroTerminalSection = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-visible">
      <div className="max-w-7xl mx-auto px-4">
        {/* Mobile: Stacked vertically */}
        <div className="md:hidden flex flex-col gap-12">
          <HeroSection />
          <TerminalInterface />
        </div>

        {/* Desktop: Side by side */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="h-full">
            <HeroSection />
          </div>
          <div className="h-full">
            <TerminalInterface />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroTerminalSection;
