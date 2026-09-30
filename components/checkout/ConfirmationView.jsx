'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { ArrowRight, CalendarDays, FileText, Truck, Leaf, Gem, Package, Heart } from 'lucide-react';
import Button from '@/components/ui/Button';
import Media from '@/components/ui/Media';
import { useStore } from '@/store/useStore';
import { getProduct } from '@/data/products';
import { formatDate, formatINR, cn } from '@/lib/format';
import { gsap, prefersReducedMotion } from '@/lib/gsap';

function AnimatedCheck() {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.fromTo('[data-ring]', { scale: 0.5, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.9, ease: 'expo.out', transformOrigin: '50% 50%' })
        .fromTo('[data-halo]', { scale: 0.8, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.1, ease: 'expo.out', transformOrigin: '50% 50%' }, 0.1)
        .fromTo('[data-tick]', { strokeDashoffset: 40 }, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.out' }, 0.45);
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <svg ref={ref} viewBox="0 0 100 100" className="h-24 w-24" aria-hidden="true">
      <circle data-halo cx="50" cy="50" r="48" fill="none" stroke="#e8d9c4" strokeWidth="3" />
      <circle data-ring cx="50" cy="50" r="40" fill="#f3e6d5" stroke="#d8c3a5" strokeWidth="1" />
      <path data-tick d="M36 51 L46 60 L65 40" fill="none" stroke="#1a1a18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="40" strokeDashoffset="0" />
    </svg>
  );
}

export default function ConfirmationView() {
  const params = useSearchParams();
  const hydrated = useStore((s) => s.hydrated);
  const orders = useStore((s) => s.orders);
  const lastNumber = useStore((s) => s.lastOrderNumber);
  const number = params.get('order') || lastNumber;
  const order = orders.find((o) => o.number === number);

  if (!hydrated) return <div className="min-h-[70vh]" />;

  if (!order) {
    return (
      <div className="container-luxe flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="eyebrow text-stone">Order confirmation</p>
        <h1 className="display-sm mt-3">We couldn’t find a recent order</h1>
        <p className="mt-3 max-w-md text-[0.9rem] text-muted">Confirmations appear here right after you complete checkout. Looking for an earlier order? Track it with your order number.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/track-order">Track an order</Button>
          <Button href="/shop" variant="outline">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  const first = order.name?.split(' ')[0] || 'there';
  const lines = order.items.map((i) => ({ ...i, product: getProduct(i.slug) })).filter((l) => l.product);
  const count = lines.reduce((n, l) => n + l.qty, 0);

  return (
    <div className="container-luxe grid gap-10 pb-20 pt-8 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
      <div>
        <AnimatedCheck />
        <p className="eyebrow mt-6">Order confirmed</p>
        <h1 className="mt-3 font-display text-[clamp(3rem,6.4vw,5.6rem)] font-normal leading-[0.95]" data-split="" data-immediate="1">
          <span className="split-line">
            <span className="split-line-inner">Thank You,</span>
          </span>
          <span className="split-line">
            <span className="split-line-inner">{first}!</span>
          </span>
        </h1>
        <p className="mt-5 max-w-lg text-[1rem] leading-relaxed text-ink">
          Your order has been placed successfully. We’ve sent a confirmation email to <strong className="font-medium">{order.email}</strong> with all the details.
        </p>
        <p className="mt-2 text-[0.75rem] text-muted">Demo order — no payment was taken and no email was sent.</p>

        <dl className="mt-8 grid gap-6 border-y border-line py-6 sm:grid-cols-3 sm:divide-x sm:divide-line">
          <div>
            <FileText size={20} strokeWidth={1} aria-hidden="true" />
            <dt className="mt-2 text-[0.75rem] text-muted">Order Number</dt>
            <dd className="text-[0.95rem] font-medium">#{order.number}</dd>
          </div>
          <div className="sm:pl-6">
            <CalendarDays size={20} strokeWidth={1} aria-hidden="true" />
            <dt className="mt-2 text-[0.75rem] text-muted">Estimated Delivery</dt>
            <dd className="text-[0.95rem] font-medium">{formatDate(order.deliveredBy, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</dd>
            <dd className="text-[0.7rem] text-muted">{order.delivery === 'express' ? '1–2' : '3–5'} business days</dd>
          </div>
          <div className="sm:pl-6">
            <Truck size={20} strokeWidth={1} aria-hidden="true" />
            <dt className="mt-2 text-[0.75rem] text-muted">Order Status</dt>
            <dd className="mt-3">
              <ol className="flex items-center" aria-label="Order status: confirmed">
                {['Confirmed', 'Shipped', 'Delivered'].map((s, i) => (
                  <li key={s} className="flex flex-1 flex-col items-center gap-1.5 last:flex-none">
                    <span className="flex w-full items-center">
                      <span className={cn('h-3 w-3 shrink-0 rounded-full', i === 0 ? 'bg-charcoal' : 'bg-sand')} />
                      {i < 2 && <span className="h-px flex-1 bg-sand" />}
                    </span>
                    <span className={cn('-ml-4 self-start text-[0.66rem]', i === 0 ? 'font-medium' : 'text-muted')}>{s}</span>
                  </li>
                ))}
              </ol>
            </dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={`/track-order?order=${order.number}&email=${encodeURIComponent(order.email)}`}>Track Order</Button>
          <Button href="/shop" variant="outline" arrow={false}>
            Continue Shopping
          </Button>
        </div>

        <section aria-labelledby="conf-summary" className="mt-12 border-t border-line pt-8">
          <div className="flex items-baseline justify-between">
            <h2 id="conf-summary" className="font-editorial text-[1.6rem]">
              Order Summary
            </h2>
            <p className="text-[0.8rem] text-muted">
              {count} item{count === 1 ? '' : 's'}
            </p>
          </div>
          <ul className="mt-5 space-y-4">
            {lines.map((l) => (
              <li key={`${l.slug}-${l.color}-${l.size}`} className="flex items-center gap-5">
                <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-taupe">
                  <Image src={l.product.images[0]} alt={l.product.name} fill sizes="64px" className="object-cover" />
                </div>
                <div className="flex-1">
                  <Link href={`/products/${l.slug}`} className="font-editorial text-[1.05rem] hover:text-muted">
                    {l.product.name}
                  </Link>
                  <p className="text-[0.72rem] text-muted">
                    {l.color} &nbsp;|&nbsp; Size {l.size} &nbsp;|&nbsp; Qty {l.qty}
                  </p>
                </div>
                <p className="text-[0.92rem]">{formatINR(l.product.price * l.qty)}</p>
              </li>
            ))}
          </ul>
          <dl className="mt-6 space-y-2 border-t border-line pt-5 text-[0.9rem]">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd>{formatINR(order.subtotal)}</dd>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-sage">
                <dt>Discount ({order.discountCode})</dt>
                <dd>−{formatINR(order.discount)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt>Shipping</dt>
              <dd>{order.shippingFee ? formatINR(order.shippingFee) : 'Free'}</dd>
            </div>
            {order.codFee > 0 && (
              <div className="flex justify-between">
                <dt>Handling fee (COD)</dt>
                <dd>{formatINR(order.codFee)}</dd>
              </div>
            )}
            <div className="flex justify-between pt-2 text-[1.1rem] font-medium">
              <dt>
                Total <span className="text-[0.75rem] font-normal text-muted">(Inclusive of all taxes)</span>
              </dt>
              <dd>{formatINR(order.total)}</dd>
            </div>
          </dl>
          <p className="mt-6 text-[0.8rem] text-muted">
            Delivering to {order.address.name}, {order.address.address}
            {order.address.apartment ? `, ${order.address.apartment}` : ''}, {order.address.city}, {order.address.state} {order.address.pincode}.
          </p>
        </section>
      </div>

      <div className="space-y-3">
        <div className="on-dark relative aspect-[4/5] overflow-hidden text-ivory">
          <Media src="/images/campaign/confirmation.jpg" alt="Model in an espresso patterned blazer in warm light" className="absolute inset-0" sizes="(min-width:1024px) 45vw, 100vw" reveal grain />
          <p aria-hidden="true" className="absolute right-6 top-8 -rotate-12 text-right font-script text-[2.6rem] leading-[0.8] text-ivory/90">
            A more
            <br />
            conscious
            <br />
            tomorrow.
          </p>
          <p className="absolute bottom-8 left-8 font-display text-[1.3rem] uppercase leading-[1.08]">
            <span className="mb-4 block h-px w-10 bg-ivory/70" />
            Timeless pieces
            <br />
            for a more
            <br />
            conscious tomorrow.
          </p>
        </div>
        <section className="bg-beige p-8" aria-labelledby="conscious-title">
          <div className="flex items-start gap-6">
            <Leaf size={56} strokeWidth={0.6} aria-hidden="true" className="hidden shrink-0 text-stone sm:block" />
            <div>
              <h2 id="conscious-title" className="font-editorial text-[1.8rem] leading-tight">
                You’re part of a more conscious future.
              </h2>
              <p className="mt-3 text-[0.88rem] text-muted">Thank you for choosing thoughtfully crafted pieces that celebrate timeless style and a brighter tomorrow.</p>
            </div>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-6 border-t border-sand pt-6 text-center sm:grid-cols-4">
            {[
              [Leaf, 'Sustainably Crafted'],
              [Gem, 'Premium Quality'],
              [Package, 'Easy Returns within 7 days'],
              [Heart, 'Dedicated Support'],
            ].map(([Icon, label]) => (
              <li key={label} className="flex flex-col items-center gap-2 text-[0.75rem] text-muted">
                <Icon size={24} strokeWidth={1} aria-hidden="true" className="text-charcoal" />
                {label}
              </li>
            ))}
          </ul>
          <Link href="/about" className="arrow-nudge mt-8 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.16em]">
            <span className="link-underline">Our commitment</span> <ArrowRight size={14} strokeWidth={1.25} aria-hidden="true" />
          </Link>
        </section>
      </div>
    </div>
  );
}
