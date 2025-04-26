'use client';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { removeFromWishlist, toggleWishlist } from '@/store/slices/wishlistSlice';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FiX, FiShoppingBag } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { items, isOpen } = useAppSelector((state) => state.wishlist);

  const handleProceedToOrder = (productId: string) => {
    dispatch(toggleWishlist());
    router.push(`/product/${productId}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(toggleWishlist())}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Wishlist</h2>
              <button
                onClick={() => dispatch(toggleWishlist())}
                className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-500 dark:text-gray-400 mb-4">Your wishlist is empty</div>
                  <button
                    onClick={() => {
                      dispatch(toggleWishlist());
                      router.push('/');
                    }}
                    className="text-pink-600 hover:text-pink-500 font-medium"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {items.map((item) => (
                    <li key={item.id} className="py-6 flex">
                      <div className="relative flex-shrink-0 w-24 h-24 rounded-md overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>

                      <div className="ml-4 flex-1 flex flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                            <h3>{item.name}</h3>
                            <button
                              onClick={() => dispatch(removeFromWishlist(item.id))}
                              className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                            >
                              <FiX className="h-5 w-5" />
                            </button>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            LE {item.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex-1 flex items-end">
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleProceedToOrder(item.id)}
                            className="w-full flex items-center justify-center px-4 py-2 border border-transparent 
                                     text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 
                                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                          >
                            <FiShoppingBag className="mr-2 h-5 w-5" />
                            Proceed to Order
                          </motion.button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Wishlist; 