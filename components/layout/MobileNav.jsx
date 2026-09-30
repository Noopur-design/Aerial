'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Plus, Minus, Search, User, Heart, ShoppingBag } from 'lucide-react';
import Drawer from '@/components/ui/Drawer';
import Logo from '@/components/ui/Logo';
import SocialIcons from '@/components/ui/SocialIcons';
import { mainNav, site } from '@/data/site';
import { megaMenus } from './menuData';

export default function MobileNav({ open, onClose }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <Drawer open={open} onClose={onClose} side="left" label="Main menu" title={<Logo as="span" size="sm" />} width="max-w-sm">
      <nav aria-label="Mobile" className="px-6 py-4">
        <ul className="divide-y divide-line">
          {mainNav.map((item) => {
            const sub = item.mega ? megaMenus[item.mega].columns[0].links : null;
            const isOpen = expanded === item.label;
            return (
              <li key={item.href}>
                <div className="flex items-center justify-between">
                  <Link href={item.href} onClick={onClose} className="flex-1 py-4 font-editorial text-[1.6rem] leading-none">
                    {item.label}
                  </Link>
                  {sub && (
                    <button
                      type="button"
                      aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${item.label}`}
                      aria-expanded={isOpen}
                      onClick={() => setExpanded(isOpen ? null : item.label)}
                      className="inline-flex h-11 w-11 items-center justify-center"
                    >
                      {isOpen ? <Minus size={18} strokeWidth={1.1} /> : <Plus size={18} strokeWidth={1.1} />}
                    </button>
                  )}
                </div>
                {sub && isOpen && (
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 pb-5">
                    {sub.map((l) => (
                      <li key={l.href + l.label}>
                        <Link href={l.href} onClick={onClose} className="text-[0.88rem] text-muted hover:text-charcoal">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
          <li>
            <Link href="/lookbook" onClick={onClose} className="block py-4 font-editorial text-[1.6rem] leading-none">
              Lookbook
            </Link>
          </li>
        </ul>

        <ul className="mt-6 grid grid-cols-2 gap-3 text-[0.72rem] uppercase tracking-[0.14em]">
          {[
            { href: '/search', label: 'Search', icon: Search },
            { href: '/account', label: 'Account', icon: User },
            { href: '/wishlist', label: 'Wishlist', icon: Heart },
            { href: '/cart', label: 'Bag', icon: ShoppingBag },
          ].map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <Link href={href} onClick={onClose} className="flex h-12 items-center gap-3 border border-line px-4 hover:border-charcoal">
                <Icon size={17} strokeWidth={1.25} aria-hidden="true" />
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 space-y-1 text-[0.8rem] text-muted">
          <p className="eyebrow mb-3 text-charcoal">Client Services</p>
          <p>{site.email}</p>
          <p>{site.phone}</p>
          <p>{site.hours}</p>
        </div>
        <SocialIcons className="mt-6" size={19} />
      </nav>
    </Drawer>
  );
}
