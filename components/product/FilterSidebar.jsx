'use client';

import { useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { formatINR, cn } from '@/lib/format';

function Group({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = `filter-${title.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <div className="border-b border-line py-5">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between text-[0.72rem] font-medium uppercase tracking-[0.14em]"
        >
          {title}
          <ChevronUp size={15} strokeWidth={1.25} aria-hidden="true" className={cn('transition-transform duration-300', !open && 'rotate-180')} />
        </button>
      </h3>
      <div id={id} hidden={!open} className="pt-4">
        {children}
      </div>
    </div>
  );
}

function Check({ checked, onChange, children }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-1 text-[0.82rem]">
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        aria-hidden="true"
        className="inline-flex h-[15px] w-[15px] items-center justify-center border border-stone transition-colors peer-checked:border-charcoal peer-checked:bg-charcoal peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-charcoal"
      >
        <svg viewBox="0 0 12 12" className={cn('h-2.5 w-2.5 text-ivory', !checked && 'invisible')}>
          <path d="M2 6.2 4.8 9 10 3" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </span>
      <span className={checked ? 'text-charcoal' : 'text-ink'}>{children}</span>
    </label>
  );
}

export default function FilterSidebar({ facets, filters, setFilters, priceBounds, onClear, activeCount, showCategory = true }) {
  const toggle = (key, value) =>
    setFilters((f) => {
      const set = new Set(f[key]);
      set.has(value) ? set.delete(value) : set.add(value);
      return { ...f, [key]: [...set] };
    });

  const [minP, maxP] = filters.price;
  const step = 500;

  return (
    <div>
      <div className="flex items-center justify-between pb-2">
        <h2 className="font-editorial text-xl tracking-wide">Filters</h2>
        {activeCount > 0 && (
          <button type="button" onClick={onClear} className="text-[0.75rem] underline underline-offset-4 hover:text-muted">
            Clear all ({activeCount})
          </button>
        )}
      </div>

      {showCategory && facets.types.length > 1 && (
        <Group title="Category">
          <fieldset>
            <legend className="sr-only">Category</legend>
            <Check checked={filters.types.length === 0} onChange={() => setFilters((f) => ({ ...f, types: [] }))}>
              All Products ({facets.total})
            </Check>
            {facets.types.map((t) => (
              <Check key={t.value} checked={filters.types.includes(t.value)} onChange={() => toggle('types', t.value)}>
                {t.label} ({t.count})
              </Check>
            ))}
          </fieldset>
        </Group>
      )}

      <Group title="Size">
        <fieldset>
          <legend className="sr-only">Size</legend>
          <div className="flex flex-wrap gap-2">
            {facets.sizes.map((s) => {
              const on = filters.sizes.includes(s);
              return (
                <button
                  key={s}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle('sizes', s)}
                  className={cn(
                    'h-8 min-w-11 border px-2 text-[0.72rem] transition-colors',
                    on ? 'border-charcoal bg-charcoal text-ivory' : 'border-line hover:border-charcoal'
                  )}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </fieldset>
      </Group>

      <Group title="Colour">
        <fieldset>
          <legend className="sr-only">Colour</legend>
          <div className="flex flex-wrap gap-2.5">
            {facets.colors.map((c) => {
              const on = filters.colors.includes(c.name);
              return (
                <button
                  key={c.name}
                  type="button"
                  aria-pressed={on}
                  aria-label={c.name}
                  title={c.name}
                  onClick={() => toggle('colors', c.name)}
                  className={cn('inline-flex h-7 w-7 items-center justify-center rounded-full', on && 'ring-1 ring-charcoal ring-offset-2 ring-offset-ivory')}
                >
                  <span className="h-[22px] w-[22px] rounded-full border border-charcoal/15" style={{ background: c.hex }} />
                </button>
              );
            })}
          </div>
        </fieldset>
      </Group>

      <Group title="Price">
        <div className="range-dual">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line" />
          <div
            className="absolute top-1/2 h-[2px] -translate-y-1/2 bg-charcoal"
            style={{
              left: `${((minP - priceBounds[0]) / (priceBounds[1] - priceBounds[0] || 1)) * 100}%`,
              right: `${100 - ((maxP - priceBounds[0]) / (priceBounds[1] - priceBounds[0] || 1)) * 100}%`,
            }}
          />
          <input
            type="range"
            aria-label="Minimum price"
            min={priceBounds[0]}
            max={priceBounds[1]}
            step={step}
            value={minP}
            onChange={(e) => setFilters((f) => ({ ...f, price: [Math.min(+e.target.value, f.price[1] - step), f.price[1]] }))}
          />
          <input
            type="range"
            aria-label="Maximum price"
            min={priceBounds[0]}
            max={priceBounds[1]}
            step={step}
            value={maxP}
            onChange={(e) => setFilters((f) => ({ ...f, price: [f.price[0], Math.max(+e.target.value, f.price[0] + step)] }))}
          />
        </div>
        <p className="mt-3 text-[0.78rem] text-muted">
          {formatINR(minP)} — {formatINR(maxP)}
        </p>
      </Group>

      <Group title="Availability">
        <Check checked={filters.inStock} onChange={() => setFilters((f) => ({ ...f, inStock: !f.inStock }))}>
          In stock only ({facets.inStock})
        </Check>
      </Group>
    </div>
  );
}
