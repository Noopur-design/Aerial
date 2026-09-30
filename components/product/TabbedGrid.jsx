'use client';

import { useMemo, useState } from 'react';
import ProductGrid from './ProductGrid';
import { productTypes } from '@/data/products';
import { cn } from '@/lib/format';

/** Compact category tabs over a product grid (New Arrivals, Women featured, etc.). */
export default function TabbedGrid({ products, limit = 8, columns = 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4', label = 'Filter by category', right }) {
  const [tab, setTab] = useState('');
  const types = useMemo(() => productTypes.filter((t) => products.some((p) => p.type === t.value)), [products]);
  const list = (tab ? products.filter((p) => p.type === tab) : products).slice(0, limit);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="no-scrollbar -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <ul className="flex min-w-max gap-6" role="tablist" aria-label={label}>
            {[{ value: '', label: 'All' }, ...types].map((t) => (
              <li key={t.value || 'all'}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={tab === t.value}
                  onClick={() => setTab(t.value)}
                  className={cn(
                    'relative pb-2 text-[0.72rem] font-medium uppercase tracking-[0.14em] transition-colors',
                    tab === t.value ? 'after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-charcoal' : 'text-muted hover:text-charcoal'
                  )}
                >
                  {t.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {right}
      </div>
      <ProductGrid products={list} columns={columns} />
    </div>
  );
}
