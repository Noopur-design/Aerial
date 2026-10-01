'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import OptionWheel from '@/components/reactbits/OptionWheel';
import Button from '@/components/ui/Button';
import { gsap, prefersReducedMotion } from '@/lib/gsap';

// All three hero images are bright, so hero text is charcoal for legibility.
const slides = [
  {
    eyebrow: 'Spring Summer ’25',
    lines: ['Wear', <em key="i" className="font-display italic">A Brighter</em>, 'Tomorrow'],
    text: ['Timeless pieces for a more conscious world.', 'Modern silhouettes. Lasting impact.'],
    image: '/images/campaign/hero-ivory.jpg',
    alt: 'Woman in an ivory linen suit seated by a dried palm and a pale ceramic vase',
    href: '/collections/essentials',
    position: '70% 30%',
  },
  {
    eyebrow: 'Just In',
    lines: ['The', <em key="i" className="font-display italic">New</em>, 'Edit'],
    text: ['Fresh silhouettes and elevated essentials.', 'Designed for brighter days ahead.'],
    image: '/images/campaign/new-edit.jpg',
    alt: 'Woman in an ivory blazer with windswept hair in soft, warm light',
    href: '/new-arrivals',
    position: '60% 25%',
  },
  {
    eyebrow: 'The Everyday Wardrobe',
    lines: ['Modern', <em key="i" className="font-display italic">Femininity</em>],
    text: ['Refined tailoring and considered essentials.', 'For every chapter of you.'],
    image: '/images/campaign/essentials.jpg',
    alt: 'Woman in an ivory linen blazer and scarf in warm natural light',
    href: '/women',
    position: '50% 25%',
  },
];

const WHEEL = [
  { label: 'New Arrivals', href: '/new-arrivals', image: '/images/campaign/new-edit.jpg' },
  { label: 'Women', href: '/women', image: '/images/campaign/women-hero.jpg' },
  { label: 'Men', href: '/men', image: '/images/campaign/autumn-man.jpg' },
  { label: 'Essentials', href: '/collections/essentials', image: '/images/products/tailored-oversized-blazer-1.jpg' },
  { label: 'Outerwear', href: '/shop?category=outerwear', image: '/images/products/longline-wool-coat-2.jpg' },
  { label: 'Accessories', href: '/shop?category=accessories', image: '/images/products/leather-tote-bag-1.jpg' },
];

function CategoryWheel() {
  const router = useRouter();
  const [index, setIndex] = useState(3);
  const down = useRef(null);
  const item = WHEEL[index];

  // A click on the already-centred option opens that category. Clicks on
  // other options only rotate the wheel (the component's own behaviour).
  const onClickCapture = (e) => {
    const moved = down.current && Math.hypot(e.clientX - down.current.x, e.clientY - down.current.y) > 6;
    if (!moved && e.target.closest('.option-wheel__item--selected')) router.push(item.href);
  };

  return (
    <div className="home-wheel-dark flex items-center gap-4">
      <div className="flex flex-col items-end">
        <div
          className="home-wheel relative h-[340px] w-[250px]"
          onPointerDown={(e) => (down.current = { x: e.clientX, y: e.clientY })}
          onClick={onClickCapture}
          onKeyDown={(e) => e.key === 'Enter' && router.push(item.href)}
        >
          <OptionWheel
            items={WHEEL.map((w) => w.label)}
            defaultSelected={3}
            onChange={(i) => setIndex(i)}
            textColor="rgba(26, 26, 24, 0.72)"
            activeColor="#1a1a18"
            side="right"
            fontSize={1.45}
            spacing={1.75}
            curve={1}
            tilt={9}
            blur={0.5}
            fade={0.14}
            minOpacity={0.5}
            smoothing={220}
            inset={28}
            loop={false}
            draggable
          />
          {/* arc guide + active dot, as in the campaign art direction */}
          <svg aria-hidden="true" className="pointer-events-none absolute -right-2 top-0 h-full w-10 text-charcoal/30" viewBox="0 0 40 340" fill="none">
            <path d="M4 6 C 36 110, 36 230, 4 334" stroke="currentColor" strokeWidth="1" />
          </svg>
          <span aria-hidden="true" className="pointer-events-none absolute right-[14px] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-charcoal" />
        </div>
        <Link href={item.href} className="arrow-nudge mt-2 inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.18em] text-charcoal">
          Shop {item.label} <ArrowRight size={14} strokeWidth={1.25} aria-hidden="true" />
        </Link>
      </div>
      <ul className="flex flex-col gap-2" aria-label="Category previews">
        {WHEEL.map((w, i) => (
          <li key={w.label}>
            <Link
              href={w.href}
              aria-label={`Shop ${w.label}`}
              className={`relative block h-[54px] w-[42px] overflow-hidden border transition-all duration-500 ${i === index ? 'border-charcoal opacity-100' : 'border-transparent opacity-45 hover:opacity-90'}`}
            >
              <Image src={w.image} alt="" fill sizes="42px" className="object-cover" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HomeHero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const root = useRef(null);
  const first = useRef(true);

  const go = useCallback((dir) => setActive((a) => (a + dir + slides.length) % slides.length), []);

  // autoplay (paused on hover/focus and for reduced motion)
  useEffect(() => {
    if (paused || prefersReducedMotion()) return undefined;
    const t = setTimeout(() => go(1), 7000);
    return () => clearTimeout(t);
  }, [active, paused, go]);

  // slide transition
  useEffect(() => {
    const el = root.current;
    if (!el) return undefined;
    const reduce = prefersReducedMotion();
    const ctx = gsap.context(() => {
      const slide = `[data-slide="${active}"]`;
      gsap.to('[data-slide]', { autoAlpha: 0, duration: reduce ? 0 : 1.1, ease: 'power2.inOut', overwrite: true });
      gsap.to(slide, { autoAlpha: 1, duration: reduce ? 0 : 1.1, ease: 'power2.inOut', overwrite: true });
      if (!reduce) {
        gsap.fromTo(`${slide} img`, { scale: 1.08 }, { scale: 1, duration: 7, ease: 'none' });
        gsap.fromTo(
          '[data-hero-line]',
          { yPercent: 110, y: 0 },
          { yPercent: 0, y: 0, duration: 1.2, ease: 'expo.out', stagger: 0.08, delay: first.current ? 0.35 : 0.15 }
        );
        gsap.fromTo('[data-hero-fade]', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08, delay: first.current ? 0.8 : 0.45 });
      }
      first.current = false;
    }, el);
    return () => ctx.kill?.();
  }, [active]);

  const s = slides[active];

  return (
    <section
      ref={root}
      aria-roledescription="carousel"
      aria-label="Featured campaigns"
      className="relative isolate flex min-h-[600px] flex-col overflow-hidden bg-beige text-charcoal h-[calc(100svh-var(--header-h))] max-h-[900px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map((sl, i) => (
        <div key={sl.image} data-slide={i} className="grain absolute inset-0 -z-10" style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? 'visible' : 'hidden' }} aria-hidden={i !== active}>
          <Image src={sl.image} alt={sl.alt} fill sizes="100vw" preload={i === 0} quality={85} className="object-cover" style={{ objectPosition: sl.position }} />
          {/* light scrims lift the text edges while keeping the image airy */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,249,242,0.86)_0%,rgba(255,249,242,0.55)_28%,rgba(255,249,242,0.08)_52%,rgba(255,249,242,0)_70%)]" />
          <div className="absolute inset-y-0 right-0 w-[38%] bg-[linear-gradient(270deg,rgba(255,249,242,0.6)_0%,rgba(255,249,242,0.12)_55%,rgba(255,249,242,0)_100%)] lg:block" />
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(0deg,rgba(255,249,242,0.7)_0%,rgba(255,249,242,0)_100%)]" />
          {/* narrow screens: the headline crosses the model, so add a light veil */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,249,242,0.5)_0%,rgba(255,249,242,0.18)_50%,rgba(255,249,242,0.45)_100%)] sm:hidden" />
        </div>
      ))}

      <div className="container-luxe relative flex flex-1 items-center">
        <div className="max-w-[640px] pb-24 sm:pb-20">
          <p data-hero-fade className="eyebrow mb-5 text-ink">
            {s.eyebrow}
          </p>
          <h1 className="font-display text-[clamp(3rem,7.4vw,6.6rem)] font-normal uppercase leading-[0.92] tracking-[-0.01em] text-charcoal" aria-live="polite">
            {s.lines.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                <span data-hero-line className="block">
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <p data-hero-fade className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-ink">
            {s.text[0]}
            <br />
            {s.text[1]}
          </p>
          <div data-hero-fade className="mt-8">
            <Button href={s.href}>Explore Collection</Button>
          </div>
        </div>

        <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 lg:block xl:right-12" data-hero-fade>
          <CategoryWheel />
        </div>
      </div>

      <div className="container-luxe relative pb-32 sm:pb-28">
        <div className="flex items-center gap-5 text-[0.8rem] text-charcoal">
          <span className="tabular-nums tracking-[0.12em]" aria-live="polite">
            0{active + 1} / 0{slides.length}
          </span>
          <span className="relative h-px w-28 bg-charcoal/25" aria-hidden="true">
            <span className="absolute inset-y-0 left-0 bg-charcoal transition-[width] duration-700" style={{ width: `${((active + 1) / slides.length) * 100}%` }} />
          </span>
          <button type="button" onClick={() => go(-1)} aria-label="Previous campaign" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/50 transition-colors hover:bg-charcoal hover:text-ivory">
            <ArrowLeft size={16} strokeWidth={1.25} />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next campaign" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/50 transition-colors hover:bg-charcoal hover:text-ivory">
            <ArrowRight size={16} strokeWidth={1.25} />
          </button>
        </div>
      </div>
    </section>
  );
}
