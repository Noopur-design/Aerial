import { Suspense } from 'react';
import ConfirmationView from '@/components/checkout/ConfirmationView';

export const metadata = { title: 'Order Confirmed', robots: { index: false } };

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh]" />}>
      <ConfirmationView />
    </Suspense>
  );
}
