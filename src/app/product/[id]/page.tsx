'use client';

import { useState } from 'react';
import { use } from 'react';
import Image from 'next/image';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';
import { toggleCart } from '@/store/slices/uiSlice';
import { FiShoppingBag, FiTruck, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { CartItem } from '@/types';
import ProductCard from '@/components/ProductCard';

interface SizeOption {
  value: string;
  label: string;
}

const sizes: SizeOption[] = [
  { value: 'S', label: 'S' },
  { value: 'M', label: 'M' },
  { value: 'L', label: 'L' },
  { value: 'XL', label: 'XL' },
  { value: 'XXL', label: 'XXL' },
  { value: 'XXXL', label: 'XXXL' },
];

const SIMILAR_PRODUCTS = [
  {
    id: 'similar-1',
    name: 'Elegant Scarf',
    price: 2999,
    image: '/collections/scarves.jpg'
  },
  {
    id: 'similar-2',
    name: 'Modern Kimono',
    price: 3999,
    image: '/collections/kimono.jpg',
    isSoldOut: true
  },
  {
    id: 'similar-3',
    name: 'Stylish Turban',
    price: 1999,
    image: '/collections/caps.jpg'
  },
  {
    id: 'similar-4',
    name: 'Classic Burkini',
    price: 4999,
    image: '/collections/burkini.jpg'
  }
];

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const dispatch = useAppDispatch();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [mainImage, setMainImage] = useState('/collections/caps.jpg');
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  
  // This would typically come from your API or database
  const product = {
    id: resolvedParams.id,
    name: 'Memoir Long Rashguard',
    price: 4695.00,
    description: `Experience ultimate comfort and style with our Memoir Long Rashguard. Perfect for water sports and beach activities, this piece offers:

• UV Protection for safe sun exposure
• Fast Dry Technology for comfort
• Performance Zipper for Water Sport
• Premium quality fabric for durability
• Stylish design for fashion-forward athletes`,
    features: [
      'UV Protection',
      'Fast Dry Technology',
      'Performance Zipper for Water Sport'
    ],
    images: [
      '/collections/caps.jpg',
      '/collections/scarves.jpg',
      '/collections/kimono.jpg',
      '/collections/burkini.jpg'
    ]
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      quantity: 1
    } as CartItem));
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    handleAddToCart();
    router.push('/checkout');
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={mainImage}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(image)}
                  className={`aspect-square relative rounded-md overflow-hidden ${
                    mainImage === image ? 'ring-2 ring-pink-500' : ''
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
              <p className="mt-2 text-2xl font-semibold text-pink-600 dark:text-pink-500">
                LE {product.price.toFixed(2)}
              </p>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Size</h3>
                <button
                  onClick={() => setShowSizeChart(true)}
                  className="px-4 py-2 bg-pink-100 hover:bg-pink-200 dark:bg-pink-900/30 dark:hover:bg-pink-900/50 
                           text-pink-600 dark:text-pink-400 rounded-full font-medium text-sm flex items-center gap-2 
                           transition-colors duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                  View Size Guide
                </button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size.value}
                    onClick={() => {
                      setSelectedSize(size.value);
                      setSizeError(false);
                    }}
                    className={`py-2 px-4 text-sm font-medium rounded-full border 
                      ${selectedSize === size.value
                        ? 'border-pink-600 bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-500'
                        : 'border-gray-200 text-gray-900 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800'
                      }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
              {sizeError && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  Please select a size before proceeding
                </p>
              )}
            </div>

            {/* Features */}
            <div className="border-t border-b py-4 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600 dark:text-gray-400">
                    <span className="w-2 h-2 bg-pink-600 rounded-full mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Shipping Info */}
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <FiTruck className="mr-2" />
              <span>Fast delivery: Order within 2 hours to get it Before Tuesday, 29th April!</span>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Description</h3>
              <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 px-4 rounded-full 
                         transition-colors duration-300 font-medium flex items-center justify-center"
              >
                <FiShoppingBag className="mr-2" />
                Add to Cart
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleBuyNow}
                className="w-full border border-pink-600 text-pink-600 hover:bg-pink-50 
                         dark:text-pink-500 dark:hover:bg-pink-900/20 py-3 px-4 rounded-full 
                         transition-colors duration-300 font-medium"
              >
                Buy Now
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Size Chart Modal */}
      <AnimatePresence>
        {showSizeChart && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-sm mx-4"
            >
              <button
                onClick={() => setShowSizeChart(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <FiX size={24} />
              </button>
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Size Guide</h2>
              <div className="relative w-[300px] h-[300px] mx-auto">
                <Image
                  src="/icons/WOMEN-WEBSITE-SIZE-CHARTai-copy_2048x2048.png"
                  alt="Size Chart"
                  fill
                  className="object-contain"
                  priority
                  sizes="100px"
                />
              </div>
              <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
                For the best fit, please measure yourself and compare with the size chart above. 
                If you're between sizes, we recommend choosing the larger size.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* You May Also Like Section */}
      <div className="mt-24 border-t border-gray-200 dark:border-gray-700 pt-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto px-4">
          {SIMILAR_PRODUCTS.map((product) => (
            <div className="w-full max-w-[250px] mx-auto" key={product.id}>
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                isSoldOut={product.isSoldOut}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
} 