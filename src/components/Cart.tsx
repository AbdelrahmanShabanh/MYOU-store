'use client';

import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleCart } from '@/store/slices/uiSlice';
import { updateCartItemQuantity, removeFromCart } from '@/store/slices/cartSlice';
import Image from 'next/image';
import { FiX, FiPlus, FiMinus, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { CartItemSkeleton } from './LoadingSkeleton';
import { useRouter } from 'next/navigation';

const Cart = () => {
  const dispatch = useAppDispatch();
  const { cartOpen } = useAppSelector((state) => state.ui);
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Calculate total price
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalShipping = cartItems.reduce((sum, item) => sum + ((item.shippingCost || 0) * item.quantity), 0);

  useEffect(() => {
    // Simulate loading time
    if (cartOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [cartOpen]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        dispatch(toggleCart());
      }
    };

    if (cartOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cartOpen, dispatch]);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateCartItemQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    dispatch(toggleCart());
    router.push('/checkout');
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={() => dispatch(toggleCart())}
          />
          
          {/* Cart Panel */}
          <motion.div
            ref={cartRef}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 w-full sm:w-96 h-full bg-white dark:bg-gray-900 
                     shadow-2xl z-50 overflow-hidden"
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="p-5 border-b dark:border-gray-700 flex justify-between items-center bg-gradient-to-r from-pink-50 to-white dark:from-gray-800 dark:to-gray-900">
                <div className="flex items-center space-x-3">
                  <FiShoppingBag className="text-pink-600 dark:text-pink-500" size={24} />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Cart</h2>
                </div>
                <button 
                  onClick={() => dispatch(toggleCart())}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <FiX className="text-gray-500 dark:text-gray-400" size={20} />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-5">
                {isLoading ? (
                  <div className="space-y-5">
                    {[...Array(3)].map((_, index) => (
                      <CartItemSkeleton key={index} />
                    ))}
                  </div>
                ) : cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                      <FiShoppingBag className="text-gray-400 dark:text-gray-500" size={32} />
                    </div>
                    <p className="text-lg font-medium text-gray-500 dark:text-gray-400">Your cart is empty</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Add some items to get started</p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {cartItems.map((item) => (
                      <motion.div 
                        key={item.id} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <div className="relative w-20 h-20 rounded-md overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                            priority
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">${item.price.toFixed(2)}</p>
                          {item.size && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              Size: {item.size}
                            </p>
                          )}
                          <div className="flex items-center mt-2">
                            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="p-1.5 text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-500 transition-colors"
                              >
                                <FiMinus size={14} />
                              </button>
                              <span className="mx-2 text-sm font-medium text-gray-900 dark:text-white w-6 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="p-1.5 text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-500 transition-colors"
                              >
                                <FiPlus size={14} />
                              </button>
                            </div>
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="ml-3 p-1.5 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors"
                            >
                              <FiTrash2 size={14} />
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-900 dark:text-white">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t dark:border-gray-700 p-5 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex justify-between mb-4">
                  <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Subtotal</span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-6">
                  <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Shipping</span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">LE {totalShipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-6 pb-2 border-b dark:border-gray-700">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">Total</span>
                  <span className="text-xl font-bold text-pink-600 dark:text-pink-500">LE {(total + totalShipping).toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 px-4 rounded-full 
                           transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-[1.02]"
                >
                  Checkout
                </button>
                <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                  Secure checkout • Free shipping • 30-day returns
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart; 