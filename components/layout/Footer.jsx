'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Plus } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import Newsletter from '@/components/ui/Newsletter';
import SocialIcons from '@/components/ui/SocialIcons';
import { footerNav, site } from '@/data/site';

function LinkColumn({ title, links }) {
  return (
    <>
      {/* desktop */}
      <div className="hidden md:block">
        <p className="eyebrow mb-5">{title}</p>
        <ul className="space-y-2.5">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-[0.84rem] text-muted transition-colors duration-300 hover:text-charcoal">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* mobile: native disclosure is keyboard & screen-reader friendly */}
      <details className="group border-b border-line md:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between py-4 [&::-webkit-details-marker]:hidden">
          <span className="eyebrow">{title}</span>
          <Plus size={16} strokeWidth={1.2} aria-hidden="true" className="transition-transform duration-300 group-open:rotate-45" />
        </summary>
        <ul className="space-y-3 pb-5">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-[0.88rem] text-muted">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </details>
    </>
  );
}

function LegalLinks() {
  return (
    <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
      <li>
        <Link href="/legal/privacy" className="hover:text-charcoal">
          Privacy Policy
        </Link>
      </li>
      <li>
        <Link href="/legal/terms" className="hover:text-charcoal">
          Terms &amp; Conditions
        </Link>
      </li>
      <li>
        <Link href="/help?topic=shipping" className="hover:text-charcoal">
          Shipping &amp; Returns
        </Link>
      </li>
    </ul>
  );
}

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith('/checkout')) {
    return (
      <footer className="border-t border-line">
        <div className="container-luxe flex flex-col items-center justify-between gap-4 py-6 text-[0.75rem] text-muted sm:flex-row">
          <p>© 2026 AERIAL. Demo checkout — no payment is taken.</p>
          <LegalLinks />
        </div>
      </footer>
    );
  }

  // pages with their own newsletter band skip the footer's duplicate
  const showNewsletter = !['/', '/journal'].includes(pathname);

  return (
    <footer className="border-t border-line bg-ivory">
      <div className="container-luxe">
        {/* newsletter */}
        {showNewsletter && (
        <section aria-labelledby="footer-newsletter" className="grid gap-8 border-b border-line py-14 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:py-16">
          <div>
            <p className="eyebrow mb-4 text-stone">Join our world</p>
            <h2 id="footer-newsletter" className="display-sm !text-[clamp(1.9rem,3.4vw,3rem)]">
              A More Conscious Tomorrow
            </h2>
            <p className="mt-3 max-w-md text-[0.9rem] text-muted">
              Discover new collections, thoughtful stories, and timeless inspiration.
            </p>
          </div>
          <Newsletter />
        </section>
        )}

        {/* link columns */}
        <div className="grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-8 lg:py-16">
          <div className="pb-4 md:pb-0">
            <Logo size="sm" />
            <p className="mt-5 font-editorial text-[1.15rem] leading-snug">{site.tagline}</p>
            <p className="mt-3 max-w-xs text-[0.84rem] text-muted">
              Contemporary clothing and accessories, designed in our Mumbai studio and made in small runs with partners we know by name.
            </p>
            <SocialIcons only={['Instagram', 'Pinterest']} className="mt-6" size={20} />
          </div>
          <div className="md:contents">
            <LinkColumn title="Explore" links={footerNav.explore} />
            <LinkColumn title="Customer Care" links={footerNav.care} />
            <LinkColumn title="About" links={footerNav.about} />
          </div>
        </div>

        {/* bottom bar */}
        <div className="flex flex-col gap-4 border-t border-line py-6 text-[0.75rem] text-muted md:flex-row md:items-center md:justify-between">
          <p>© 2026 AERIAL. All rights reserved.</p>
          <p className="tracking-[0.12em]">INDIA &nbsp;|&nbsp; INR ₹</p>
          <LegalLinks />
        </div>
      </div>
    </footer>
  );
}
