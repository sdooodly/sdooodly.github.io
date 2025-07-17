import React from 'react';

const ContactSection = () => (
  <section id="contact" className="py-16 md:py-24 relative overflow-visible">
    <div className="relative z-10 bg-glass/80 backdrop-blur-glass border border-accent2 shadow-lg rounded-3xl p-10 md:p-20 text-center">
      <h2 className="text-4xl font-bold mb-8 text-white">Get In Touch</h2>
      <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
        Contact me via LinkedIn, GitHub, or email:
        <br />
        <a href="https://www.linkedin.com/in/gayathri-gireesh-sujatha-3606ba189" className="text-accent2 hover:underline block mt-2" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://github.com/sdooodly" className="text-accent2 hover:underline block" target="_blank" rel="noopener noreferrer">GitHub</a>
        <span className="block text-accent2 mt-2">Email: <a href="mailto:gayathrigs96@gmail.com" className="text-accent2 hover:underline">gayathrigs96@gmail.com</a></span>
      </p>
      <a
        href="mailto:gayathrigs96@gmail.com"
        className="inline-flex items-center bg-accent2 text-background font-semibold px-8 py-4 rounded-full shadow hover:bg-accent hover:text-accent2 transition-colors duration-300 transform hover:scale-105"
      >
        <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 8l7.89 5.26c.49.33 1.11.33 1.6 0L21 8M3 4h18a2 2 0 012 2v12a2 2 0 01-2 2H3a2 2 0 01-2-2V6a2 2 0 012-2z" />
        </svg>
        Email Me
      </a>
    </div>
  </section>
);

export default ContactSection; 