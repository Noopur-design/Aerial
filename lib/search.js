import { products, productTypes } from '@/data/products';
import { collections } from '@/data/collections';

const typeLabel = Object.fromEntries(productTypes.map((t) => [t.value, t.label]));
const collectionName = Object.fromEntries(collections.map((c) => [c.slug, c.name]));

const normalise = (s) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

// singular/plural tolerant token match
const stem = (w) => w.replace(/(es|s)$/, '');

function haystack(p) {
  return normalise(
    [
      p.name,
      typeLabel[p.type],
      p.type,
      p.gender === 'men' ? 'men mens menswear man' : 'women womens womenswear woman',
      p.collections.map((c) => collectionName[c]).join(' '),
      p.colors.map((c) => c.name).join(' '),
      p.badge || '',
      p.description,
      p.fabric,
    ].join(' ')
  );
}

const INDEX = products.map((p) => ({ p, text: haystack(p), name: normalise(p.name) }));

export function searchProducts(query) {
  const q = normalise(query || '');
  if (!q) return [];
  const terms = q.split(' ').map(stem).filter(Boolean);
  return INDEX.map(({ p, text, name }) => {
    const words = text.split(' ').map(stem);
    let score = 0;
    for (const t of terms) {
      if (name.includes(t)) score += 5;
      else if (words.some((w) => w.startsWith(t))) score += 2;
      else return null; // every term must match somewhere
    }
    return { p, score: score + p.popularity / 100 };
  })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.p);
}

const VOCAB = [
  ...new Set(
    products
      .flatMap((p) => [...normalise(p.name).split(' '), p.type, typeLabel[p.type].toLowerCase(), ...p.colors.map((c) => c.name.toLowerCase())])
      .concat(collections.flatMap((c) => normalise(c.name).split(' ')))
      .filter((w) => w.length > 2)
  ),
];

function distance(a, b) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return dp[a.length][b.length];
}

/** "Did you mean" correction for misspelled queries. */
export function suggestCorrection(query) {
  const words = normalise(query || '').split(' ').filter(Boolean);
  if (!words.length) return null;
  let changed = false;
  const fixed = words.map((w) => {
    if (VOCAB.includes(w)) return w;
    let best = w;
    let bestD = Math.max(2, Math.floor(w.length / 3)) + 1;
    for (const v of VOCAB) {
      const d = distance(w, v);
      if (d < bestD) {
        bestD = d;
        best = v;
      }
    }
    if (best !== w) changed = true;
    return best;
  });
  const out = fixed.join(' ');
  return changed && searchProducts(out).length ? out : null;
}

/** Up to `n` product names that start with / contain the query, for the type-ahead list. */
export function autocomplete(query, n = 5) {
  const q = normalise(query || '');
  if (q.length < 2) return [];
  return INDEX.filter(({ name }) => name.includes(q))
    .sort((a, b) => a.name.indexOf(q) - b.name.indexOf(q))
    .slice(0, n)
    .map(({ p }) => p);
}
