'use client';

import { useState } from 'react';
import { ArrowRight, Eye, EyeOff, Info } from 'lucide-react';
import Media from '@/components/ui/Media';
import Logo from '@/components/ui/Logo';
import { useStore } from '@/store/useStore';
import { isEmail, cn } from '@/lib/format';

const titleCase = (s) => s.replace(/[._-]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path fill="#4285F4" d="M22.5 12.3c0-.8-.1-1.5-.2-2.2H12v4.2h5.9a5 5 0 0 1-2.2 3.3v2.7h3.5c2.1-1.9 3.3-4.7 3.3-8z" />
      <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.5-2.7c-1 .7-2.3 1.1-3.8 1.1-2.9 0-5.4-2-6.3-4.6H2.1v2.8A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.7 14.1a6.6 6.6 0 0 1 0-4.2V7.1H2.1a11 11 0 0 0 0 9.8l3.6-2.8z" />
      <path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.1-3.1A11 11 0 0 0 2.1 7.1l3.6 2.8C6.6 7.4 9.1 5.4 12 5.4z" />
    </svg>
  );
}

function AppleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5a4.4 4.4 0 0 0-3.4-1.9c-1.5-.1-2.8.9-3.6.9-.8 0-1.9-.8-3.1-.8a4.6 4.6 0 0 0-3.9 2.4c-1.7 2.9-.4 7.2 1.2 9.5.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3.1.7c1.3 0 2.1-1.1 2.9-2.3a9.8 9.8 0 0 0 1.3-2.7 4.2 4.2 0 0 1-2.4-3.9zM14 5.8a4.2 4.2 0 0 0 1-3 4.3 4.3 0 0 0-2.8 1.4 4 4 0 0 0-1 2.9A3.6 3.6 0 0 0 14 5.8z" />
    </svg>
  );
}

export default function SignIn() {
  const signIn = useStore((s) => s.signIn);
  const showToast = useStore((s) => s.showToast);
  const [mode, setMode] = useState('signin'); // signin | create | forgot
  const [form, setForm] = useState({ name: '', email: '', password: '', remember: true });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (mode === 'create' && form.name.trim().length < 2) err.name = 'Please enter your name.';
    if (!isEmail(form.email)) err.email = 'Enter a valid email address.';
    if (mode !== 'forgot' && form.password.length < 6) err.password = 'Passwords must be at least 6 characters.';
    setErrors(err);
    if (Object.keys(err).length) {
      document.getElementById(`acc-${Object.keys(err)[0]}`)?.focus();
      return;
    }
    if (mode === 'forgot') {
      setSent(true);
      return;
    }
    const name = mode === 'create' ? form.name.trim() : titleCase(form.email.split('@')[0]);
    signIn({ name, email: form.email.trim(), phone: '', city: '', memberSince: new Date().toISOString() });
    showToast(mode === 'create' ? `Welcome to AERIAL, ${name.split(' ')[0]}` : `Welcome back, ${name.split(' ')[0]}`);
  };

  const social = (provider) => showToast(`${provider} sign-in isn’t connected in this demo — use email instead.`);

  const heading = { signin: ['Welcome back', 'Sign In'], create: ['Join AERIAL', 'Create Account'], forgot: ['Account help', 'Reset Password'] }[mode];

  return (
    <div className="grid lg:min-h-[calc(100svh-var(--header-h))] lg:grid-cols-2">
      <div className="on-dark relative hidden min-h-[560px] overflow-hidden text-ivory lg:block">
        <Media src="/images/campaign/signin.jpg" alt="Model in an espresso tailored suit in warm light" className="absolute inset-0" sizes="50vw" preload grain position="50% 20%" />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/70 via-espresso/20 to-transparent" />
        <div className="relative flex h-full flex-col justify-between p-12 xl:p-16">
          <div>
            <h2 className="font-display text-[clamp(3.2rem,5vw,4.8rem)] font-normal leading-[0.95]">
              More
              <br />
              Than
              <br />
              Fashion.
            </h2>
            <p className="mt-8 font-display text-[1.05rem] uppercase leading-snug tracking-[0.04em]">
              A community of
              <br />
              people, pieces and
              <br />a more conscious
              <br />
              tomorrow.
            </p>
            <span className="mt-8 block h-px w-14 bg-ivory/60" />
          </div>
          <p className="font-display text-[1rem] uppercase leading-snug">
            Timeless style.
            <br />
            Meaningful connections.
          </p>
        </div>
      </div>

      <div className="relative flex flex-col px-4 py-10 sm:px-10 lg:px-16 xl:px-24">
        <div className="mb-10 flex items-center justify-end gap-4 text-[0.8rem]">
          {mode === 'signin' ? (
            <>
              <span className="text-muted">New here?</span>
              <button type="button" onClick={() => { setMode('create'); setErrors({}); }} className="h-11 border border-charcoal px-6 text-[0.72rem] uppercase tracking-[0.14em] hover:bg-charcoal hover:text-ivory">
                Create Account
              </button>
            </>
          ) : (
            <>
              <span className="text-muted">Already a member?</span>
              <button type="button" onClick={() => { setMode('signin'); setErrors({}); setSent(false); }} className="h-11 border border-charcoal px-6 text-[0.72rem] uppercase tracking-[0.14em] hover:bg-charcoal hover:text-ivory">
                Sign In
              </button>
            </>
          )}
        </div>

        <div className="mx-auto w-full max-w-md flex-1">
          <p className="eyebrow">{heading[0]}</p>
          <h1 className="mt-2 font-display text-[clamp(2.8rem,5vw,4rem)] font-normal leading-none">{heading[1]}</h1>
          <p className="mt-4 text-[0.9rem] text-muted">
            {mode === 'forgot' ? 'Enter your email and we’ll send you a link to reset your password.' : 'Access your account to track orders, manage your wishlist and more.'}
          </p>

          <p className="mt-6 flex items-start gap-2 bg-beige/70 px-4 py-3 text-[0.75rem] text-ink">
            <Info size={14} strokeWidth={1.25} className="mt-0.5 shrink-0" aria-hidden="true" />
            Demo account: sign in with any email and a password of 6+ characters. Details are stored only in this browser — no account is created on a server.
          </p>

          {mode === 'forgot' && sent ? (
            <div role="status" className="mt-8 border border-line p-6 text-[0.9rem]">
              If an account exists for <strong className="font-medium">{form.email}</strong>, a reset link would be on its way. (Demo — no email is sent.)
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="mt-8 space-y-5">
              {mode === 'create' && (
                <div>
                  <label htmlFor="acc-name" className="field-label">
                    Full name
                  </label>
                  <input id="acc-name" autoComplete="name" className="field" value={form.name} onChange={set('name')} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'acc-name-e' : undefined} />
                  {errors.name && <p id="acc-name-e" className="field-error">{errors.name}</p>}
                </div>
              )}
              <div>
                <label htmlFor="acc-email" className="field-label">
                  Email address
                </label>
                <input id="acc-email" type="email" autoComplete="email" placeholder="your@email.com" className="field" value={form.email} onChange={set('email')} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'acc-email-e' : undefined} />
                {errors.email && <p id="acc-email-e" className="field-error">{errors.email}</p>}
              </div>
              {mode !== 'forgot' && (
                <div>
                  <label htmlFor="acc-password" className="field-label">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="acc-password"
                      type={show ? 'text' : 'password'}
                      autoComplete={mode === 'create' ? 'new-password' : 'current-password'}
                      placeholder="Enter your password"
                      className="field pr-12"
                      value={form.password}
                      onChange={set('password')}
                      aria-invalid={!!errors.password}
                      aria-describedby={errors.password ? 'acc-password-e' : undefined}
                    />
                    <button type="button" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'} className="absolute right-1 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center text-muted hover:text-charcoal">
                      {show ? <EyeOff size={17} strokeWidth={1.25} /> : <Eye size={17} strokeWidth={1.25} />}
                    </button>
                  </div>
                  {errors.password && <p id="acc-password-e" className="field-error">{errors.password}</p>}
                </div>
              )}
              {mode === 'signin' && (
                <div className="flex items-center justify-between text-[0.8rem]">
                  <label className="flex items-center gap-2.5">
                    <input type="checkbox" checked={form.remember} onChange={set('remember')} className="h-4 w-4 accent-charcoal" />
                    Keep me signed in
                  </label>
                  <button type="button" onClick={() => { setMode('forgot'); setErrors({}); }} className="underline underline-offset-4 hover:text-muted">
                    Forgot password?
                  </button>
                </div>
              )}
              <button type="submit" className="arrow-nudge flex h-13 w-full items-center justify-center gap-3 bg-charcoal py-4 text-[0.75rem] uppercase tracking-[0.18em] text-ivory hover:bg-[#33302b]">
                {mode === 'signin' ? 'Sign In' : mode === 'create' ? 'Create Account' : 'Send reset link'} <ArrowRight size={16} strokeWidth={1.25} aria-hidden="true" />
              </button>
            </form>
          )}

          {mode !== 'forgot' && (
            <>
              <div className="my-7 flex items-center gap-4 text-[0.75rem] text-muted" aria-hidden="true">
                <span className="h-px flex-1 bg-line" /> or continue with <span className="h-px flex-1 bg-line" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => social('Google')} className="flex h-12 items-center justify-center gap-3 border border-line bg-[#fffdf9] text-[0.8rem] font-medium hover:border-charcoal">
                  <GoogleMark /> Continue with Google
                </button>
                <button type="button" onClick={() => social('Apple')} className="flex h-12 items-center justify-center gap-3 border border-line bg-[#fffdf9] text-[0.8rem] font-medium hover:border-charcoal">
                  <AppleMark /> Continue with Apple
                </button>
              </div>
            </>
          )}
        </div>
        <p aria-hidden="true" className={cn('pointer-events-none absolute bottom-10 right-10 hidden -rotate-12 font-script text-[2.3rem] leading-[0.85] text-stone/70 xl:block')}>
          People, pieces
          <br />
          and a more conscious
          <br />
          tomorrow.
        </p>
        <div className="mt-12 flex justify-center lg:hidden">
          <Logo as="span" size="sm" />
        </div>
      </div>
    </div>
  );
}
