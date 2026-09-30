import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Media from '@/components/ui/Media';
import Button, { TextLink } from '@/components/ui/Button';
import SplitHeading from '@/components/ui/SplitHeading';
import Logo from '@/components/ui/Logo';
import ProductListing from '@/components/product/ProductListing';
import { collections, getCollection } from '@/data/collections';
import { productsBy } from '@/data/products';
import { cn } from '@/lib/format';

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) return {};
  return { title: c.name, description: c.description, openGraph: { images: [c.heroWide] } };
}

function RoundArrow({ href, dir, label, light = true }) {
  const Icon = dir === 'prev' ? ArrowLeft : ArrowRight;
  return (
    <Link
      href={href}
      aria-label={label}
      className={cn(
        'inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors',
        light ? 'border-ivory/70 hover:bg-ivory hover:text-charcoal' : 'border-charcoal/60 hover:bg-charcoal hover:text-ivory'
      )}
    >
      <Icon size={17} strokeWidth={1.25} />
    </Link>
  );
}

export default async function CollectionPage({ params }) {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) notFound();

  const idx = collections.indexOf(c);
  const prev = collections[(idx - 1 + collections.length) % collections.length];
  const next = collections[(idx + 1) % collections.length];
  const items = productsBy.collection(c.slug);
  const count = String(collections.length).padStart(2, '0');

  return (
    <>
      {/* 1 — cinematic hero with collection navigation */}
      <section className="on-dark relative isolate overflow-hidden bg-espresso text-ivory">
        <Media src={c.heroWide} alt={c.heroAlt} className="absolute inset-0 -z-10" sizes="100vw" preload grain position="55% 30%" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(26,22,18,0.82)_0%,rgba(26,22,18,0.4)_42%,rgba(26,22,18,0.15)_65%,rgba(26,22,18,0.7)_100%)]" />
        <div className="container-luxe grid min-h-[560px] grid-cols-[minmax(0,1fr)] gap-10 py-12 lg:min-h-[600px] lg:grid-cols-[minmax(0,1fr)_300px] lg:py-16">
          <div className="flex flex-col justify-between">
            <div>
              <p className="eyebrow mb-5 text-ivory/80">{c.season || 'Collection'}</p>
              <SplitHeading as="h1" lines={c.name.split(' ')} immediate className="caps-serif text-[clamp(2.3rem,7vw,7rem)]" />
              <p className="mt-6 max-w-md text-[0.95rem] text-ivory/85" data-reveal>
                {c.short}
              </p>
              <div className="mt-8" data-reveal>
                <Button href="#shop" variant="ivory">
                  Shop the Collection
                </Button>
              </div>
            </div>
            <div className="mt-12 flex items-center gap-5">
              <span className="font-display text-[1.1rem] tabular-nums">
                {c.number} / {count}
              </span>
              <span className="h-px w-28 bg-ivory/40" aria-hidden="true" />
              <RoundArrow href={`/collections/${prev.slug}`} dir="prev" label={`Previous collection: ${prev.name}`} />
              <RoundArrow href={`/collections/${next.slug}`} dir="next" label={`Next collection: ${next.name}`} />
            </div>
          </div>

          <nav aria-label="Collections" className="hidden self-center lg:block">
            <Link href={`/collections/${next.slug}`} className="arrow-nudge mb-8 flex items-center justify-between border-b border-ivory/40 pb-3 text-[0.66rem] uppercase tracking-[0.18em] text-ivory/80 hover:text-ivory">
              Next collection <ArrowRight size={16} strokeWidth={1} aria-hidden="true" />
            </Link>
            <ol className="space-y-6">
              {collections.map((col) => {
                const on = col.slug === c.slug;
                return (
                  <li key={col.slug}>
                    <Link href={`/collections/${col.slug}`} aria-current={on ? 'page' : undefined} className={cn('group flex items-baseline gap-5 transition-opacity', on ? 'opacity-100' : 'opacity-60 hover:opacity-100')}>
                      <span className="w-6 font-display text-[1.05rem]">{col.number}</span>
                      <span className={cn('border-l pl-5 text-[1.1rem]', on ? 'border-ivory' : 'border-ivory/30')}>{col.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      </section>

      {/* 2 — inspired by the season */}
      <section aria-label={c.inspired.title} className="grid gap-2 bg-ivory p-2 md:grid-cols-[1fr_0.8fr_1.4fr_1.2fr_0.6fr] md:items-center">
        <Media src={c.inspired.images[0]} alt="" className="h-28 md:h-32" sizes="20vw" reveal />
        <h2 className="caps-serif px-4 text-[1.4rem] md:px-6">{c.inspired.title}</h2>
        <p className="px-4 text-[0.82rem] leading-relaxed text-muted md:px-2">{c.inspired.text}</p>
        <Media src={c.inspired.images[1]} alt="" className="h-28 md:h-32" sizes="25vw" reveal />
        <p className="flex items-center gap-4 px-4 text-[0.64rem] uppercase leading-relaxed tracking-[0.18em] text-muted">
          <span>
            {c.inspired.words.map((w) => (
              <span key={w} className="block">
                {w}
              </span>
            ))}
          </span>
          <span className="h-px w-10 bg-stone" aria-hidden="true" />
        </p>
      </section>

      {/* 3 — collection title row */}
      <section id="shop" className="container-luxe scroll-mt-24 pt-16 lg:pt-20" aria-labelledby="collection-title">
        <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_1.1fr_auto] lg:items-end">
          <div>
            <p className="mb-4 flex items-center gap-4 text-[0.72rem] uppercase tracking-[0.18em]">
              The collection <span className="h-px w-40 bg-line" aria-hidden="true" />
            </p>
            <h2 id="collection-title" className="caps-serif text-[clamp(2.4rem,5vw,4rem)]" data-reveal>
              {c.name}
            </h2>
          </div>
          <p className="max-w-lg text-[0.88rem] leading-relaxed text-muted" data-reveal>
            {c.description}
          </p>
          <p className="text-[0.72rem] uppercase tracking-[0.16em] text-muted">{items.length} pieces</p>
        </div>

        {/* 4 — category tabs, filters, sorting and grid */}
        <ProductListing products={items} tabs perPage={12} />
      </section>

      {/* 5 — perspective band */}
      <section className="on-dark relative isolate mt-20 overflow-hidden bg-espresso text-ivory">
        <Media src={c.perspective.image} alt="" className="absolute inset-0 -z-10 opacity-60" sizes="100vw" parallax="0.12" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-espresso/90 via-espresso/50 to-espresso/70" />
        <div className="container-luxe grid gap-8 py-14 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-14">
          <h2 className="caps-serif text-[clamp(1.9rem,3.4vw,2.8rem)]">{c.perspective.title}</h2>
          <p className="max-w-xs text-[0.85rem] text-ivory/80">{c.perspective.text}</p>
          <div className="flex items-center gap-8 md:border-l md:border-ivory/30 md:pl-10">
            <TextLink href="/lookbook" light>
              Discover the story
            </TextLink>
            <span className="hidden font-display tabular-nums sm:inline">
              {c.number} / {count}
            </span>
            <div className="flex gap-3">
              <RoundArrow href={`/collections/${prev.slug}`} dir="prev" label={`Previous collection: ${prev.name}`} />
              <RoundArrow href={`/collections/${next.slug}`} dir="next" label={`Next collection: ${next.name}`} />
            </div>
          </div>
        </div>
      </section>

      {/* 6 — collection pager strip */}
      <nav aria-label="Collection pager" className="container-luxe flex flex-wrap items-center justify-between gap-6 py-8">
        <div className="flex items-center gap-8">
          <Logo size="sm" />
          <span className="hidden h-px w-40 bg-line md:block" aria-hidden="true" />
          <p className="hidden text-[0.66rem] uppercase tracking-[0.18em] text-muted sm:block">Timeless style. Modern living.</p>
        </div>
        <ol className="flex items-center gap-6 text-[0.8rem]">
          {collections.map((col) => (
            <li key={col.slug}>
              <Link
                href={`/collections/${col.slug}`}
                aria-label={col.name}
                aria-current={col.slug === c.slug ? 'page' : undefined}
                className={cn('relative pb-1', col.slug === c.slug ? 'after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-charcoal' : 'text-muted hover:text-charcoal')}
              >
                {col.number}
              </Link>
            </li>
          ))}
          <li className="flex gap-2">
            <RoundArrow href={`/collections/${prev.slug}`} dir="prev" label={`Previous collection: ${prev.name}`} light={false} />
            <RoundArrow href={`/collections/${next.slug}`} dir="next" label={`Next collection: ${next.name}`} light={false} />
          </li>
        </ol>
      </nav>
    </>
  );
}
