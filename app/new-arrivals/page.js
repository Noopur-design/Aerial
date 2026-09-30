import Media from '@/components/ui/Media';
import Button, { TextLink } from '@/components/ui/Button';
import SplitHeading from '@/components/ui/SplitHeading';
import ServiceBar from '@/components/ui/ServiceBar';
import TabbedGrid from '@/components/product/TabbedGrid';
import ProductListing from '@/components/product/ProductListing';
import { productsBy } from '@/data/products';

export const metadata = {
  title: 'New Arrivals',
  description: 'Fresh silhouettes, timeless designs and modern essentials — the latest pieces from AERIAL.',
};

export default function NewArrivalsPage() {
  const fresh = productsBy.newIn();

  return (
    <>
      <section className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)]">
        <div className="on-dark relative isolate min-h-[560px] overflow-hidden bg-espresso text-ivory lg:min-h-[calc(100svh-var(--header-h))]">
          <Media src="/images/campaign/essentials.jpg" alt="Model in an ivory linen blazer with a flowing scarf in warm light" className="absolute inset-0 -z-10" sizes="(min-width:1024px) 45vw, 100vw" preload grain position="55% 30%" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(26,22,18,0.66)_0%,rgba(26,22,18,0.48)_45%,rgba(26,22,18,0.82)_100%)]" />
          <div className="flex h-full min-h-[inherit] flex-col justify-between p-6 sm:p-10 xl:p-14">
            <div>
              <p className="eyebrow mb-5 text-ivory/80">Spring Summer ’25</p>
              <SplitHeading as="h1" lines={['New', 'Arrivals']} immediate className="caps-serif text-[clamp(3.2rem,7.5vw,6.4rem)]" />
              <p className="mt-5 max-w-sm text-[0.95rem] text-ivory/85" data-reveal>
                Fresh silhouettes, timeless designs and modern essentials for a brighter tomorrow.
              </p>
              <div className="mt-8" data-reveal>
                <Button href="#just-in" variant="light">
                  Explore New Arrivals
                </Button>
              </div>
            </div>
            <p className="mt-16 text-[0.88rem] leading-relaxed text-ivory/85">
              New season.
              <br />
              New perspectives.
              <br />
              Same conscious mindset.
            </p>
          </div>
        </div>

        <div id="just-in" className="scroll-mt-24 px-4 py-10 sm:px-8 xl:px-12 xl:py-12">
          <div className="mb-8 flex items-center justify-between gap-6">
            <p className="flex items-center gap-4 text-[0.72rem] uppercase tracking-[0.18em] text-muted">
              Just in <span className="h-px w-20 bg-stone/50" aria-hidden="true" />
            </p>
            <p className="max-w-[16rem] text-right text-[0.78rem] text-muted">Thoughtfully designed pieces for a more conscious, beautiful tomorrow.</p>
          </div>
          <TabbedGrid products={fresh} limit={8} columns="grid-cols-2 md:grid-cols-3 xl:grid-cols-4" right={<TextLink href="#all-new">View all</TextLink>} />
        </div>
      </section>

      {/* editorial strip */}
      <section aria-label="The Spring Edit" className="grid gap-2 border-y border-line bg-beige p-2 md:grid-cols-[1.2fr_0.2fr_1fr_0.9fr_1.1fr_0.9fr]">
        <div className="relative min-h-[260px] overflow-hidden">
          <Media src="/images/campaign/spring-fabric.jpg" alt="Soft ivory linen folds" className="absolute inset-0" sizes="30vw" />
          <div className="relative flex h-full flex-col justify-center bg-gradient-to-r from-beige/90 via-beige/60 to-transparent p-8">
            <h2 className="caps-serif text-[clamp(2rem,3vw,2.8rem)]">
              The
              <br />
              Spring Edit
            </h2>
            <p className="mt-3 text-[0.82rem] text-ink">Elevated essentials for everyday elegance.</p>
            <TextLink href="/collections/essentials" className="mt-5">
              Shop edit
            </TextLink>
          </div>
        </div>
        <div className="hidden items-center justify-center md:flex" aria-hidden="true">
          <span className="font-display text-[0.9rem] tracking-[0.5em] [writing-mode:vertical-rl] rotate-180">AERIAL</span>
        </div>
        <Media src="/images/campaign/spring-back.jpg" alt="Model in an ivory blouse with an open back" className="min-h-[260px]" sizes="20vw" reveal />
        <div className="flex flex-col gap-2">
          <Media src="/images/campaign/spring-flower.jpg" alt="Pale flowers and green stems against a warm wall" className="min-h-[190px] flex-1" sizes="18vw" reveal />
          <p className="px-2 pb-2 text-[0.66rem] uppercase tracking-[0.16em] text-muted">Modern silhouettes · Timeless fabrics</p>
        </div>
        <Media src="/images/campaign/spring-dress.jpg" alt="Model in a long ivory dress" className="min-h-[260px]" sizes="22vw" reveal />
        <div className="flex flex-col justify-center p-6">
          <p className="caps-serif text-[1.5rem]">
            Clothes for a more conscious tomorrow
          </p>
          <TextLink href="/about" className="mt-5">
            Discover the collection
          </TextLink>
        </div>
      </section>

      <section id="all-new" aria-labelledby="all-new-title" className="container-luxe scroll-mt-24 py-16 lg:py-20">
        <h2 id="all-new-title" className="caps-serif mb-10 text-[clamp(2rem,4vw,3.2rem)]" data-reveal>
          Shop New Arrivals
        </h2>
        <ProductListing products={fresh} syncUrl={false} initialSort="newest" />
      </section>

      <ServiceBar />
    </>
  );
}
