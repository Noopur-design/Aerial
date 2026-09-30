'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { LayoutGrid, List, SlidersHorizontal, ArrowLeft, ArrowRight } from 'lucide-react';
import ProductGrid from './ProductGrid';
import FilterSidebar from './FilterSidebar';
import SortSelect, { SORTS, sortProducts } from './SortSelect';
import Drawer from '@/components/ui/Drawer';
import { productTypes } from '@/data/products';
import { cn } from '@/lib/format';

const SIZE_ORDER = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11', 'One Size'];

function buildFacets(list) {
  const typeCounts = list.reduce((acc, p) => ((acc[p.type] = (acc[p.type] || 0) + 1), acc), {});
  const sizes = [...new Set(list.flatMap((p) => p.sizes))].sort((a, b) => SIZE_ORDER.indexOf(a) - SIZE_ORDER.indexOf(b));
  const colors = Object.values(list.reduce((acc, p) => (p.colors.forEach((c) => (acc[c.name] = c)), acc), {}));
  const prices = list.map((p) => p.price);
  return {
    total: list.length,
    inStock: list.filter((p) => p.inStock).length,
    types: productTypes.filter((t) => typeCounts[t.value]).map((t) => ({ ...t, count: typeCounts[t.value] })),
    sizes,
    colors,
    bounds: [Math.floor(Math.min(...prices) / 500) * 500, Math.ceil(Math.max(...prices) / 500) * 500],
  };
}

function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null;
  return (
    <nav aria-label="Pagination" className="mt-14 flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/40 transition-colors hover:bg-charcoal hover:text-ivory disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-charcoal"
      >
        <ArrowLeft size={16} strokeWidth={1.25} />
      </button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-current={n === page ? 'page' : undefined}
          aria-label={`Page ${n}`}
          className={cn('inline-flex h-9 w-9 items-center justify-center rounded-full text-[0.8rem] transition-colors', n === page ? 'bg-charcoal text-ivory' : 'hover:bg-beige')}
        >
          {n}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === pages}
        aria-label="Next page"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/40 transition-colors hover:bg-charcoal hover:text-ivory disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-charcoal"
      >
        <ArrowRight size={16} strokeWidth={1.25} />
      </button>
    </nav>
  );
}

function Listing({ products, perPage = 12, showCategory = true, tabs = false, columns, children, emptyHint, syncUrl = true, initialSort }) {
  const params = useSearchParams();
  const facets = useMemo(() => buildFacets(products), [products]);
  const topRef = useRef(null);

  const initialType = params.get('category');
  const written = useRef(initialType);
  const [filters, setFilters] = useState(() => ({
    types: initialType && facets.types.some((t) => t.value === initialType) ? [initialType] : [],
    sizes: [],
    colors: [],
    price: facets.bounds,
    inStock: false,
  }));
  const [sort, setSort] = useState(() => {
    const s = params.get('sort') || initialSort;
    return SORTS.some((o) => o.value === s) ? s : 'featured';
  });
  const [view, setView] = useState('grid');
  const [page, setPage] = useState(1);
  const [drawer, setDrawer] = useState(false);

  // react to header / mega-menu links that change ?category= while mounted
  useEffect(() => {
    const t = params.get('category');
    if (t === written.current) return;
    written.current = t;
    setFilters((f) => ({ ...f, types: t && facets.types.some((x) => x.value === t) ? [t] : [] }));
    setPage(1);
  }, [params, facets.types]);

  // keep the URL shareable without triggering navigation
  useEffect(() => {
    if (!syncUrl) return;
    const url = new URL(window.location.href);
    const category = filters.types.length === 1 ? filters.types[0] : null;
    written.current = category;
    if (category) url.searchParams.set('category', category);
    else url.searchParams.delete('category');
    if (sort !== 'featured') url.searchParams.set('sort', sort);
    else url.searchParams.delete('sort');
    if (url.href !== window.location.href) window.history.replaceState(window.history.state, '', url);
  }, [filters.types, sort, syncUrl]);

  const filtered = useMemo(() => {
    const out = products.filter(
      (p) =>
        (!filters.types.length || filters.types.includes(p.type)) &&
        (!filters.sizes.length || p.sizes.some((s) => filters.sizes.includes(s))) &&
        (!filters.colors.length || p.colors.some((c) => filters.colors.includes(c.name))) &&
        p.price >= filters.price[0] &&
        p.price <= filters.price[1] &&
        (!filters.inStock || p.inStock)
    );
    return sortProducts(out, sort);
  }, [products, filters, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const current = Math.min(page, pages);
  const visible = filtered.slice((current - 1) * perPage, current * perPage);

  const activeCount =
    filters.types.length +
    filters.sizes.length +
    filters.colors.length +
    (filters.inStock ? 1 : 0) +
    (filters.price[0] !== facets.bounds[0] || filters.price[1] !== facets.bounds[1] ? 1 : 0);

  const clear = () => {
    setFilters({ types: [], sizes: [], colors: [], price: facets.bounds, inStock: false });
    setPage(1);
  };

  const updateFilters = (fn) => {
    setFilters(fn);
    setPage(1);
  };

  const goTo = (n) => {
    setPage(n);
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const sidebar = (
    <FilterSidebar
      facets={facets}
      filters={filters}
      setFilters={updateFilters}
      priceBounds={facets.bounds}
      onClear={clear}
      activeCount={activeCount}
      showCategory={showCategory && !tabs}
    />
  );

  const from = filtered.length ? (current - 1) * perPage + 1 : 0;
  const to = Math.min(current * perPage, filtered.length);

  return (
    <div ref={topRef} className="scroll-mt-28">
      {tabs && facets.types.length > 1 && (
        <div className="no-scrollbar -mx-4 mb-8 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <ul className="flex min-w-max gap-7 border-b border-line" role="tablist" aria-label="Product categories">
            {[{ value: '', label: 'All' }, ...facets.types].map((t) => {
              const on = t.value ? filters.types.length === 1 && filters.types[0] === t.value : filters.types.length === 0;
              return (
                <li key={t.value || 'all'}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => updateFilters((f) => ({ ...f, types: t.value ? [t.value] : [] }))}
                    className={cn(
                      'relative pb-3 text-[0.72rem] font-medium uppercase tracking-[0.14em] transition-colors',
                      on ? 'text-charcoal after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-charcoal' : 'text-muted hover:text-charcoal'
                    )}
                  >
                    {t.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[250px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)] xl:gap-14">
        <aside aria-label="Product filters" className="hidden lg:block">
          <div className="sticky top-[calc(var(--header-h)+1.5rem)]">
            {sidebar}
            {children}
          </div>
        </aside>

        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-[0.8rem] text-muted" aria-live="polite">
              {filtered.length ? `Showing ${from}–${to} of ${filtered.length} products` : 'No products match your filters'}
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setDrawer(true)}
                className="inline-flex h-10 items-center gap-2 border border-line px-4 text-[0.72rem] uppercase tracking-[0.14em] hover:border-charcoal lg:hidden"
              >
                <SlidersHorizontal size={15} strokeWidth={1.25} aria-hidden="true" />
                Filters{activeCount ? ` (${activeCount})` : ''}
              </button>
              <SortSelect value={sort} onChange={(v) => { setSort(v); setPage(1); }} />
              <div className="hidden items-center gap-1 sm:flex" role="group" aria-label="Layout">
                <button type="button" aria-pressed={view === 'grid'} aria-label="Grid view" onClick={() => setView('grid')} className={cn('inline-flex h-10 w-9 items-center justify-center', view !== 'grid' && 'opacity-40 hover:opacity-100')}>
                  <LayoutGrid size={18} strokeWidth={1.25} />
                </button>
                <button type="button" aria-pressed={view === 'list'} aria-label="Large view" onClick={() => setView('list')} className={cn('inline-flex h-10 w-9 items-center justify-center', view !== 'list' && 'opacity-40 hover:opacity-100')}>
                  <List size={20} strokeWidth={1.25} />
                </button>
              </div>
            </div>
          </div>

          {visible.length ? (
            <ProductGrid products={visible} view={view} columns={columns} />
          ) : (
            <div className="flex flex-col items-center border border-line px-6 py-20 text-center">
              <p className="display-sm">Nothing quite matches.</p>
              <p className="mt-3 max-w-sm text-[0.9rem] text-muted">{emptyHint || 'Try removing a filter or two — or explore the full collection.'}</p>
              <button type="button" onClick={clear} className="mt-6 h-11 border border-charcoal px-6 text-[0.72rem] uppercase tracking-[0.16em] hover:bg-charcoal hover:text-ivory">
                Clear all filters
              </button>
            </div>
          )}

          <Pagination page={current} pages={pages} onChange={goTo} />
        </div>
      </div>

      <Drawer
        open={drawer}
        onClose={() => setDrawer(false)}
        side="left"
        title="Refine"
        width="max-w-sm"
        footer={
          <div className="grid grid-cols-2 gap-3 border-t border-line p-4">
            <button type="button" onClick={clear} className="h-12 border border-charcoal text-[0.72rem] uppercase tracking-[0.14em]">
              Clear
            </button>
            <button type="button" onClick={() => setDrawer(false)} className="h-12 bg-charcoal text-[0.72rem] uppercase tracking-[0.14em] text-ivory">
              Show {filtered.length}
            </button>
          </div>
        }
      >
        <div className="px-6 pb-6">{sidebar}</div>
      </Drawer>
    </div>
  );
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4" aria-hidden="true">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i}>
          <div className="aspect-[4/5] animate-pulse bg-taupe" />
          <div className="mt-3 h-3 w-2/3 bg-taupe" />
          <div className="mt-2 h-3 w-1/4 bg-taupe" />
        </div>
      ))}
    </div>
  );
}

export default function ProductListing(props) {
  return (
    <Suspense fallback={<GridSkeleton />}>
      <Listing {...props} />
    </Suspense>
  );
}
