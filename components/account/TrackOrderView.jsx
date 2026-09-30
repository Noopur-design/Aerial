'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { demoOrders, ORDER_STAGES, orderStage } from '@/lib/orders';
import { getProduct } from '@/data/products';
import { formatDate, formatINR, isEmail, cn } from '@/lib/format';

export function OrderTimeline({ order }) {
  const stage = orderStage(order);
  return (
    <ol className="grid grid-cols-5 gap-1" aria-label={`Order status: ${ORDER_STAGES[stage]}`}>
      {ORDER_STAGES.map((s, i) => (
        <li key={s} className="flex flex-col gap-2">
          <span className="flex items-center">
            <span className={cn('inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[0.6rem]', i <= stage ? 'border-charcoal bg-charcoal text-ivory' : 'border-sand text-muted')}>
              {i <= stage ? <Check size={12} strokeWidth={2} aria-hidden="true" /> : i + 1}
            </span>
            {i < ORDER_STAGES.length - 1 && <span className={cn('h-px flex-1', i < stage ? 'bg-charcoal' : 'bg-sand')} />}
          </span>
          <span className={cn('text-[0.68rem] leading-tight', i === stage ? 'font-medium' : 'text-muted')} aria-current={i === stage ? 'step' : undefined}>
            {s}
          </span>
        </li>
      ))}
    </ol>
  );
}

export default function TrackOrderView() {
  const params = useSearchParams();
  const orders = useStore((s) => s.orders);
  const hydrated = useStore((s) => s.hydrated);
  const [number, setNumber] = useState(params.get('order') || '');
  const [email, setEmail] = useState(params.get('email') || '');
  const [error, setError] = useState('');
  const [query, setQuery] = useState(params.get('order') ? { n: params.get('order'), e: params.get('email') || '' } : null);

  const all = [...orders, ...demoOrders];
  const found = query && hydrated ? all.find((o) => o.number.toUpperCase() === query.n.replace('#', '').trim().toUpperCase() && (!query.e || o.email.toLowerCase() === query.e.trim().toLowerCase())) : null;

  const submit = (e) => {
    e.preventDefault();
    if (!number.trim()) return setError('Please enter your order number.');
    if (!isEmail(email)) return setError('Please enter the email address used for the order.');
    setError('');
    setQuery({ n: number, e: email });
  };

  return (
    <div className="container-luxe grid gap-12 pb-20 pt-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
      <div>
        <p className="eyebrow text-stone">Customer care</p>
        <h1 className="mt-3 font-display text-[clamp(2.6rem,5vw,4.4rem)] font-normal leading-none">Track Your Order</h1>
        <p className="mt-4 max-w-md text-[0.92rem] text-muted">Enter your order number and the email you used at checkout. You’ll find both in your confirmation email.</p>
        <form onSubmit={submit} noValidate className="mt-8 max-w-md space-y-5">
          <div>
            <label htmlFor="t-order" className="field-label">
              Order number
            </label>
            <input id="t-order" className="field uppercase" placeholder="e.g. AE458721" value={number} onChange={(e) => setNumber(e.target.value)} />
          </div>
          <div>
            <label htmlFor="t-email" className="field-label">
              Email address
            </label>
            <input id="t-email" type="email" autoComplete="email" className="field" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          {error && (
            <p role="alert" className="field-error">
              {error}
            </p>
          )}
          <button type="submit" className="arrow-nudge inline-flex h-12 items-center gap-3 bg-charcoal px-7 text-[0.72rem] uppercase tracking-[0.16em] text-ivory">
            Track order <ArrowRight size={15} strokeWidth={1.25} aria-hidden="true" />
          </button>
          <p className="text-[0.75rem] text-muted">Demo: try order AE458721 with noopur@example.com, or any order you place on this site.</p>
        </form>
      </div>

      <div aria-live="polite">
        {query && hydrated && !found && (
          <div className="border border-line p-8">
            <p className="font-editorial text-[1.6rem]">We couldn’t find that order.</p>
            <p className="mt-2 text-[0.88rem] text-muted">
              Check the order number and email address, or{' '}
              <Link href="/contact" className="underline underline-offset-4">
                contact Client Services
              </Link>
              .
            </p>
          </div>
        )}
        {found && (
          <div className="border border-line bg-[#fffbf5] p-6 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="font-editorial text-[1.8rem]">Order #{found.number}</p>
              <p className="text-[0.8rem] text-muted">Placed {formatDate(found.placedAt)}</p>
            </div>
            <div className="mt-8">
              <OrderTimeline order={found} />
            </div>
            <p className="mt-6 text-[0.88rem]">
              {orderStage(found) === 4 ? 'Delivered on ' : 'Estimated delivery: '}
              <strong className="font-medium">{formatDate(found.deliveredBy, { weekday: 'long', day: 'numeric', month: 'long' })}</strong>
            </p>
            <ul className="mt-6 divide-y divide-line border-t border-line">
              {found.items.map((i) => {
                const p = getProduct(i.slug);
                if (!p) return null;
                return (
                  <li key={`${i.slug}-${i.size}-${i.color}`} className="flex items-center gap-4 py-4">
                    <span className="relative h-16 w-13 shrink-0 overflow-hidden bg-taupe" style={{ width: 52 }}>
                      <Image src={p.images[0]} alt="" fill sizes="52px" className="object-cover" />
                    </span>
                    <span className="flex-1 text-[0.88rem]">
                      {p.name}
                      <span className="block text-[0.72rem] text-muted">
                        {i.color} · Size {i.size} · Qty {i.qty}
                      </span>
                    </span>
                    <span className="text-[0.88rem]">{formatINR(p.price * i.qty)}</span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 text-right text-[0.95rem] font-medium">Total {formatINR(found.total)}</p>
          </div>
        )}
        {!query && (
          <div className="relative hidden aspect-[4/3] overflow-hidden bg-taupe lg:block">
            <Image src="/images/editorial/rack-tones.jpg" alt="A rail of garments in warm neutral tones" fill sizes="50vw" className="object-cover" />
          </div>
        )}
      </div>
    </div>
  );
}
