import { site } from '@/data/site';
import { cn } from '@/lib/format';

// Brand glyphs (lucide no longer ships brand icons), drawn at 24px.
const paths = {
  Instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  Pinterest: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M10.6 20.4 12.3 13.4M11.1 15.6c.5.9 1.4 1.4 2.5 1.4 2.3 0 3.9-2.2 3.9-5 0-2.6-2.2-4.6-5.3-4.6-3.5 0-5.4 2.4-5.4 4.8 0 1.2.5 2.4 1.5 2.9" />
    </>
  ),
  YouTube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
      <path d="m10 9.2 5 2.8-5 2.8z" fill="currentColor" />
    </>
  ),
  Facebook: <path d="M14.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8.9v3h2.6V21" />,
};

export function SocialIcon({ name, size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

export default function SocialIcons({ only, className, size }) {
  const list = only ? site.social.filter((s) => only.includes(s.name)) : site.social;
  return (
    <ul className={cn('flex items-center gap-5', className)}>
      {list.map((s) => (
        <li key={s.name}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`AERIAL on ${s.name} (opens in a new tab)`}
            className="inline-flex transition-opacity duration-300 hover:opacity-50"
          >
            <SocialIcon name={s.name} size={size} />
          </a>
        </li>
      ))}
    </ul>
  );
}
