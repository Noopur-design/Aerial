'use client';

import { useEffect, useRef } from 'react';
import ProductCard from './ProductCard';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { cn } from '@/lib/format';

/** Responsive grid; cards stagger in whenever the result set changes. */
export default function ProductGrid({ products, columns = 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4', className, cardProps, view = 'grid' }) {
  const ref = useRef(null);
  const key = products.map((p) => p.slug).join('|');

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return undefined;
    const tween = gsap.fromTo(
      ref.current.children,
      { autoAlpha: 0, y: 26 },
      { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.06, ease: 'power3.out', clearProps: 'transform' }
    );
    return () => tween.kill();
  }, [key, view]);

  return (
    <div
      ref={ref}
      className={cn(
        'grid gap-x-3 gap-y-10 sm:gap-x-5',
        view === 'list' ? 'grid-cols-1 sm:grid-cols-2' : columns,
        className
      )}
    >
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} aspect={view === 'list' ? 'aspect-[16/10]' : undefined} {...cardProps} />
      ))}
    </div>
  );
}
