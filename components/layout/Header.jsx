'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Search, User, ShoppingBag, Menu, Lock, ChevronDown, ArrowLeft } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import MegaMenu from './MegaMenu';
import MobileNav from './MobileNav';
import { mainNav } from '@/data/site';
import { useCartCount, useStore } from '@/store/useStore';
import { useScrolled } from '@/hooks/useUI';
import { cn } from '@/lib/format';

function CheckoutHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ivory">
      <div className="container-luxe flex h-[var(--header-h)] items-center justify-between gap-4">
        <Link href="/cart" className="arrow-nudge inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.16em] text-muted hover:text-charcoal">
          <ArrowLeft size={15} strokeWidth={1.25} aria-hidden="true" />
          <span className="hidden sm:inline">Back to bag</span>
          <span className="sm:hidden">Bag</span>
        </Link>
        <Logo />
        <div className="flex items-center gap-3">
          <Lock size={18} strokeWidth={1.25} aria-hidden="true" />
          <div className="hidden leading-tight sm:block">
            <p className="text-[0.75rem] font-medium">Secure Checkout</p>
            <p className="text-[0.68rem] text-muted">Your information is encrypted</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Header() {
  const pathname = usePathname();
  const scrolled = useScrolled(24);
  const count = useCartCount();
  const hydrated = useStore((s) => s.hydrated);
  const user = useStore((s) => s.user);
  const [mega, setMega] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef(null);

  // Solid header on every page: hero images are light, so a transparent
  // ivory header would be unreadable over them.
  const overlayHero = false;
  const solid = !overlayHero || scrolled || !!mega;

  const openMega = (key) => {
    clearTimeout(closeTimer.current);
    setMega(key);
  };
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMega(null), 160);
  };
  const closeAll = useCallback(() => {
    clearTimeout(closeTimer.current);
    setMega(null);
    setMobileOpen(false);
  }, []);

  // close menus whenever the route changes
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setMega(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    if (!mega) return undefined;
    const onKey = (e) => e.key === 'Escape' && setMega(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mega]);

  if (pathname.startsWith('/checkout')) return <CheckoutHeader />;

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`));
  const bagLabel = `Shopping bag, ${hydrated ? count : 0} item${count === 1 ? '' : 's'}`;

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,color,border-color] duration-500',
          solid ? 'border-b border-line bg-ivory/95 text-charcoal backdrop-blur-md' : 'border-b border-transparent bg-transparent text-ivory on-dark'
        )}
        onMouseLeave={scheduleClose}
      >
        <div className="container-luxe grid h-[var(--header-h)] grid-cols-[1fr_auto_1fr] items-center gap-4">
          {/* left */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="-ml-2 inline-flex h-10 w-10 items-center justify-center xl:hidden"
            >
              <Menu size={22} strokeWidth={1.2} />
            </button>
            <nav aria-label="Primary" className="hidden xl:block">
              <ul className="flex items-center gap-5 2xl:gap-7">
                {mainNav.map((item) => (
                  <li
                    key={item.href}
                    className="flex items-center whitespace-nowrap"
                    onMouseEnter={() => (item.mega ? openMega(item.mega) : scheduleClose())}
                  >
                    <Link href={item.href} className="nav-link py-2" aria-current={isActive(item.href) ? 'page' : undefined}>
                      {item.label}
                    </Link>
                    {item.mega && (
                      <button
                        type="button"
                        aria-label={`${item.label} menu`}
                        aria-expanded={mega === item.mega}
                        aria-controls={`mega-${item.mega}`}
                        onClick={() => setMega(mega === item.mega ? null : item.mega)}
                        className="sr-only inline-flex h-6 w-4 items-center justify-center focus:not-sr-only"
                      >
                        <ChevronDown size={12} strokeWidth={1.5} className={cn('transition-transform duration-300', mega === item.mega && 'rotate-180')} />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* centre */}
          <div className="flex justify-center" onMouseEnter={scheduleClose}>
            <Logo light={!solid} />
          </div>

          {/* right */}
          <div className="flex items-center justify-end gap-1 sm:gap-3 xl:gap-7" onMouseEnter={scheduleClose}>
            <Link href="/search" className="inline-flex h-10 items-center gap-2 px-2 xl:px-0" aria-label="Search">
              <span className="nav-link hidden xl:inline">Search</span>
              <Search size={19} strokeWidth={1.25} aria-hidden="true" />
            </Link>
            <Link href="/account" className="hidden h-10 items-center gap-2 px-2 sm:inline-flex xl:px-0" aria-label={user ? `Account — signed in as ${user.name}` : 'Account — sign in'}>
              <span className="nav-link hidden xl:inline">{user ? user.name.split(' ')[0] : 'Account'}</span>
              <User size={19} strokeWidth={1.25} aria-hidden="true" />
            </Link>
            <Link href="/cart" className="inline-flex h-10 items-center gap-2 pl-2 xl:pl-0" aria-label={bagLabel}>
              <ShoppingBag size={19} strokeWidth={1.25} aria-hidden="true" />
              <span className="nav-link" aria-hidden="true">
                <span className="hidden xl:inline">Bag </span>({hydrated ? count : 0})
              </span>
            </Link>
          </div>
        </div>

        {mega && (
          <div className="hidden xl:block">
            <MegaMenu
              id={`mega-${mega}`}
              menu={mega}
              onNavigate={closeAll}
              onMouseEnter={() => openMega(mega)}
              onMouseLeave={scheduleClose}
            />
          </div>
        )}
      </header>

      {/* keeps content clear of the fixed header everywhere except the home hero */}
      {!overlayHero && <div aria-hidden="true" className="h-[var(--header-h)]" />}

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
