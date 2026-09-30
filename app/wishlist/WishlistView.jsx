'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { ArrowRight, Heart, ShoppingBag, ChevronDown } from 'lucide-react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import EmptyState from '@/components/ui/EmptyState';
import ColorSwatches from '@/components/product/ColorSwatches';
import SizeSelector from '@/components/product/SizeSelector';
import { useStore } from '@/store/useStore';
import { getProduct } from '@/data/products';
import { formatINR, cn } from '@/lib/format';

const EMPTY = [];

function WishCard({ product }) {
  const addToCart = useStore((s) => s.addToCart);
  const remove = useStore((s) => s.removeFromWishlist);
  const [color, setColor] = useState(product.colors[0].name);
  const [size, setSize] = useState(product.sizes.length === 1 ? product.sizes[0] : null);
  const [error, setError] = useState(false);

  const add = () => {
    if (!size) return setError(true);
    addToCart({ slug: product.slug, color, size, qty: 1 });
  };

  return (
    <li className="flex flex-col">
      <div className="group relative aspect-[4/5] overflow-hidden bg-taupe">
        <Link href={`/products/${product.slug}`} className="zoom-img absolute inset-0" aria-label={product.name}>
          <Image src={product.images[0]} alt="" fill sizes="(min-width:1280px) 16vw, (min-width:768px) 33vw, 50vw" className="object-cover" />
        </Link>
        <button
          type="button"
          onClick={() => remove(product.slug)}
          aria-label={`Remove ${product.name} from wishlist`}
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-ivory/80 hover:bg-ivory"
        >
          <Heart size={18} strokeWidth={1.2} fill="currentColor" />
        </button>
      </div>
      <Link href={`/products/${product.slug}`} className="mt-3 text-[0.9rem] hover:text-muted">
        {product.name}
      </Link>
      <p className="text-[0.95rem]">{formatINR(product.price)}</p>
      <ColorSwatches colors={product.colors} value={color} onChange={setColor} className="mt-3" label={`${product.name} colour`} />
      <div className="mt-3">
        {product.sizes.length === 1 ? (
          <p className="flex h-8 items-center justify-center border border-line text-[0.72rem]">One Size</p>
        ) : (
          <SizeSelector sizes={product.sizes} value={size} onChange={(s) => { setSize(s); setError(false); }} size="sm" invalid={error} label={`${product.name} size`} />
        )}
        {error && <p className="field-error">Select a size first.</p>}
      </div>
      <button
        type="button"
        onClick={add}
        disabled={!product.inStock}
        className="arrow-nudge mt-4 inline-flex h-11 items-center justify-center gap-2 bg-charcoal text-[0.68rem] uppercase tracking-[0.16em] text-ivory hover:bg-[#33302b] disabled:bg-stone"
      >
        {product.inStock ? 'Add to Bag' : 'Sold Out'} {product.inStock && <ArrowRight size={14} strokeWidth={1.25} aria-hidden="true" />}
      </button>
    </li>
  );
}

export default function WishlistView() {
  const hydrated = useStore((s) => s.hydrated);
  const slugs = useStore((s) => (s.hydrated ? s.wishlist : EMPTY));
  const addToCart = useStore((s) => s.addToCart);
  const showToast = useStore((s) => s.showToast);
  const [tab, setTab] = useState('all');
  const [sort, setSort] = useState('recent');

  const items = useMemo(() => slugs.map(getProduct).filter(Boolean), [slugs]);
  const clothing = items.filter((p) => p.type !== 'accessories');
  const accessories = items.filter((p) => p.type === 'accessories');
  let shown = tab === 'clothing' ? clothing : tab === 'accessories' ? accessories : items;
  if (sort === 'price-asc') shown = [...shown].sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') shown = [...shown].sort((a, b) => b.price - a.price);

  const moveAll = () => {
    const ready = items.filter((p) => p.inStock);
    ready.forEach((p) => addToCart({ slug: p.slug, color: p.colors[0].name, size: p.sizes.length === 1 ? p.sizes[0] : p.sizes[Math.floor(p.sizes.length / 2)], qty: 1 }, { open: false }));
    showToast(`${ready.length} piece${ready.length === 1 ? '' : 's'} moved to your bag — check sizes before checkout`, { href: '/cart', label: 'View bag' });
  };

  return (
    <div className="container-luxe pb-20 pt-6">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Wishlist' }]} />
      <div className="mt-8 flex flex-col gap-6 border-b border-line pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-[clamp(3rem,6vw,5.4rem)] font-normal leading-none">My Wishlist</h1>
          <p className="mt-3 text-[0.95rem]">A curated selection of pieces you love.</p>
        </div>
        {items.length > 0 && (
          <div className="flex items-center gap-8">
            <p className="font-editorial text-[1.4rem]">
              {items.length} Saved Item{items.length === 1 ? '' : 's'}
            </p>
            <button type="button" onClick={moveAll} className="inline-flex h-12 items-center gap-3 border border-charcoal px-6 text-[0.72rem] uppercase tracking-[0.14em] hover:bg-charcoal hover:text-ivory">
              <ShoppingBag size={16} strokeWidth={1.25} aria-hidden="true" /> Move all to bag
            </button>
          </div>
        )}
      </div>

      {!hydrated ? (
        <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-6" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[4/5] animate-pulse bg-taupe/60" />
          ))}
        </div>
      ) : items.length ? (
        <>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <ul className="flex gap-8" role="tablist" aria-label="Filter wishlist">
              {[
                ['all', `All (${items.length})`],
                ['clothing', `Clothing (${clothing.length})`],
                ['accessories', `Accessories (${accessories.length})`],
              ].map(([id, label]) => (
                <li key={id}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={tab === id}
                    onClick={() => setTab(id)}
                    className={cn('relative pb-2 text-[0.72rem] uppercase tracking-[0.14em]', tab === id ? 'after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-charcoal' : 'text-muted hover:text-charcoal')}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
            <label className="flex items-center gap-3 text-[0.75rem] text-muted">
              Sort by
              <span className="relative">
                <select value={sort} onChange={(e) => setSort(e.target.value)} className="h-10 appearance-none border border-line bg-[#fffdf9] pl-4 pr-9 text-[0.78rem] text-charcoal">
                  <option value="recent">Recently Added</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
                <ChevronDown size={14} strokeWidth={1.25} aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-charcoal" />
              </span>
            </label>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 xl:grid-cols-6">
            {shown.map((p) => (
              <WishCard key={p.slug} product={p} />
            ))}
          </ul>
        </>
      ) : (
        <EmptyState
          className="mt-10"
          image="/images/editorial/chair-throw.jpg"
          imageAlt="An ivory throw draped over a wooden chair"
          title="Your wishlist is empty"
          lines={['Looks like you haven’t saved any pieces yet.', 'Explore our collections and save your favourite styles to build your personal edit.']}
          cta="Explore Collections"
          href="/collections"
          accent={<p aria-hidden="true" className="pointer-events-none absolute bottom-6 right-8 hidden -rotate-12 font-script text-[2.2rem] leading-none text-stone lg:block">For a more conscious tomorrow.</p>}
        />
      )}
    </div>
  );
}
