// Custom next/image loader for the static GitHub Pages export.
// `unoptimized` images do NOT get the basePath prepended automatically, so we
// add it here. Public assets live at `${basePath}/images/...` on Pages.
export default function imageLoader({ src }) {
  if (/^https?:\/\//.test(src)) return src;
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return `${base}${src}`;
}
