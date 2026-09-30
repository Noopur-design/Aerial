import { Suspense } from 'react';
import HelpView from './HelpView';

export const metadata = {
  title: 'FAQ, Shipping & Returns',
  description: 'Answers to common questions about orders, shipping, returns, exchanges, payments and sizing at AERIAL.',
};

export default function HelpPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh]" />}>
      <HelpView />
    </Suspense>
  );
}
