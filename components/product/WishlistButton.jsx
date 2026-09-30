'use client';

import { Heart } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/format';

export default function WishlistButton({ slug, name, variant = 'overlay', className }) {
  const saved = useStore((s) => s.hydrated && s.wishlist.includes(slug));
  const toggle = useStore((s) => s.toggleWishlist);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}
      className={cn(
        'inline-flex items-center justify-center transition-all duration-300',
        variant === 'overlay' && 'h-9 w-9 rounded-full bg-ivory/75 text-charcoal backdrop-blur-sm hover:bg-ivory',
        variant === 'box' && 'h-14 w-14 border border-charcoal hover:bg-charcoal hover:text-ivory',
        className
      )}
    >
      <Heart
        size={variant === 'box' ? 20 : 19}
        strokeWidth={1.2}
        className={cn('transition-transform duration-300', saved && 'scale-110')}
        fill={saved ? 'currentColor' : 'none'}
      />
    </button>
  );
}
