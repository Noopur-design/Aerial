'use client';

import { useState } from 'react';
import ProductGrid from '@/components/product/ProductGrid';
import { TextLink } from '@/components/ui/Button';
import { products, productsBy } from '@/data/products';
import { cn } from '@/lib/format';

const TABS = [
  { id: 'bestsellers', label: 'Bestsellers', get: () => productsBy.bestsellers().slice(0, 4), href: '/shop?sort=popular' },
  { id: 'new', label: 'New In', get: () => productsBy.newIn().slice(0, 4), href: '/new-arrivals' },
  {
    id: 'trending',
    label: 'Trending',
    get: () => ['tailored-oversized-blazer', 'satin-slip-dress', 'wide-leg-trousers', 'linen-shirt'].map((s) => products.find((p) => p.slug === s)),
    href: '/shop',
  },
];

export default function FeaturedPieces() {
  const [tab, setTab] = useState('bestsellers');
  const current = TABS.find((t) => t.id === tab);

  return (
    <section aria-labelledby="featured-title" className="container-luxe py-20 lg:py-28">
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 id="featured-title" className="caps-serif text-[clamp(2.4rem,5vw,4.2rem)]" data-reveal>
          Featured Pieces
        </h2>
        <div className="flex items-center gap-7" role="tablist" aria-label="Featured product groups">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls="featured-panel"
              onClick={() => setTab(t.id)}
              className={cn(
                'relative pb-2 text-[0.72rem] font-medium uppercase tracking-[0.16em] transition-colors',
                tab === t.id ? 'text-charcoal after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-charcoal' : 'text-muted hover:text-charcoal'
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div id="featured-panel" role="tabpanel" aria-labelledby={`tab-${tab}`}>
        <ProductGrid products={current.get()} columns="grid-cols-2 lg:grid-cols-4" />
      </div>
      <div className="mt-12 flex justify-center">
        <TextLink href={current.href}>View all {current.label.toLowerCase()}</TextLink>
      </div>
    </section>
  );
}
