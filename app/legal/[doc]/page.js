import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { site, shipping } from '@/data/site';

const docs = {
  privacy: {
    title: 'Privacy Policy',
    updated: '2026-01-15',
    sections: [
      ['A demo store', 'This website is a design and development demonstration. Your cart, wishlist, demo account and orders are stored only in your own browser (localStorage). Nothing you enter is transmitted to a server.'],
      ['What we would collect', 'In the live store we would collect the details needed to fulfil your order — your name, contact details, delivery address and order history — and, with your consent, your marketing preferences.'],
      ['How we would use it', 'To process and deliver orders, provide customer care, prevent fraud and, if you opt in, send you news about collections and stories. We would never sell your personal data.'],
      ['Payments', 'Payments in the live store would be handled by PCI-DSS compliant payment partners. AERIAL would never store full card numbers.'],
      ['Your rights', `You may request access to, correction of or deletion of your personal data at any time by writing to ${site.email}.`],
      ['Cookies', 'We use only essential browser storage to remember your bag, wishlist and preferences. Clearing your browser data removes it.'],
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    updated: '2026-01-15',
    sections: [
      ['About these terms', 'These terms describe how the AERIAL demo store works. No real purchases can be made, and no payment is ever taken.'],
      ['Prices', 'All prices are shown in Indian Rupees (INR) and are inclusive of GST.'],
      ['Orders', 'An order is accepted once you receive an order confirmation. In this demo, confirmations are generated in your browser only.'],
      ['Delivery', `Standard delivery takes 3–5 business days and is complimentary on orders above ₹${shipping.freeThreshold.toLocaleString('en-IN')}. Express delivery takes 1–2 business days.`],
      ['Returns & exchanges', `Unworn items with tags attached may be returned or exchanged within ${shipping.returnDays} days of delivery. See our FAQ for full details.`],
      ['Intellectual property', 'All content on this site, including imagery and copy, is provided for demonstration purposes.'],
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(docs).map((doc) => ({ doc }));
}

export async function generateMetadata({ params }) {
  const { doc } = await params;
  return docs[doc] ? { title: docs[doc].title } : {};
}

export default async function LegalPage({ params }) {
  const { doc } = await params;
  const d = docs[doc];
  if (!d) notFound();
  return (
    <div className="container-luxe max-w-3xl pb-20 pt-6">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: d.title }]} />
      <h1 className="mt-8 font-display text-[clamp(2.6rem,5vw,4.2rem)] font-normal leading-none">{d.title}</h1>
      <p className="mt-3 text-[0.8rem] text-muted">Last updated {new Date(d.updated).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
      <div className="mt-10 divide-y divide-line border-y border-line">
        {d.sections.map(([h, p]) => (
          <section key={h} className="py-7">
            <h2 className="font-editorial text-[1.5rem]">{h}</h2>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-ink">{p}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
