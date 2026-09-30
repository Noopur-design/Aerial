'use client';

import { useEffect } from 'react';
import { useStore } from '@/store/useStore';

// Restores cart, wishlist and account state from localStorage after the
// first client render, so server and client markup always match.
export default function Providers({ children }) {
  useEffect(() => {
    useStore.persist.rehydrate();
  }, []);
  return children;
}
