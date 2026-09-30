import Media from './Media';
import Button from './Button';
import { cn } from '@/lib/format';

/** Editorial empty state: campaign image on the left, message + CTA on the right. */
export default function EmptyState({ image, imageAlt, title, lines = [], cta, href, accent, className }) {
  return (
    <section className={cn('grid overflow-hidden border border-line bg-[#fbf4ea] md:grid-cols-[1.15fr_1fr]', className)}>
      <Media src={image} alt={imageAlt} className="aspect-[16/10] md:aspect-auto md:min-h-[300px]" sizes="(min-width: 768px) 50vw, 100vw" reveal />
      <div className="relative flex flex-col justify-center gap-4 p-8 sm:p-12">
        <h2 className="display-sm !text-[clamp(1.9rem,3.2vw,2.8rem)]" data-reveal>
          {title}
        </h2>
        <div data-reveal data-delay="0.1" className="space-y-1 text-[0.9rem] text-muted">
          {lines.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </div>
        {cta && (
          <div data-reveal data-delay="0.2" className="pt-2">
            <Button href={href}>{cta}</Button>
          </div>
        )}
        {accent}
      </div>
    </section>
  );
}
