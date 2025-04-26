'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAppSelector } from '@/store/hooks';
import { FiShoppingBag, FiCheck, FiCreditCard, FiDollarSign, FiGift, FiTruck } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const cartItems = useAppSelector((state) => state.cart.items);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [contact, setContact] = useState('');
  const [country, setCountry] = useState('Egypt');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');
  const [shippingMethod, setShippingMethod] = useState('express');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [cardName, setCardName] = useState('');
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push('/');
    }
  }, [cartItems, router]);

  if (cartItems.length === 0) {
    return null;
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = shippingMethod === 'express' ? 60 : 0;
  const total = subtotal + shipping - discount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    // Example: fixed coupon logic
    if (coupon.trim().toLowerCase() === 'save10') {
      setDiscount(100);
      setAppliedCoupon('SAVE10');
    } else {
      setDiscount(0);
      setAppliedCoupon('');
      alert('Invalid coupon code');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      alert('Please agree to the refund and exchange policies');
      return;
    }
    // Handle order submission
    alert('Order submitted!');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-pink-600 dark:text-pink-500">
                <Image
                  src="/icons/myoulog.png"
                  alt="MYOU"
                  width={40}
                  height={40}
                  className="object-contain"
                  priority
                />
              </Link>
              <span className="text-xl font-bold text-gray-900 dark:text-white">Checkout</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Form Sections */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Contact</h2>
              <input
                type="text"
                placeholder="Email or Phone Number"
                value={contact}
                onChange={e => setContact(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
            {/* Delivery */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-4">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Delivery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Country/Region</label>
                  <select
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  >
                    <option>Egypt</option>
                    <option>UAE</option>
                    <option>Saudi Arabia</option>
                  </select>
                </div>
                <div></div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">First name</label>
                  <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:bg-gray-700 dark:text-white sm:text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last name</label>
                  <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:bg-gray-700 dark:text-white sm:text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                <input type="text" value={address} onChange={e => setAddress(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:bg-gray-700 dark:text-white sm:text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
                  <input type="text" value={city} onChange={e => setCity(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:bg-gray-700 dark:text-white sm:text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Postal code (optional)</label>
                  <input type="text" value={postalCode} onChange={e => setPostalCode(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:bg-gray-700 dark:text-white sm:text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:bg-gray-700 dark:text-white sm:text-sm" />
              </div>
            </div>
            {/* Shipping Method */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Shipping method</h2>
              <div className="space-y-2">
                <label className="flex items-center border rounded-md px-4 py-3 cursor-pointer transition-all duration-150 focus-within:ring-2 focus-within:ring-pink-500">
                  <input type="radio" name="shipping" value="express" checked={shippingMethod==='express'} onChange={()=>setShippingMethod('express')} className="form-radio text-pink-600" />
                  <span className="ml-3 flex-1">Egypt Express (est. 1-5 days)</span>
                  <span className="font-semibold">LE 60.00</span>
                </label>
                <label className="flex items-center border rounded-md px-4 py-3 cursor-pointer transition-all duration-150 focus-within:ring-2 focus-within:ring-pink-500">
                  <input type="radio" name="shipping" value="free" checked={shippingMethod==='free'} onChange={()=>setShippingMethod('free')} className="form-radio text-pink-600" />
                  <span className="ml-3 flex-1">Free Shipping (est. 7-14 days)</span>
                  <span className="font-semibold">Free</span>
                </label>
              </div>
            </div>
            {/* Payment */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Payment</h2>
              <div className="space-y-4">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="payment" value="card" checked={paymentMethod==='card'} onChange={()=>setPaymentMethod('card')} className="form-radio text-pink-600" />
                  <FiCreditCard className="ml-2 mr-2 text-pink-600" />
                  <span>Credit card</span>
                </label>
                {paymentMethod==='card' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <input type="text" placeholder="Card number" value={cardNumber} onChange={e=>setCardNumber(e.target.value)} className="col-span-2 mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:bg-gray-700 dark:text-white sm:text-sm" />
                    <input type="text" placeholder="Expiration date (MM / YY)" value={cardExpiry} onChange={e=>setCardExpiry(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:bg-gray-700 dark:text-white sm:text-sm" />
                    <input type="text" placeholder="Security code" value={cardCVC} onChange={e=>setCardCVC(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:bg-gray-700 dark:text-white sm:text-sm" />
                    <input type="text" placeholder="Name on card" value={cardName} onChange={e=>setCardName(e.target.value)} className="col-span-2 mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:bg-gray-700 dark:text-white sm:text-sm" />
                  </div>
                )}
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="payment" value="vodafone" checked={paymentMethod==='vodafone'} onChange={()=>setPaymentMethod('vodafone')} className="form-radio text-pink-600" />
                  <img src="/icons/da825f86efb52423c2785be6a2dd9124.jpg" alt="Vodafone Cash" className="ml-2 mr-2 h-5 w-8 object-contain" />
                  <span>Vodafone Cash</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="payment" value="instapay" checked={paymentMethod==='instapay'} onChange={()=>setPaymentMethod('instapay')} className="form-radio text-pink-600" />
                  <img src="/icons/images.jpeg" alt="InstaPay" className="ml-2 mr-2 h-5 w-8 object-contain" />
                  <span>InstaPay</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="payment" value="cod" checked={paymentMethod==='cod'} onChange={()=>setPaymentMethod('cod')} className="form-radio text-pink-600" />
                  <FiDollarSign className="ml-2 mr-2 text-pink-600" />
                  <span>Cash on Delivery (COD)</span>
                </label>
              </div>
            </div>
            <div className="flex items-start">
              <input id="terms" type="checkbox" checked={agreedToTerms} onChange={e => setAgreedToTerms(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500" />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                I agree to the{' '}
                <a href="#" className="text-pink-600 hover:text-pink-500">refund and exchange policies</a>
              </label>
            </div>
            <button type="submit" className="w-full bg-pink-600 text-white py-3 px-4 rounded-full font-medium hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 flex items-center justify-center space-x-2">
              <FiCheck className="w-5 h-5" />
              <span>Pay now</span>
            </button>
          </form>
          {/* Right: Order Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 lg:sticky lg:top-8">
            <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity} {item.size && `• Size: ${item.size}`}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">LE {(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            {/* Discount Coupon */}
            <form onSubmit={handleApplyCoupon} className="flex mb-4">
              <input
                type="text"
                placeholder="Discount code or gift card"
                value={coupon}
                onChange={e => setCoupon(e.target.value)}
                className="flex-1 rounded-l-md border border-gray-300 dark:border-gray-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-white"
              />
              <button type="submit" className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white px-4 rounded-r-md font-medium hover:bg-pink-600 hover:text-white transition-colors">Apply</button>
            </form>
            {appliedCoupon && (
              <div className="mb-2 text-green-600 dark:text-green-400 text-sm flex items-center"><FiGift className="mr-1" /> Coupon <b className="mx-1">{appliedCoupon}</b> applied!</div>
            )}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span className="text-gray-900 dark:text-white">LE {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                <span className="text-gray-900 dark:text-white">{shipping > 0 ? `LE ${shipping.toFixed(2)}` : 'Free'}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                  <span>Discount</span>
                  <span>- LE {discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-medium pt-2 border-t border-gray-200 dark:border-gray-700">
                <span className="text-gray-900 dark:text-white">Total</span>
                <span className="text-pink-600">LE {total.toFixed(2)}</span>
              </div>
            </div>
            <p className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">🔒 Secure checkout • Free shipping • 30-day returns</p>
          </div>
        </div>
      </div>
    </div>
  );
} 