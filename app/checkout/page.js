import { Suspense } from 'react';
import CheckoutView from '@/components/checkout/CheckoutView';

export const metadata = { title: 'Secure Checkout', robots: { index: false } };

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh]" />}>
      <CheckoutView />
    </Suspense>
  );
}
