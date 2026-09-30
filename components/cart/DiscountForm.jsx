'use client';

import { useId, useState } from 'react';
import { X } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { lookupDiscount } from '@/lib/pricing';

// `nested` renders without a <form> so it can live inside the checkout form.
export default function DiscountForm({ label = 'Apply Discount Code', nested = false }) {
  const id = useId();
  const code = useStore((s) => s.discountCode);
  const apply = useStore((s) => s.applyDiscount);
  const remove = useStore((s) => s.removeDiscount);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const active = lookupDiscount(code);

  const Wrapper = nested ? 'div' : 'form';
  const submit = (e) => {
    e.preventDefault();
    if (!value.trim()) return setError('Enter a discount code.');
    const found = apply(value);
    if (!found) return setError('That code isn’t valid. Try AERIAL10, WELCOME15 or FREESHIP.');
    setError('');
    setValue('');
  };

  if (active) {
    return (
      <div className="flex items-center justify-between border border-dashed border-sage/60 bg-sage/5 px-4 py-3 text-[0.82rem]">
        <p>
          <span className="font-medium tracking-[0.08em]">{active.code}</span> <span className="text-muted">— {active.label}</span>
        </p>
        <button type="button" onClick={remove} aria-label={`Remove code ${active.code}`} className="inline-flex h-8 w-8 items-center justify-center hover:opacity-60">
          <X size={15} strokeWidth={1.25} />
        </button>
      </div>
    );
  }

  return (
    <Wrapper {...(nested ? { role: 'group', 'aria-label': 'Discount code' } : { onSubmit: submit, noValidate: true })}>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          id={id}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter code"
          autoComplete="off"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-e` : `${id}-h`}
          className="field h-12 flex-1 uppercase placeholder:normal-case"
          onKeyDown={nested ? (e) => e.key === 'Enter' && submit(e) : undefined}
        />
        <button type={nested ? 'button' : 'submit'} onClick={nested ? submit : undefined} className="h-12 bg-charcoal px-6 text-[0.72rem] uppercase tracking-[0.16em] text-ivory hover:bg-[#33302b]">
          Apply
        </button>
      </div>
      {error ? (
        <p id={`${id}-e`} role="alert" className="field-error">
          {error}
        </p>
      ) : (
        <p id={`${id}-h`} className="mt-2 text-[0.72rem] text-muted">
          Demo codes: AERIAL10 · WELCOME15 · FREESHIP
        </p>
      )}
    </Wrapper>
  );
}
