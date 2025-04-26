import Link from 'next/link';
import Image from 'next/image';

const collections = [
  {
    id: 1,
    title: 'Scarves',
    image: '/collections/scarves.jpg',
    href: '/collections/scarves'
  },
  {
    id: 2,
    title: 'Kimonos',
    image: '/collections/kimono.jpg',
    href: '/collections/kimonos'
  },
  {
    id: 3,
    title: 'Burkini',
    image: '/collections/burkini.jpg',
    href: '/collections/burkini'
  },
  {
    id: 4,
    title: 'Cover Ups',
    image: '/collections/cover up sada.jpg',
    href: '/collections/coverups'
  },
  {
    id: 5,
    title: 'Turban Cap',
    image: '/collections/caps.jpg',
    href: '/collections/turbans'
  },
  {
    id: 6,
    title: 'Hats & Clutches',
    image: '/collections/stain scarves1.jpg',
    href: '/collections/accessories'
  }
];

const CollectionGrid = () => {
  return (
    <section id="collections" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Our Collections</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            href={collection.href}
            className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl 
                     transition-shadow duration-300 aspect-[3/4] bg-white dark:bg-gray-800"
          >
            <Image
              src={collection.image}
              alt={collection.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl font-semibold text-white">{collection.title}</h3>
              <p className="text-white/80 mt-2">View Collection →</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CollectionGrid; 