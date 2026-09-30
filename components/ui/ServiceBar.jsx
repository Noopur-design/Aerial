import { Package, RotateCcw, Lock, Leaf, Truck, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/format';
import { shipping } from '@/data/site';

const items = [
  { icon: Package, title: 'Pan India Shipping', text: 'Reliable and trackable delivery.' },
  { icon: RotateCcw, title: 'Easy Returns', text: `Hassle-free within ${shipping.returnDays} days.` },
  { icon: Lock, title: 'Secure Payments', text: '100% safe and encrypted.' },
  { icon: Leaf, title: 'Conscious Fashion', text: 'Better choices for a brighter planet.' },
];

export default function ServiceBar({ dark = false, className }) {
  return (
    <section
      aria-label="Our services"
      className={cn(dark ? 'bg-espresso text-ivory' : 'border-y border-line bg-ivory text-charcoal', className)}
    >
      <ul className="container-luxe grid grid-cols-2 gap-x-6 gap-y-8 py-10 lg:grid-cols-4" data-reveal-stagger>
        {items.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex items-start gap-4">
            <Icon size={30} strokeWidth={0.9} aria-hidden="true" className="shrink-0" />
            <div>
              <p className="text-[0.72rem] font-medium uppercase tracking-[0.14em]">{title}</p>
              <p className={cn('mt-1 text-[0.8rem]', dark ? 'text-ivory/70' : 'text-muted')}>{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function TrustRow({ className }) {
  const trust = [
    { icon: ShieldCheck, title: 'Secure Payments', text: '100% encrypted' },
    { icon: Package, title: 'Easy Returns', text: `within ${shipping.returnDays} days` },
    { icon: Truck, title: 'Free Shipping', text: `on orders above ₹${shipping.freeThreshold.toLocaleString('en-IN')}` },
  ];
  return (
    <ul className={cn('grid grid-cols-3 gap-3 text-center', className)}>
      {trust.map(({ icon: Icon, title, text }) => (
        <li key={title} className="flex flex-col items-center gap-2">
          <Icon size={26} strokeWidth={1} aria-hidden="true" />
          <p className="text-[0.72rem] font-medium">{title}</p>
          <p className="-mt-1.5 text-[0.7rem] text-muted">{text}</p>
        </li>
      ))}
    </ul>
  );
}
