import React from 'react';
import { socialLinks } from '../constants/socialLinks';
import { ICON_SIZE } from '../constants/contact';
import ContactForm from './forms/ContactForm';

const ContactSection = () => (
  <section id="contact" className="py-20 md:py-32 relative overflow-visible mt-8">
    <div className="max-w-2xl mx-auto relative z-10 bg-glass/80 backdrop-blur-glass shadow-lg rounded-3xl p-8 md:p-16 lg:p-20 text-center flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-14 text-text/90 font-inter" style={{textShadow: '0 2px 8px rgba(0,224,255,0.12)'}}>Get in touch!</h2>
      <ContactForm />
      {/* Social icons row at the bottom */}
      <div className="flex flex-row gap-10 justify-center items-center mt-12">
        {socialLinks.map(link => (
          <a
            key={link.name + '-bottom'}
            href={link.url}
            target={link.url.startsWith('mailto:') ? undefined : '_blank'}
            rel={link.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            className="text-accent2 hover:text-accent transition-colors"
            aria-label={link.name}
          >
            <svg className={ICON_SIZE} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d={link.icon} />
            </svg>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default ContactSection; 