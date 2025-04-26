'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiShoppingBag, FiHeart, FiUser, FiMenu, FiX, FiSettings } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleCart } from '@/store/slices/uiSlice';
import { toggleWishlist } from '@/store/slices/wishlistSlice';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAdmin, isAuthenticated, user } = useAuth();

  const navLinks = [
    { href: '/collections/scarves', label: 'Scarves' },
    { href: '/collections/kimonos', label: 'Kimonos' },
    { href: '/collections/burkini', label: 'Burkini' },
    { href: '/collections/coverups', label: 'Cover Ups' },
    { href: '/collections/turbans', label: 'Turban Cap' },
    { href: '/collections/accessories', label: 'Hats & Clutches' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-sm z-40">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-pink-600 dark:text-pink-500">
            <Image
              src="/icons/myoulog.png"
              alt="MYOU"
              width={60}
              height={60}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-pink-600 dark:text-gray-300 dark:hover:text-pink-500 text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                href="/admin"
                className="text-gray-600 hover:text-pink-600 dark:text-gray-300 dark:hover:text-pink-500 text-sm font-medium flex items-center"
              >
                <FiSettings className="mr-1 h-4 w-4" />
                Admin
              </Link>
            )}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => dispatch(toggleWishlist())}
              className="p-2 text-gray-600 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-500 relative"
            >
              <FiHeart className="w-6 h-6" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </button>
            <button
              onClick={() => dispatch(toggleCart())}
              className="p-2 text-gray-600 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-500 relative"
              data-cart-icon
            >
              <FiShoppingBag className="w-6 h-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
            {isAuthenticated ? (
              <Link
                href="/account"
                className="p-2 text-gray-600 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-500"
              >
                <FiUser className="w-6 h-6" />
              </Link>
            ) : (
              <Link
                href="/auth/signin"
                className="p-2 text-gray-600 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-500"
              >
                <FiUser className="w-6 h-6" />
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md"
            >
              <div className="py-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-gray-600 hover:text-pink-600 dark:text-gray-300 dark:hover:text-pink-500 text-sm font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="block px-4 py-2 text-gray-600 hover:text-pink-600 dark:text-gray-300 dark:hover:text-pink-500 text-sm font-medium flex items-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FiSettings className="mr-2 h-4 w-4" />
                    Admin Dashboard
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar; 