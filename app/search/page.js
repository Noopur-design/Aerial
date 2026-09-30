import { Suspense } from 'react';
import SearchView from '@/components/search/SearchView';

export const metadata = {
  title: 'Search',
  description: 'Search AERIAL products, categories and collections.',
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] bg-espresso" />}>
      <SearchView />
    </Suspense>
  );
}
