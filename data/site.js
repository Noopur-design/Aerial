// Central brand + contact details. All contact information is DEMO data —
// replace with the real business details before going live.
export const site = {
  name: 'AERIAL',
  tagline: 'Timeless pieces for a more conscious tomorrow.',
  description:
    'AERIAL is a contemporary fashion house creating timeless, thoughtfully made pieces for modern lives — designed in India, made to be worn for years.',
  email: 'hello@aerial-demo.in',
  phone: '+91 98765 43210',
  phoneHref: 'tel:+919876543210',
  hours: 'Mon – Sat, 10:00 AM – 7:00 PM (IST)',
  hoursLong: ['Monday – Saturday', '10:00 AM – 7:00 PM (IST)', 'Closed on Sundays & public holidays.'],
  studio: 'Studio 4, Kala Ghoda, Fort, Mumbai 400001 (demo address)',
  isDemo: true,
  social: [
    { name: 'Instagram', href: 'https://www.instagram.com/' },
    { name: 'Pinterest', href: 'https://www.pinterest.com/' },
    { name: 'YouTube', href: 'https://www.youtube.com/' },
    { name: 'Facebook', href: 'https://www.facebook.com/' },
  ],
};

export const shipping = {
  freeThreshold: 2999,
  standardFee: 99,
  expressFee: 249,
  codFee: 49,
  returnDays: 7,
};

// Demo discount codes
export const discountCodes = {
  AERIAL10: { type: 'percent', value: 10, label: '10% off your order' },
  WELCOME15: { type: 'percent', value: 15, label: '15% off — welcome to AERIAL' },
  FREESHIP: { type: 'shipping', value: 0, label: 'Complimentary express shipping' },
};

export const mainNav = [
  { label: 'Shop', href: '/shop', mega: 'shop' },
  { label: 'New In', href: '/new-arrivals' },
  { label: 'Women', href: '/women', mega: 'women' },
  { label: 'Men', href: '/men', mega: 'men' },
  { label: 'Collections', href: '/collections', mega: 'collections' },
  { label: 'Journal', href: '/journal' },
  { label: 'About', href: '/about' },
];

export const footerNav = {
  explore: [
    { label: 'Shop All', href: '/shop' },
    { label: 'New Arrivals', href: '/new-arrivals' },
    { label: 'Women', href: '/women' },
    { label: 'Men', href: '/men' },
    { label: 'Collections', href: '/collections' },
    { label: 'Lookbook', href: '/lookbook' },
    { label: 'Journal', href: '/journal' },
  ],
  care: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQs', href: '/help' },
    { label: 'Shipping Information', href: '/help?topic=shipping' },
    { label: 'Returns & Exchanges', href: '/help?topic=returns' },
    { label: 'Size Guide', href: '/help?topic=sizing' },
    { label: 'Track Your Order', href: '/track-order' },
  ],
  about: [
    { label: 'Our Story', href: '/about' },
    { label: 'Our Philosophy', href: '/about#philosophy' },
    { label: 'Sustainability', href: '/about#sustainability' },
    { label: 'Privacy Policy', href: '/legal/privacy' },
    { label: 'Terms & Conditions', href: '/legal/terms' },
  ],
};
