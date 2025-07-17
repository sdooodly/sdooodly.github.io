import React, { useState } from 'react';
import { SHEETDB_ENDPOINT } from '../../constants/contact';

const ContactForm = ({ onSuccess, onError }) => {
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
        if (onSuccess) onSuccess();
      } else {
        setStatus('error');
        if (onError) onError();
      }
    } catch {
      setStatus('error');
      if (onError) onError();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto flex flex-col gap-6 bg-black/30 p-8 rounded-2xl shadow-lg">
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Your Name"
        className="px-5 py-4 rounded-lg bg-black/50 text-lg text-text/90 placeholder:text-accent2/70 focus:outline-none focus:ring-2 focus:ring-accent2 font-inter"
        required
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Your Email"
        className="px-5 py-4 rounded-lg bg-black/50 text-lg text-text/90 placeholder:text-accent2/70 focus:outline-none focus:ring-2 focus:ring-accent2 font-inter"
        required
      />
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Your Message"
        className="px-5 py-4 rounded-lg bg-black/50 text-lg text-text/90 placeholder:text-accent2/70 focus:outline-none focus:ring-2 focus:ring-accent2 min-h-[120px] font-inter"
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
  );
};

export default ContactForm; 