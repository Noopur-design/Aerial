import Link from 'next/link';
import Media from './Media';
import { TextLink } from './Button';
import { cn } from '@/lib/format';

/** Dark editorial banner with an image, oversized serif title and optional numbered list. */
export default function CampaignBanner({ eyebrow, title, href, cta = 'Explore now', image, imageAlt, list, className, align = 'left' }) {
  return (
    <section className={cn('on-dark relative isolate overflow-hidden bg-espresso text-ivory', className)}>
      <Media src={image} alt={imageAlt} className="absolute inset-0 -z-10" sizes="(min-width:1024px) 60vw, 100vw" parallax="0.1" />
      <div
        className={cn(
          'absolute inset-0 -z-10',
          align === 'left'
            ? 'bg-[linear-gradient(90deg,rgba(26,22,18,0.86)_0%,rgba(26,22,18,0.55)_55%,rgba(26,22,18,0.45)_100%)]'
            : 'bg-[linear-gradient(270deg,rgba(26,22,18,0.84)_0%,rgba(26,22,18,0.5)_60%,rgba(26,22,18,0.42)_100%)]'
        )}
      />
      <div className={cn('flex h-full flex-col justify-between gap-8 p-7 sm:flex-row sm:items-end sm:p-10', align === 'right' && 'sm:text-right')}>
        <div className={cn(align === 'right' && 'sm:ml-auto')}>
          {eyebrow && <p className="eyebrow mb-3 text-ivory/75">{eyebrow}</p>}
          <h2 className="caps-serif text-[clamp(1.8rem,3.4vw,2.8rem)]">{title}</h2>
          <TextLink href={href} light className="mt-5">
            {cta}
          </TextLink>
        </div>
        {list && (
          <ol className="space-y-3 border-ivory/30 text-[0.82rem] text-ivory/85 sm:border-l sm:pl-8">
            {list.map((item, i) => (
              <li key={item} className="flex gap-4">
                <span className="font-display text-[1rem] text-ivory/60">0{i + 1}</span>
                {item}
              </li>
            ))}
          </ol>
        )}
      </div>
      <Link href={href} className="absolute inset-0 -z-[5]" tabIndex={-1} aria-hidden="true" />
    </section>
  );
}
