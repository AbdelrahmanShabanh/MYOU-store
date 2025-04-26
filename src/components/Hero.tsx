'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: '/slider/IMG-20240915-WA0016.jpg',
      title: 'OUR EXCLUSIVE COLLECTION',
      subtitle: 'Discover Elegant Modest Fashion'
    },
    {
      id: 2,
      image: '/slider/IMG-20240915-WA0018.jpg',
      title: 'NEW ARRIVALS',
      subtitle: 'Shop The Latest Trends'
    },
    {
      id: 3,
      image: '/slider/WhatsApp Image 2025-04-24 at 17.15.35_51c584d0.jpg',
      title: 'SUMMER COLLECTION',
      subtitle: 'Modest & Stylish'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const scrollToCollections = (e: React.MouseEvent) => {
    e.preventDefault();
    const collectionsSection = document.getElementById('collections');
    if (collectionsSection) {
      collectionsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-[80vh] w-full overflow-hidden mt-16">
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full h-full relative">
            <div className="absolute inset-0 bg-black/30 z-10" />
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-white text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
              <p className="text-xl md:text-2xl mb-8">{slide.subtitle}</p>
              <button
                onClick={scrollToCollections}
                className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full 
                         transition-colors duration-300 text-lg font-medium"
              >
                SHOP NOW
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-300 
                     ${currentSlide === index ? 'bg-pink-600' : 'bg-white/50'}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero; 