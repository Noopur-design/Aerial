'use client';

import { cn } from '@/lib/format';

export default function SizeSelector({ sizes, value, onChange, size = 'md', invalid = false, className, label = 'Size', describedBy }) {
  const onKeyDown = (e, i) => {
    const n = sizes.length;
    let next = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % n;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + n) % n;
    if (next !== null) {
      e.preventDefault();
      onChange(sizes[next]);
      e.currentTarget.parentElement.children[next]?.focus();
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label={label}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      className={cn('flex flex-wrap gap-2', className)}
    >
      {sizes.map((s, i) => {
        const active = value === s;
        return (
          <button
            key={s}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active || (!value && i === 0) ? 0 : -1}
            onClick={() => onChange(s)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn(
              'inline-flex items-center justify-center border text-[0.74rem] transition-colors duration-300',
              size === 'sm' ? 'h-8 min-w-10 px-2' : 'h-10 min-w-14 px-3',
              s.length > 4 && 'min-w-24',
              active
                ? 'border-charcoal bg-charcoal text-ivory'
                : invalid
                  ? 'border-burgundy/60 bg-transparent hover:border-charcoal'
                  : 'border-line bg-[#fffdf9] hover:border-charcoal'
            )}
          >
            {s}
          </button>
        );
      })}
    </div>
  );
}
