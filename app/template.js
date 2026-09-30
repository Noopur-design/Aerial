'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { initMotion } from '@/lib/motion';
import Footer from '@/components/layout/Footer';

// Re-mounts on every navigation: fades the new page in and wires up
// the declarative scroll animations for everything inside it.
export default function Template({ children }) {
  const ref = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let tween;
    if (!prefersReducedMotion()) {
      tween = gsap.fromTo(el, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out', clearProps: 'transform' });
    }
    const cleanup = initMotion(el);
    return () => {
      tween?.kill();
      cleanup();
    };
  }, [pathname]);

  return (
    <div ref={ref} className="flex min-h-screen flex-col">
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
