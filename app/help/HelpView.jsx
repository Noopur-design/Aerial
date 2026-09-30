'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { LayoutGrid, Package, Truck, Undo2, ArrowLeftRight, CreditCard, Ruler, ChevronRight, Mail, MessageCircle, Phone, Search, X } from 'lucide-react';
import Accordion from '@/components/ui/Accordion';
import Media from '@/components/ui/Media';
import ScriptAccent from '@/components/ui/ScriptAccent';
import { faqs, faqTopics, sizeChart } from '@/data/faqs';
import { site } from '@/data/site';
import { cn } from '@/lib/format';

const ICONS = { Package, Truck, Undo2, ArrowLeftRight, CreditCard, Ruler };

function SizeTable() {
  return (
    <div className="mt-6 overflow-x-auto border border-line bg-[#fffbf5] p-4">
      <table className="w-full min-w-[420px] text-left text-[0.8rem]">
        <caption className="mb-3 text-left font-editorial text-[1.2rem]">Women’s size chart (cm)</caption>
        <thead>
          <tr className="border-b border-charcoal">
            {sizeChart.headers.map((h) => (
              <th key={h} scope="col" className="py-2 pr-3 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sizeChart.rows.map((r) => (
            <tr key={r[0]} className="border-b border-line">
              {r.map((c, i) => (i === 0 ? <th key={i} scope="row" className="py-2 pr-3 font-medium">{c}</th> : <td key={i} className="py-2 pr-3 text-muted">{c}</td>))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function HelpView() {
  const params = useSearchParams();
  const fromUrl = params.get('topic');
  const [topic, setTopic] = useState(faqTopics.some((t) => t.id === fromUrl) ? fromUrl : 'all');
  const [query, setQuery] = useState('');

  const [prevUrlTopic, setPrevUrlTopic] = useState(fromUrl);
  if (fromUrl !== prevUrlTopic) {
    setPrevUrlTopic(fromUrl);
    if (faqTopics.some((t) => t.id === fromUrl)) setTopic(fromUrl);
  }

  const choose = (id) => {
    setTopic(id);
    const url = new URL(window.location.href);
    if (id === 'all') url.searchParams.delete('topic');
    else url.searchParams.set('topic', id);
    window.history.replaceState(window.history.state, '', url);
  };

  const q = query.trim().toLowerCase();
  const sections = useMemo(
    () =>
      faqTopics
        .filter((t) => topic === 'all' || t.id === topic)
        .map((t) => ({ ...t, items: faqs[t.id].filter((f) => !q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)) }))
        .filter((t) => t.items.length),
    [topic, q]
  );
  const total = sections.reduce((n, s) => n + s.items.length, 0);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-beige">
        <Media src="/images/campaign/faq-hero.jpg" alt="Model in an ivory draped blouse in warm light" className="absolute inset-y-0 right-0 -z-10 w-full md:w-[58%]" sizes="58vw" preload position="50% 25%" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#f3e6d5_0%,#f3e6d5_40%,rgba(243,230,213,0.55)_60%,rgba(243,230,213,0)_80%)] max-md:bg-beige/85" />
        <div className="container-luxe py-12 lg:py-16">
          <p className="eyebrow mb-4">Help Center</p>
          <h1 className="font-display text-[clamp(3rem,6.6vw,5.8rem)] font-normal leading-[0.95]">
            Frequently Asked
            <br />
            Questions
          </h1>
          <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-ink">
            Find answers to common questions about orders, shipping, returns, sizing and more. We’re here to make your experience with AERIAL seamless and enjoyable.
          </p>
          <div className="relative mt-7 max-w-md">
            <label htmlFor="faq-search" className="sr-only">
              Search FAQs
            </label>
            <Search size={17} strokeWidth={1.25} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <input id="faq-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search FAQs, e.g. “refund” or “COD”" className="field h-12 pl-11 pr-11 [&::-webkit-search-cancel-button]:hidden" />
            {query && (
              <button type="button" onClick={() => setQuery('')} aria-label="Clear FAQ search" className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center">
                <X size={15} strokeWidth={1.25} />
              </button>
            )}
          </div>
        </div>
        <ScriptAccent className="absolute right-10 top-12 hidden text-[3.2rem] lg:block" />
      </section>

      <nav aria-label="Help topics" className="border-b border-line">
        <ul className="container-luxe no-scrollbar flex gap-2 overflow-x-auto lg:justify-between">
          {[{ id: 'all', label: 'All Topics', icon: null }, ...faqTopics].map((t) => {
            const Icon = t.icon ? ICONS[t.icon] : LayoutGrid;
            const on = topic === t.id;
            return (
              <li key={t.id}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => choose(t.id)}
                  className={cn('relative flex h-16 items-center gap-3 whitespace-nowrap px-4 text-[0.72rem] font-medium uppercase tracking-[0.12em] transition-colors', on ? 'after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:bg-charcoal' : 'text-muted hover:text-charcoal')}
                >
                  <Icon size={19} strokeWidth={1.1} aria-hidden="true" /> {t.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="container-luxe grid gap-10 py-10 lg:grid-cols-[230px_1fr_320px] xl:grid-cols-[270px_1fr_370px] xl:gap-14">
        <aside aria-label="FAQ categories" className="hidden lg:block">
          <div className="sticky top-[calc(var(--header-h)+1.5rem)] space-y-3">
            <ul className="border border-line bg-[#fffbf5]">
              {faqTopics.map((t) => (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => choose(t.id)}
                    aria-current={topic === t.id ? 'true' : undefined}
                    className={cn('flex w-full items-center justify-between px-6 py-4 text-[0.88rem] transition-colors', topic === t.id ? 'bg-beige font-medium' : 'hover:bg-beige/50')}
                  >
                    {t.label} <ChevronRight size={15} strokeWidth={1.25} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
            <div className="on-dark relative aspect-[4/5] overflow-hidden text-ivory">
              <Media src="/images/editorial/rack-dark.jpg" alt="Garments on a rail in shadow" className="absolute inset-0" sizes="270px" />
              <p className="absolute bottom-8 left-6 font-editorial text-[1.7rem] leading-[1.05]">
                Timeless Pieces.
                <br />
                Thoughtful Support.
                <span className="mt-4 block h-px w-10 bg-ivory/70" />
              </p>
            </div>
          </div>
        </aside>

        <div aria-live="polite">
          {q && (
            <p className="mb-6 text-[0.85rem] text-muted">
              {total} result{total === 1 ? '' : 's'} for “{query}”
            </p>
          )}
          {sections.length ? (
            sections.map((s) => (
              <section key={s.id} aria-labelledby={`faq-${s.id}`} className="mb-14 last:mb-0">
                <div className="mb-2 flex items-end justify-between">
                  <h2 id={`faq-${s.id}`} className="font-editorial text-[clamp(2rem,3.4vw,2.6rem)] leading-none">
                    {s.label}
                  </h2>
                  <p className="text-[0.7rem] uppercase tracking-[0.14em] text-muted">
                    {s.items.length} question{s.items.length === 1 ? '' : 's'}
                  </p>
                </div>
                <Accordion key={`${s.id}-${q}`} items={s.items} defaultOpen={s.id === sections[0].id || q ? [0] : []} className="mt-4" />
                {s.id === 'sizing' && <SizeTable />}
              </section>
            ))
          ) : (
            <div className="border border-line p-10 text-center">
              <p className="font-editorial text-[1.8rem]">No answers match “{query}”.</p>
              <p className="mt-2 text-[0.88rem] text-muted">Try another word, or ask our team directly — we reply within 24 hours.</p>
            </div>
          )}
        </div>

        <aside aria-label="Contact support">
          <div className="sticky top-[calc(var(--header-h)+1.5rem)] border border-line bg-[#fffbf5]">
            <Media src="/images/editorial/label-tag.jpg" alt="An AERIAL swing tag resting on a textured knit" className="aspect-[3/2]" sizes="370px" />
            <div className="p-6 sm:p-8">
              <p className="eyebrow text-stone">Still need help?</p>
              <h2 className="mt-2 font-editorial text-[2rem] leading-tight">Contact Our Support Team</h2>
              <p className="mt-2 text-[0.85rem] text-muted">Our team is here to assist you with any questions or concerns.</p>
              <ul className="mt-7 space-y-6 text-[0.84rem]">
                <li className="flex gap-4">
                  <Mail size={22} strokeWidth={1.1} className="shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-medium">Email Us</p>
                    <a href={`mailto:${site.email}`} className="hover:underline">
                      {site.email}
                    </a>
                    <p className="text-[0.74rem] text-muted">We usually respond within 24 hours.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <MessageCircle size={22} strokeWidth={1.1} className="shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-medium">Live Chat</p>
                    <p className="text-[0.74rem] text-muted">Available {site.hours}</p>
                    <Link href="/contact" className="text-[0.74rem] underline underline-offset-4">
                      Start a conversation
                    </Link>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Phone size={22} strokeWidth={1.1} className="shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-medium">Call Us</p>
                    <a href={site.phoneHref} className="hover:underline">
                      {site.phone}
                    </a>
                    <p className="text-[0.74rem] text-muted">{site.hours}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
