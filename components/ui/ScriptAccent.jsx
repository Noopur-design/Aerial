import { cn } from '@/lib/format';

/** Handwritten accent ("More than fashion.") used across hero images. */
export default function ScriptAccent({ lines = ['More', 'than', 'fashion.'], className, light = true }) {
  return (
    <p
      aria-hidden="true"
      className={cn(
        'pointer-events-none select-none font-script leading-[0.8] -rotate-12',
        light ? 'text-ivory/90' : 'text-stone',
        className
      )}
    >
      {lines.map((l, i) => (
        <span key={i} className="block" style={{ paddingLeft: `${i * 0.55}em` }}>
          {l}
        </span>
      ))}
      <span className="mt-2 ml-[1.6em] block h-px w-[2.2em] bg-current opacity-70" />
    </p>
  );
}
