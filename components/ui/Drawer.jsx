'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { useEscape, useFocusTrap, useLockBodyScroll } from '@/hooks/useUI';
import { cn } from '@/lib/format';

/** Accessible slide-in panel with GSAP enter/exit. */
export default function Drawer({ open, onClose, side = 'right', title, label, className, children, footer, width = 'max-w-md' }) {
  const [mounted, setMounted] = useState(open);
  const panel = useRef(null);
  const overlay = useRef(null);

  useLockBodyScroll(mounted);
  useEscape(open, onClose);
  useFocusTrap(panel, open && mounted);

  // mount as soon as it opens; unmount after the exit animation completes
  if (open && !mounted) setMounted(true);

  useEffect(() => {
    if (!mounted || !panel.current) return undefined;
    const from = side === 'right' ? 100 : -100;
    const quick = prefersReducedMotion();
    if (open) {
      const tl = gsap.timeline();
      tl.fromTo(overlay.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: quick ? 0 : 0.4, ease: 'power2.out' });
      tl.fromTo(panel.current, { xPercent: from }, { xPercent: 0, duration: quick ? 0 : 0.7, ease: 'expo.out' }, 0);
      return () => tl.kill();
    }
    const tl = gsap.timeline({ onComplete: () => setMounted(false) });
    tl.to(panel.current, { xPercent: from, duration: quick ? 0 : 0.5, ease: 'power3.in' });
    tl.to(overlay.current, { autoAlpha: 0, duration: quick ? 0 : 0.3 }, quick ? 0 : 0.2);
    return () => tl.kill();
  }, [open, mounted, side]);

  if (!mounted || typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-[80]">
      <div ref={overlay} className="absolute inset-0 bg-charcoal/40 backdrop-blur-[2px]" onClick={onClose} aria-hidden="true" />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={label || title}
        tabIndex={-1}
        className={cn(
          'absolute top-0 flex h-full w-full flex-col bg-ivory shadow-[0_0_60px_rgba(26,26,24,0.12)] outline-none',
          width,
          side === 'right' ? 'right-0' : 'left-0',
          className
        )}
      >
        {title !== undefined && (
          <div className="flex items-center justify-between border-b border-line px-6 py-5">
            <h2 className="font-editorial text-2xl">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="-mr-2 inline-flex h-10 w-10 items-center justify-center transition-opacity hover:opacity-60"
            >
              <X size={20} strokeWidth={1.25} />
            </button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto overscroll-contain">{children}</div>
        {footer}
      </div>
    </div>,
    document.body
  );
}
