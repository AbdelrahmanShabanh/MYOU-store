import Hero from '@/components/Hero';
import CollectionGrid from '@/components/CollectionGrid';

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <Hero />
      <CollectionGrid />
    </main>
  );
}
