'use client';

import { cn } from '@/lib/format';

/** Colour swatches. Interactive (radio group) when `onChange` is provided. */
export default function ColorSwatches({ colors, value, onChange, size = 'sm', max, label = 'Colour', className }) {
  const shown = max ? colors.slice(0, max) : colors;
  const extra = max && colors.length > max ? colors.length - max : 0;
  const dim = size === 'lg' ? 'h-9 w-9' : size === 'md' ? 'h-6 w-6' : 'h-[15px] w-[15px]';

  if (!onChange) {
    return (
      <ul className={cn('flex items-center gap-1.5', className)} aria-label={`Available colours: ${colors.map((c) => c.name).join(', ')}`}>
        {shown.map((c) => (
          <li key={c.name} title={c.name} className={cn(dim, 'rounded-full border border-charcoal/10')} style={{ background: c.hex }} />
        ))}
        {extra > 0 && <li className="text-[0.7rem] text-muted">+{extra}</li>}
      </ul>
    );
  }

  const onKeyDown = (e, i) => {
    const n = shown.length;
    let next = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % n;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + n) % n;
    if (next !== null) {
      e.preventDefault();
      onChange(shown[next].name);
      e.currentTarget.parentElement.children[next]?.focus();
    }
  };

  return (
    <div role="radiogroup" aria-label={label} className={cn('flex flex-wrap items-center', size === 'lg' ? 'gap-3' : 'gap-2', className)}>
      {shown.map((c, i) => {
        const active = value === c.name;
        return (
          <button
            key={c.name}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={c.name}
            title={c.name}
            tabIndex={active || (!value && i === 0) ? 0 : -1}
            onClick={() => onChange(c.name)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn(
              'relative inline-flex items-center justify-center rounded-full transition-[box-shadow] duration-300',
              size === 'lg' ? 'h-11 w-11' : size === 'md' ? 'h-8 w-8' : 'h-6 w-6',
              active ? 'ring-1 ring-charcoal ring-offset-2 ring-offset-ivory' : 'hover:ring-1 hover:ring-stone hover:ring-offset-2 hover:ring-offset-ivory'
            )}
          >
            <span className={cn(dim, 'rounded-full border border-charcoal/10')} style={{ background: c.hex }} />
          </button>
        );
      })}
      {extra > 0 && <span className="text-[0.7rem] text-muted" aria-label={`${extra} more colours`}>+{extra}</span>}
    </div>
  );
}
