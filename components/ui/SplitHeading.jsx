import { cn } from '@/lib/format';

/**
 * Heading revealed line by line. Pass `lines` (array of strings or nodes)
 * so line breaks are deterministic on every screen size.
 */
export default function SplitHeading({ as: Tag = 'h2', lines, className, immediate = false, delay, ...props }) {
  return (
    <Tag
      className={cn(className)}
      data-split=""
      data-immediate={immediate ? '1' : undefined}
      data-delay={delay}
      {...props}
    >
      {lines.map((line, i) => (
        <span key={i} className="split-line">
          <span className="split-line-inner">{line}</span>
        </span>
      ))}
    </Tag>
  );
}
