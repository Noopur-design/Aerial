import { collections } from '@/data/collections';

export const megaMenus = {
  shop: {
    columns: [
      {
        title: 'Shop by Category',
        links: [
          { label: 'All Products', href: '/shop' },
          { label: 'Dresses', href: '/shop?category=dresses' },
          { label: 'Tops', href: '/shop?category=tops' },
          { label: 'Trousers', href: '/shop?category=trousers' },
          { label: 'Blazers', href: '/shop?category=blazers' },
          { label: 'Outerwear', href: '/shop?category=outerwear' },
          { label: 'Knitwear', href: '/shop?category=knitwear' },
          { label: 'Accessories', href: '/shop?category=accessories' },
        ],
      },
      {
        title: 'Discover',
        links: [
          { label: 'New Arrivals', href: '/new-arrivals' },
          { label: 'Bestsellers', href: '/shop?sort=popular' },
          { label: 'Lookbook', href: '/lookbook' },
          { label: 'Wishlist', href: '/wishlist' },
          { label: 'Size Guide', href: '/help?topic=sizing' },
        ],
      },
    ],
    cards: [
      { label: 'New Arrivals', href: '/new-arrivals', image: '/images/campaign/new-edit.jpg', alt: 'Model in an ivory blazer' },
      { label: 'Autumn Edit', href: '/collections/autumn-edit', image: '/images/campaign/autumn-hero-b.jpg', alt: 'Model in an espresso coat' },
    ],
  },
  women: {
    columns: [
      {
        title: 'Women',
        links: [
          { label: 'View All', href: '/women' },
          { label: 'Dresses', href: '/women?category=dresses' },
          { label: 'Tops', href: '/women?category=tops' },
          { label: 'Trousers', href: '/women?category=trousers' },
          { label: 'Blazers', href: '/women?category=blazers' },
          { label: 'Outerwear', href: '/women?category=outerwear' },
          { label: 'Knitwear', href: '/women?category=knitwear' },
          { label: 'Accessories', href: '/women?category=accessories' },
        ],
      },
      {
        title: 'Featured',
        links: [
          { label: 'New In', href: '/new-arrivals' },
          { label: 'Evening Wear', href: '/collections/evening-wear' },
          { label: 'Essentials', href: '/collections/essentials' },
          { label: 'The Tailoring Edit', href: '/collections/contemporary-classics' },
        ],
      },
    ],
    cards: [
      { label: 'Modern Femininity', href: '/women', image: '/images/campaign/women-hero.jpg', alt: 'Model in ivory tailoring' },
      { label: 'Evening Wear', href: '/collections/evening-wear', image: '/images/campaign/evening.jpg', alt: 'Model in a burgundy satin gown' },
    ],
  },
  men: {
    columns: [
      {
        title: 'Men',
        links: [
          { label: 'View All', href: '/men' },
          { label: 'Shirts', href: '/men?category=shirts' },
          { label: 'Trousers', href: '/men?category=trousers' },
          { label: 'Blazers', href: '/men?category=blazers' },
          { label: 'Jackets & Coats', href: '/men?category=outerwear' },
          { label: 'Knitwear', href: '/men?category=knitwear' },
          { label: 'Essentials', href: '/men?category=accessories' },
        ],
      },
      {
        title: 'Featured',
        links: [
          { label: 'Autumn Edit', href: '/collections/autumn-edit' },
          { label: 'Contemporary Classics', href: '/collections/contemporary-classics' },
          { label: 'Lookbook', href: '/lookbook' },
        ],
      },
    ],
    cards: [
      { label: 'Modern Essentials', href: '/men', image: '/images/campaign/men-hero.jpg', alt: 'Male model in charcoal tailoring' },
      { label: 'Autumn Edit', href: '/collections/autumn-edit', image: '/images/campaign/autumn-man.jpg', alt: 'Male model in a brown blazer' },
    ],
  },
  collections: {
    columns: [
      {
        title: 'Collections',
        links: [
          ...collections.map((c) => ({ label: c.name, href: `/collections/${c.slug}` })),
          { label: 'All Collections', href: '/collections' },
          { label: 'Lookbook', href: '/lookbook' },
        ],
      },
    ],
    cards: collections.map((c) => ({ label: c.name, number: c.number, href: `/collections/${c.slug}`, image: c.thumb, alt: c.heroAlt })),
  },
};
