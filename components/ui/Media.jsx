import Image from 'next/image';
import { cn } from '@/lib/format';

/**
 * Editorial image block. `reveal` adds the clip-path entrance, `parallax`
 * a subtle scrubbed drift. Always fills its (positioned) wrapper.
 */
export default function Media({
  src,
  alt,
  className,
  imgClassName,
  sizes = '100vw',
  reveal = false,
  parallax,
  preload = false,
  position,
  grain = false,
  children,
  quality,
}) {
  return (
    <div
      className={cn('overflow-hidden bg-taupe', !/\b(absolute|fixed)\b/.test(className || '') && 'relative', grain && 'grain', className)}
      data-reveal-img={reveal ? '' : undefined}
      data-parallax={parallax || undefined}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        preload={preload}
        loading={preload ? 'eager' : undefined}
        quality={quality}
        className={cn('object-cover', imgClassName)}
        style={position ? { objectPosition: position } : undefined}
      />
      {children}
    </div>
  );
}
