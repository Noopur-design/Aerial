import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Media from '@/components/ui/Media';
import Button from '@/components/ui/Button';
import SplitHeading from '@/components/ui/SplitHeading';
import { articles, getArticle } from '@/data/journal';
import { formatDate } from '@/lib/format';

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return { title: a.title, description: a.excerpt, openGraph: { type: 'article', images: [a.image] } };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const related = articles.filter((a) => a.slug !== slug).sort((a, b) => (b.category === article.category) - (a.category === article.category)).slice(0, 3);
  const words = article.title.split(' ');
  const mid = Math.ceil(words.length / 2);

  return (
    <article>
      <header className="container-luxe pb-10 pt-6">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Journal', href: '/journal' }, { label: article.category }]} />
        <div className="mx-auto mt-10 max-w-4xl text-center">
          <p className="eyebrow text-stone">
            {article.category} · {formatDate(article.date, { day: 'numeric', month: 'long', year: 'numeric' })} · {article.readTime}
          </p>
          <SplitHeading as="h1" lines={[words.slice(0, mid).join(' '), words.slice(mid).join(' ')]} immediate className="mt-5 font-editorial text-[clamp(2.6rem,6vw,5.2rem)] leading-[1]" />
          <p className="mx-auto mt-6 max-w-2xl text-[1.1rem] leading-relaxed text-ink" data-reveal>
            {article.intro}
          </p>
        </div>
      </header>

      <Media src={article.image} alt={article.imageAlt} className="mx-auto aspect-[16/9] max-h-[80vh] w-full max-w-[1440px]" sizes="100vw" preload parallax="0.08" />

      <div className="container-luxe">
        <div className="mx-auto max-w-2xl py-16 text-[1.02rem] leading-[1.8] text-ink">
          {article.body.map((block, i) => {
            if (block.type === 'h')
              return (
                <h2 key={i} className="mb-4 mt-12 font-editorial text-[1.9rem] leading-tight text-charcoal" data-reveal>
                  {block.text}
                </h2>
              );
            if (block.type === 'quote')
              return (
                <blockquote key={i} className="my-12 border-y border-line py-10 text-center font-editorial text-[clamp(1.6rem,3vw,2.2rem)] italic leading-snug text-charcoal" data-reveal>
                  “{block.text}”
                </blockquote>
              );
            if (block.type === 'img')
              return (
                <figure key={i} className="my-12 md:-mx-24">
                  <Media src={block.src} alt={block.alt} className="aspect-[4/3]" sizes="(min-width:768px) 900px, 100vw" reveal />
                  <figcaption className="mt-3 text-[0.78rem] text-muted">{block.caption}</figcaption>
                </figure>
              );
            return (
              <p key={i} className="mb-6" data-reveal>
                {block.text}
              </p>
            );
          })}
          <div className="mt-14 flex flex-col items-start gap-5 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-editorial text-[1.4rem]">Discover the pieces behind the story.</p>
            <Button href="/collections">Explore Collection</Button>
          </div>
        </div>
      </div>

      <section aria-labelledby="related-articles" className="border-t border-line bg-[#fbf3e8]">
        <div className="container-luxe py-16">
          <div className="mb-10 flex items-end justify-between">
            <h2 id="related-articles" className="caps-serif text-[clamp(1.8rem,3.4vw,2.8rem)]">
              Related Stories
            </h2>
            <Link href="/journal" className="arrow-nudge inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.16em]">
              <span className="link-underline">All stories</span> <ArrowRight size={14} strokeWidth={1.25} aria-hidden="true" />
            </Link>
          </div>
          <ul className="grid gap-8 md:grid-cols-3" data-reveal-stagger>
            {related.map((a) => (
              <li key={a.slug}>
                <Link href={`/journal/${a.slug}`} className="group block">
                  <div className="zoom-img relative aspect-[4/3] overflow-hidden bg-taupe">
                    <Image src={a.image} alt={a.imageAlt} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover" />
                  </div>
                  <p className="eyebrow mt-4 text-stone">{a.category}</p>
                  <h3 className="mt-2 font-editorial text-[1.35rem] leading-tight group-hover:text-muted">{a.title}</h3>
                  <p className="mt-2 text-[0.7rem] uppercase tracking-[0.14em] text-muted">{formatDate(a.date)}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
