import Link from 'next/link';
import ProductListing from '@/components/product/ProductListing';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Media from '@/components/ui/Media';
import SplitHeading from '@/components/ui/SplitHeading';
import CampaignBanner from '@/components/ui/CampaignBanner';
import { TextLink } from '@/components/ui/Button';
import { products } from '@/data/products';

export const metadata = {
  title: 'Shop All',
  description: 'Shop the full AERIAL collection — timeless tailoring, knitwear, dresses and leather accessories for women and men.',
};

const tabs = [
  { label: 'All', href: '/shop' },
  { label: 'Dresses', href: '/shop?category=dresses' },
  { label: 'Tops', href: '/shop?category=tops' },
  { label: 'Trousers', href: '/shop?category=trousers' },
  { label: 'Blazers', href: '/shop?category=blazers' },
  { label: 'Outerwear', href: '/shop?category=outerwear' },
  { label: 'Accessories', href: '/shop?category=accessories' },
];

export default function ShopPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-beige">
        <Media
          src="/images/campaign/shop-hero.jpg"
          alt="Model in an ivory coat turning into warm light"
          className="absolute inset-y-0 right-0 -z-10 w-full md:w-[62%]"
          sizes="62vw"
          preload
          position="40% 30%"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#f3e6d5_0%,#f3e6d5_38%,rgba(243,230,213,0.6)_55%,rgba(243,230,213,0)_75%)] max-md:bg-[linear-gradient(90deg,#f3e6d5_0%,rgba(243,230,213,0.85)_60%,rgba(243,230,213,0.4)_100%)]" />
        <div className="container-luxe relative pb-8 pt-8 md:pb-10 md:pt-10">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Shop All' }]} />
          <SplitHeading as="h1" lines={['Shop All']} immediate className="display-xl mt-4 uppercase" />
          <p className="mt-4 max-w-lg text-[0.95rem] text-ink" data-reveal>
            Timeless designs. Modern silhouettes. A more conscious wardrobe for brighter tomorrows.
          </p>
          <nav aria-label="Shop categories" className="no-scrollbar -mx-4 mt-10 overflow-x-auto px-4">
            <ul className="flex min-w-max gap-7">
              {tabs.map((t) => (
                <li key={t.href}>
                  <Link href={t.href} scroll={false} className="nav-link">
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="absolute right-10 top-10 hidden text-right font-display text-[1.35rem] uppercase leading-[1.05] text-ivory lg:block" aria-hidden="true">
            Clothes
            <br />
            for a more
            <br />
            conscious
            <br />
            tomorrow
          </p>
        </div>
      </section>

      <div className="container-luxe py-10 lg:py-14">
        <ProductListing products={products}>
          <div className="relative mt-8 overflow-hidden bg-beige">
            <Media src="/images/campaign/spring-back.jpg" alt="Model in an ivory open-back blouse" className="aspect-[16/10]" sizes="260px" />
            <div className="p-5">
              <p className="caps-serif text-[1.25rem]">A more conscious wardrobe</p>
              <TextLink href="/about" className="mt-3">
                Our story
              </TextLink>
            </div>
          </div>
        </ProductListing>

        <div className="mt-16 grid gap-3 lg:grid-cols-[1.75fr_1fr]">
          <CampaignBanner
            eyebrow="Summer ’25"
            title="The New Edit"
            href="/new-arrivals"
            image="/images/campaign/new-edit.jpg"
            imageAlt="Model in ivory tailoring with windswept hair"
            list={['Modern Silhouettes', 'Elevated Essentials', 'Timeless Fabrics']}
            className="min-h-[240px]"
          />
          <CampaignBanner
            title="The Art of Everyday Elegance"
            href="/journal/the-art-of-everyday-elegance"
            cta="Discover"
            image="/images/campaign/texture.jpg"
            imageAlt="Close-up of textured ivory lace on dark fabric"
            align="right"
            className="min-h-[240px]"
          />
        </div>
      </div>
    </>
  );
}
