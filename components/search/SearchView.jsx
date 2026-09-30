'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import ProductListing from '@/components/product/ProductListing';
import Button from '@/components/ui/Button';
import { searchProducts, suggestCorrection, autocomplete } from '@/lib/search';
import { collections } from '@/data/collections';
import { formatINR } from '@/lib/format';

const SUGGESTED = ['blazer', 'black blazer', 'oversized blazer', 'linen', 'satin dress', 'knitwear', 'leather bag', 'wide leg trousers'];
const POPULAR = ['blazer', 'dresses', 'coat', 'linen shirt', 'trousers', 'cashmere'];

export default function SearchView() {
  const router = useRouter();
  const params = useSearchParams();
  const q = params.get('q') || '';
  const [value, setValue] = useState(q);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const listId = useId();

  const [prevQ, setPrevQ] = useState(q);
  if (q !== prevQ) {
    setPrevQ(q);
    setValue(q);
  }
  useEffect(() => {
    if (!q) inputRef.current?.focus({ preventScroll: true });
  }, [q]);

  const results = useMemo(() => searchProducts(q), [q]);
  const correction = useMemo(() => (q && !results.length ? suggestCorrection(q) : null), [q, results.length]);
  const typeahead = useMemo(() => (focused ? autocomplete(value) : []), [value, focused]);

  const submit = (term) => {
    const t = (term ?? value).trim();
    setFocused(false);
    router.replace(t ? `/search?q=${encodeURIComponent(t)}` : '/search', { scroll: false });
    if (t) setTimeout(() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
  };

  const clear = () => {
    setValue('');
    router.replace('/search', { scroll: false });
    inputRef.current?.focus();
  };

  return (
    <>
      <section className="on-dark relative isolate overflow-hidden bg-espresso text-ivory">
        <Image src="/images/campaign/signin.jpg" alt="" fill sizes="100vw" preload className="-z-10 object-cover opacity-70" style={{ objectPosition: '20% 20%' }} />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(26,22,18,0.3)_0%,rgba(26,22,18,0.75)_40%,rgba(26,22,18,0.85)_100%)]" />
        <div className="container-luxe flex flex-col items-center py-16 text-center lg:py-20">
          <h1 className="font-editorial text-[clamp(2.4rem,5.4vw,4.4rem)] leading-none">What are you looking for?</h1>

          <form
            role="search"
            className="relative mt-10 w-full max-w-2xl"
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <label htmlFor="site-search" className="sr-only">
              Search products, categories and collections
            </label>
            <div className="flex h-14 items-center rounded-full bg-ivory pl-6 pr-2 text-charcoal sm:h-16">
              <Search size={20} strokeWidth={1.25} aria-hidden="true" />
              <input
                ref={inputRef}
                id="site-search"
                type="search"
                role="combobox"
                aria-expanded={typeahead.length > 0}
                aria-controls={listId}
                aria-autocomplete="list"
                autoComplete="off"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 150)}
                placeholder="Search blazers, linen, knitwear…"
                className="h-full flex-1 bg-transparent px-4 text-[1rem] outline-none placeholder:text-stone [&::-webkit-search-cancel-button]:hidden"
              />
              {value && (
                <button type="button" onClick={clear} aria-label="Clear search" className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-beige">
                  <X size={18} strokeWidth={1.25} />
                </button>
              )}
              <button type="submit" className="ml-1 hidden h-11 rounded-full bg-charcoal px-6 text-[0.7rem] uppercase tracking-[0.16em] text-ivory sm:block">
                Search
              </button>
            </div>
            {typeahead.length > 0 && (
              <ul id={listId} role="listbox" className="absolute inset-x-4 top-full z-20 mt-2 overflow-hidden bg-ivory text-left text-charcoal shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
                {typeahead.map((p) => (
                  <li key={p.slug} role="option" aria-selected="false">
                    <Link href={`/products/${p.slug}`} className="flex items-center gap-4 px-4 py-2.5 hover:bg-beige">
                      <span className="relative h-12 w-10 shrink-0 overflow-hidden bg-taupe">
                        <Image src={p.images[0]} alt="" fill sizes="40px" className="object-cover" />
                      </span>
                      <span className="flex-1 text-[0.88rem]">{p.name}</span>
                      <span className="text-[0.8rem] text-muted">{formatINR(p.price)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="mr-2 text-[0.78rem] text-ivory/75">Suggested searches</span>
            {SUGGESTED.map((s) => (
              <button key={s} type="button" onClick={() => submit(s)} className="rounded-full border border-ivory/50 px-4 py-1.5 text-[0.76rem] transition-colors hover:bg-ivory hover:text-charcoal">
                {s}
              </button>
            ))}
          </div>

          <div className="mt-12 w-full max-w-5xl border-t border-ivory/25 pt-6 text-left">
            <p className="mb-4 text-[0.78rem] text-ivory/75">Trending collections</p>
            <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {collections.map((c) => (
                <li key={c.slug}>
                  <Link href={`/collections/${c.slug}`} className="group relative flex h-24 items-end overflow-hidden border border-ivory/30 p-4 sm:h-28">
                    <Image src={c.thumb} alt="" fill sizes="25vw" className="-z-10 object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal/70 to-transparent" />
                    <span className="arrow-nudge inline-flex items-center gap-2 text-[0.85rem]">
                      {c.name} <ArrowRight size={14} strokeWidth={1.25} aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="results" aria-live="polite" className="container-luxe scroll-mt-20 py-12 lg:py-16">
        {!q ? (
          <div className="py-8 text-center">
            <p className="display-sm">Start typing to discover pieces.</p>
            <p className="mt-3 text-[0.9rem] text-muted">Search by name, category, colour or collection — try “ivory”, “cashmere” or “evening”.</p>
          </div>
        ) : results.length ? (
          <>
            <p className="mb-2 text-[0.75rem] text-muted">
              <Link href="/" className="hover:text-charcoal">
                Home
              </Link>{' '}
              / Search / “{q}”
            </p>
            <h2 className="mb-8 font-editorial text-[clamp(1.9rem,3.4vw,2.8rem)]">Results for “{q}”</h2>
            <ProductListing key={q} products={results} syncUrl={false} />
          </>
        ) : (
          <div className="mx-auto flex max-w-xl flex-col items-center py-6 text-center">
            <Image src="/images/editorial/still-life-vase.jpg" alt="" width={160} height={200} className="h-40 w-32 object-cover opacity-90" />
            <h2 className="mt-8 font-editorial text-[clamp(2.2rem,4vw,3.2rem)] leading-none">No results found</h2>
            <p className="mt-4 text-[0.95rem]">
              We couldn’t find anything for <strong className="font-medium">“{q}”</strong>
            </p>
            {correction && (
              <p className="mt-3 text-[0.9rem]">
                Did you mean{' '}
                <button type="button" onClick={() => submit(correction)} className="font-medium underline underline-offset-4">
                  {correction}
                </button>
                ?
              </p>
            )}
            <p className="mt-3 text-[0.85rem] text-muted">Try a different spelling, explore our popular searches or browse our collections.</p>
            <Button href="/collections" className="mt-8">
              Browse all collections
            </Button>
            <div className="mt-10 w-full border-t border-line pt-8">
              <p className="eyebrow mb-4">Popular searches</p>
              <div className="flex flex-wrap justify-center gap-2">
                {POPULAR.map((s) => (
                  <button key={s} type="button" onClick={() => submit(s)} className="rounded-full border border-line px-5 py-2 text-[0.8rem] hover:border-charcoal">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
