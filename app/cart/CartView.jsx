'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import CartLine from '@/components/cart/CartLine';
import SummaryRows from '@/components/cart/SummaryRows';
import DiscountForm from '@/components/cart/DiscountForm';
import EmptyState from '@/components/ui/EmptyState';
import ProductGrid from '@/components/product/ProductGrid';
import { TrustRow } from '@/components/ui/ServiceBar';
import { useStore } from '@/store/useStore';
import { computeTotals } from '@/lib/pricing';
import { productsBy } from '@/data/products';

export default function CartView() {
  const hydrated = useStore((s) => s.hydrated);
  const cart = useStore((s) => s.cart);
  const code = useStore((s) => s.discountCode);
  const totals = computeTotals(cart, { code });
  const empty = hydrated && totals.lines.length === 0;

  return (
    <div className="container-luxe pb-20 pt-6">
      <Link href="/shop" className="arrow-nudge inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.16em] hover:text-muted">
        <ArrowLeft size={15} strokeWidth={1.25} aria-hidden="true" /> Continue Shopping
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_400px] xl:gap-16">
        <div>
          <h1 className="font-display text-[clamp(2.4rem,5vw,4.2rem)] font-normal leading-none">
            Your Shopping Bag <span className="text-[0.6em]">({hydrated ? totals.count : 0})</span>
          </h1>
          <p className="mt-3 text-[0.92rem] text-muted">Curated pieces for a more conscious wardrobe.</p>

          {!hydrated ? (
            <div className="mt-10 space-y-4" aria-hidden="true">
              {[0, 1].map((i) => (
                <div key={i} className="h-36 animate-pulse bg-taupe/60" />
              ))}
            </div>
          ) : empty ? (
            <EmptyState
              className="mt-10"
              image="/images/editorial/bag-still.jpg"
              imageAlt="A black leather bag on a stone plinth with dried branches"
              title="Your bag is empty"
              lines={['Looks like you haven’t added anything yet.', 'Discover our latest collections and find something beautiful for your wardrobe.']}
              cta="Continue Shopping"
              href="/shop"
            />
          ) : (
            <>
              <div className="mt-10 hidden grid-cols-[166px_1fr] gap-6 border-b border-line pb-3 text-[0.68rem] uppercase tracking-[0.14em] text-muted md:grid">
                <span>Product</span>
                <div className="grid grid-cols-[1.6fr_0.5fr_0.8fr_1fr_0.8fr_auto]">
                  <span />
                  <span>Size</span>
                  <span className="text-center">Colour</span>
                  <span>Quantity</span>
                  <span>Price</span>
                  <span className="w-9" />
                </div>
              </div>
              <ul>
                {totals.lines.map((line) => (
                  <CartLine key={line.key} line={line} />
                ))}
              </ul>
            </>
          )}
        </div>

        {!empty && (
          <aside aria-label="Order summary" className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
            <div className="border border-line bg-[#fffbf5] p-6 sm:p-8">
              <h2 className="font-editorial text-[2rem] leading-none">Order Summary</h2>
              <div className="mt-8">
                <SummaryRows totals={totals} large />
              </div>
              <div className="mt-6">
                <DiscountForm label="Discount code" />
              </div>
              <Link
                href="/checkout"
                aria-disabled={!hydrated}
                className="arrow-nudge mt-6 flex h-14 items-center justify-center gap-3 bg-charcoal text-[0.78rem] uppercase tracking-[0.18em] text-ivory hover:bg-[#33302b]"
              >
                Proceed to Checkout <ArrowRight size={16} strokeWidth={1.25} aria-hidden="true" />
              </Link>
              <div className="my-5 flex items-center gap-4 text-[0.7rem] uppercase tracking-[0.16em] text-muted" aria-hidden="true">
                <span className="h-px flex-1 bg-line" /> Or pay with <span className="h-px flex-1 bg-line" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/checkout?pay=upi" className="flex h-12 items-center justify-center border border-charcoal/40 text-[0.95rem] font-medium hover:border-charcoal" aria-label="Pay with Google Pay (UPI) at checkout">
                  <span className="text-[#4285F4]">G</span>
                  <span className="ml-1">Pay</span>
                </Link>
                <Link href="/checkout?pay=upi" className="flex h-12 items-center justify-center border border-charcoal/40 text-[0.95rem] font-semibold text-[#0b3a82] hover:border-charcoal" aria-label="Pay with Paytm (UPI) at checkout">
                  Paytm
                </Link>
              </div>
              <TrustRow className="mt-8 border-t border-line pt-6" />
            </div>
          </aside>
        )}
      </div>

      {empty && (
        <section aria-labelledby="bag-suggestions" className="mt-16">
          <h2 id="bag-suggestions" className="caps-serif mb-8 text-[clamp(1.5rem,2.4vw,2rem)]">
            Bestsellers You May Love
          </h2>
          <ProductGrid products={productsBy.bestsellers().slice(0, 4)} columns="grid-cols-2 md:grid-cols-4" />
        </section>
      )}
    </div>
  );
}
