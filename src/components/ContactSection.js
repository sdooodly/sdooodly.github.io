import React from 'react';
import { socialLinks } from '../constants/socialLinks';
import { ICON_SIZE } from '../constants/contact';
import ContactForm from './forms/ContactForm';

const ContactSection = () => (
  <section id="contact" className="py-16 md:py-24 relative overflow-visible mt-8">
    <div className="relative z-10 bg-glass/80 backdrop-blur-glass shadow-lg rounded-3xl p-10 md:p-20 text-center flex flex-col items-center">
      <h2 className="text-5xl font-extrabold mb-12 text-text/90 font-inter">Get in touch!</h2>
      <ContactForm />
      {/* Social icons row at the bottom */}
      <div className="flex flex-row gap-10 justify-center items-center mt-10">
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