'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Expand, ArrowLeft, ArrowRight } from 'lucide-react';
import CampaignCarousel from '@/components/home/CampaignCarousel';
import ProductGrid from '@/components/product/ProductGrid';
import Modal from '@/components/ui/Modal';
import { lookbooks } from '@/data/lookbook';
import { getProduct } from '@/data/products';
import { cn } from '@/lib/format';

export default function LookbookView() {
  const [season, setSeason] = useState(lookbooks[0].id);
  const [viewer, setViewer] = useState(null);
  const book = lookbooks.find((l) => l.id === season);
  const looks = book.looks;
  const related = [...new Set(looks.flatMap((l) => l.products))].map(getProduct).filter(Boolean).slice(0, 8);

  const step = (d) => setViewer((v) => (v + d + looks.length) % looks.length);

  return (
    <>
      <section className="container-luxe pb-6 pt-10">
        <p className="eyebrow text-stone">The Lookbook</p>
        <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="font-display text-[clamp(3rem,6.4vw,5.6rem)] font-normal uppercase leading-[0.92]">{book.title}</h1>
            <p className="mt-4 max-w-lg text-[0.95rem] text-muted">{book.intro}</p>
          </div>
          <nav aria-label="Seasons">
            <ul className="flex flex-wrap gap-2">
              {lookbooks.map((l) => (
                <li key={l.id}>
                  <button
                    type="button"
                    aria-pressed={l.id === season}
                    onClick={() => setSeason(l.id)}
                    className={cn('h-10 border px-5 text-[0.7rem] uppercase tracking-[0.14em] transition-colors', l.id === season ? 'border-charcoal bg-charcoal text-ivory' : 'border-line hover:border-charcoal')}
                  >
                    {l.season}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <section aria-label={`${book.title} carousel`} className="overflow-hidden pb-14">
        <CampaignCarousel key={season} items={looks.map((l) => ({ ...l, alt: `${l.title}: ${l.subtitle}`, href: `/products/${l.products[0]}` }))} height="h-[72vh] min-h-[460px] max-h-[820px]" cardHeight={0.7} />
      </section>

      {/* editorial gallery */}
      <section aria-labelledby="gallery-title" className="container-luxe border-t border-line py-16">
        <h2 id="gallery-title" className="caps-serif mb-10 text-[clamp(2rem,4vw,3.2rem)]">
          Every Look
        </h2>
        <ul className="columns-2 gap-3 md:columns-3 [&>li]:mb-3">
          {looks.map((l, i) => (
            <li key={l.src + i} className="break-inside-avoid">
              <figure className="group relative overflow-hidden bg-taupe">
                <button type="button" onClick={() => setViewer(i)} className="block w-full cursor-zoom-in" aria-label={`View ${l.title} full screen`}>
                  <Image src={l.src} alt={`${l.title}: ${l.subtitle}`} width={900} height={i % 3 === 1 ? 700 : 1100} sizes="(min-width:768px) 33vw, 50vw" className="h-auto w-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.03]" />
                </button>
                <span className="pointer-events-none absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-ivory/80 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true">
                  <Expand size={15} strokeWidth={1.25} />
                </span>
                <figcaption className="flex items-center justify-between gap-3 bg-ivory px-1 pt-3 text-[0.8rem]">
                  <span>
                    <span className="font-editorial text-[1.05rem]">{l.title}</span> <span className="text-muted">· {l.subtitle}</span>
                  </span>
                  <Link href={`/products/${l.products[0]}`} className="shrink-0 text-[0.68rem] uppercase tracking-[0.14em] underline underline-offset-4">
                    Shop the look
                  </Link>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="look-products" className="container-luxe border-t border-line py-16">
        <h2 id="look-products" className="caps-serif mb-10 text-[clamp(1.8rem,3.4vw,2.8rem)]">
          Shop the Pieces
        </h2>
        <ProductGrid products={related} />
      </section>

      <Modal open={viewer !== null} onClose={() => setViewer(null)} title="Look viewer" dark className="h-full">
        {viewer !== null && (
          <div className="flex h-full flex-col text-ivory">
            <div className="relative flex-1">
              <Image src={looks[viewer].src} alt={`${looks[viewer].title}: ${looks[viewer].subtitle}`} fill sizes="100vw" className="object-contain" />
            </div>
            <div className="flex items-center justify-between gap-4 py-4">
              <button type="button" onClick={() => step(-1)} aria-label="Previous look" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ivory/60 hover:bg-ivory hover:text-charcoal">
                <ArrowLeft size={17} strokeWidth={1.25} />
              </button>
              <div className="text-center">
                <p className="font-editorial text-[1.3rem]">{looks[viewer].title}</p>
                <p className="text-[0.75rem] text-ivory/70">{looks[viewer].subtitle}</p>
                <div className="mt-2 flex flex-wrap justify-center gap-3">
                  {looks[viewer].products.map((slug) => {
                    const p = getProduct(slug);
                    return p ? (
                      <Link key={slug} href={`/products/${slug}`} className="text-[0.7rem] uppercase tracking-[0.14em] underline underline-offset-4">
                        {p.name}
                      </Link>
                    ) : null;
                  })}
                </div>
              </div>
              <button type="button" onClick={() => step(1)} aria-label="Next look" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ivory/60 hover:bg-ivory hover:text-charcoal">
                <ArrowRight size={17} strokeWidth={1.25} />
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
