import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

/** Row of beige category tiles: title + line + circular arrow, image on the right. */
export default function CategoryTiles({ tiles }) {
  return (
    <nav aria-label="Shop by category" className="px-2 pt-2 sm:px-4 lg:px-6">
      <ul className="no-scrollbar -mx-2 flex snap-x gap-2 overflow-x-auto px-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:px-0 lg:grid-cols-5" data-reveal-stagger>
        {tiles.map((t) => (
          <li key={t.label} className="w-[72vw] shrink-0 snap-start sm:w-auto">
            <Link href={t.href} className="group relative flex h-32 overflow-hidden bg-taupe sm:h-36">
              <div className="relative z-10 flex w-1/2 flex-col justify-between p-4 sm:p-5">
                <div>
                  <p className="text-[0.82rem] font-medium uppercase tracking-[0.12em]">{t.label}</p>
                  <p className="mt-1.5 text-[0.72rem] leading-snug text-muted">{t.text}</p>
                </div>
                <span className="arrow-nudge inline-flex h-7 w-7 items-center justify-center rounded-full border border-charcoal/50 transition-colors group-hover:bg-charcoal group-hover:text-ivory">
                  <ArrowRight size={13} strokeWidth={1.25} aria-hidden="true" />
                </span>
              </div>
              <div className="zoom-img absolute inset-y-0 right-0 w-[55%]">
                <Image src={t.image} alt="" fill sizes="(min-width:1024px) 12vw, 36vw" className="object-cover" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
