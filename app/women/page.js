import HeroSlider from '@/components/ui/HeroSlider';
import Button from '@/components/ui/Button';
import SplitHeading from '@/components/ui/SplitHeading';
import CategoryTiles from '@/components/product/CategoryTiles';
import ProductListing from '@/components/product/ProductListing';
import CampaignBanner from '@/components/ui/CampaignBanner';
import { productsBy } from '@/data/products';

export const metadata = {
  title: 'Women',
  description: 'Modern femininity: timeless silhouettes, refined details and modern essentials for women.',
};

const tiles = [
  { label: 'Dresses', text: 'Effortless elegance for every occasion.', href: '/women?category=dresses', image: '/images/categories/women-dresses.jpg' },
  { label: 'Tops', text: 'Everyday pieces, endless combinations.', href: '/women?category=tops', image: '/images/categories/women-tops.jpg' },
  { label: 'Trousers', text: 'Tailored for modern living.', href: '/women?category=trousers', image: '/images/categories/women-trousers.jpg' },
  { label: 'Outerwear', text: 'Layered looks for brighter days.', href: '/women?category=outerwear', image: '/images/categories/women-outerwear.jpg' },
  { label: 'Accessories', text: 'The finishing details.', href: '/women?category=accessories', image: '/images/categories/women-accessories.jpg' },
];

const slides = [
  { src: '/images/campaign/women-hero.jpg', alt: 'Model in an ivory suit and scarf seated on stone steps', position: '60% 25%' },
  { src: '/images/campaign/evening.jpg', alt: 'Model in a burgundy satin gown', position: '50% 20%' },
  { src: '/images/campaign/about-hero.jpg', alt: 'Model in an espresso suit seated in warm light', position: '50% 25%' },
];

export default function WomenPage() {
  return (
    <>
      <HeroSlider
        slides={slides}
        controls="right"
        className="min-h-[520px] h-[72svh] max-h-[640px]"
        overlay="bg-[linear-gradient(90deg,rgba(243,230,213,0.92)_0%,rgba(243,230,213,0.7)_32%,rgba(243,230,213,0)_58%)] max-md:bg-[linear-gradient(90deg,rgba(243,230,213,0.9)_0%,rgba(243,230,213,0.55)_100%)]"
        light={false}
      >
        <div className="container-luxe flex h-full flex-col justify-center py-12 text-charcoal">
          <p className="eyebrow mb-5" data-reveal>
            Women’s Collection
          </p>
          <SplitHeading as="h1" lines={['Modern', 'Femininity']} immediate className="display-xl uppercase" />
          <p className="mt-5 max-w-md text-[0.95rem] text-ink" data-reveal>
            Timeless silhouettes, refined details and modern essentials for every chapter of you.
          </p>
          <div className="mt-8" data-reveal>
            <Button href="#women-styles">Explore Collection</Button>
          </div>
        </div>
        <p className="absolute right-8 top-10 hidden text-right font-display text-[1.35rem] uppercase leading-[1.05] text-ivory xl:right-12 lg:block" aria-hidden="true">
          Clothes
          <br />
          for a more
          <br />
          conscious
          <br />
          tomorrow
        </p>
      </HeroSlider>

      <CategoryTiles tiles={tiles} />

      <section id="women-styles" aria-labelledby="women-title" className="container-luxe scroll-mt-24 py-14 lg:py-20">
        <h2 id="women-title" className="caps-serif mb-10 text-[clamp(2rem,4vw,3.2rem)]" data-reveal>
          Featured Women’s Styles
        </h2>
        <ProductListing products={productsBy.gender('women')} tabs />
      </section>

      <section aria-label="Campaigns" className="container-luxe grid gap-3 pb-20 md:grid-cols-2">
        <CampaignBanner
          eyebrow="For life’s special moments"
          title="Evening Wear"
          href="/collections/evening-wear"
          cta="View collection"
          image="/images/campaign/evening.jpg"
          imageAlt="Model in a burgundy satin gown"
          className="min-h-[320px]"
        />
        <CampaignBanner
          eyebrow="The everyday wardrobe"
          title="Essentials"
          href="/collections/essentials"
          cta="View collection"
          image="/images/campaign/essentials.jpg"
          imageAlt="Model in an ivory linen blazer"
          className="min-h-[320px]"
        />
      </section>
    </>
  );
}
