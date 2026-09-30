import HeroSlider from '@/components/ui/HeroSlider';
import Button from '@/components/ui/Button';
import SplitHeading from '@/components/ui/SplitHeading';
import CategoryTiles from '@/components/product/CategoryTiles';
import ProductListing from '@/components/product/ProductListing';
import CampaignBanner from '@/components/ui/CampaignBanner';
import ServiceBar from '@/components/ui/ServiceBar';
import { productsBy } from '@/data/products';

export const metadata = {
  title: 'Men',
  description: 'Modern essentials: tailored for today, designed for what’s next. Contemporary menswear from AERIAL.',
};

const tiles = [
  { label: 'Shirts', text: 'Classic and contemporary.', href: '/men?category=shirts', image: '/images/categories/men-shirts.jpg' },
  { label: 'Trousers', text: 'Designed for movement.', href: '/men?category=trousers', image: '/images/categories/men-trousers.jpg' },
  { label: 'Jackets', text: 'Layered for modern living.', href: '/men?category=outerwear', image: '/images/categories/men-jackets.jpg' },
  { label: 'Knitwear', text: 'Refined warmth for every season.', href: '/men?category=knitwear', image: '/images/categories/men-knitwear.jpg' },
  { label: 'Essentials', text: 'The building blocks.', href: '/men?category=accessories', image: '/images/categories/men-essentials.jpg' },
];

const slides = [
  { src: '/images/campaign/men-hero.jpg', alt: 'Male model in charcoal tailoring seated between stone columns', position: '55% 25%' },
  { src: '/images/campaign/autumn-man.jpg', alt: 'Male model in a brown wool blazer and sunglasses', position: '50% 20%' },
  { src: '/images/products/linen-shirt-2.jpg', alt: 'Male model in a black linen shirt', position: '50% 20%' },
];

export default function MenPage() {
  return (
    <>
      <HeroSlider
        slides={slides}
        className="min-h-[520px] h-[72svh] max-h-[640px] bg-espresso"
        overlay="bg-[linear-gradient(90deg,rgba(26,22,18,0.85)_0%,rgba(26,22,18,0.45)_40%,rgba(26,22,18,0.1)_70%,rgba(26,22,18,0.5)_100%)]"
      >
        <div className="container-luxe flex h-full flex-col justify-center pb-20 pt-10">
          <p className="eyebrow mb-5 text-ivory/80" data-reveal>
            Men’s Collection
          </p>
          <SplitHeading as="h1" lines={['Modern', 'Essentials']} immediate className="display-xl uppercase" />
          <p className="mt-5 max-w-md text-[0.95rem] text-ivory/85" data-reveal>
            Tailored for today. Designed for what’s next.
            <br />A refined collection of contemporary menswear.
          </p>
          <div className="mt-8" data-reveal>
            <Button href="#men-styles" variant="light">
              Explore Collection
            </Button>
          </div>
        </div>
        <div className="absolute right-8 top-10 hidden text-right font-display text-[1.3rem] uppercase leading-[1.05] lg:block xl:right-12" aria-hidden="true">
          <p>
            Clothes
            <br />
            for a more
            <br />
            conscious
            <br />
            tomorrow
          </p>
          <span className="my-6 ml-auto block h-px w-16 bg-ivory/60" />
          <p className="text-[0.95rem] leading-[1.15] text-ivory/80">
            Timeless
            <br />
            Masculine
            <br />
            Contemporary
          </p>
        </div>
      </HeroSlider>

      <CategoryTiles tiles={tiles} />

      <section id="men-styles" aria-label="Men’s products" className="container-luxe scroll-mt-24 py-14 lg:py-20">
        <ProductListing products={productsBy.gender('men')} />
      </section>

      <section aria-label="Campaigns" className="container-luxe grid gap-3 pb-20 md:grid-cols-[1.4fr_1fr]">
        <CampaignBanner
          eyebrow="Seasonal perspective"
          title="The Autumn Edit"
          href="/collections/autumn-edit"
          cta="View collection"
          image="/images/campaign/autumn-man.jpg"
          imageAlt="Male model in a brown blazer and sunglasses"
          list={['Textured wools', 'Soft tailoring', 'Deeper tones']}
          className="min-h-[300px]"
        />
        <CampaignBanner
          title="Contemporary Classics"
          href="/collections/contemporary-classics"
          cta="View collection"
          image="/images/categories/men-jackets.jpg"
          imageAlt="Male model in a black jacket"
          align="right"
          className="min-h-[300px]"
        />
      </section>

      <ServiceBar dark />
    </>
  );
}
