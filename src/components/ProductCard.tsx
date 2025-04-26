'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';
import { toggleCart } from '@/store/slices/uiSlice';
import { addToWishlist, removeFromWishlist } from '@/store/slices/wishlistSlice';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { CartItem } from '@/types';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  isSoldOut?: boolean;
}

const ProductCard = ({ id, name, price, image, isSoldOut }: ProductCardProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.some(item => item.id === id);
  const productRef = useRef<HTMLDivElement>(null);

  const handleAddToCart = () => {
    if (isSoldOut) return;
    
    // Create and animate the flying element
    const flyingElement = document.createElement('div');
    flyingElement.className = 'fixed z-50 w-16 h-16';
    
    // Clone the product image
    const productImage = productRef.current?.querySelector('img');
    if (productImage) {
      const clone = productImage.cloneNode(true) as HTMLImageElement;
      clone.style.width = '100%';
      clone.style.height = '100%';
      clone.style.objectFit = 'cover';
      flyingElement.appendChild(clone);
    }

    // Get the product position
    const productRect = productRef.current?.getBoundingClientRect();
    const cartIcon = document.querySelector('[data-cart-icon]');
    const cartRect = cartIcon?.getBoundingClientRect();

    if (productRect && cartRect) {
      // Set initial position
      flyingElement.style.left = `${productRect.left}px`;
      flyingElement.style.top = `${productRect.top}px`;

      // Add to DOM
      document.body.appendChild(flyingElement);

      // Animate to cart
      requestAnimationFrame(() => {
        flyingElement.style.transition = 'all 0.5s ease-in-out';
        flyingElement.style.transform = `translate(${cartRect.left - productRect.left}px, ${cartRect.top - productRect.top}px) scale(0.1)`;
        flyingElement.style.opacity = '0';
      });

      // Clean up and dispatch actions
      setTimeout(() => {
        document.body.removeChild(flyingElement);
        dispatch(addToCart({ 
          id, 
          name, 
          price, 
          image, 
          quantity: 1 
        } as CartItem));
        dispatch(toggleCart());
      }, 500);
    }
  };

  const handleWishlistClick = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(id));
    } else {
      dispatch(addToWishlist({ id, name, price, image }));
    }
  };

  const handleViewDetails = () => {
    if (isSoldOut) return;
    router.push(`/product/${id}`);
  };

  return (
    <div ref={productRef} className="group relative">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
        <Image
          src={image}
          alt={name}
          fill
          className={`object-cover object-center transition-opacity ${isSoldOut ? 'opacity-50' : 'group-hover:opacity-75'}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        {isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-black/70 text-white px-3 py-1.5 rounded-full text-xs font-medium">
              Sold Out
            </span>
          </div>
        )}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-2 right-2 p-1.5 rounded-full 
                     ${isInWishlist 
                       ? 'bg-pink-100 text-pink-600' 
                       : 'bg-white/80 text-gray-600 hover:text-pink-600'} 
                     transition-colors duration-200`}
        >
          <FiHeart className="w-4 h-4" fill={isInWishlist ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="mt-2">
        <h3 className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{name}</h3>
        <p className="mt-0.5 text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100">LE {price.toFixed(2)}</p>
      </div>

      <div className="mt-4 space-y-3">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleAddToCart}
          disabled={isSoldOut}
          className={`w-full px-4 py-3 text-sm font-medium rounded-full text-white 
                   flex items-center justify-center transition-colors duration-300 whitespace-nowrap
                   ${isSoldOut 
                     ? 'bg-gray-400 cursor-not-allowed' 
                     : 'bg-pink-600 hover:bg-pink-700'}`}
        >
          <FiShoppingBag className="w-4 h-4 mr-2 flex-shrink-0" />
          {isSoldOut ? 'Sold Out' : 'Add to Cart'}
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleViewDetails}
          disabled={isSoldOut}
          className={`w-full px-4 py-3 text-sm font-medium rounded-full border 
                   ${isSoldOut 
                     ? 'border-gray-300 text-gray-400 cursor-not-allowed' 
                     : 'border-pink-600 text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-900/20'} 
                   whitespace-nowrap`}
        >
          {isSoldOut ? 'Sold Out' : 'View Details'}
        </motion.button>
      </div>
    </div>
  );
};

export default ProductCard; 