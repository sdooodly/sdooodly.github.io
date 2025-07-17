import React, { useState } from 'react';

const ICON_SIZE = 'w-10 h-10';
const SHEETDB_ENDPOINT = 'https://sheetdb.io/api/v1/cb6vb83c7qooo';

const ContactSection = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(SHEETDB_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: form })
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-visible mt-20">
      <div className="relative z-10 bg-glass/80 backdrop-blur-glass shadow-lg rounded-3xl p-10 md:p-20 text-center flex flex-col items-center">
        <h2 className="text-4xl font-bold mb-8 text-text">Get in touch!</h2>
        <div className="flex flex-row gap-10 justify-center items-center mb-10">
          <a
            href="https://www.linkedin.com/in/gayathri-gireesh-sujatha-3606ba189"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent2 hover:text-accent transition-colors"
            aria-label="LinkedIn"
          >
            <svg className={ICON_SIZE} fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z" />
            </svg>
          </a>
          <a
            href="https://github.com/sdooodly"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent2 hover:text-accent transition-colors"
            aria-label="GitHub"
          >
            <svg className={ICON_SIZE} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.186 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.686-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.593 1.028 2.686 0 3.847-2.338 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .268.18.579.688.481C19.138 20.204 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
            </svg>
          </a>
          <a
            href="mailto:gayathrigs96@gmail.com"
            className="text-accent2 hover:text-accent transition-colors"
            aria-label="Email"
          >
            <svg className={ICON_SIZE} fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 8l7.89 5.26c.49.33 1.11.33 1.6 0L21 8M3 4h18a2 2 0 012 2v12a2 2 0 01-2 2H3a2 2 0 01-2-2V6a2 2 0 012-2z" />
            </svg>
          </a>
        </div>
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto flex flex-col gap-6 bg-black/30 p-8 rounded-2xl shadow-lg">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="px-4 py-3 rounded-lg bg-black/50 text-text placeholder:text-accent2 focus:outline-none focus:ring-2 focus:ring-accent2"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="px-4 py-3 rounded-lg bg-black/50 text-text placeholder:text-accent2 focus:outline-none focus:ring-2 focus:ring-accent2"
            required
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="px-4 py-3 rounded-lg bg-black/50 text-text placeholder:text-accent2 focus:outline-none focus:ring-2 focus:ring-accent2 min-h-[120px]"
            required
          />
          <button
            type="submit"
            className="bg-accent2 text-background font-semibold px-8 py-3 rounded-full shadow hover:bg-accent hover:text-accent2 transition-colors duration-300 transform hover:scale-105 disabled:opacity-60"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
          {status === 'success' && <div className="text-green-400 text-center mt-2">Message sent! Thank you.</div>}
          {status === 'error' && <div className="text-red-400 text-center mt-2">Something went wrong. Please try again.</div>}
        </form>
      </div>
    </section>
  );
};

export default ContactSection; 