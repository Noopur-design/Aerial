'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { megaMenus } from './menuData';

export default function MegaMenu({ menu, onNavigate, onMouseEnter, onMouseLeave, id }) {
  const ref = useRef(null);
  const data = megaMenus[menu];

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.6, ease: 'expo.out' });
      gsap.fromTo('[data-mega-item]', { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.025, delay: 0.1 });
    }, ref);
    return () => ctx.revert();
  }, [menu]);

  if (!data) return null;
  const isCollections = menu === 'collections';

  return (
    <div
      ref={ref}
      id={id}
      className="absolute inset-x-0 top-full border-b border-line bg-ivory text-charcoal shadow-[0_30px_60px_-30px_rgba(26,26,24,0.18)]"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="container-luxe grid grid-cols-12 gap-8 py-10">
        <div className={isCollections ? 'col-span-3 flex gap-12' : 'col-span-5 flex gap-16'}>
          {data.columns.map((col) => (
            <div key={col.title}>
              <p data-mega-item className="eyebrow mb-5 text-stone">
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href + l.label} data-mega-item>
                    <Link href={l.href} onClick={onNavigate} className="font-editorial text-[1.15rem] transition-colors hover:text-stone">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <ul className={isCollections ? 'col-span-9 grid grid-cols-4 gap-4' : 'col-span-7 grid grid-cols-2 gap-4'}>
          {data.cards.map((card) => (
            <li key={card.href + card.label} data-mega-item>
              <Link href={card.href} onClick={onNavigate} className="group block">
                <div className={`zoom-img relative overflow-hidden bg-taupe ${isCollections ? 'aspect-[3/4]' : 'aspect-[16/10]'}`}>
                  <Image src={card.image} alt={card.alt} fill sizes="(min-width: 1280px) 25vw, 33vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/55 via-transparent to-transparent" />
                  {card.number && <span className="absolute left-4 top-3 font-display text-2xl text-ivory">{card.number}</span>}
                  <span className="arrow-nudge absolute bottom-4 left-4 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.16em] text-ivory">
                    {card.label}
                    <ArrowRight size={14} strokeWidth={1.25} />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
