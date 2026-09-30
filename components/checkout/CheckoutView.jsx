'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useRef, useState } from 'react';
import { ArrowRight, Check, ChevronDown, Info, Lock } from 'lucide-react';
import SummaryRows from '@/components/cart/SummaryRows';
import DiscountForm from '@/components/cart/DiscountForm';
import Media from '@/components/ui/Media';
import { TrustRow } from '@/components/ui/ServiceBar';
import { useStore } from '@/store/useStore';
import { computeTotals } from '@/lib/pricing';
import { addBusinessDays, makeOrderNumber } from '@/lib/orders';
import { formatINR, isEmail, isPhone, isPincode, cn } from '@/lib/format';
import { shipping } from '@/data/site';

const STATES = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu & Kashmir', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal',
];
const BANKS = ['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra Bank', 'Yes Bank'];
const STEPS = ['Information', 'Shipping', 'Payment', 'Review'];

function Field({ label, id, error, optional, className, children }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label} {optional ? <span className="font-normal text-muted">(optional)</span> : <span aria-hidden="true" className="text-burgundy">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function Section({ n, title, text, children, id }) {
  return (
    <section aria-labelledby={id} className="border-b border-line pb-10 pt-10 first:pt-2">
      <div className="mb-6 flex items-baseline gap-5">
        <span className="font-editorial text-[1.8rem] leading-none">{n}.</span>
        <div>
          <h2 id={id} className="font-editorial text-[clamp(1.7rem,2.6vw,2.2rem)] leading-none">
            {title}
          </h2>
          {text && <p className="mt-2 text-[0.82rem] text-muted">{text}</p>}
        </div>
      </div>
      <div className="sm:pl-11">{children}</div>
    </section>
  );
}

function Choice({ name, value, checked, onChange, title, sub, right, children }) {
  return (
    <div className={cn('border transition-colors', checked ? 'border-charcoal bg-[#fffdf9]' : 'border-line hover:border-stone')}>
      <label className="flex cursor-pointer items-center gap-4 px-5 py-4">
        <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="peer sr-only" />
        <span aria-hidden="true" className={cn('inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2', checked ? 'border-charcoal' : 'border-stone')}>
          {checked && <span className="h-2.5 w-2.5 rounded-full bg-charcoal" />}
        </span>
        <span className="flex-1">
          <span className="block text-[0.86rem] font-medium">{title}</span>
          {sub && <span className="block text-[0.75rem] text-muted">{sub}</span>}
        </span>
        {right && <span className="text-right text-[0.8rem]">{right}</span>}
      </label>
      {checked && children && <div className="border-t border-line px-5 py-4 sm:pl-14">{children}</div>}
    </div>
  );
}

export default function CheckoutView() {
  const router = useRouter();
  const params = useSearchParams();
  const hydrated = useStore((s) => s.hydrated);
  const cart = useStore((s) => s.cart);
  const code = useStore((s) => s.discountCode);
  const user = useStore((s) => s.user);
  const addresses = useStore((s) => s.addresses);
  const updateQty = useStore((s) => s.updateQty);
  const placeOrder = useStore((s) => s.placeOrder);
  const saveAddress = useStore((s) => s.saveAddress);
  const formRef = useRef(null);
  const [prefilled, setPrefilled] = useState(false);

  const [form, setForm] = useState({
    email: '',
    marketing: true,
    name: '',
    phone: '',
    pincode: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    saveAddress: true,
    delivery: 'standard',
    payment: params.get('pay') === 'upi' ? 'upi' : 'card',
    upi: '',
    bank: '',
    notes: '',
  });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [placing, setPlacing] = useState(false);

  // prefill from the demo account once persisted state is restored
  if (hydrated && !prefilled) {
    setPrefilled(true);
    const a = addresses[0];
    if (user || a) {
      setForm((f) => ({
        ...f,
        email: user?.email || f.email,
        name: a?.name || user?.name || f.name,
        phone: a?.phone || user?.phone || f.phone,
        pincode: a?.pincode || f.pincode,
        address: a?.address || f.address,
        apartment: a?.apartment || f.apartment,
        city: a?.city || f.city,
        state: a?.state || f.state,
      }));
    }
  }

  const totals = computeTotals(cart, { code, delivery: form.delivery, payment: form.payment });

  const errors = useMemo(() => {
    const e = {};
    if (!form.email.trim()) e.email = 'Please enter your email address.';
    else if (!isEmail(form.email)) e.email = 'Enter a valid email, e.g. name@example.com.';
    if (form.name.trim().length < 2) e.name = 'Please enter your full name.';
    if (!form.phone.trim()) e.phone = 'Please enter your phone number.';
    else if (!isPhone(form.phone)) e.phone = 'Enter a valid 10-digit Indian mobile number.';
    if (!form.pincode.trim()) e.pincode = 'Please enter your pincode.';
    else if (!isPincode(form.pincode)) e.pincode = 'Pincodes are 6 digits and can’t start with 0.';
    if (form.address.trim().length < 5) e.address = 'Please enter your house number and street.';
    if (!form.city.trim()) e.city = 'Please enter your city.';
    if (!form.state) e.state = 'Please choose your state.';
    if (form.payment === 'upi' && !/^[\w.-]{2,}@[a-z]{2,}$/i.test(form.upi.trim())) e.upi = 'Enter a valid UPI ID, e.g. name@okbank.';
    if (form.payment === 'netbanking' && !form.bank) e.bank = 'Please choose your bank.';
    if (form.payment === 'cod' && totals.total > 25000) e.payment = 'Cash on Delivery is available on orders up to ₹25,000.';
    return e;
  }, [form, totals.total]);

  const show = (k) => (submitted || touched[k]) && errors[k];
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  const blur = (k) => () => setTouched((t) => ({ ...t, [k]: true }));
  const aria = (k) => ({ 'aria-invalid': !!show(k), 'aria-describedby': show(k) ? `${k}-error` : undefined });

  const infoDone = ['email', 'name', 'phone', 'pincode', 'address', 'city', 'state'].every((k) => !errors[k]);
  const payDone = infoDone && !errors.upi && !errors.bank && !errors.payment;
  const stepIndex = !infoDone ? 0 : !touched.delivery && !touched.payment && !submitted ? 1 : !payDone ? 2 : 3;

  const onPlace = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length) {
      const first = formRef.current?.querySelector('[aria-invalid="true"]');
      first?.focus();
      first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (!totals.lines.length) return;
    setPlacing(true);
    await new Promise((r) => setTimeout(r, 900)); // simulated payment authorisation (demo)
    const now = new Date();
    const order = {
      number: makeOrderNumber(),
      placedAt: now.toISOString(),
      deliveredBy: addBusinessDays(now, form.delivery === 'express' ? 2 : 5).toISOString(),
      email: form.email.trim(),
      name: form.name.trim(),
      address: { name: form.name, phone: form.phone, address: form.address, apartment: form.apartment, city: form.city, state: form.state, pincode: form.pincode },
      delivery: form.delivery,
      payment: form.payment,
      items: totals.lines.map(({ slug, color, size, qty }) => ({ slug, color, size, qty })),
      subtotal: totals.subtotal,
      discount: totals.discountAmount,
      discountCode: totals.discount?.code || null,
      shippingFee: totals.shippingFee,
      codFee: totals.codFee,
      total: totals.total,
      demo: true,
    };
    if (form.saveAddress) saveAddress({ id: 'home', label: 'Home', ...order.address });
    placeOrder(order);
    router.push(`/order-confirmation?order=${order.number}`);
  };

  if (hydrated && !totals.lines.length && !placing) {
    return (
      <div className="container-luxe flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="display-sm">Your bag is empty</h1>
        <p className="mt-3 text-[0.9rem] text-muted">Add a few pieces before checking out.</p>
        <Link href="/shop" className="arrow-nudge mt-8 inline-flex h-12 items-center gap-3 bg-charcoal px-7 text-[0.72rem] uppercase tracking-[0.16em] text-ivory">
          Continue Shopping <ArrowRight size={15} strokeWidth={1.25} aria-hidden="true" />
        </Link>
      </div>
    );
  }

  return (
    <div className="xl:grid xl:grid-cols-[300px_1fr]">
      {/* editorial column */}
      <div className="on-dark relative hidden text-ivory xl:block">
        <div className="sticky top-[var(--header-h)] h-[calc(100vh-var(--header-h))]">
          <Media src="/images/campaign/checkout-side.jpg" alt="Model in a patterned espresso blazer" className="absolute inset-0" sizes="300px" />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent" />
          <p className="absolute bottom-10 left-8 font-display text-[1.45rem] uppercase leading-[1.08]">
            <span className="mb-5 block h-px w-10 bg-ivory/70" />
            Timeless pieces
            <br />
            for a more
            <br />
            conscious
            <br />
            tomorrow.
          </p>
        </div>
      </div>

      <div>
        {/* progress */}
        <nav aria-label="Checkout progress" className="border-b border-line">
          <ol className="container-luxe flex max-w-3xl items-center justify-between gap-2 py-5">
            {STEPS.map((s, i) => (
              <li key={s} className="flex flex-1 items-center gap-2 last:flex-none" aria-current={i === stepIndex ? 'step' : undefined}>
                <span className="flex flex-col items-center gap-1.5">
                  <span
                    className={cn(
                      'inline-flex h-7 w-7 items-center justify-center rounded-full border text-[0.72rem] transition-colors duration-500',
                      i < stepIndex ? 'border-charcoal bg-charcoal text-ivory' : i === stepIndex ? 'border-charcoal bg-charcoal text-ivory' : 'border-stone text-muted'
                    )}
                  >
                    {i < stepIndex ? <Check size={13} strokeWidth={1.8} aria-hidden="true" /> : i + 1}
                  </span>
                  <span className={cn('text-[0.68rem] sm:text-[0.74rem]', i <= stepIndex ? 'text-charcoal' : 'text-muted')}>{s}</span>
                </span>
                {i < STEPS.length - 1 && <span className={cn('mb-5 h-px flex-1 transition-colors duration-500', i < stepIndex ? 'bg-charcoal' : 'bg-line')} aria-hidden="true" />}
              </li>
            ))}
          </ol>
        </nav>

        <form ref={formRef} noValidate onSubmit={onPlace} className="grid lg:grid-cols-[1fr_minmax(360px,440px)]">
          <div className="px-4 py-8 sm:px-8 xl:px-12">
            <Section n={1} id="s-contact" title="Contact Details" text="We’ll use this information to keep you updated on your order.">
              <Field label="Email address" id="email" error={show('email')}>
                <input id="email" type="email" autoComplete="email" className="field" value={form.email} onChange={set('email')} onBlur={blur('email')} {...aria('email')} />
              </Field>
              <label className="mt-4 flex items-center gap-3 text-[0.8rem]">
                <input type="checkbox" checked={form.marketing} onChange={set('marketing')} className="h-4 w-4 accent-charcoal" />
                Keep me updated on new arrivals, exclusive offers and more.
              </label>
            </Section>

            <Section n={2} id="s-address" title="Shipping Address" text="Enter the address where you’d like your order delivered.">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name" id="name" error={show('name')} className="sm:col-span-2">
                  <input id="name" autoComplete="name" className="field" value={form.name} onChange={set('name')} onBlur={blur('name')} {...aria('name')} />
                </Field>
                <Field label="Phone number" id="phone" error={show('phone')}>
                  <input id="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 98765 43210" className="field" value={form.phone} onChange={set('phone')} onBlur={blur('phone')} {...aria('phone')} />
                </Field>
                <Field label="Pincode" id="pincode" error={show('pincode')}>
                  <input id="pincode" inputMode="numeric" autoComplete="postal-code" maxLength={6} className="field" value={form.pincode} onChange={set('pincode')} onBlur={blur('pincode')} {...aria('pincode')} />
                </Field>
                <Field label="Address" id="address" error={show('address')} className="sm:col-span-2">
                  <input id="address" autoComplete="address-line1" placeholder="House no. / Building name / Street" className="field" value={form.address} onChange={set('address')} onBlur={blur('address')} {...aria('address')} />
                </Field>
                <Field label="Apartment, landmark" id="apartment" optional className="sm:col-span-2">
                  <input id="apartment" autoComplete="address-line2" className="field" value={form.apartment} onChange={set('apartment')} />
                </Field>
                <Field label="City" id="city" error={show('city')}>
                  <input id="city" autoComplete="address-level2" className="field" value={form.city} onChange={set('city')} onBlur={blur('city')} {...aria('city')} />
                </Field>
                <Field label="State" id="state" error={show('state')}>
                  <div className="relative">
                    <select id="state" autoComplete="address-level1" className="field appearance-none pr-10" value={form.state} onChange={set('state')} onBlur={blur('state')} {...aria('state')}>
                      <option value="">Select state</option>
                      {STATES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                    <ChevronDown size={15} strokeWidth={1.25} aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" />
                  </div>
                </Field>
              </div>
              <label className="mt-5 flex items-center gap-3 text-[0.8rem]">
                <input type="checkbox" checked={form.saveAddress} onChange={set('saveAddress')} className="h-4 w-4 accent-charcoal" />
                Save this address for future orders
              </label>
            </Section>

            <Section n={3} id="s-delivery" title="Delivery Options" text="Choose a delivery option that works for you.">
              <fieldset className="space-y-3" onChange={() => setTouched((t) => ({ ...t, delivery: true }))}>
                <legend className="sr-only">Delivery option</legend>
                <Choice
                  name="delivery"
                  value="standard"
                  checked={form.delivery === 'standard'}
                  onChange={set('delivery')}
                  title="Standard Delivery"
                  sub="3–5 business days"
                  right={
                    totals.subtotal >= shipping.freeThreshold || totals.discount?.type === 'shipping' ? (
                      <>
                        <span className="block font-medium">Free</span>
                        <span className="text-[0.7rem] text-muted">on orders above {formatINR(shipping.freeThreshold)}</span>
                      </>
                    ) : (
                      formatINR(shipping.standardFee)
                    )
                  }
                />
                <Choice
                  name="delivery"
                  value="express"
                  checked={form.delivery === 'express'}
                  onChange={set('delivery')}
                  title="Express Delivery"
                  sub="1–2 business days · metro cities"
                  right={totals.discount?.type === 'shipping' ? 'Free' : formatINR(shipping.expressFee)}
                />
              </fieldset>
            </Section>

            <Section n={4} id="s-payment" title="Payment Method" text="Choose your preferred payment method.">
              <p className="mb-4 flex items-start gap-2 bg-beige/70 px-4 py-3 text-[0.78rem] text-ink">
                <Info size={15} strokeWidth={1.25} className="mt-0.5 shrink-0" aria-hidden="true" />
                Demo checkout: no payment gateway is connected and no money will be charged. Please don’t enter real card or bank details.
              </p>
              <fieldset className="space-y-3" onChange={() => setTouched((t) => ({ ...t, payment: true }))}>
                <legend className="sr-only">Payment method</legend>
                <Choice name="payment" value="card" checked={form.payment === 'card'} onChange={set('payment')} title="Card Payment" sub="Visa · Mastercard · RuPay" right={<span className="text-[0.66rem] font-semibold tracking-wide text-[#1a1f71]">VISA <span className="text-[#eb001b]">●</span><span className="-ml-1 text-[#f79e1b]">●</span> <span className="text-[#097a44]">RuPay</span></span>}>
                  <p className="text-[0.8rem] text-muted">In the live store you would be redirected to our payment partner’s secure page to enter your card details. In this demo, no card details are collected.</p>
                </Choice>
                <Choice name="payment" value="upi" checked={form.payment === 'upi'} onChange={set('payment')} title="UPI" sub="Google Pay · PhonePe · Paytm">
                  <Field label="UPI ID" id="upi" error={show('upi')}>
                    <input id="upi" placeholder="name@okbank" autoComplete="off" className="field" value={form.upi} onChange={set('upi')} onBlur={blur('upi')} {...aria('upi')} />
                  </Field>
                  <p className="mt-2 text-[0.72rem] text-muted">Demo: no collect request will be sent.</p>
                </Choice>
                <Choice name="payment" value="netbanking" checked={form.payment === 'netbanking'} onChange={set('payment')} title="Net Banking" sub="All major Indian banks">
                  <Field label="Choose your bank" id="bank" error={show('bank')}>
                    <div className="relative">
                      <select id="bank" className="field appearance-none pr-10" value={form.bank} onChange={set('bank')} onBlur={blur('bank')} {...aria('bank')}>
                        <option value="">Select bank</option>
                        {BANKS.map((b) => (
                          <option key={b}>{b}</option>
                        ))}
                      </select>
                      <ChevronDown size={15} strokeWidth={1.25} aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" />
                    </div>
                  </Field>
                </Choice>
                <Choice name="payment" value="cod" checked={form.payment === 'cod'} onChange={set('payment')} title="Cash on Delivery" right={<span className="text-[0.75rem] text-muted">{formatINR(shipping.codFee)} handling fee</span>}>
                  <p className="text-[0.8rem] text-muted">Pay in cash or by UPI when your order arrives. Available on orders up to ₹25,000.</p>
                </Choice>
              </fieldset>
              {show('payment') && (
                <p className="field-error" role="alert">
                  {errors.payment}
                </p>
              )}
            </Section>
          </div>

          {/* order summary */}
          <aside aria-label="Order summary" className="border-line bg-[#fffbf5] px-4 py-8 sm:px-8 lg:border-l">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
              <div className="flex items-baseline justify-between">
                <h2 className="font-editorial text-[2rem] leading-none">
                  Order Summary <span className="font-sans text-[0.85rem] text-muted">({totals.count} item{totals.count === 1 ? '' : 's'})</span>
                </h2>
                <Link href="/cart" className="text-[0.75rem] underline underline-offset-4 hover:text-muted">
                  Edit Bag
                </Link>
              </div>

              <ul className="mt-6 divide-y divide-line border-y border-line">
                {!hydrated
                  ? [0, 1].map((i) => <li key={i} className="h-28 animate-pulse bg-taupe/40" />)
                  : totals.lines.map((l) => (
                      <li key={l.key} className="flex gap-4 py-4">
                        <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-taupe">
                          <Image src={l.product.images[0]} alt={l.product.name} fill sizes="80px" className="object-cover" />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <p className="font-editorial text-[1.05rem] leading-tight">{l.product.name}</p>
                          <p className="mt-1 text-[0.72rem] text-muted">
                            {l.color} &nbsp;|&nbsp; Size {l.size}
                          </p>
                          <div className="mt-auto flex items-center justify-between">
                            <label className="relative">
                              <span className="sr-only">Quantity of {l.product.name}</span>
                              <select value={l.qty} onChange={(e) => updateQty(l.key, +e.target.value)} className="h-9 appearance-none border border-line bg-[#fffdf9] pl-3 pr-8 text-[0.75rem]">
                                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                                  <option key={n} value={n}>
                                    Qty: {n}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown size={13} strokeWidth={1.25} aria-hidden="true" className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
                            </label>
                            <p className="text-[0.92rem]">{formatINR(l.lineTotal)}</p>
                          </div>
                        </div>
                      </li>
                    ))}
              </ul>

              <div className="mt-6">
                <DiscountForm nested />
              </div>
              <div className="mt-6 border-t border-line pt-6">
                <SummaryRows totals={totals} showCod large />
              </div>

              {submitted && Object.keys(errors).length > 0 && (
                <p role="alert" className="mt-5 border border-burgundy/30 bg-burgundy/5 px-4 py-3 text-[0.8rem] text-burgundy">
                  Please complete the highlighted fields ({Object.keys(errors).length}) before placing your order.
                </p>
              )}

              <button
                type="submit"
                disabled={placing || !hydrated}
                className="arrow-nudge mt-6 flex h-14 w-full items-center justify-center gap-3 bg-charcoal text-[0.8rem] uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-[#33302b] disabled:cursor-wait disabled:bg-stone"
              >
                {placing ? (
                  <>
                    <Lock size={15} strokeWidth={1.25} aria-hidden="true" /> Placing order…
                  </>
                ) : (
                  <>
                    Place Order · {formatINR(totals.total)} <ArrowRight size={16} strokeWidth={1.25} aria-hidden="true" />
                  </>
                )}
              </button>
              <p className="mt-4 text-center text-[0.72rem] text-muted">
                By placing this order, you agree to our{' '}
                <Link href="/legal/terms" className="underline underline-offset-2">
                  Terms &amp; Conditions
                </Link>{' '}
                and{' '}
                <Link href="/legal/privacy" className="underline underline-offset-2">
                  Privacy Policy
                </Link>
                .
              </p>
              <TrustRow className="mt-8" />
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}
