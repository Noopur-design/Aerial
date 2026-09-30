'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { User, Package, Heart, MapPin, CreditCard, Settings, LogOut, ArrowRight, Trash2, Plus, Info } from 'lucide-react';
import Media from '@/components/ui/Media';
import { OrderTimeline } from './TrackOrderView';
import { useStore } from '@/store/useStore';
import { demoOrders, ORDER_STAGES, orderStage } from '@/lib/orders';
import { getProduct } from '@/data/products';
import { formatDate, formatINR, isPhone, isPincode, cn } from '@/lib/format';

const NAV = [
  { id: 'overview', label: 'My Account', icon: User },
  { id: 'orders', label: 'Orders', icon: Package },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'payments', label: 'Payment Methods', icon: CreditCard },
  { id: 'settings', label: 'Account Settings', icon: Settings },
];

const STATUS_STYLE = {
  Delivered: 'bg-sage/15 text-sage',
  Shipped: 'bg-beige text-ink',
  'Out for delivery': 'bg-beige text-ink',
  Packed: 'bg-taupe text-ink',
  Confirmed: 'bg-taupe text-ink',
};

function Panel({ title, action, children, className }) {
  return (
    <section className={cn('border border-line bg-[#fffbf5] p-5 sm:p-6', className)}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-[1.05rem] font-medium">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function OrdersList({ orders, compact = false }) {
  const [open, setOpen] = useState(null);
  return (
    <ul className="divide-y divide-line">
      {orders.map((o) => {
        const first = getProduct(o.items[0].slug);
        const stage = ORDER_STAGES[orderStage(o)];
        const more = o.items.length - 1;
        return (
          <li key={o.number} className="py-4">
            <div className="grid grid-cols-[52px_1fr] items-center gap-4 sm:grid-cols-[52px_1.4fr_1fr_auto_auto]">
              <span className="relative h-16 w-13 overflow-hidden bg-taupe" style={{ width: 52 }}>
                {first && <Image src={first.images[0]} alt="" fill sizes="52px" className="object-cover" />}
              </span>
              <div>
                <p className="font-editorial text-[1.1rem] leading-tight">
                  {first?.name}
                  {more > 0 && <span className="font-sans text-[0.75rem] text-muted"> + {more} more</span>}
                </p>
                <p className="text-[0.72rem] text-muted">
                  Size {o.items[0].size} &nbsp;|&nbsp; {o.items[0].color}
                </p>
              </div>
              <div className="col-start-2 text-[0.8rem] sm:col-start-auto">
                <p>#{o.number}</p>
                <p className="text-[0.72rem] text-muted">{formatDate(o.placedAt)}</p>
              </div>
              <span className={cn('col-start-2 w-fit px-3 py-1 text-[0.7rem] sm:col-start-auto', STATUS_STYLE[stage])}>{stage}</span>
              {!compact && (
                <button type="button" onClick={() => setOpen(open === o.number ? null : o.number)} aria-expanded={open === o.number} className="col-start-2 h-10 border border-charcoal px-5 text-[0.75rem] hover:bg-charcoal hover:text-ivory sm:col-start-auto">
                  {open === o.number ? 'Hide details' : 'View Details'}
                </button>
              )}
              {compact && (
                <Link href={`/track-order?order=${o.number}&email=${encodeURIComponent(o.email)}`} className="col-start-2 inline-flex h-10 items-center justify-center border border-charcoal px-5 text-[0.75rem] hover:bg-charcoal hover:text-ivory sm:col-start-auto">
                  View Details
                </Link>
              )}
            </div>
            {open === o.number && (
              <div className="mt-5 border-t border-line pt-5">
                <OrderTimeline order={o} />
                <p className="mt-4 text-[0.85rem]">
                  Total paid <strong className="font-medium">{formatINR(o.total)}</strong> · {orderStage(o) === 4 ? 'Delivered' : 'Arriving'} {formatDate(o.deliveredBy)}
                </p>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function AddressForm({ initial, onSave, onCancel }) {
  const [a, setA] = useState(initial || { id: null, label: 'Home', name: '', phone: '', address: '', apartment: '', city: '', state: '', pincode: '' });
  const [err, setErr] = useState('');
  const set = (k) => (e) => setA({ ...a, [k]: e.target.value });
  const save = (e) => {
    e.preventDefault();
    if (!a.name || !a.address || !a.city || !a.state) return setErr('Please complete name, address, city and state.');
    if (!isPincode(a.pincode)) return setErr('Enter a valid 6-digit pincode.');
    if (a.phone && !isPhone(a.phone)) return setErr('Enter a valid 10-digit mobile number.');
    onSave({ ...a, id: a.id || `addr-${Date.now()}` });
  };
  const fields = [
    ['label', 'Label (e.g. Home, Office)'],
    ['name', 'Full name'],
    ['phone', 'Phone'],
    ['pincode', 'Pincode'],
    ['address', 'Address'],
    ['apartment', 'Apartment, landmark'],
    ['city', 'City'],
    ['state', 'State'],
  ];
  return (
    <form onSubmit={save} noValidate className="grid gap-4 sm:grid-cols-2">
      {fields.map(([k, label]) => (
        <div key={k} className={k === 'address' ? 'sm:col-span-2' : undefined}>
          <label htmlFor={`addr-${k}`} className="field-label">
            {label}
          </label>
          <input id={`addr-${k}`} className="field" value={a[k] || ''} onChange={set(k)} />
        </div>
      ))}
      {err && (
        <p role="alert" className="field-error sm:col-span-2">
          {err}
        </p>
      )}
      <div className="flex gap-3 sm:col-span-2">
        <button type="submit" className="h-11 bg-charcoal px-6 text-[0.72rem] uppercase tracking-[0.14em] text-ivory">
          Save address
        </button>
        <button type="button" onClick={onCancel} className="h-11 border border-charcoal px-6 text-[0.72rem] uppercase tracking-[0.14em]">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function Dashboard() {
  const user = useStore((s) => s.user);
  const signOut = useStore((s) => s.signOut);
  const updateUser = useStore((s) => s.updateUser);
  const placed = useStore((s) => s.orders);
  const wishlist = useStore((s) => s.wishlist);
  const addresses = useStore((s) => s.addresses);
  const saveAddress = useStore((s) => s.saveAddress);
  const removeAddress = useStore((s) => s.removeAddress);
  const showToast = useStore((s) => s.showToast);
  const [tab, setTab] = useState('overview');
  const [editing, setEditing] = useState(null);
  const [profile, setProfile] = useState({ name: user.name, phone: user.phone || '', city: user.city || '' });
  const [prefs, setPrefs] = useState({ news: true, sms: false });

  const mine = placed.filter((o) => o.email?.toLowerCase() === user.email.toLowerCase());
  const orders = mine.length ? mine : demoOrders;
  const sample = !mine.length;
  const saved = wishlist.map(getProduct).filter(Boolean);
  const initials = user.name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();

  const saveProfile = (e) => {
    e.preventDefault();
    if (profile.name.trim().length < 2) return showToast('Please enter your name.');
    if (profile.phone && !isPhone(profile.phone)) return showToast('Enter a valid 10-digit mobile number.');
    updateUser({ name: profile.name.trim(), phone: profile.phone.trim(), city: profile.city.trim() });
    showToast('Your details have been updated');
  };

  const addressBlock = (
    <>
      {editing ? (
        <AddressForm
          initial={editing === 'new' ? null : addresses.find((a) => a.id === editing)}
          onSave={(a) => {
            saveAddress(a);
            setEditing(null);
            showToast('Address saved');
          }}
          onCancel={() => setEditing(null)}
        />
      ) : addresses.length ? (
        <ul className="space-y-4">
          {addresses.map((a) => (
            <li key={a.id} className="flex gap-4">
              <MapPin size={18} strokeWidth={1.25} className="mt-0.5 shrink-0" aria-hidden="true" />
              <div className="flex-1 border-l border-line pl-4 text-[0.82rem] leading-relaxed text-muted">
                <p className="font-medium text-charcoal">{a.label || 'Home'}</p>
                <p>{a.name}</p>
                <p>
                  {a.address}
                  {a.apartment ? `, ${a.apartment}` : ''}
                </p>
                <p>
                  {a.city}, {a.state} {a.pincode}
                </p>
              </div>
              <div className="flex items-start gap-3 text-[0.75rem]">
                <button type="button" onClick={() => setEditing(a.id)} className="underline underline-offset-4">
                  Edit
                </button>
                <button type="button" onClick={() => removeAddress(a.id)} aria-label={`Remove ${a.label} address`} className="inline-flex h-6 w-6 items-center justify-center" title="Remove">
                  <Trash2 size={15} strokeWidth={1.25} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-[0.85rem] text-muted">No saved addresses yet. Addresses you save at checkout will appear here.</p>
      )}
    </>
  );

  return (
    <div className="container-luxe grid gap-8 pb-20 pt-8 lg:grid-cols-[230px_1fr] xl:gap-12">
      <aside aria-label="Account navigation">
        <nav className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
          <ul className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:px-0">
            {NAV.map(({ id, label, icon: Icon }) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => setTab(id)}
                  aria-current={tab === id ? 'page' : undefined}
                  className={cn('flex h-11 w-full items-center gap-3 whitespace-nowrap px-4 text-[0.85rem] transition-colors', tab === id ? 'bg-beige' : 'hover:bg-beige/50')}
                >
                  <Icon size={18} strokeWidth={1.2} aria-hidden="true" /> {label}
                </button>
              </li>
            ))}
            <li className="lg:mt-10">
              <button type="button" onClick={signOut} className="flex h-11 w-full items-center gap-3 whitespace-nowrap px-4 text-[0.85rem] hover:bg-beige/50">
                <LogOut size={18} strokeWidth={1.2} aria-hidden="true" /> Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="min-w-0">
        {tab === 'overview' && (
          <div className="grid gap-4 xl:grid-cols-[1fr_340px]">
            <div className="space-y-4">
              <section className="grid overflow-hidden border border-line bg-[#fffbf5] sm:grid-cols-[1fr_260px]">
                <div className="flex items-center gap-5 p-6">
                  <span className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-beige font-display text-[1.8rem]" aria-hidden="true">
                    {initials}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h1 className="font-editorial text-[1.8rem] leading-none">{user.name}</h1>
                      <button type="button" onClick={() => setTab('settings')} className="h-8 border border-charcoal px-3 text-[0.72rem] hover:bg-charcoal hover:text-ivory">
                        Edit Profile
                      </button>
                    </div>
                    <p className="mt-2 truncate text-[0.82rem] text-muted">
                      {user.email}
                      {user.phone && ` | ${user.phone}`}
                    </p>
                    {user.city && <p className="text-[0.82rem] text-muted">{user.city}</p>}
                  </div>
                </div>
                <div className="relative hidden min-h-[140px] sm:block">
                  <Media src="/images/editorial/studio-interior.jpg" alt="" className="absolute inset-0" sizes="260px" />
                  <p className="absolute inset-y-0 left-0 flex w-1/2 items-center justify-center bg-beige/85 px-3 text-center font-editorial text-[1.05rem] leading-tight text-muted">A more conscious tomorrow.</p>
                </div>
              </section>
              <Panel title="Recent Orders" action={<button type="button" onClick={() => setTab('orders')} className="arrow-nudge inline-flex items-center gap-1.5 text-[0.75rem] underline underline-offset-4">View All Orders <ArrowRight size={13} strokeWidth={1.25} aria-hidden="true" /></button>}>
                {sample && <p className="-mt-2 mb-2 text-[0.72rem] text-muted">Showing sample orders — orders you place will appear here.</p>}
                <OrdersList orders={orders.slice(0, 3)} compact />
              </Panel>
            </div>
            <div className="space-y-4">
              <Panel title="Saved Addresses" action={<button type="button" onClick={() => setTab('addresses')} className="text-[0.75rem] underline underline-offset-4">Manage</button>}>
                {addressBlock}
              </Panel>
              <Panel title={`My Wishlist (${saved.length})`} action={<Link href="/wishlist" className="text-[0.75rem] underline underline-offset-4">View All</Link>}>
                {saved.length ? (
                  <ul className="grid grid-cols-3 gap-2">
                    {saved.slice(0, 3).map((p) => (
                      <li key={p.slug}>
                        <Link href={`/products/${p.slug}`} className="block">
                          <span className="relative block aspect-[4/5] overflow-hidden bg-taupe">
                            <Image src={p.images[0]} alt="" fill sizes="100px" className="object-cover" />
                          </span>
                          <span className="mt-1.5 block truncate text-[0.7rem]">{p.name}</span>
                          <span className="block text-[0.72rem]">{formatINR(p.price)}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[0.85rem] text-muted">Tap the heart on any piece to save it here.</p>
                )}
              </Panel>
            </div>
          </div>
        )}

        {tab === 'orders' && (
          <Panel title="Orders">
            {sample && <p className="-mt-2 mb-2 text-[0.75rem] text-muted">Showing sample orders — orders you place will appear here.</p>}
            <OrdersList orders={orders} />
          </Panel>
        )}

        {tab === 'wishlist' && (
          <Panel title={`Wishlist (${saved.length})`} action={<Link href="/wishlist" className="text-[0.75rem] underline underline-offset-4">Open wishlist</Link>}>
            {saved.length ? (
              <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {saved.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/products/${p.slug}`}>
                      <span className="relative block aspect-[4/5] overflow-hidden bg-taupe">
                        <Image src={p.images[0]} alt="" fill sizes="200px" className="object-cover" />
                      </span>
                      <span className="mt-2 block text-[0.82rem]">{p.name}</span>
                      <span className="text-[0.82rem]">{formatINR(p.price)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[0.88rem] text-muted">Your wishlist is empty.</p>
            )}
          </Panel>
        )}

        {tab === 'addresses' && (
          <Panel
            title="Addresses"
            action={
              !editing && (
                <button type="button" onClick={() => setEditing('new')} className="inline-flex items-center gap-1.5 text-[0.75rem] underline underline-offset-4">
                  <Plus size={13} strokeWidth={1.5} aria-hidden="true" /> Add address
                </button>
              )
            }
          >
            {addressBlock}
          </Panel>
        )}

        {tab === 'payments' && (
          <Panel title="Payment Methods">
            <p className="flex items-start gap-2 bg-beige/70 px-4 py-3 text-[0.8rem] text-ink">
              <Info size={15} strokeWidth={1.25} className="mt-0.5 shrink-0" aria-hidden="true" />
              This demo store doesn’t save cards or bank details. In the live store, saved payment methods would be tokenised and managed by our payment partner.
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {['UPI', 'Card', 'Net Banking', 'Cash on Delivery'].map((m) => (
                <li key={m} className="flex items-center justify-between border border-line px-4 py-4 text-[0.85rem]">
                  {m}
                  <span className="text-[0.72rem] text-muted">Available at checkout</span>
                </li>
              ))}
            </ul>
          </Panel>
        )}

        {tab === 'settings' && (
          <div className="space-y-4">
            <Panel title="Account Settings">
              <form onSubmit={saveProfile} noValidate className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="p-name" className="field-label">
                    Full name
                  </label>
                  <input id="p-name" className="field" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
                </div>
                <div>
                  <label htmlFor="p-email" className="field-label">
                    Email
                  </label>
                  <input id="p-email" className="field opacity-70" value={user.email} readOnly aria-readonly="true" />
                </div>
                <div>
                  <label htmlFor="p-phone" className="field-label">
                    Phone
                  </label>
                  <input id="p-phone" type="tel" className="field" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
                </div>
                <div>
                  <label htmlFor="p-city" className="field-label">
                    City
                  </label>
                  <input id="p-city" className="field" value={profile.city} onChange={(e) => setProfile({ ...profile, city: e.target.value })} />
                </div>
                <div className="sm:col-span-2">
                  <button type="submit" className="h-11 bg-charcoal px-6 text-[0.72rem] uppercase tracking-[0.14em] text-ivory">
                    Save changes
                  </button>
                </div>
              </form>
            </Panel>
            <Panel title="Communication Preferences">
              <div className="space-y-3 text-[0.85rem]">
                <label className="flex items-center gap-3">
                  <input type="checkbox" checked={prefs.news} onChange={(e) => setPrefs({ ...prefs, news: e.target.checked })} className="h-4 w-4 accent-charcoal" />
                  Email me about new collections and stories
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" checked={prefs.sms} onChange={(e) => setPrefs({ ...prefs, sms: e.target.checked })} className="h-4 w-4 accent-charcoal" />
                  Send order updates by SMS
                </label>
              </div>
            </Panel>
          </div>
        )}
      </div>
    </div>
  );
}
