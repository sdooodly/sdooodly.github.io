import React, { useState } from 'react';
import { SHEETDB_ENDPOINT } from '../../constants/contact';

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(SHEETDB_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: form }),
      });
      if (res.ok) { setStatus('success'); setForm({ name: '', email: '', message: '' }); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  const inputCls = "w-full bg-card border border-white/6 text-text px-4 py-3 text-sm font-sans transition-colors focus:border-accent outline-none";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label className="text-xs uppercase tracking-[0.12em] text-muted mb-1.5 block">Name <span className="text-accent">*</span></label>
        <input type="text" name="name" value={form.name} onChange={handleChange} required className={inputCls} />
      </div>
      <div>
        <label className="text-xs uppercase tracking-[0.12em] text-muted mb-1.5 block">Email <span className="text-accent">*</span></label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required className={inputCls} />
      </div>
      <div>
        <label className="text-xs uppercase tracking-[0.12em] text-muted mb-1.5 block">Message <span className="text-accent">*</span></label>
        <textarea name="message" value={form.message} onChange={handleChange} required rows="4" className={`${inputCls} resize-vertical`} />
      </div>
      <button type="submit" disabled={status === 'sending'} className="self-start px-6 py-2.5 border border-accent text-accent text-xs uppercase tracking-[0.15em] hover:bg-accent hover:text-bg transition-all duration-300 disabled:opacity-50">
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>
      {status === 'success' && <p className="text-sm text-green-500/80">Message sent. Thank you.</p>}
      {status === 'error' && <p className="text-sm text-red-400/80">Something went wrong. Please try again.</p>}
    </form>
  );
};

export default ContactForm;
