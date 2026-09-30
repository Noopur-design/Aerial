'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { cn } from '@/lib/format';

/**
 * Full-bleed crossfading campaign images with counter + arrows.
 * Children render above the images (headline, CTAs).
 */
export default function HeroSlider({ slides, className, overlay, controls = 'left', interval = 6500, children, light = true }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const root = useRef(null);
  const n = slides.length;

  useEffect(() => {
    if (paused || n < 2 || prefersReducedMotion()) return undefined;
    const t = setTimeout(() => setActive((a) => (a + 1) % n), interval);
    return () => clearTimeout(t);
  }, [active, paused, n, interval]);

  useEffect(() => {
    if (!root.current) return undefined;
    const reduce = prefersReducedMotion();
    const ctx = gsap.context(() => {
      gsap.to('[data-hs]', { autoAlpha: 0, duration: reduce ? 0 : 1.1, ease: 'power2.inOut', overwrite: true });
      gsap.to(`[data-hs="${active}"]`, { autoAlpha: 1, duration: reduce ? 0 : 1.1, ease: 'power2.inOut', overwrite: true });
      if (!reduce) gsap.fromTo(`[data-hs="${active}"] img`, { scale: 1.07 }, { scale: 1, duration: 6.5, ease: 'none' });
    }, root);
    return () => ctx.kill();
  }, [active]);

  const go = (d) => setActive((a) => (a + d + n) % n);

  return (
    <section
      ref={root}
      aria-roledescription="carousel"
      className={cn('relative isolate overflow-hidden', light && 'on-dark text-ivory', className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map((s, i) => (
        <div key={s.src + i} data-hs={i} className="grain absolute inset-0 -z-10" style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? 'visible' : 'hidden' }} aria-hidden={i !== active}>
          <Image src={s.src} alt={s.alt} fill sizes="100vw" preload={i === 0} quality={85} className="object-cover" style={{ objectPosition: s.position || 'center 30%' }} />
        </div>
      ))}
      {overlay && <div className={cn('absolute inset-0 -z-10', overlay)} />}
      {children}
      {n > 1 && (
        <div className={cn('absolute bottom-6 z-10 flex items-center gap-4 sm:bottom-8', controls === 'left' ? 'left-4 sm:left-7 xl:left-12' : 'right-4 sm:right-7 xl:right-12')}>
          <span className="font-display text-[1.05rem] tabular-nums tracking-[0.1em]" aria-live="polite">
            0{active + 1} / 0{n}
          </span>
          <span className="relative hidden h-px w-24 bg-current/30 sm:block" aria-hidden="true">
            <span className="absolute inset-y-0 left-0 bg-current transition-[width] duration-700" style={{ width: `${((active + 1) / n) * 100}%` }} />
          </span>
          <button type="button" onClick={() => go(-1)} aria-label="Previous image" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-current/60 transition-colors hover:bg-ivory hover:text-charcoal">
            <ArrowLeft size={16} strokeWidth={1.25} />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next image" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-current/60 transition-colors hover:bg-ivory hover:text-charcoal">
            <ArrowRight size={16} strokeWidth={1.25} />
          </button>
        </div>
      )}
    </section>
  );
}
