import { Suspense } from 'react';
import TrackOrderView from '@/components/account/TrackOrderView';

export const metadata = { title: 'Track Your Order' };

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <TrackOrderView />
    </Suspense>
  );
}
