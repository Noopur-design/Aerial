import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductGrid from '@/components/product/ProductGrid';
import RecentlyViewed from '@/components/product/RecentlyViewed';
import { getProduct, products, relatedProducts, productTypes } from '@/data/products';
import { site } from '@/data/site';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.description,
    openGraph: { title: `${p.name} — AERIAL`, images: [p.images[0]] },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const i = products.indexOf(product);
  const prev = products[i - 1];
  const next = products[i + 1];
  const related = relatedProducts(product, 4);
  const typeLabel = productTypes.find((t) => t.value === product.type)?.label;
  const genderLabel = product.gender === 'men' ? 'Men' : 'Women';

  // Product structured data for search engines
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    sku: product.sku,
    description: product.description,
    image: product.images,
    brand: { '@type': 'Brand', name: site.name },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: product.price,
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: product.rating, reviewCount: product.reviews },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container-luxe pt-5">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: genderLabel, href: `/${product.gender}` },
            { label: typeLabel, href: `/${product.gender}?category=${product.type}` },
            { label: product.name },
          ]}
        />
      </div>

      <section className="container-luxe grid gap-8 pb-16 pt-5 md:grid-cols-[1.25fr_1fr] lg:gap-12 xl:grid-cols-[1.55fr_1fr] xl:gap-16" aria-label={product.name}>
        <ProductGallery images={product.images} name={product.name} />
        <div className="md:sticky md:top-[calc(var(--header-h)+1.25rem)] md:self-start">
          <ProductInfo product={product} prev={prev} next={next} />
        </div>
      </section>

      <section aria-labelledby="related-title" className="container-luxe border-t border-line py-14">
        <h2 id="related-title" className="caps-serif mb-8 text-[clamp(1.5rem,2.4vw,2rem)]" data-reveal>
          You May Also Like
        </h2>
        <ProductGrid products={related} columns="grid-cols-2 md:grid-cols-4" />
      </section>

      <RecentlyViewed exclude={product.slug} />
    </>
  );
}
