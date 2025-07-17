import React from 'react';

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/sdooodly', icon: 'M15 22v-4a4.8 4.8 0 0 0-1-3.2V9.5c0-1.2.7-2 2-2s2 .8 2 2v2.5a4.8 4.8 0 0 0-1 3.2v4M8 20v-4a4.8 4.8 0 0 1-1-3.2V9.5c0-1.2.7-2 2-2s2 .8 2 2v2.5a4.8 4.8 0 0 1-1 3.2v4M12 2a4 4 0 0 0-4 4c0 1.2.7 2 2 2s2-.8 2-2c0-1.2-.7-2-2-2M12 22a4 4 0 0 0 4-4c0-1.2-.7-2-2-2s-2 .8-2 2c0 1.2.7 2 2 2' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/gayathri-gireesh-sujatha-3606ba189', icon: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
];

const HeroSection = () => (
  <section id="about" className="container mx-auto px-4 py-20 text-center md:py-32 relative overflow-hidden">
    {/* Premium overlay */}
    <div className="absolute inset-0 bg-primary/60 rounded-3xl shadow-2xl pointer-events-none" style={{zIndex:1}}></div>
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 relative z-10">
      <div className="w-32 h-32 md:w-48 md:h-48 bg-secondary rounded-full overflow-hidden shadow-xl border-4 border-accent">
        <img
          src="https://placehold.co/192x192/3E2723/000000?text=Your+Photo"
          alt="Your Profile"
          className="w-full h-full object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/192x192/3E2723/000000?text=Your+Photo'; }}
        />
      </div>
      <div className="text-center md:text-left max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-extrabold text-accent mb-4 leading-tight">
          Hi, I'm <span className="text-accent">Sdooodly</span>
        </h1>
        <p className="text-lg md:text-xl text-accent mb-8">
          Crying to code
        </p>
        <div className="flex justify-center md:justify-start space-x-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary text-accent p-3 rounded-full shadow-lg hover:bg-accent hover:text-primary transition-all duration-300 transform hover:scale-110"
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
);

export default HeroSection; 