import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/format';

const variants = {
  solid:
    'bg-charcoal text-ivory border border-charcoal hover:bg-[#33302b] disabled:bg-stone disabled:border-stone',
  outline: 'border border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory',
  light: 'border border-ivory/80 text-ivory hover:bg-ivory hover:text-charcoal',
  ivory: 'bg-ivory text-charcoal border border-ivory hover:bg-beige',
  ghost: 'text-charcoal hover:bg-beige/60',
};

const sizes = {
  sm: 'h-10 px-5 text-[0.68rem]',
  md: 'h-12 px-7 text-[0.72rem]',
  lg: 'h-14 px-9 text-[0.78rem]',
};

/** Primary CTA. Renders a Link when `href` is set, otherwise a button. */
export default function Button({
  href,
  variant = 'solid',
  size = 'md',
  arrow = true,
  className,
  children,
  ...props
}) {
  const classes = cn(
    'arrow-nudge group inline-flex items-center justify-center gap-3 uppercase tracking-[0.16em] font-medium transition-colors duration-300 disabled:cursor-not-allowed',
    variants[variant],
    sizes[size],
    className
  );
  const content = (
    <>
      <span>{children}</span>
      {arrow && <ArrowRight aria-hidden="true" size={16} strokeWidth={1.25} />}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  );
}

/** Understated text link with an arrow, e.g. "VIEW COLLECTION →". */
export function TextLink({ href, children, className, light = false, ...props }) {
  return (
    <Link
      href={href}
      className={cn(
        'arrow-nudge group inline-flex items-center gap-2.5 text-[0.72rem] font-medium uppercase tracking-[0.16em]',
        light ? 'text-ivory' : 'text-charcoal',
        className
      )}
      {...props}
    >
      <span className="link-underline">{children}</span>
      <ArrowRight aria-hidden="true" size={15} strokeWidth={1.25} />
    </Link>
  );
}
