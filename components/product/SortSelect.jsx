'use client';

import { useId } from 'react';
import { ChevronDown } from 'lucide-react';

export const SORTS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

export function sortProducts(list, sort) {
  const arr = [...list];
  switch (sort) {
    case 'newest':
      return arr.sort((a, b) => b.added.localeCompare(a.added));
    case 'popular':
      return arr.sort((a, b) => b.popularity - a.popularity);
    case 'price-asc':
      return arr.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return arr.sort((a, b) => b.price - a.price);
    default:
      return arr;
  }
}

export default function SortSelect({ value, onChange, className }) {
  const id = useId();
  return (
    <div className={`flex items-center gap-3 ${className || ''}`}>
      <label htmlFor={id} className="hidden text-[0.75rem] text-muted sm:block">
        Sort by
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-44 cursor-pointer appearance-none border border-line bg-[#fffdf9] pl-4 pr-9 text-[0.78rem] hover:border-charcoal focus:border-charcoal focus:outline-none"
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <ChevronDown size={14} strokeWidth={1.25} aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
}
