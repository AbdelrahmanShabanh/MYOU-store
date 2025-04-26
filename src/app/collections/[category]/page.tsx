import type { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  isSoldOut?: boolean;
}

// Define the categories as a const array to ensure type safety
const VALID_CATEGORIES = [
  'scarves',
  'kimonos',
  'burkini',
  'coverups',
  'turbans',
  'accessories',
] as const;

type ValidCategory = typeof VALID_CATEGORIES[number];

type Category = 'burkini' | 'coverups' | 'turbans' | 'scarves' | 'kimonos' | 'accessories';

// This would typically come from your database or API
const SAMPLE_PRODUCTS: Record<Category, Product[]> = {
  burkini: [],
  coverups: [],
  turbans: [
    { id: '1', name: 'Classic Cap', price: 29.99, image: '/collections/caps.jpg' },
    { id: '2', name: 'Designer Cap', price: 34.99, image: '/collections/caps.jpg' }
  ],
  scarves: [
    { id: '1', name: 'Floral Print Scarf', price: 29.99, image: '/collections/scarves.jpg' },
    { id: '2', name: 'Solid Color Scarf', price: 24.99, image: '/collections/stain scarves1.jpg', isSoldOut: true }
  ],
  kimonos: [
    { id: '1', name: 'Floral Kimono', price: 59.99, image: '/collections/kimono.jpg' },
    { id: '2', name: 'Solid Kimono', price: 54.99, image: '/collections/kimono.jpg' }
  ],
  accessories: []
};

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function isValidCategory(category: string): category is ValidCategory {
  return VALID_CATEGORIES.includes(category as ValidCategory);
}

type GenerateMetadataProps = {
  params?: Promise<{ category: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata(
  { params }: { params: GenerateMetadataProps['params'] }
): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params) || { category: '' };
  if (!isValidCategory(resolvedParams.category)) {
    return {
      title: 'Category Not Found - MYOU',
      description: 'The requested category could not be found.',
    };
  }

  const categoryTitle = capitalizeFirstLetter(resolvedParams.category);
  
  return {
    title: `${categoryTitle} Collection - MYOU`,
    description: `Explore our ${categoryTitle} collection at MYOU - Modest Fashion Store`,
  };
}

type PageProps = {
  params?: Promise<{ category: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ params }: { params: PageProps['params'] }) {
  const resolvedParams = await Promise.resolve(params) || { category: '' };
  const { category } = resolvedParams;
  
  if (!isValidCategory(category)) {
    notFound();
  }

  const products = SAMPLE_PRODUCTS[category];
  const categoryTitle = capitalizeFirstLetter(category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-16">
      <h1 className="text-4xl font-bold mb-8">{categoryTitle}</h1>
      
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No products found in this collection.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </div>
  );
} 