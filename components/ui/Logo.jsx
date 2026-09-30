import Link from 'next/link';
import { cn } from '@/lib/format';

// Wordmark: widely tracked Bodoni capitals; the opening A is drawn as a
// crossbar-free, high-contrast apex — the AERIAL monogram.
function Apex() {
  return (
    <svg
      viewBox="0 0 76 100"
      className="inline-block h-[0.69em] w-auto align-baseline"
      fill="currentColor"
      aria-hidden="true"
    >
      <polygon points="33,0 37,0 9,96 5,96" />
      <polygon points="33,0 43,0 71,96 59,96" />
      <rect x="0" y="95.5" width="15" height="4.5" />
      <rect x="52" y="95.5" width="24" height="4.5" />
    </svg>
  );
}

export default function Logo({ className, size = 'md', as = 'link', light = false }) {
  const sizes = {
    sm: 'text-[1.05rem] tracking-[0.42em]',
    md: 'text-[1.3rem] sm:text-[1.55rem] tracking-[0.42em]',
    lg: 'text-[2rem] tracking-[0.45em]',
  };
  const mark = (
    <span
      className={cn(
        'inline-flex items-baseline font-display font-normal uppercase leading-none',
        sizes[size],
        light ? 'text-ivory' : 'text-charcoal',
        className
      )}
      aria-hidden="true"
    >
      <span className="mr-[0.42em] inline-flex">
        <Apex />
      </span>
      ERIAL
    </span>
  );
  if (as === 'span') return mark;
  return (
    <Link href="/" aria-label="AERIAL — home" className="-mr-[0.42em] inline-flex">
      {mark}
    </Link>
  );
}
