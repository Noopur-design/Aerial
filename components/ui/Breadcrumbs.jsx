import Link from 'next/link';
import { cn } from '@/lib/format';

export default function Breadcrumbs({ items, className, light = false }) {
  return (
    <nav aria-label="Breadcrumb" className={cn('text-[0.75rem]', className)}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className={cn('transition-opacity hover:opacity-60', light ? 'text-ivory/80' : 'text-muted')}
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? 'page' : undefined} className={light ? 'text-ivory' : 'text-charcoal'}>
                  {item.label}
                </span>
              )}
              {!last && (
                <span aria-hidden="true" className={light ? 'text-ivory/50' : 'text-stone'}>
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
