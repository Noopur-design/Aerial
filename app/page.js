import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Leaf, Scissors, Infinity as InfinityIcon, Users } from 'lucide-react';
import HomeHero from '@/components/home/HomeHero';
import FeaturedPieces from '@/components/home/FeaturedPieces';
import CampaignCarousel from '@/components/home/CampaignCarousel';
import Media from '@/components/ui/Media';
import Button, { TextLink } from '@/components/ui/Button';
import SplitHeading from '@/components/ui/SplitHeading';
import Newsletter from '@/components/ui/Newsletter';
import ProductGrid from '@/components/product/ProductGrid';
import { articles } from '@/data/journal';
import { lookbooks } from '@/data/lookbook';
import { productsBy } from '@/data/products';
import { formatDate } from '@/lib/format';

const campaignCards = [
  { label: 'The New Edit', href: '/new-arrivals', image: '/images/campaign/new-edit.jpg', alt: 'Model in an ivory blazer' },
  { label: 'Modern Essentials', href: '/men', image: '/images/campaign/men-hero.jpg', alt: 'Male model in charcoal tailoring' },
  { label: 'Conscious Luxury', href: '/collections/contemporary-classics', image: '/images/campaign/classics.jpg', alt: 'Model in black tailoring' },
  { label: 'A Brighter Tomorrow', href: '/about', image: '/images/editorial/timeline-2025.jpg', alt: 'Ivory fabric draped over a stone block in the hills' },
];

const arches = [
  { label: 'New Arrivals', href: '/new-arrivals', image: '/images/products/tailored-oversized-blazer-1.jpg' },
  { label: 'Women', href: '/women', image: '/images/products/backless-evening-dress-1.jpg' },
  { label: 'Men', href: '/men', image: '/images/campaign/autumn-man.jpg' },
  { label: 'Essentials', href: '/collections/essentials', image: '/images/campaign/spring-dress.jpg' },
  { label: 'Outerwear', href: '/shop?category=outerwear', image: '/images/products/longline-wool-coat-2.jpg' },
  { label: 'Accessories', href: '/shop?category=accessories', image: '/images/products/leather-tote-bag-1.jpg' },
];

const pillars = [
  { icon: Leaf, title: 'Thoughtful Materials', text: 'Over 70% certified organic, recycled or responsibly sourced fibres.' },
  { icon: Scissors, title: 'Responsible Production', text: 'Small runs with partner ateliers we visit and know by name.' },
  { icon: InfinityIcon, title: 'Timeless Design', text: 'Pieces designed to be worn for years, not seasons.' },
  { icon: Users, title: 'A Conscious Future', text: 'Free repairs for life on all AERIAL tailoring.' },
];

export default function HomePage() {
  const newIn = productsBy.newIn().slice(0, 8);
  const lookbook = lookbooks[0].looks.map((l) => ({
    src: l.src,
    alt: `${l.title}: ${l.subtitle}`,
    title: l.title,
    subtitle: l.subtitle,
    href: `/products/${l.products[0]}`,
  }));

  return (
    <>
      <HomeHero />

      {/* campaign cards overlapping the hero */}
      <section aria-label="Campaigns" className="container-luxe relative z-10 -mt-28 sm:-mt-24">
        <ul className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4" data-reveal-stagger data-start="top 100%">
          {campaignCards.map((c) => (
            <li key={c.label}>
              <Link href={c.href} className="group relative flex h-24 overflow-hidden bg-espresso text-ivory sm:h-28">
                <div className="zoom-img relative w-[42%] shrink-0 overflow-hidden">
                  <Image src={c.image} alt={c.alt} fill sizes="(min-width:1024px) 12vw, 22vw" className="object-cover" />
                </div>
                <div className="flex flex-1 items-center justify-between gap-2 px-3 sm:px-5">
                  <span className="text-[0.64rem] uppercase leading-snug tracking-[0.16em] sm:text-[0.7rem]">{c.label}</span>
                  <span className="arrow-nudge hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ivory/50 transition-colors group-hover:bg-ivory group-hover:text-charcoal sm:inline-flex">
                    <ArrowRight size={15} strokeWidth={1.25} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* collections arches */}
      <section aria-labelledby="collections-title" className="container-luxe pt-24 lg:pt-32">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SplitHeading id="collections-title" lines={['Our', 'Collections']} className="caps-serif text-[clamp(2.6rem,6vw,5rem)]" />
          <div className="max-w-xs md:text-right" data-reveal>
            <p className="text-[0.9rem] text-muted">Thoughtfully designed pieces for every chapter of your life.</p>
            <TextLink href="/collections" className="mt-4">
              View all
            </TextLink>
          </div>
        </div>
        <ul className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-6" data-reveal-stagger>
          {arches.map((a) => (
            <li key={a.label} className="w-[42vw] shrink-0 snap-start sm:w-auto">
              <Link href={a.href} className="group block">
                <div className="arch zoom-img relative aspect-[3/4.2] overflow-hidden bg-taupe">
                  <Image src={a.image} alt="" fill sizes="(min-width:1024px) 16vw, (min-width:640px) 33vw, 42vw" className="object-cover" />
                </div>
                <p className="mt-4 text-center text-[0.72rem] font-medium uppercase tracking-[0.16em] transition-colors group-hover:text-muted">{a.label}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <FeaturedPieces />

      {/* modern silhouettes split campaign */}
      <section aria-labelledby="silhouettes-title" className="on-dark grid bg-espresso text-ivory md:grid-cols-2">
        <div className="relative min-h-[460px] overflow-hidden">
          <Media src="/images/campaign/spring-fabric.jpg" alt="Ivory linen fabric moving in the light" className="absolute inset-0 opacity-45" sizes="50vw" parallax="0.12" />
          <div className="relative flex h-full flex-col justify-end p-8 sm:p-12 lg:p-16">
            <p className="eyebrow mb-4 text-ivory/70" data-reveal>
              Summer ’25
            </p>
            <SplitHeading id="silhouettes-title" lines={['Modern', 'Silhouettes']} className="caps-serif text-[clamp(2.6rem,5.4vw,4.8rem)]" />
            <p className="mt-4 max-w-xs text-[0.9rem] text-ivory/80" data-reveal>
              For brighter days ahead — fluid linen, washed silk and tailoring that moves with you.
            </p>
            <div className="mt-8" data-reveal>
              <Button href="/new-arrivals" variant="light">
                Discover Now
              </Button>
            </div>
          </div>
        </div>
        <div className="relative min-h-[520px] overflow-hidden">
          <Media src="/images/campaign/modern-silhouettes.jpg" alt="Close portrait of a model in an ivory shirt" className="absolute inset-0" sizes="50vw" reveal grain />
          <div className="absolute right-6 top-8 text-right text-[0.7rem] uppercase leading-relaxed tracking-[0.2em] text-ivory/90 sm:right-10">
            Timeless
            <br />
            Versatile
            <br />
            Conscious
          </div>
          <div className="absolute bottom-8 right-6 sm:right-10">
            <Button href="/about" variant="light" size="sm">
              Our Story
            </Button>
          </div>
        </div>
      </section>

      {/* lookbook — React Bits FlexCarousel */}
      <section aria-labelledby="lookbook-title" className="overflow-hidden py-20 lg:py-28">
        <div className="container-luxe mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-3 text-stone" data-reveal>
              {lookbooks[0].season} · Lookbook
            </p>
            <SplitHeading id="lookbook-title" lines={[lookbooks[0].title]} className="display-md" />
          </div>
          <div data-reveal>
            <TextLink href="/lookbook">View the full lookbook</TextLink>
          </div>
        </div>
        <CampaignCarousel items={lookbook} cardHeight={0.66} />
      </section>

      {/* new arrivals grid */}
      <section aria-labelledby="new-title" className="border-t border-line bg-[#fbf3e8] py-20 lg:py-28">
        <div className="container-luxe">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow mb-3 text-stone">Just in</p>
              <SplitHeading id="new-title" lines={['New Arrivals']} className="caps-serif text-[clamp(2.2rem,4.6vw,3.8rem)]" />
            </div>
            <TextLink href="/new-arrivals" className="hidden sm:inline-flex">
              Shop new arrivals
            </TextLink>
          </div>
          <ProductGrid products={newIn} />
          <div className="mt-10 sm:hidden">
            <Button href="/new-arrivals" variant="outline" className="w-full">
              Shop new arrivals
            </Button>
          </div>
        </div>
      </section>

      {/* philosophy */}
      <section aria-labelledby="philosophy-title" className="container-luxe grid gap-12 py-20 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20 lg:py-28">
        <div className="grid grid-cols-[1.1fr_0.9fr] gap-3">
          <Media src="/images/editorial/craft-scissors.jpg" alt="A tailor cutting dark wool with heavy shears" className="aspect-[3/4]" sizes="25vw" reveal />
          <div className="flex flex-col gap-3 pt-16">
            <Media src="/images/editorial/studio-fabric.jpg" alt="Espresso wool draped on a studio table" className="aspect-[4/5]" sizes="20vw" reveal />
            <Media src="/images/editorial/label-tag.jpg" alt="An AERIAL swing tag on a knit" className="aspect-square" sizes="20vw" reveal />
          </div>
        </div>
        <div>
          <p className="eyebrow mb-4 text-stone" data-reveal>
            Our philosophy
          </p>
          <SplitHeading id="philosophy-title" lines={['Timeless', 'by intention.']} className="caps-serif text-[clamp(2.6rem,5.4vw,4.6rem)]" />
          <p className="mt-6 max-w-lg text-[0.98rem] leading-relaxed text-ink" data-reveal>
            We believe in fewer, better pieces — designed to be worn, loved and lived in. Our philosophy is rooted in intentional design, responsible sourcing and a deep respect for the people and
            processes behind every garment.
          </p>
          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8" data-reveal-stagger>
            {pillars.map(({ icon: Icon, title, text }) => (
              <li key={title}>
                <Icon size={26} strokeWidth={0.9} aria-hidden="true" />
                <p className="mt-3 text-[0.8rem] font-medium uppercase tracking-[0.12em]">{title}</p>
                <p className="mt-1 text-[0.82rem] text-muted">{text}</p>
              </li>
            ))}
          </ul>
          <TextLink href="/about" className="mt-10">
            Read our story
          </TextLink>
        </div>
      </section>

      {/* journal */}
      <section aria-labelledby="journal-title" className="container-luxe border-t border-line py-20 lg:py-28">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SplitHeading id="journal-title" lines={['Journal']} className="caps-serif text-[clamp(2.4rem,5vw,4.2rem)]" />
          <nav aria-label="Journal topics" className="flex gap-6 text-[0.72rem] uppercase tracking-[0.16em]">
            <Link href="/journal?category=Styling" className="nav-link">
              Stories
            </Link>
            <Link href="/journal?category=Sustainability" className="nav-link">
              Insights
            </Link>
            <Link href="/journal?category=Craftsmanship" className="nav-link">
              Style
            </Link>
            <TextLink href="/journal">View all</TextLink>
          </nav>
        </div>
        <ul className="grid gap-8 md:grid-cols-3" data-reveal-stagger>
          {articles.slice(0, 3).map((a) => (
            <li key={a.slug}>
              <Link href={`/journal/${a.slug}`} className="group block">
                <div className="zoom-img relative aspect-[16/10] overflow-hidden bg-taupe">
                  <Image src={a.image} alt={a.imageAlt} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover" />
                </div>
                <p className="eyebrow mt-5 text-stone">{a.category}</p>
                <h3 className="mt-2 font-editorial text-[1.45rem] leading-tight transition-colors group-hover:text-muted">{a.title}</h3>
                <p className="mt-2 text-[0.72rem] uppercase tracking-[0.14em] text-muted">{formatDate(a.date)}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* join our world */}
      <section aria-labelledby="join-title" className="relative isolate overflow-hidden">
        <Media src="/images/campaign/texture.jpg" alt="" className="absolute inset-0 -z-10" sizes="100vw" parallax="0.15" />
        <div className="absolute inset-0 -z-10 bg-[#efe3d2]/80" />
        <div className="container-luxe grid gap-8 py-20 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <SplitHeading id="join-title" lines={['Join Our World']} className="caps-serif text-[clamp(2.4rem,5vw,4.2rem)]" />
            <p className="mt-3 text-[0.92rem] text-ink" data-reveal>
              Get early access to new collections, stories and exclusive offers.
            </p>
          </div>
          <div data-reveal>
            <Newsletter variant="inline" />
          </div>
        </div>
      </section>
    </>
  );
}
