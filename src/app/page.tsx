'use client';

import Navbar from './components/Navbar';
import Slider from 'react-slick';
import Image from 'next/image';
import Link from 'next/link';
import Footer from './components/Footer';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';



// Custom Arrow Component
const CustomArrow: React.FC<{ onClick?: () => void; direction: 'prev' | 'next' }> = ({ onClick, direction }) => (
  <button
    className={`absolute ${direction === 'prev' ? 'left-5' : 'right-5'} top-1/2 transform -translate-y-1/2 z-10 
    cursor-pointer bg-white/50 text-gray-800 rounded-full p-3 shadow-md hover:bg-white hover:shadow-lg transition`}
    onClick={onClick}
    aria-label={direction === 'prev' ? 'Previous Slide' : 'Next Slide'}
  >
    {direction === 'prev' ? <FaChevronLeft size={16} /> : <FaChevronRight size={16} />}
  </button>
);

// Image Slider Component
const ImageSlider: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
  };

  const images = [
    { src: '/image/chickensoup.jpg', alt: 'Chicken Soup' },
    { src: '/image/frenchfries.jpg', alt: 'French Fries' },
    { src: '/image/golgappay.jpg', alt: 'Golgappay' },
    { src: '/image/soda.jpg', alt: 'Soda' },

  ];

  return (
    <section className="relative h-[70vh] max-h-[750px] overflow-hidden rounded-b-3xl shadow-lg">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="w-full h-[70vh] relative">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
              priority={index === 0}
            />
          </div>
        ))}
      </Slider>
    </section>
  );
};

// Hero Section Component
const HeroSection: React.FC = () => (
  <section className="text-center py-20 text-gray-900 px-6 sm:px-12">
    <motion.h2 
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6 }}
      className="text-5xl sm:text-6xl font-bold mb-6 text-orange-500 drop-shadow-md"
    >
      Welcome to Mama Soups & Beverages
    </motion.h2>
    <motion.p 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6, delay: 0.2 }}
      className="text-lg sm:text-xl mb-8 text-gray-700"
    >
      Maintaining Quality Since 1984!
    </motion.p>
    <Link href="/menu">
      <motion.button 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.3, delay: 0.4 }}
        className="bg-orange-500 text-white px-8 py-3 text-lg rounded-lg shadow-md hover:bg-orange-600 transition"
      >
        View Menu
      </motion.button>
    </Link>
  </section>
);

// Home Component
const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-50 to-gray-100">
      <Navbar />
      <div className="mt-8"> {/* Push content down */}
        <ImageSlider />
        <HeroSection />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
