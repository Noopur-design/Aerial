'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Expand } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { cn } from '@/lib/format';

/**
 * Desktop: vertical thumbnails + main image + two supporting shots.
 * Mobile: swipeable scroll-snap strip with dot indicators.
 */
export default function ProductGallery({ images, name }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const strip = useRef(null);
  const supporting = images.filter((_, i) => i !== active).slice(0, 2);

  // sync dots with native swipe position
  useEffect(() => {
    const el = strip.current;
    if (!el) return undefined;
    const onScroll = () => setActive(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = (i) => {
    setActive(i);
    const el = strip.current;
    if (el && el.offsetParent !== null) el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' });
  };

  const onThumbKey = (e, i) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      const n = (i + 1) % images.length;
      goTo(n);
      e.currentTarget.parentElement.parentElement.children[n]?.querySelector('button')?.focus();
    }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const n = (i - 1 + images.length) % images.length;
      goTo(n);
      e.currentTarget.parentElement.parentElement.children[n]?.querySelector('button')?.focus();
    }
  };

  return (
    <div>
      {/* mobile swipe gallery */}
      <div className="md:hidden">
        <div ref={strip} className="no-scrollbar -mx-4 flex snap-x snap-mandatory overflow-x-auto" aria-roledescription="carousel" aria-label={`${name} images`}>
          {images.map((src, i) => (
            <div key={src} className="relative aspect-[4/5] w-full shrink-0 snap-center bg-taupe" aria-label={`Image ${i + 1} of ${images.length}`} role="group">
              <Image src={src} alt={`${name} — view ${i + 1}`} fill sizes="100vw" preload={i === 0} className="object-cover" />
            </div>
          ))}
        </div>
        {images.length > 1 && (
          <div className="mt-4 flex justify-center gap-2">
            {images.map((src, i) => (
              <button key={src} type="button" aria-label={`Show image ${i + 1}`} aria-current={i === active} onClick={() => goTo(i)} className="p-1">
                <span className={cn('block h-[3px] rounded-full transition-all duration-500', i === active ? 'w-6 bg-charcoal' : 'w-3 bg-stone/50')} />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* desktop editorial gallery */}
      <div className="hidden gap-3 md:grid md:grid-cols-[72px_1fr] lg:grid-cols-[84px_1fr]">
        <ul className="flex flex-col gap-3" aria-label="Product thumbnails">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => goTo(i)}
                onKeyDown={(e) => onThumbKey(e, i)}
                aria-label={`View image ${i + 1}`}
                aria-current={i === active}
                className={cn('relative block aspect-[4/5] w-full overflow-hidden bg-taupe transition-opacity', i === active ? 'ring-1 ring-charcoal ring-offset-2 ring-offset-ivory' : 'opacity-70 hover:opacity-100')}
              >
                <Image src={src} alt="" fill sizes="90px" className="object-cover" />
              </button>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={() => setZoom(true)}
              className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-2 bg-charcoal text-[0.58rem] uppercase tracking-[0.14em] text-ivory transition-opacity hover:opacity-85"
            >
              <Expand size={18} strokeWidth={1} aria-hidden="true" />
              Full screen
            </button>
          </li>
        </ul>

        <div className={cn('grid gap-3', supporting.length ? 'lg:grid-cols-[1.75fr_1fr]' : '')}>
          <button type="button" onClick={() => setZoom(true)} className="group relative block aspect-[4/5] w-full cursor-zoom-in overflow-hidden bg-taupe" aria-label={`Open ${name} image full screen`}>
            <Image key={images[active]} src={images[active]} alt={`${name} — view ${active + 1}`} fill sizes="(min-width: 1024px) 38vw, 60vw" preload className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-luxe)] group-hover:scale-[1.03]" />
            <span className="absolute bottom-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-ivory/80 opacity-0 transition-opacity group-hover:opacity-100">
              <Expand size={16} strokeWidth={1.25} aria-hidden="true" />
            </span>
          </button>
          {supporting.length > 0 && (
            <div className="hidden gap-3 lg:grid lg:grid-rows-2">
              {supporting.map((src) => (
                <button key={src} type="button" onClick={() => goTo(images.indexOf(src))} className="relative overflow-hidden bg-taupe" aria-label="Show this image">
                  <Image src={src} alt="" fill sizes="20vw" className="object-cover transition-transform duration-700 hover:scale-[1.03]" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal open={zoom} onClose={() => setZoom(false)} title={`${name} — full screen`} dark className="h-full">
        <div className="relative mx-auto h-[85vh] max-w-5xl">
          <Image src={images[active]} alt={`${name} — view ${active + 1}`} fill sizes="100vw" className="object-contain" />
        </div>
        <div className="mt-4 flex justify-center gap-3">
          {images.map((src, i) => (
            <button key={src} type="button" onClick={() => setActive(i)} aria-label={`View image ${i + 1}`} className={cn('relative h-16 w-12 overflow-hidden', i === active ? 'ring-1 ring-ivory' : 'opacity-50 hover:opacity-100')}>
              <Image src={src} alt="" fill sizes="60px" className="object-cover" />
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
}
