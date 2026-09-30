'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Newsletter from '@/components/ui/Newsletter';
import { articles, journalCategories } from '@/data/journal';
import { formatDate, cn } from '@/lib/format';

export default function JournalView() {
  const params = useSearchParams();
  const initial = journalCategories.includes(params.get('category')) ? params.get('category') : 'All';
  const [cat, setCat] = useState(initial);
  const list = cat === 'All' ? articles : articles.filter((a) => a.category === cat);
  const [featured, ...rest] = list;

  return (
    <>
      <section className="container-luxe pb-10 pt-10">
        <div className="flex flex-col gap-6 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow text-stone">Stories, craft &amp; conscious living</p>
            <h1 className="mt-3 font-display text-[clamp(3.4rem,8vw,7rem)] font-normal uppercase leading-[0.9]">Journal</h1>
          </div>
          <nav aria-label="Journal categories">
            <ul className="flex flex-wrap gap-6">
              {['All', ...journalCategories].map((c) => (
                <li key={c}>
                  <button
                    type="button"
                    aria-pressed={cat === c}
                    onClick={() => setCat(c)}
                    className={cn('relative pb-2 text-[0.72rem] font-medium uppercase tracking-[0.16em]', cat === c ? 'after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-charcoal' : 'text-muted hover:text-charcoal')}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {featured && (
        <section aria-label="Featured article" className="container-luxe">
          <Link href={`/journal/${featured.slug}`} className="group grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center lg:gap-14">
            <div className="zoom-img relative aspect-[16/10] overflow-hidden bg-taupe" data-reveal-img>
              <Image src={featured.image} alt={featured.imageAlt} fill sizes="(min-width:1024px) 60vw, 100vw" preload className="object-cover" />
            </div>
            <div>
              <p className="eyebrow text-stone">
                Featured · {featured.category}
              </p>
              <h2 className="mt-4 font-editorial text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.02] transition-colors group-hover:text-muted">{featured.title}</h2>
              <p className="mt-5 text-[0.95rem] leading-relaxed text-muted">{featured.excerpt}</p>
              <p className="mt-5 text-[0.72rem] uppercase tracking-[0.14em] text-muted">
                {formatDate(featured.date, { day: 'numeric', month: 'long', year: 'numeric' })} · {featured.readTime}
              </p>
              <span className="arrow-nudge mt-7 inline-flex items-center gap-2.5 text-[0.72rem] font-medium uppercase tracking-[0.16em]">
                <span className="link-underline">Read article</span> <ArrowRight size={15} strokeWidth={1.25} aria-hidden="true" />
              </span>
            </div>
          </Link>
        </section>
      )}

      <section aria-label="Articles" className="container-luxe py-16 lg:py-20">
        {rest.length ? (
          <ul className="grid gap-x-6 gap-y-14 md:grid-cols-2 xl:grid-cols-3" data-reveal-stagger key={cat}>
            {rest.map((a) => (
              <li key={a.slug}>
                <Link href={`/journal/${a.slug}`} className="group block">
                  <div className="zoom-img relative aspect-[4/3] overflow-hidden bg-taupe">
                    <Image src={a.image} alt={a.imageAlt} fill sizes="(min-width:1280px) 30vw, (min-width:768px) 50vw, 100vw" className="object-cover" />
                  </div>
                  <p className="eyebrow mt-5 text-stone">{a.category}</p>
                  <h3 className="mt-2 font-editorial text-[1.55rem] leading-tight transition-colors group-hover:text-muted">{a.title}</h3>
                  <p className="mt-2 text-[0.88rem] text-muted">{a.excerpt}</p>
                  <p className="mt-4 flex items-center justify-between text-[0.7rem] uppercase tracking-[0.14em] text-muted">
                    {formatDate(a.date)}
                    <span className="arrow-nudge inline-flex items-center gap-2 text-charcoal">
                      Read article <ArrowRight size={13} strokeWidth={1.25} aria-hidden="true" />
                    </span>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-[0.9rem] text-muted">More {cat.toLowerCase()} stories are on their way.</p>
        )}
      </section>

      <section aria-labelledby="journal-news" className="border-t border-line bg-beige">
        <div className="container-luxe grid gap-8 py-16 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <p className="eyebrow mb-3 text-stone">The AERIAL letter</p>
            <h2 id="journal-news" className="display-sm">
              Stories worth slowing down for.
            </h2>
            <p className="mt-3 text-[0.9rem] text-muted">One thoughtful letter a month: new journal stories, collection previews and care guides.</p>
          </div>
          <Newsletter />
        </div>
      </section>
    </>
  );
}
