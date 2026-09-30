# AERIAL — luxury fashion storefront

A complete, responsive e-commerce front end for **AERIAL**, a contemporary luxury fashion house. It's built with Next.js 16 (App Router), React 19, Tailwind CSS v4, GSAP + ScrollTrigger, Zustand and the React Bits `OptionWheel` and `FlexCarousel` components.

> **Demo store.** No backend, auth provider or payment gateway is connected. The cart, wishlist, demo account, saved addresses and orders live in the visitor's browser (`localStorage`). The checkout never collects card or bank details and never takes payment. Contact details in `data/site.js` are placeholder data.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run lint
```

Requires Node 20.9+.

## Pages

| Route | Page |
| --- | --- |
| `/` | Homepage: campaign hero, OptionWheel category picker, FlexCarousel lookbook |
| `/shop` | Shop All, with working filters, sorting and pagination |
| `/new-arrivals` | New Arrivals |
| `/women`, `/men` | Gender landing pages with category tiles and filters |
| `/collections` | Collections index |
| `/collections/[slug]` | Collection detail (merges both Autumn Edit designs): Essentials, Autumn Edit, Contemporary Classics, Evening Wear |
| `/products/[slug]` | Product detail: gallery, colour/size/quantity, size guide, accordions, related and recently viewed |
| `/search?q=` | Search with suggestions, type-ahead, "did you mean", filters and an empty state |
| `/cart` | Shopping bag |
| `/checkout` | Validated demo checkout |
| `/order-confirmation` | Confirmation (shown only after a completed checkout) |
| `/wishlist` | Wishlist |
| `/about` | Brand story, philosophy, sustainability, timeline |
| `/lookbook` | Seasonal lookbooks, FlexCarousel, full-screen viewer |
| `/journal`, `/journal/[slug]` | Journal and articles |
| `/contact` | Contact form with validation |
| `/account` | Demo sign-in / create account and member dashboard |
| `/help` | FAQ, shipping and returns, with searchable accessible accordions |
| `/track-order` | Order tracking demo (try `AE458721` / `noopur@example.com`) |
| `/legal/privacy`, `/legal/terms` | Legal pages |

## Demo data

- **Discount codes:** `AERIAL10` (10% off), `WELCOME15` (15% off), `FREESHIP` (free express shipping)
- **Shipping:** free standard delivery on orders over ₹2,999 (otherwise ₹99); express costs ₹249; Cash on Delivery adds ₹49
- **Account:** any email with a password of 6+ characters signs you in locally

## Project structure

```
app/          routes, layouts, template.js (page transitions + scroll animations)
components/
  layout/     Header, MegaMenu, MobileNav, Footer, Providers
  ui/         Button, Media, Drawer, Modal, Accordion, Newsletter, Toast, Breadcrumbs, …
  product/    ProductCard, ProductGrid, ProductListing, FilterSidebar, SortSelect, ProductGallery, …
  cart/       CartDrawer, CartLine, SummaryRows, DiscountForm
  checkout/   CheckoutView, ConfirmationView
  account/    SignIn, Dashboard, TrackOrderView
  home/       HomeHero (OptionWheel), FeaturedPieces, CampaignCarousel (FlexCarousel)
  reactbits/  OptionWheel + FlexCarousel (React Bits source, unmodified)
data/         products, collections, journal, FAQs, lookbooks, site config: the single source of truth
store/        Zustand store with localStorage persistence
hooks/        UI hooks (scroll lock, focus trap, escape, media query)
lib/          pricing, search, orders, formatting, GSAP motion system
styles/       globals.css (design tokens), animations.css
public/images campaign, editorial, product and category imagery
```

## Animation system

`lib/motion.js` wires declarative attributes to GSAP/ScrollTrigger:

- `data-reveal`: fade and rise into view
- `data-reveal-stagger`: staggered children
- `data-reveal-img`: clip-path image reveal
- `data-parallax`: subtle parallax
- `data-split`: line-by-line headline reveal

`app/template.js` runs these on every navigation and adds the page fade. Every timeline is reverted on unmount. With `prefers-reduced-motion`, animations are skipped and content shows immediately.

## Imagery

The photography in `public/images` is sourced from [Unsplash](https://unsplash.com) under the [Unsplash License](https://unsplash.com/license) (free for commercial use). Each file is credited to its photographer in [`CREDITS.md`](CREDITS.md). Swap in your own campaign and product photography before launch; paths are referenced from `data/*.js` and a few page files.
