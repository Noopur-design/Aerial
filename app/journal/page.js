import { Suspense } from 'react';
import JournalView from './JournalView';

export const metadata = {
  title: 'Journal',
  description: 'Stories on fashion, craftsmanship, styling and sustainability from the AERIAL studio.',
};

export default function JournalPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh]" />}>
      <JournalView />
    </Suspense>
  );
}
