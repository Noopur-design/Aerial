'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Drawer from '@/components/ui/Drawer';
import CartLine from './CartLine';
import { useStore } from '@/store/useStore';
import { computeTotals } from '@/lib/pricing';
import { formatINR } from '@/lib/format';
import { shipping } from '@/data/site';

export default function CartDrawer() {
  const open = useStore((s) => s.cartOpen);
  const close = useStore((s) => s.closeCart);
  const cart = useStore((s) => s.cart);
  const code = useStore((s) => s.discountCode);
  const totals = computeTotals(cart, { code });
  const progress = Math.min(100, (totals.subtotal / shipping.freeThreshold) * 100);

  return (
    <Drawer
      open={open}
      onClose={close}
      title={`Your Bag (${totals.count})`}
      footer={
        totals.lines.length > 0 && (
          <div className="space-y-4 border-t border-line p-6">
            <div className="flex justify-between text-[0.95rem]">
              <span>Subtotal</span>
              <span>{formatINR(totals.subtotal)}</span>
            </div>
            <p className="text-[0.72rem] text-muted">Shipping and discounts calculated at checkout.</p>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/cart" onClick={close} className="inline-flex h-12 items-center justify-center border border-charcoal text-[0.72rem] uppercase tracking-[0.16em] hover:bg-charcoal hover:text-ivory">
                View Bag
              </Link>
              <Link href="/checkout" onClick={close} className="arrow-nudge inline-flex h-12 items-center justify-center gap-2 bg-charcoal text-[0.72rem] uppercase tracking-[0.16em] text-ivory hover:bg-[#33302b]">
                Checkout <ArrowRight size={15} strokeWidth={1.25} aria-hidden="true" />
              </Link>
            </div>
          </div>
        )
      }
    >
      {totals.lines.length ? (
        <div className="px-6">
          <div className="border-b border-line py-4">
            <p className="text-[0.78rem]">
              {totals.toFree > 0 ? (
                <>
                  You’re <strong className="font-medium">{formatINR(totals.toFree)}</strong> away from free shipping.
                </>
              ) : (
                'You’ve unlocked complimentary shipping.'
              )}
            </p>
            <div className="mt-2 h-[2px] bg-line" aria-hidden="true">
              <div className="h-full bg-charcoal transition-[width] duration-700" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <ul className="divide-y divide-line">
            {totals.lines.map((line) => (
              <CartLine key={line.key} line={line} layout="drawer" />
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center px-8 text-center">
          <p className="display-sm">Your bag is empty</p>
          <p className="mt-3 text-[0.88rem] text-muted">Discover our latest collections and find something beautiful for your wardrobe.</p>
          <Link href="/shop" onClick={close} className="arrow-nudge mt-6 inline-flex h-12 items-center gap-3 bg-charcoal px-7 text-[0.72rem] uppercase tracking-[0.16em] text-ivory">
            Continue Shopping <ArrowRight size={15} strokeWidth={1.25} aria-hidden="true" />
          </Link>
        </div>
      )}
    </Drawer>
  );
}
