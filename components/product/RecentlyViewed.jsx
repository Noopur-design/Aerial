'use client';

import { useStore } from '@/store/useStore';
import { getProduct } from '@/data/products';
import ProductGrid from './ProductGrid';

const EMPTY = [];

export default function RecentlyViewed({ exclude, title = 'Recently Viewed' }) {
  const slugs = useStore((s) => (s.hydrated ? s.recentlyViewed : EMPTY));
  const items = slugs.filter((s) => s !== exclude).map(getProduct).filter(Boolean).slice(0, 4);
  if (!items.length) return null;
  return (
    <section aria-labelledby="recently-viewed" className="container-luxe py-14">
      <h2 id="recently-viewed" className="caps-serif mb-8 text-[clamp(1.5rem,2.4vw,2rem)]">
        {title}
      </h2>
      <ProductGrid products={items} columns="grid-cols-2 md:grid-cols-4" cardProps={{ compact: true }} />
    </section>
  );
}
