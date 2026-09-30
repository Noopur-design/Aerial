import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import SplitHeading from '@/components/ui/SplitHeading';
import { collections } from '@/data/collections';
import { cn } from '@/lib/format';

export const metadata = {
  title: 'Collections',
  description: 'Essentials, Autumn Edit, Contemporary Classics and Evening Wear — explore AERIAL’s seasonal edits and timeless collections.',
};

function Tile({ c, className, sizes, align = 'left', titleClass }) {
  return (
    <Link href={`/collections/${c.slug}`} className={cn('group on-dark relative isolate block overflow-hidden bg-espresso text-ivory', className)}>
      <div className="zoom-img absolute inset-0 -z-10" data-reveal-img>
        <Image src={c.hero} alt={c.heroAlt} fill sizes={sizes} className="object-cover" style={{ objectPosition: 'center 25%' }} />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(26,22,18,0.35)_0%,rgba(26,22,18,0.05)_35%,rgba(26,22,18,0.72)_100%)] transition-opacity duration-700 group-hover:opacity-90" />
      <div className="flex h-full flex-col justify-between p-6 sm:p-8 xl:p-10">
        <p className={cn('flex items-center gap-5 font-display text-[1.9rem] font-normal', align === 'right' && 'justify-end')}>
          {c.number}
          <span className="h-px w-24 bg-ivory/60 transition-all duration-700 group-hover:w-36" aria-hidden="true" />
        </p>
        <div className={cn(align === 'right' && 'text-right')}>
          <p className="eyebrow mb-3 text-ivory/80">{c.eyebrow}</p>
          <h2 className={cn('caps-serif [overflow-wrap:anywhere]', titleClass || 'text-[clamp(2.2rem,3.6vw,3.8rem)]')}>{c.name}</h2>
          <p className="mt-3 max-w-xs text-[0.85rem] text-ivory/85 [text-wrap:pretty]">{c.short}</p>
          <span className="arrow-nudge mt-6 inline-flex items-center gap-2.5 text-[0.72rem] font-medium uppercase tracking-[0.16em]">
            <span className="link-underline">View Collection</span>
            <ArrowRight size={15} strokeWidth={1.25} aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function CollectionsPage() {
  const [essentials, autumn, classics, evening] = collections;
  return (
    <div className="pb-2">
      <div className="grid gap-2 px-2 pt-2 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div className="flex flex-col justify-center px-4 py-12 sm:px-8 lg:py-16 xl:px-10">
          <p className="eyebrow mb-5">Curated for a brighter tomorrow</p>
          <SplitHeading as="h1" lines={['Our', 'Collections']} immediate className="caps-serif text-[clamp(2.3rem,5vw,5.4rem)]" />
          <p className="mt-6 max-w-sm text-[0.92rem] text-ink" data-reveal>
            Thoughtfully designed pieces for a more conscious, beautiful tomorrow. Explore our seasonal edits and timeless collections.
          </p>
        </div>
        <Tile c={essentials} className="min-h-[480px] lg:min-h-[560px]" sizes="(min-width:1024px) 36vw, 100vw" titleClass="text-[clamp(2.2rem,3.3vw,3.4rem)]" />
        <Tile c={autumn} className="min-h-[480px] lg:min-h-[560px]" sizes="(min-width:1024px) 36vw, 100vw" align="right" titleClass="text-[clamp(2.2rem,3.3vw,3.4rem)]" />
      </div>
      <div className="mt-2 grid gap-2 px-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <Tile c={classics} className="min-h-[440px] lg:min-h-[520px]" sizes="(min-width:1024px) 50vw, 100vw" />
        <Tile c={evening} className="min-h-[440px] lg:min-h-[520px]" sizes="(min-width:1024px) 50vw, 100vw" />
      </div>
    </div>
  );
}
