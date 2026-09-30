import { discountCodes, shipping } from '@/data/site';
import { getProduct } from '@/data/products';

export function resolveCart(items) {
  return items
    .map((item) => {
      const product = getProduct(item.slug);
      if (!product) return null;
      return { ...item, product, lineTotal: product.price * item.qty };
    })
    .filter(Boolean);
}

export function lookupDiscount(code) {
  if (!code) return null;
  const key = code.trim().toUpperCase();
  return discountCodes[key] ? { code: key, ...discountCodes[key] } : null;
}

/**
 * Single source of truth for every order total on the site.
 * delivery: 'standard' | 'express'; payment: 'card' | 'upi' | 'netbanking' | 'cod'
 */
export function computeTotals(items, { code, delivery = 'standard', payment } = {}) {
  const lines = resolveCart(items);
  const count = lines.reduce((n, l) => n + l.qty, 0);
  const subtotal = lines.reduce((n, l) => n + l.lineTotal, 0);
  const discount = lookupDiscount(code);

  let discountAmount = 0;
  if (discount?.type === 'percent') discountAmount = Math.round((subtotal * discount.value) / 100);

  let shippingFee = 0;
  if (subtotal > 0) {
    if (delivery === 'express') shippingFee = discount?.type === 'shipping' ? 0 : shipping.expressFee;
    else shippingFee = subtotal >= shipping.freeThreshold || discount?.type === 'shipping' ? 0 : shipping.standardFee;
  }

  const codFee = payment === 'cod' && subtotal > 0 ? shipping.codFee : 0;
  const total = Math.max(0, subtotal - discountAmount + shippingFee + codFee);
  const toFree = Math.max(0, shipping.freeThreshold - subtotal);

  return { lines, count, subtotal, discount, discountAmount, shippingFee, codFee, total, toFree };
}
