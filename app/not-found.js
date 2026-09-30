import Media from '@/components/ui/Media';
import Button from '@/components/ui/Button';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <div className="container-luxe grid min-h-[70vh] items-center gap-10 py-16 md:grid-cols-2">
      <div>
        <p className="eyebrow text-stone">Error 404</p>
        <h1 className="mt-4 font-display text-[clamp(3rem,6vw,5.4rem)] font-normal leading-[0.95]">This page has wandered off.</h1>
        <p className="mt-5 max-w-md text-[0.95rem] text-muted">The page you’re looking for doesn’t exist or has moved. Let us take you somewhere beautiful instead.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/">Return home</Button>
          <Button href="/search" variant="outline">
            Search the store
          </Button>
        </div>
      </div>
      <Media src="/images/editorial/still-life-vase.jpg" alt="A black vase of dried blossoms in raking light" className="aspect-[4/5] max-h-[70vh]" sizes="50vw" />
    </div>
  );
}
