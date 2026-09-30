'use client';

import { useState } from 'react';
import { ArrowRight, ChevronDown, Check } from 'lucide-react';
import { isEmail } from '@/lib/format';

const SUBJECTS = ['Order enquiry', 'Returns & exchanges', 'Sizing & styling advice', 'Product information', 'Press & partnerships', 'Something else'];
const MAX = 500;

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: k === 'message' ? e.target.value.slice(0, MAX) : e.target.value }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
  };

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (form.name.trim().length < 2) err.name = 'Please enter your full name.';
    if (!isEmail(form.email)) err.email = 'Please enter a valid email address.';
    if (!form.subject) err.subject = 'Please choose a subject.';
    if (form.message.trim().length < 10) err.message = 'Please tell us a little more (at least 10 characters).';
    setErrors(err);
    const first = Object.keys(err)[0];
    if (first) return document.getElementById(`c-${first}`)?.focus();
    setSent(true);
  };

  if (sent) {
    return (
      <div role="status" className="flex flex-col items-start gap-4 border border-line bg-[#fffbf5] p-8">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-beige">
          <Check size={20} strokeWidth={1.4} aria-hidden="true" />
        </span>
        <p className="font-editorial text-[1.8rem] leading-tight">Thank you, {form.name.split(' ')[0]}.</p>
        <p className="text-[0.9rem] text-muted">
          Your message about “{form.subject.toLowerCase()}” has been received. We usually respond within 24 hours at <strong className="font-medium text-charcoal">{form.email}</strong>.
        </p>
        <p className="text-[0.72rem] text-muted">Demo form — no message has actually been sent.</p>
        <button type="button" onClick={() => { setForm({ name: '', email: '', subject: '', message: '' }); setSent(false); }} className="mt-2 text-[0.72rem] uppercase tracking-[0.14em] underline underline-offset-4">
          Send another message
        </button>
      </div>
    );
  }

  const field = (k) => ({ id: `c-${k}`, 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `c-${k}-e` : undefined });
  const err = (k) => errors[k] && <p id={`c-${k}-e`} role="alert" className="field-error">{errors[k]}</p>;

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div>
        <label htmlFor="c-name" className="field-label">
          Full Name <span className="text-burgundy" aria-hidden="true">*</span>
        </label>
        <input {...field('name')} autoComplete="name" placeholder="Your name" className="field" value={form.name} onChange={set('name')} />
        {err('name')}
      </div>
      <div>
        <label htmlFor="c-email" className="field-label">
          Email Address <span className="text-burgundy" aria-hidden="true">*</span>
        </label>
        <input {...field('email')} type="email" autoComplete="email" placeholder="your@email.com" className="field" value={form.email} onChange={set('email')} />
        {err('email')}
      </div>
      <div>
        <label htmlFor="c-subject" className="field-label">
          Subject <span className="text-burgundy" aria-hidden="true">*</span>
        </label>
        <div className="relative">
          <select {...field('subject')} className="field appearance-none pr-10" value={form.subject} onChange={set('subject')}>
            <option value="">Select a subject</option>
            {SUBJECTS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <ChevronDown size={15} strokeWidth={1.25} aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" />
        </div>
        {err('subject')}
      </div>
      <div>
        <label htmlFor="c-message" className="field-label">
          Message <span className="text-burgundy" aria-hidden="true">*</span>
        </label>
        <textarea {...field('message')} rows={5} placeholder="How can we help you?" className="field resize-y" value={form.message} onChange={set('message')} />
        <div className="flex justify-between">
          {err('message') || <span />}
          <p className="mt-1.5 text-[0.72rem] text-muted" aria-live="polite">
            {form.message.length}/{MAX}
          </p>
        </div>
      </div>
      <button type="submit" className="arrow-nudge inline-flex h-13 items-center gap-3 bg-charcoal px-12 py-4 text-[0.75rem] uppercase tracking-[0.18em] text-ivory hover:bg-[#33302b]">
        Send Message <ArrowRight size={16} strokeWidth={1.25} aria-hidden="true" />
      </button>
    </form>
  );
}
