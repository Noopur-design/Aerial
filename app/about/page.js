import { Leaf, Scissors, Infinity as InfinityIcon, Users, Recycle, Droplets, PackageOpen, Wrench } from 'lucide-react';
import Media from '@/components/ui/Media';
import Button, { TextLink } from '@/components/ui/Button';
import SplitHeading from '@/components/ui/SplitHeading';
import ScriptAccent from '@/components/ui/ScriptAccent';

export const metadata = {
  title: 'About',
  description: 'AERIAL is a contemporary fashion house creating timeless pieces for modern lives — celebrating craftsmanship, thoughtful design and a slower way of dressing.',
};

const values = [
  { icon: Leaf, label: 'Thoughtful Materials' },
  { icon: Scissors, label: 'Responsible Production' },
  { icon: InfinityIcon, label: 'Timeless Design' },
  { icon: Users, label: 'A More Conscious Future' },
];

const timeline = [
  { year: '2020', title: 'The Beginning', text: 'A small Mumbai studio, a single rail and a big dream.', image: '/images/editorial/timeline-2020.jpg', alt: 'A dress form and pinned sketches in a sunlit studio' },
  { year: '2021', title: 'First Collection', text: 'A curated edit of twelve timeless essentials.', image: '/images/editorial/timeline-2021.jpg', alt: 'A rail of garments in brown, cream and ivory' },
  { year: '2023', title: 'Growing Together', text: 'A community of 40,000 customers who inspire us.', image: '/images/editorial/timeline-2023.jpg', alt: 'Model in an ivory dress in warm light' },
  { year: '2025', title: 'A More Conscious Tomorrow', text: 'Lifetime repairs and 70% certified fibres — and we’re not done.', image: '/images/editorial/timeline-2025.jpg', alt: 'Ivory fabric draped over a stone block in the hills' },
];

const commitments = [
  { icon: Recycle, stat: '70%', text: 'of our fibres are certified organic, recycled or responsibly sourced.' },
  { icon: Droplets, stat: '0', text: 'plastic polybags — every order ships in recycled, recyclable paper.' },
  { icon: Wrench, stat: 'Lifetime', text: 'complimentary repairs on all AERIAL tailoring and outerwear.' },
  { icon: PackageOpen, stat: '60', text: 'pieces or fewer in most production runs, so nothing is made to be wasted.' },
];

export default function AboutPage() {
  return (
    <>
      {/* manifesto hero */}
      <section className="relative isolate overflow-hidden bg-beige">
        <Media src="/images/campaign/about-hero.jpg" alt="Model in an espresso suit seated in warm, raking light" className="absolute inset-0 -z-10" sizes="100vw" preload position="60% 25%" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(243,230,213,0.95)_0%,rgba(243,230,213,0.8)_30%,rgba(243,230,213,0)_55%)] max-md:bg-[linear-gradient(90deg,rgba(243,230,213,0.95)_0%,rgba(243,230,213,0.75)_100%)]" />
        <div className="container-luxe py-14 lg:py-20">
          <p className="eyebrow mb-6">About AERIAL</p>
          <SplitHeading as="h1" lines={['Clothes', 'for a more', 'conscious', 'tomorrow.']} immediate className="caps-serif text-[clamp(3rem,6.6vw,6rem)]" />
          <p className="mt-7 max-w-md text-[0.98rem] leading-relaxed text-ink" data-reveal>
            AERIAL is a contemporary fashion house creating timeless pieces for modern lives. We celebrate craftsmanship, thoughtful design and a slower, more meaningful way of dressing.
          </p>
          <div className="mt-7 flex items-center gap-4" data-reveal>
            <span className="h-px w-10 bg-charcoal" aria-hidden="true" />
            <TextLink href="#story">Our story</TextLink>
          </div>
        </div>
        <ScriptAccent className="absolute right-10 top-16 hidden text-[3.4rem] lg:block" />
      </section>

      {/* story */}
      <section id="story" aria-labelledby="story-title" className="grid scroll-mt-24 gap-2 py-2 lg:grid-cols-[1.1fr_0.6fr_1fr_0.7fr_0.4fr] lg:items-center">
        <div className="on-dark relative min-h-[320px] overflow-hidden text-ivory lg:min-h-[380px]">
          <Media src="/images/editorial/craft-scissors.jpg" alt="A tailor cutting dark wool with heavy shears" className="absolute inset-0" sizes="30vw" reveal />
          <p className="absolute bottom-8 left-8 font-display text-[clamp(1.8rem,2.6vw,2.4rem)] uppercase leading-[0.95]">
            <span className="mb-3 block h-px w-10 bg-ivory/70" />
            Crafted
            <br />
            with care.
          </p>
        </div>
        <Media src="/images/editorial/studio-fabric.jpg" alt="Espresso wool and mood-board photographs on a studio table" className="min-h-[320px] lg:min-h-[380px]" sizes="18vw" reveal />
        <div className="px-6 py-10 lg:px-10">
          <p className="eyebrow mb-4 text-stone">Our story</p>
          <SplitHeading id="story-title" lines={['A Modern', 'Fashion House']} className="display-md" />
          <p className="mt-5 text-[0.9rem] leading-relaxed text-muted" data-reveal>
            Founded in 2020 with a vision to bring together modern sensibilities and timeless craftsmanship, AERIAL was born from a love for art, culture and everyday elegance. What started as a small
            studio is now a growing community of conscious individuals who value quality, design and authenticity.
          </p>
          <TextLink href="#journey" className="mt-6">
            Our journey
          </TextLink>
        </div>
        <Media src="/images/editorial/studio-rack.jpg" alt="Garments hanging on a rail beside pinned photographs" className="min-h-[320px] lg:min-h-[380px]" sizes="20vw" reveal />
        <p className="hidden px-4 font-editorial text-[1.1rem] italic leading-snug text-muted lg:block">Inspired by people, places and a quieter way of life.</p>
      </section>

      {/* philosophy */}
      <section id="philosophy" aria-labelledby="philosophy-title" className="scroll-mt-24 border-y border-line">
        <div className="container-luxe grid gap-10 py-16 lg:grid-cols-[1fr_1.1fr_1.4fr] lg:items-center">
          <div>
            <p className="eyebrow mb-3">Our philosophy</p>
            <SplitHeading id="philosophy-title" lines={['Timeless', 'by intention.']} className="caps-serif text-[clamp(2.4rem,4.6vw,3.8rem)]" />
          </div>
          <p className="text-[0.9rem] leading-relaxed text-muted" data-reveal>
            We believe in fewer, better pieces — designed to be worn, loved and lived in. Our philosophy is rooted in intentional design, responsible sourcing and a deep respect for the people and
            processes behind every garment.
          </p>
          <ul className="grid grid-cols-2 sm:grid-cols-4" data-reveal-stagger>
            {values.map(({ icon: Icon, label }) => (
              <li key={label} className="flex flex-col items-center gap-3 border-line px-2 py-4 text-center text-[0.75rem] text-muted sm:border-l">
                <Icon size={26} strokeWidth={0.9} className="text-charcoal" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* sustainability */}
      <section id="sustainability" aria-labelledby="sustain-title" className="scroll-mt-24 bg-espresso text-ivory on-dark">
        <div className="container-luxe grid gap-12 py-20 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:py-24">
          <div className="grid grid-cols-2 gap-3">
            <Media src="/images/editorial/timeline-2025.jpg" alt="Ivory fabric draped over a stone block in the hills" className="aspect-[3/4]" sizes="25vw" reveal />
            <Media src="/images/editorial/label-tag.jpg" alt="An AERIAL swing tag on a textured knit" className="mt-16 aspect-[3/4]" sizes="25vw" reveal />
          </div>
          <div>
            <p className="eyebrow mb-4 text-ivory/70">Sustainability</p>
            <SplitHeading id="sustain-title" lines={['Progress,', 'not perfection.']} className="caps-serif text-[clamp(2.4rem,4.6vw,4rem)]" />
            <p className="mt-6 max-w-lg text-[0.95rem] leading-relaxed text-ivory/80" data-reveal>
              There is no such thing as a perfect garment — but there are better decisions. We make them at every stage, from the fibres we choose to the way we pack your order, and we publish what we
              have not yet solved.
            </p>
            <ul className="mt-10 grid gap-6 border-t border-ivory/20 pt-8 sm:grid-cols-2" data-reveal-stagger>
              {commitments.map(({ icon: Icon, stat, text }) => (
                <li key={text} className="flex gap-4">
                  <Icon size={24} strokeWidth={1} aria-hidden="true" className="mt-1 shrink-0 text-ivory/70" />
                  <div>
                    <p className="font-display text-[1.8rem] leading-none">{stat}</p>
                    <p className="mt-2 text-[0.82rem] text-ivory/75">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <TextLink href="/journal/conscious-choices-for-a-brighter-tomorrow" light className="mt-10">
              Read our impact story
            </TextLink>
          </div>
        </div>
      </section>

      {/* journey */}
      <section id="journey" aria-labelledby="journey-title" className="container-luxe scroll-mt-24 py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[260px_1fr]">
          <div>
            <p className="eyebrow mb-4">Our journey</p>
            <SplitHeading id="journey-title" lines={['A Story', 'in Progress.']} className="display-md" />
          </div>
          <ol className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4" data-reveal-stagger>
            {timeline.map((t) => (
              <li key={t.year} className="grid grid-cols-[110px_1fr] gap-4">
                <Media src={t.image} alt={t.alt} className="aspect-[4/5]" sizes="120px" />
                <div>
                  <p className="flex items-center gap-3 font-display text-[1.8rem] leading-none">
                    {t.year} <span className="h-px flex-1 bg-line" aria-hidden="true" />
                  </p>
                  <p className="mt-3 text-[0.7rem] font-medium uppercase tracking-[0.14em]">{t.title}</p>
                  <p className="mt-1.5 text-[0.8rem] text-muted">{t.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden">
        <Media src="/images/editorial/rack-tones.jpg" alt="" className="absolute inset-0 -z-10" sizes="100vw" parallax="0.14" />
        <div className="absolute inset-0 -z-10 bg-espresso/55" />
        <div className="container-luxe on-dark flex flex-col items-center py-24 text-center text-ivory">
          <p className="eyebrow mb-4 text-ivory/80">Real people. Real conversations.</p>
          <SplitHeading lines={['Dress with intention.']} className="display-md" />
          <p className="mt-4 max-w-md text-[0.92rem] text-ivory/85" data-reveal>
            Discover pieces designed to stay with you — or talk to our stylists about building a wardrobe that lasts.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3" data-reveal>
            <Button href="/collections" variant="ivory">
              Explore Collections
            </Button>
            <Button href="/contact" variant="light">
              Talk to a stylist
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
