'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { useEscape, useFocusTrap, useLockBodyScroll } from '@/hooks/useUI';
import { cn } from '@/lib/format';

export default function Modal({ open, onClose, title, children, className, dark = false }) {
  const box = useRef(null);
  useLockBodyScroll(open);
  useEscape(open, onClose);
  useFocusTrap(box, open);

  useEffect(() => {
    if (!open || !box.current || prefersReducedMotion()) return;
    gsap.fromTo(box.current, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'expo.out' });
  }, [open]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8">
      <div className={cn('absolute inset-0', dark ? 'bg-charcoal/95' : 'bg-charcoal/40 backdrop-blur-[2px]')} onClick={onClose} aria-hidden="true" />
      <div
        ref={box}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={cn('relative max-h-full w-full overflow-y-auto outline-none', !dark && 'bg-ivory', className)}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className={cn(
            'absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center transition-opacity hover:opacity-60',
            dark ? 'text-ivory' : 'text-charcoal'
          )}
        >
          <X size={22} strokeWidth={1.25} />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
