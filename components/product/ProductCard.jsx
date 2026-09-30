'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import ColorSwatches from './ColorSwatches';
import WishlistButton from './WishlistButton';
import { useStore } from '@/store/useStore';
import { formatINR, cn } from '@/lib/format';

export function Badge({ children, className }) {
  if (!children) return null;
  return (
    <span className={cn('inline-block bg-ivory/90 px-2 py-1 text-[0.6rem] font-medium uppercase tracking-[0.14em] text-charcoal', className)}>
      {children}
    </span>
  );
}

/**
 * Product tile used by every grid. Colour swatches are selectable and feed
 * the quick-add; apparel opens a size picker over the image before adding.
 */
export default function ProductCard({ product, aspect = 'aspect-[4/5]', sizes = '(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw', compact = false, preload = false }) {
  const addToCart = useStore((s) => s.addToCart);
  const showToast = useStore((s) => s.showToast);
  const [color, setColor] = useState(product.colors[0].name);
  const [picking, setPicking] = useState(false);
  const oneSize = product.sizes.length === 1;
  const href = `/products/${product.slug}`;
  const hoverImage = product.images[1];

  const add = (size) => {
    addToCart({ slug: product.slug, color, size, qty: 1 });
    setPicking(false);
    showToast(`${product.name} added to your bag`, { href: '/cart', label: 'View bag' });
  };

  const quickAdd = () => {
    if (!product.inStock) return;
    if (oneSize) add(product.sizes[0]);
    else setPicking((v) => !v);
  };

  return (
    <article className="group relative flex flex-col">
      <div className={cn('relative overflow-hidden bg-taupe', aspect)}>
        <Link href={href} className="zoom-img absolute inset-0 block" tabIndex={-1} aria-hidden="true">
          <Image
            src={product.images[0]}
            alt=""
            fill
            sizes={sizes}
            preload={preload}
            className={cn('object-cover', hoverImage && 'group-hover:opacity-0')}
          />
          {hoverImage && <Image src={hoverImage} alt="" fill sizes={sizes} className="object-cover opacity-0 group-hover:opacity-100" />}
        </Link>

        <div className="pointer-events-none absolute inset-x-3 top-3 flex items-start justify-between">
          <div className="flex flex-col gap-1">
            {!product.inStock && <Badge className="bg-charcoal/85 text-ivory">Sold out</Badge>}
            <Badge>{product.badge}</Badge>
          </div>
          <WishlistButton slug={product.slug} name={product.name} className="pointer-events-auto -mr-1 -mt-1" />
        </div>

        {/* size picker for quick add */}
        {picking && (
          <div className="absolute inset-x-0 bottom-0 bg-ivory/95 p-3 backdrop-blur-sm" role="group" aria-label={`Choose a size for ${product.name}`}>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[0.66rem] uppercase tracking-[0.16em] text-muted">Select size · {color}</p>
              <button type="button" onClick={() => setPicking(false)} aria-label="Close size picker" className="-mr-1 inline-flex h-7 w-7 items-center justify-center">
                <X size={14} strokeWidth={1.25} />
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => add(s)}
                  className="h-8 min-w-9 border border-line bg-[#fffdf9] px-2 text-[0.72rem] transition-colors hover:border-charcoal hover:bg-charcoal hover:text-ivory"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={cn('flex flex-1 flex-col', compact ? 'pt-2.5' : 'pt-3.5')}>
        <h3 className={cn('leading-snug', compact ? 'text-[0.8rem]' : 'text-[0.86rem]')}>
          <Link href={href} className="transition-colors hover:text-muted">
            {product.name}
          </Link>
        </h3>
        <p className={cn('mt-0.5', compact ? 'text-[0.8rem]' : 'text-[0.88rem]')}>{formatINR(product.price)}</p>
        {!compact && (
          <div className="relative z-[1] mt-2.5 flex items-center justify-between gap-2">
            <ColorSwatches colors={product.colors} value={color} onChange={setColor} max={3} label={`${product.name} colour`} />
            <button
              type="button"
              onClick={quickAdd}
              disabled={!product.inStock}
              aria-expanded={oneSize ? undefined : picking}
              aria-label={product.inStock ? `Add ${product.name} to bag` : `${product.name} is sold out`}
              className="inline-flex shrink-0 items-center gap-1.5 py-1 text-[0.72rem] text-charcoal transition-opacity hover:opacity-60 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {product.inStock ? (
                <>
                  <Plus size={13} strokeWidth={1.4} aria-hidden="true" />
                  <span className="hidden xs:inline">Add to Bag</span>
                  <span className="xs:hidden">Add</span>
                </>
              ) : (
                'Sold out'
              )}
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
