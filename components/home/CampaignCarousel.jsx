'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import FlexCarousel from '@/components/reactbits/FlexCarousel';
import { cn } from '@/lib/format';

/**
 * Brand wrapper around the React Bits FlexCarousel: liquid preset, rise intro,
 * focus-on-click and captions. Each item may carry an `href` for "Shop the look".
 */
export default function CampaignCarousel({ items, height = 'h-[62vh] min-h-[420px] max-h-[720px]', cardHeight = 0.72, light = false, className, cta = 'Shop the look' }) {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <div className={cn('relative', className)}>
      <div className={cn('brand-carousel', height, light ? 'text-ivory' : 'text-charcoal')}>
        <FlexCarousel
          items={items.map(({ src, alt, title, subtitle }) => ({ src, alt, title, subtitle }))}
          preset="liquid"
          intro="rise"
          focusOnClick
          captions
          cardHeight={cardHeight}
          gap={14}
          radius={0}
          captureWheel={false}
          onChange={(i) => setActive(i)}
        />
      </div>
      {current?.href && (
        <div className="mt-4 flex justify-center">
          <Link
            href={current.href}
            className={cn('arrow-nudge inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.18em]', light ? 'text-ivory' : 'text-charcoal')}
          >
            <span className="link-underline">
              {cta}: {current.title}
            </span>
            <ArrowRight size={14} strokeWidth={1.25} aria-hidden="true" />
          </Link>
        </div>
      )}
      <p className={cn('mt-3 text-center text-[0.7rem]', light ? 'text-ivory/55' : 'text-muted')}>Drag, scroll sideways or use the arrow keys · click an image to focus</p>
    </div>
  );
}
