'use client';

import Link from 'next/link';
import Image from 'next/image';
import { X, Heart } from 'lucide-react';
import { QuantitySelector } from '@/components/product/ProductInfo';
import { Badge } from '@/components/product/ProductCard';
import { useStore } from '@/store/useStore';
import { formatINR } from '@/lib/format';

/** One bag line. `layout="drawer"` is compact; `layout="page"` shows the table layout. */
export default function CartLine({ line, layout = 'page' }) {
  const updateQty = useStore((s) => s.updateQty);
  const remove = useStore((s) => s.removeFromCart);
  const moveToWishlist = useStore((s) => s.moveToWishlist);
  const { product } = line;
  const hex = product.colors.find((c) => c.name === line.color)?.hex;
  const href = `/products/${product.slug}`;

  if (layout === 'drawer') {
    return (
      <li className="flex gap-4 py-5">
        <Link href={href} className="relative block h-28 w-22 shrink-0 overflow-hidden bg-taupe" style={{ width: 88 }}>
          <Image src={product.images[0]} alt={product.name} fill sizes="90px" className="object-cover" />
        </Link>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-2">
            <Link href={href} className="font-editorial text-[1.05rem] leading-tight hover:text-muted">
              {product.name}
            </Link>
            <button type="button" onClick={() => remove(line.key)} aria-label={`Remove ${product.name} from bag`} className="-mr-2 -mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center hover:opacity-60">
              <X size={15} strokeWidth={1.25} />
            </button>
          </div>
          <p className="mt-1 text-[0.75rem] text-muted">
            {line.color} &nbsp;|&nbsp; Size {line.size}
          </p>
          <div className="mt-auto flex items-center justify-between pt-3">
            <QuantitySelector value={line.qty} onChange={(q) => updateQty(line.key, q)} size="sm" label={`Quantity of ${product.name}`} />
            <p className="text-[0.9rem]">{formatINR(line.lineTotal)}</p>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li className="grid grid-cols-[96px_1fr] gap-4 border-b border-line py-6 sm:grid-cols-[150px_1fr] md:grid-cols-[166px_1fr] md:gap-6">
      <Link href={href} className="relative block aspect-[4/5] overflow-hidden bg-taupe md:aspect-[5/4]">
        <Image src={product.images[0]} alt={product.name} fill sizes="170px" className="object-cover" />
      </Link>
      <div className="grid gap-4 md:grid-cols-[1.6fr_0.5fr_0.8fr_1fr_0.8fr_auto] md:items-center">
        <div>
          <Link href={href} className="font-editorial text-[1.2rem] leading-tight hover:text-muted">
            {product.name}
          </Link>
          <p className="mt-1 text-[0.78rem] text-muted">{product.description.split('.')[0]}.</p>
          {product.badge && <Badge className="mt-2 bg-beige">{product.badge}</Badge>}
          <p className="mt-2 text-[0.78rem] text-muted md:hidden">
            {line.color} · Size {line.size} · {formatINR(product.price)}
          </p>
        </div>
        <p className="hidden text-[0.9rem] md:block">{line.size}</p>
        <div className="hidden flex-col items-center gap-2 md:flex">
          <span className="h-6 w-6 rounded-full border border-charcoal/10" style={{ background: hex }} />
          <span className="text-[0.72rem] text-muted">{line.color}</span>
        </div>
        <QuantitySelector value={line.qty} onChange={(q) => updateQty(line.key, q)} label={`Quantity of ${product.name}`} />
        <p className="text-[0.95rem]">{formatINR(line.lineTotal)}</p>
        <div className="flex items-center gap-1 md:flex-col">
          <button type="button" onClick={() => moveToWishlist(line.key)} aria-label={`Move ${product.name} to wishlist`} className="inline-flex h-9 w-9 items-center justify-center hover:opacity-60" title="Move to wishlist">
            <Heart size={16} strokeWidth={1.2} />
          </button>
          <button type="button" onClick={() => remove(line.key)} aria-label={`Remove ${product.name} from bag`} className="inline-flex h-9 w-9 items-center justify-center hover:opacity-60" title="Remove">
            <X size={17} strokeWidth={1.2} />
          </button>
        </div>
      </div>
    </li>
  );
}
