'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { lookupDiscount } from '@/lib/pricing';

const lineKey = (slug, color, size) => `${slug}__${color}__${size}`;

let toastTimer;

export const useStore = create(
  persist(
    (set, get) => ({
      // persisted
      cart: [],
      wishlist: [],
      recentlyViewed: [],
      discountCode: '',
      user: null,
      orders: [],
      lastOrderNumber: null,
      addresses: [],

      // session-only UI state
      hydrated: false,
      cartOpen: false,
      toast: null,

      // ---------------------------------------------------------------- cart
      addToCart: ({ slug, color, size, qty = 1 }, { open = true } = {}) => {
        const key = lineKey(slug, color, size);
        const cart = [...get().cart];
        const existing = cart.find((l) => l.key === key);
        if (existing) existing.qty = Math.min(10, existing.qty + qty);
        else cart.unshift({ key, slug, color, size, qty: Math.min(10, qty) });
        set({ cart: cart.map((l) => ({ ...l })), cartOpen: open });
      },
      updateQty: (key, qty) =>
        set({
          cart: get()
            .cart.map((l) => (l.key === key ? { ...l, qty: Math.max(1, Math.min(10, qty)) } : l)),
        }),
      updateLine: (key, { color, size }) => {
        const cart = get().cart;
        const line = cart.find((l) => l.key === key);
        if (!line) return;
        const next = { ...line, color: color ?? line.color, size: size ?? line.size };
        next.key = lineKey(next.slug, next.color, next.size);
        const merged = cart.filter((l) => l.key !== key);
        const dupe = merged.find((l) => l.key === next.key);
        if (dupe) dupe.qty = Math.min(10, dupe.qty + next.qty);
        else merged.splice(cart.indexOf(line), 0, next);
        set({ cart: merged.map((l) => ({ ...l })) });
      },
      removeFromCart: (key) => set({ cart: get().cart.filter((l) => l.key !== key) }),
      moveToWishlist: (key) => {
        const line = get().cart.find((l) => l.key === key);
        if (!line) return;
        const wishlist = get().wishlist.includes(line.slug) ? get().wishlist : [line.slug, ...get().wishlist];
        set({ cart: get().cart.filter((l) => l.key !== key), wishlist });
        get().showToast('Moved to your wishlist');
      },
      clearCart: () => set({ cart: [], discountCode: '' }),
      openCart: () => set({ cartOpen: true }),
      closeCart: () => set({ cartOpen: false }),

      // ------------------------------------------------------------ discount
      applyDiscount: (code) => {
        const found = lookupDiscount(code);
        if (found) set({ discountCode: found.code });
        return found;
      },
      removeDiscount: () => set({ discountCode: '' }),

      // ------------------------------------------------------------ wishlist
      toggleWishlist: (slug) => {
        const has = get().wishlist.includes(slug);
        set({ wishlist: has ? get().wishlist.filter((s) => s !== slug) : [slug, ...get().wishlist] });
        get().showToast(has ? 'Removed from your wishlist' : 'Saved to your wishlist', has ? null : { href: '/wishlist', label: 'View' });
        return !has;
      },
      removeFromWishlist: (slug) => set({ wishlist: get().wishlist.filter((s) => s !== slug) }),
      clearWishlist: () => set({ wishlist: [] }),

      // ------------------------------------------------------ recently viewed
      addRecentlyViewed: (slug) =>
        set({ recentlyViewed: [slug, ...get().recentlyViewed.filter((s) => s !== slug)].slice(0, 8) }),

      // ---------------------------------------------------------- demo auth
      signIn: (user) => set({ user }),
      signOut: () => set({ user: null }),
      updateUser: (patch) => set({ user: { ...get().user, ...patch } }),
      saveAddress: (address) => {
        const others = get().addresses.filter((a) => a.id !== address.id);
        set({ addresses: [address, ...others].slice(0, 5) });
      },
      removeAddress: (id) => set({ addresses: get().addresses.filter((a) => a.id !== id) }),

      // -------------------------------------------------------------- orders
      placeOrder: (order) => set({ orders: [order, ...get().orders], lastOrderNumber: order.number, cart: [], discountCode: '' }),

      // --------------------------------------------------------------- toast
      showToast: (message, action = null) => {
        clearTimeout(toastTimer);
        set({ toast: { message, action, id: Date.now() } });
        toastTimer = setTimeout(() => set({ toast: null }), 3200);
      },
      dismissToast: () => set({ toast: null }),
    }),
    {
      name: 'aerial-store',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (s) => ({
        cart: s.cart,
        wishlist: s.wishlist,
        recentlyViewed: s.recentlyViewed,
        discountCode: s.discountCode,
        user: s.user,
        orders: s.orders,
        lastOrderNumber: s.lastOrderNumber,
        addresses: s.addresses,
      }),
      onRehydrateStorage: () => () => {
        useStore.setState({ hydrated: true });
      },
    }
  )
);

export const useCartCount = () => useStore((s) => s.cart.reduce((n, l) => n + l.qty, 0));
