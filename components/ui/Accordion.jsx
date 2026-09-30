'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { cn } from '@/lib/format';

function Panel({ open, id, labelledBy, children }) {
  const ref = useRef(null);
  const first = useRef(true);
  // Only the initial state is expressed in markup; GSAP owns it afterwards.
  const [initiallyOpen] = useState(open);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (first.current) {
      first.current = false;
      gsap.set(el, { height: open ? 'auto' : 0, autoAlpha: open ? 1 : 0 });
      return;
    }
    const d = prefersReducedMotion() ? 0 : 0.5;
    if (open) gsap.fromTo(el, { height: 0, autoAlpha: 0 }, { height: 'auto', autoAlpha: 1, duration: d, ease: 'power3.out' });
    else gsap.to(el, { height: 0, autoAlpha: 0, duration: d * 0.8, ease: 'power3.inOut' });
  }, [open]);

  return (
    <div ref={ref} id={id} role="region" aria-labelledby={labelledBy} className="overflow-hidden" style={initiallyOpen ? undefined : { height: 0, visibility: 'hidden', opacity: 0 }}>
      {children}
    </div>
  );
}

/**
 * items: [{ q|title, a|content }]. Keyboard: Enter/Space toggles, Up/Down/Home/End move focus.
 */
export default function Accordion({ items, defaultOpen = [], multiple = true, className, variant = 'faq' }) {
  const base = useId();
  const [open, setOpen] = useState(() => new Set(defaultOpen));
  const buttons = useRef([]);

  const toggle = (i) =>
    setOpen((prev) => {
      const next = new Set(multiple ? prev : []);
      if (prev.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const onKeyDown = (e, i) => {
    const n = items.length;
    let target = null;
    if (e.key === 'ArrowDown') target = (i + 1) % n;
    if (e.key === 'ArrowUp') target = (i - 1 + n) % n;
    if (e.key === 'Home') target = 0;
    if (e.key === 'End') target = n - 1;
    if (target !== null) {
      e.preventDefault();
      buttons.current[target]?.focus();
    }
  };

  const faq = variant === 'faq';

  return (
    <div className={cn('border-t border-line', className)}>
      {items.map((item, i) => {
        const isOpen = open.has(i);
        const btnId = `${base}-b-${i}`;
        const panelId = `${base}-p-${i}`;
        return (
          <div key={i} className="border-b border-line">
            <h3>
              <button
                ref={(el) => (buttons.current[i] = el)}
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={cn(
                  'flex w-full items-center justify-between gap-6 text-left transition-opacity hover:opacity-70',
                  faq ? 'py-5 pl-0 sm:pl-6 font-editorial text-[1.12rem] sm:text-[1.2rem]' : 'py-4 text-[0.74rem] font-medium uppercase tracking-[0.14em]'
                )}
              >
                <span>{item.q || item.title}</span>
                <span className="relative inline-flex h-5 w-5 shrink-0 items-center justify-center" aria-hidden="true">
                  {isOpen ? <Minus size={18} strokeWidth={1.1} /> : <Plus size={18} strokeWidth={1.1} />}
                </span>
              </button>
            </h3>
            <Panel open={isOpen} id={panelId} labelledBy={btnId}>
              <div className={cn('text-[0.88rem] leading-relaxed text-muted', faq ? 'pb-6 pl-0 pr-10 sm:pl-6' : 'pb-5')}>
                {item.a || item.content}
              </div>
            </Panel>
          </div>
        );
      })}
    </div>
  );
}
