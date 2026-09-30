import { Mail, Phone, Clock, MapPin } from 'lucide-react';
import ContactForm from './ContactForm';
import Media from '@/components/ui/Media';
import Button from '@/components/ui/Button';
import SplitHeading from '@/components/ui/SplitHeading';
import SocialIcons from '@/components/ui/SocialIcons';
import ScriptAccent from '@/components/ui/ScriptAccent';
import { site } from '@/data/site';

export const metadata = {
  title: 'Contact Us',
  description: 'Questions about an order, styling advice, or just want to say hello? The AERIAL team is here to help.',
};

export default function ContactPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-line">
        <Media src="/images/campaign/contact-hero.jpg" alt="Model with an ivory drape falling from her shoulders, seen from behind" className="absolute inset-y-0 right-0 -z-10 hidden w-[42%] md:block" sizes="42vw" preload position="50% 30%" />
        <div className="absolute inset-y-0 right-0 -z-10 hidden w-[42%] bg-gradient-to-r from-ivory via-ivory/30 to-transparent md:block" />
        <div className="container-luxe py-12 lg:py-16">
          <p className="eyebrow mb-5">We’re here for you</p>
          <SplitHeading as="h1" lines={['Contact Us']} immediate className="font-display text-[clamp(3.4rem,8vw,7rem)] font-normal leading-[0.9]" />
          <p className="mt-6 max-w-xl text-[1rem] leading-relaxed text-ink" data-reveal>
            We’d love to hear from you. Whether you have a question about an order, need styling advice, or just want to say hello — our team is here to help.
          </p>
        </div>
        <ScriptAccent lines={['People,', 'pieces and', 'a more conscious', 'tomorrow.']} light={false} className="absolute right-[34%] top-10 hidden text-[2.4rem] xl:block" />
      </section>

      <div className="container-luxe grid gap-3 py-3 lg:grid-cols-[1.75fr_1fr]">
        <section aria-labelledby="send-title" className="grid border border-line md:grid-cols-[0.62fr_1fr]">
          <div className="on-dark relative hidden min-h-[520px] overflow-hidden text-ivory md:block">
            <Media src="/images/editorial/still-life-vase.jpg" alt="A black vase of dried blossoms on stacked books in raking light" className="absolute inset-0" sizes="25vw" reveal />
            <p className="absolute left-7 top-8 font-display text-[1.1rem] uppercase leading-[1.1]">
              Timeless style.
              <br />
              Meaningful
              <br />
              connections.
              <span className="mt-4 block h-px w-10 bg-ivory/70" />
            </p>
          </div>
          <div className="p-6 sm:p-10">
            <h2 id="send-title" className="font-editorial text-[clamp(2rem,3.4vw,2.8rem)] leading-none">
              Send Us a Message
            </h2>
            <p className="mb-8 mt-3 text-[0.88rem] text-muted">Fill out the form below and we’ll get back to you as soon as possible.</p>
            <ContactForm />
          </div>
        </section>

        <section aria-labelledby="ways-title" className="relative overflow-hidden border border-line p-6 sm:p-10">
          <h2 id="ways-title" className="font-editorial text-[clamp(2rem,3.2vw,2.6rem)] leading-none">
            Other Ways to Reach Us
          </h2>
          <p className="mt-3 text-[0.88rem] text-muted">Prefer a different channel? Our team is available through the following.</p>
          <ul className="mt-8 space-y-7 text-[0.88rem]">
            <li className="flex gap-5">
              <Mail size={22} strokeWidth={1.1} className="mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <p className="font-medium">Customer Service</p>
                <a href={`mailto:${site.email}`} className="underline underline-offset-4">
                  {site.email}
                </a>
                <p className="text-[0.78rem] text-muted">We usually respond within 24 hours.</p>
              </div>
            </li>
            <li className="flex gap-5">
              <Phone size={22} strokeWidth={1.1} className="mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <p className="font-medium">Phone</p>
                <a href={site.phoneHref} className="hover:underline">
                  {site.phone}
                </a>
                <p className="text-[0.78rem] text-muted">{site.hours}</p>
              </div>
            </li>
            <li className="flex gap-5">
              <Clock size={22} strokeWidth={1.1} className="mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <p className="font-medium">Business Hours</p>
                {site.hoursLong.map((l) => (
                  <p key={l} className="last:text-muted">
                    {l}
                  </p>
                ))}
              </div>
            </li>
            <li className="flex gap-5">
              <MapPin size={22} strokeWidth={1.1} className="mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <p className="font-medium">Studio</p>
                <p className="text-muted">{site.studio}</p>
              </div>
            </li>
          </ul>
          <div className="mt-10 border-t border-line pt-8">
            <p className="font-editorial text-[1.5rem]">Follow Us</p>
            <p className="mt-2 text-[0.84rem] text-muted">Stay inspired and be the first to know about new collections, events and more.</p>
            <SocialIcons className="mt-5" size={24} />
          </div>
          <p className="mt-8 text-[0.7rem] text-muted">Contact details shown are demo information for this concept store.</p>
          <ScriptAccent light={false} className="absolute -right-2 bottom-20 hidden text-[2rem] 2xl:block" />
        </section>
      </div>

      <section className="container-luxe pb-3">
        <div className="grid border border-line md:grid-cols-[1.1fr_1fr]">
          <Media src="/images/editorial/rack-tones.jpg" alt="A rail of garments in a gradient of warm tones" className="min-h-[240px]" sizes="50vw" reveal />
          <div className="flex flex-col justify-center gap-6 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="eyebrow text-stone">Real people. Real conversations.</p>
              <h2 className="mt-3 font-editorial text-[clamp(2rem,3.4vw,2.8rem)] leading-none">A More Conscious Tomorrow.</h2>
              <p className="mt-3 max-w-sm text-[0.88rem] text-muted">We’re always here — because fashion is more meaningful when it’s a two-way conversation.</p>
            </div>
            <Button href="/journal" variant="outline" className="shrink-0">
              Explore our journal
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
