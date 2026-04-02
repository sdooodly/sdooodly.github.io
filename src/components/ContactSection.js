import React from 'react';
import { socialLinks } from '../constants/socialLinks';
import ContactForm from './forms/ContactForm';

const ContactSection = () => (
  <section id="contact" className="py-24 md:py-32 px-6 max-w-xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-serif font-light text-center mb-6 text-text" style={{ letterSpacing: '0.04em' }}>Get in Touch</h2>
    <p className="text-center text-muted text-sm mb-12">For inquiries about projects, collaborations, or just to say hello</p>
    <ContactForm />
    <div className="flex justify-center gap-6 mt-12">
      {socialLinks.map(link => (
        <a key={link.name} href={link.url} target={link.url.startsWith('mailto:') ? undefined : '_blank'} rel={link.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'} className="text-muted hover:text-accent transition-colors text-sm tracking-wide" aria-label={link.name}>
          {link.name}
        </a>
      ))}
    </div>
  </section>
);

export default ContactSection;
