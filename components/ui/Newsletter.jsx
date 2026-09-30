'use client';

import { useId, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { isEmail, cn } from '@/lib/format';

/**
 * Newsletter sign-up with validation. Demo only — addresses are not sent anywhere.
 * variant: 'inline' (underlined field + arrow) | 'boxed' (field + subscribe button)
 */
export default function Newsletter({ variant = 'boxed', light = false, className, cta = 'Subscribe' }) {
  const id = useId();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email.trim()) return setError('Please enter your email address.');
    if (!isEmail(email)) return setError('Please enter a valid email address, e.g. name@example.com.');
    setError('');
    setDone(true);
  };

  if (done) {
    return (
      <div role="status" className={cn('flex items-start gap-3 text-[0.88rem]', light ? 'text-ivory' : 'text-charcoal', className)}>
        <span className={cn('mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border', light ? 'border-ivory/60' : 'border-charcoal/60')}>
          <Check size={13} strokeWidth={1.5} />
        </span>
        <p>
          Thank you — you’re on the list. Look out for new collections and stories at <strong className="font-medium">{email}</strong>.
          <span className={cn('mt-1 block text-[0.72rem]', light ? 'text-ivory/60' : 'text-muted')}>Demo sign-up: no email has been sent.</span>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className={className}>
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      {variant === 'inline' ? (
        <div className={cn('flex items-center border-b', light ? 'border-ivory/50' : 'border-charcoal/40')}>
          <input
            id={id}
            type="email"
            autoComplete="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-err` : undefined}
            className={cn(
              'w-full bg-transparent py-3 text-[0.88rem] outline-none',
              light ? 'text-ivory placeholder:text-ivory/55' : 'placeholder:text-stone'
            )}
          />
          <button type="submit" aria-label="Subscribe" className="arrow-nudge inline-flex h-11 w-11 items-center justify-center">
            <ArrowRight size={18} strokeWidth={1.25} />
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id={id}
            type="email"
            autoComplete="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-err` : undefined}
            className={cn(
              'field h-12 flex-1',
              light && '!border-ivory/30 !bg-transparent !text-ivory placeholder:!text-ivory/50 focus:!border-ivory'
            )}
          />
          <button
            type="submit"
            className={cn(
              'arrow-nudge inline-flex h-12 items-center justify-center gap-3 px-7 text-[0.72rem] font-medium uppercase tracking-[0.16em] transition-colors',
              light ? 'bg-ivory text-charcoal hover:bg-beige' : 'bg-charcoal text-ivory hover:bg-[#33302b]'
            )}
          >
            {cta}
            <ArrowRight size={15} strokeWidth={1.25} aria-hidden="true" />
          </button>
        </div>
      )}
      {error && (
        <p id={`${id}-err`} role="alert" className={cn('mt-2 text-[0.75rem]', light ? 'text-[#f1b9a8]' : 'text-burgundy')}>
          {error}
        </p>
      )}
    </form>
  );
}
