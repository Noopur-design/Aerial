'use client';

import Link from 'next/link';
import { useEffect, useId, useState } from 'react';
import { ArrowRight, Minus, Plus, Star, Truck, Package, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import ColorSwatches from './ColorSwatches';
import SizeSelector from './SizeSelector';
import WishlistButton from './WishlistButton';
import SizeGuideModal from './SizeGuideModal';
import { Badge } from './ProductCard';
import Accordion from '@/components/ui/Accordion';
import { useStore } from '@/store/useStore';
import { formatINR, cn } from '@/lib/format';
import { shipping } from '@/data/site';

export function QuantitySelector({ value, onChange, min = 1, max = 10, label = 'Quantity', size = 'md' }) {
  const h = size === 'sm' ? 'h-9' : 'h-11';
  return (
    <div className={cn('inline-flex items-center border border-line bg-[#fffdf9]', h)} role="group" aria-label={label}>
      <button type="button" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label="Decrease quantity" className={cn('inline-flex w-10 items-center justify-center disabled:opacity-30', h)}>
        <Minus size={14} strokeWidth={1.25} />
      </button>
      <span className="w-10 border-x border-line text-center text-[0.85rem] tabular-nums" aria-live="polite">
        {value}
      </span>
      <button type="button" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label="Increase quantity" className={cn('inline-flex w-10 items-center justify-center disabled:opacity-30', h)}>
        <Plus size={14} strokeWidth={1.25} />
      </button>
    </div>
  );
}

export default function ProductInfo({ product, prev, next }) {
  const addToCart = useStore((s) => s.addToCart);
  const addRecentlyViewed = useStore((s) => s.addRecentlyViewed);
  const hydrated = useStore((s) => s.hydrated);
  const [color, setColor] = useState(product.colors[0].name);
  const [size, setSize] = useState(product.sizes.length === 1 ? product.sizes[0] : null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState('');
  const [guide, setGuide] = useState(false);
  const errId = useId();

  useEffect(() => {
    if (hydrated) addRecentlyViewed(product.slug);
  }, [hydrated, product.slug, addRecentlyViewed]);

  const add = () => {
    if (!size) {
      setError('Please select a size.');
      return;
    }
    setError('');
    addToCart({ slug: product.slug, color, size, qty });
  };

  const accordion = [
    {
      title: 'Product Details',
      content: (
        <ul className="list-disc space-y-1 pl-4">
          {product.details.map((d) => (
            <li key={d}>{d}</li>
          ))}
          <li>SKU: {product.sku}</li>
        </ul>
      ),
    },
    {
      title: 'Fabric & Care',
      content: (
        <div className="space-y-3">
          <p>{product.fabric}</p>
          <ul className="list-disc space-y-1 pl-4">
            {product.care.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      title: 'Size & Fit',
      content: (
        <p>
          {product.sizes.length === 1
            ? 'One size. See the product details for exact dimensions.'
            : 'Designed with a relaxed, easy fit. If you are between sizes, choose the larger size for tailoring and outerwear, and the smaller for knitwear.'}{' '}
          {product.sizes.length > 1 && (
            <button type="button" onClick={() => setGuide(true)} className="underline underline-offset-4">
              View the size guide
            </button>
          )}
        </p>
      ),
    },
    {
      title: 'Shipping & Returns',
      content: (
        <p>
          Complimentary standard delivery on orders above {formatINR(shipping.freeThreshold)} (3–5 business days). Express delivery available at checkout. Free returns and size
          exchanges within {shipping.returnDays} days of delivery.{' '}
          <Link href="/help?topic=returns" className="underline underline-offset-4">
            Read our returns policy
          </Link>
          .
        </p>
      ),
    },
  ];

  return (
    <div className="lg:pt-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-2">
          {product.badge && <Badge className="bg-beige">{product.badge}</Badge>}
          {!product.inStock && <Badge className="bg-charcoal text-ivory">Sold out</Badge>}
        </div>
        <p className="text-[0.68rem] tracking-[0.12em] text-muted">SKU: {product.sku}</p>
      </div>

      <h1 className="mt-4 font-display text-[clamp(2.3rem,4vw,3.6rem)] font-normal leading-[0.98] tracking-[-0.015em]">{product.name}</h1>
      <p className="mt-4 text-[1.35rem]">{formatINR(product.price)}</p>
      <p className="text-[0.72rem] text-muted">Inclusive of all taxes</p>

      <div className="mt-3 flex items-center gap-2 text-[0.8rem] text-muted">
        <span className="flex" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={14} strokeWidth={1} fill={i < Math.round(product.rating) ? 'currentColor' : 'none'} className="text-charcoal" />
          ))}
        </span>
        <span>
          {product.rating.toFixed(1)} ({product.reviews} reviews)
        </span>
      </div>

      <p className="mt-6 max-w-lg border-b border-line pb-7 text-[0.95rem] leading-relaxed text-ink">{product.description}</p>

      <div className="mt-6">
        <p className="mb-3 text-[0.72rem] uppercase tracking-[0.14em]">
          Colour <span className="ml-2 normal-case tracking-normal text-muted">{color}</span>
        </p>
        <ColorSwatches colors={product.colors} value={color} onChange={setColor} size="lg" />
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[0.72rem] uppercase tracking-[0.14em]">
            Size {size && <span className="ml-2 normal-case tracking-normal text-muted">{size}</span>}
          </p>
          {product.sizes.length > 1 && (
            <button type="button" onClick={() => setGuide(true)} className="arrow-nudge inline-flex items-center gap-2 text-[0.8rem] hover:text-muted">
              Size Guide <ArrowRight size={14} strokeWidth={1.25} aria-hidden="true" />
            </button>
          )}
        </div>
        <SizeSelector sizes={product.sizes} value={size} onChange={(s) => { setSize(s); setError(''); }} invalid={!!error} describedBy={error ? errId : undefined} />
        {error && (
          <p id={errId} role="alert" className="field-error">
            {error}
          </p>
        )}
      </div>

      <div className="mt-6">
        <p className="mb-3 text-[0.72rem] uppercase tracking-[0.14em]" id="qty-label">
          Quantity
        </p>
        <QuantitySelector value={qty} onChange={setQty} />
      </div>

      <div className="mt-7 flex gap-3">
        <button
          type="button"
          onClick={add}
          disabled={!product.inStock}
          className="arrow-nudge inline-flex h-14 flex-1 items-center justify-center gap-3 bg-charcoal text-[0.8rem] uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-[#33302b] disabled:cursor-not-allowed disabled:bg-stone"
        >
          {product.inStock ? 'Add to Bag' : 'Sold Out'}
          {product.inStock && <ArrowRight size={17} strokeWidth={1.25} aria-hidden="true" />}
        </button>
        <WishlistButton slug={product.slug} name={product.name} variant="box" />
      </div>
      {!product.inStock && <p className="mt-3 text-[0.8rem] text-muted">This piece is currently sold out. Save it to your wishlist and we’ll keep it for you when it returns.</p>}

      <ul className="mt-6 grid grid-cols-3 gap-3 border-b border-line pb-7 text-[0.7rem]">
        <li className="flex items-start gap-2">
          <Truck size={20} strokeWidth={1} aria-hidden="true" className="shrink-0" />
          <span>
            <span className="block font-medium">Free shipping</span>
            <span className="text-muted">on orders above {formatINR(shipping.freeThreshold)}</span>
          </span>
        </li>
        <li className="flex items-start gap-2">
          <Package size={20} strokeWidth={1} aria-hidden="true" className="shrink-0" />
          <span>
            <span className="block font-medium">Easy returns</span>
            <span className="text-muted">within {shipping.returnDays} days</span>
          </span>
        </li>
        <li className="flex items-start gap-2">
          <ShieldCheck size={20} strokeWidth={1} aria-hidden="true" className="shrink-0" />
          <span>
            <span className="block font-medium">Secure payments</span>
            <span className="text-muted">100% encrypted</span>
          </span>
        </li>
      </ul>

      <Accordion items={accordion} variant="compact" className="mt-2 border-t-0" />

      {(prev || next) && (
        <nav aria-label="More products" className="mt-6 flex justify-between text-[0.72rem] uppercase tracking-[0.14em] text-muted">
          {prev ? (
            <Link href={`/products/${prev.slug}`} className="inline-flex items-center gap-1 hover:text-charcoal">
              <ChevronLeft size={14} strokeWidth={1.25} aria-hidden="true" /> Prev
            </Link>
          ) : <span />}
          {next && (
            <Link href={`/products/${next.slug}`} className="inline-flex items-center gap-1 hover:text-charcoal">
              Next <ChevronRight size={14} strokeWidth={1.25} aria-hidden="true" />
            </Link>
          )}
        </nav>
      )}

      <SizeGuideModal open={guide} onClose={() => setGuide(false)} gender={product.gender} />
    </div>
  );
}
