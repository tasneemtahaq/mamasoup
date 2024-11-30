'use client';

import Navbar from './components/Navbar';
import Slider from 'react-slick';
import Image from 'next/image';
import Link from 'next/link';
import Footer from './components/Footer';

// Custom Arrow Component
const CustomArrow: React.FC<{ onClick?: () => void; direction: 'prev' | 'next' }> = ({ onClick, direction }) => (
  <button
    className={`absolute ${direction === 'prev' ? 'left-5' : 'right-5'} top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-orange-500 text-white rounded-full p-2 hover:bg-orange-600 transition`}
    onClick={onClick}
    aria-label={direction === 'prev' ? 'Previous Slide' : 'Next Slide'}
  >
    {direction === 'prev' ? '◀' : '▶'}
  </button>
);

// Image Slider Component
const ImageSlider: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
  };

  const images = [
    { src: '/image/chickensoup.jpg', alt: 'Chicken Soup' },
    { src: '/image/frenchfries.jpg', alt: 'French Fries' },
    { src: '/image/golgappay.jpg', alt: 'Golgappay' },
  ];

  return (
    <section className="relative h-[75vh] max-h-[800px] overflow-hidden">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="w-full h-[75vh] relative">
            {/* Ensuring responsiveness and object-fit */}
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
              priority={index === 0} // Prioritize the first image for faster loading
            />
          </div>
        ))}
      </Slider>
    </section>
  );
};

// Hero Section Component
const HeroSection: React.FC = () => (
  <section className="text-center py-20 text-gray-800 px-4 sm:px-8">
    <h2 className="text-4xl sm:text-5xl text-orange-500 font-extrabold mb-4">
      Welcome to Mama Soups & Beverages
    </h2>
    <p className="text-base sm:text-lg mb-6">Maintaining Quality Since 1984!</p>
    <Link href="/menu">
      <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition">
        View Menu
      </button>
    </Link>
  </section>
);

// Home Component
const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-100 to-gray-200">
      <Navbar />
      <ImageSlider />
      <HeroSection />
      <Footer />
    </div>
  );
};

export default Home;
