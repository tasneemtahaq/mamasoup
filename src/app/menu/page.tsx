"use client";

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image, { StaticImageData } from 'next/image';
import { useCart } from '@/context/CartContext';
import chickenSoupImg from '@/app/components/soup.jpg';
import boiledEggImg from '@/app/components/egg.jpg';
import slimsImg from '@/app/components/slims.jpg';
import crackersImg from '@/app/components/crackers.jpg';
import chickenflavourImg from '@/app/components/chickenflavour.jpg';
import salsaImg from '@/app/components/salsa.jpg';
import greenchilliImg from '@/app/components/greenchilli.jpg';
import plainImg from '@/app/components/plain.jpg';
import cheeseImg from '@/app/components/cheese.jpg';

interface Dish {
  name: string;
  price: number;
  image: StaticImageData;
  quantity?: number; // Optional, because we'll add quantity when passing to addToCart
}

export default function MenuPage() {
  const { addToCart } = useCart();

  const mainDishes: Dish[] = [
    { name: 'Chicken CornSoup (Single)', price: 12.99, image: chickenSoupImg },
    { name: 'Chicken CornSoup (Family)', price: 12.99, image: chickenSoupImg },
    { name: 'Boiled Egg', price: 1.99, image: boiledEggImg },
    { name: 'Slims', price: 2.49, image: slimsImg },
    { name: 'Crackers', price: 1.29, image: crackersImg },
  ];

  const fries: Dish[] = [
    { name: 'Plain Salted Fries', price: 1.29, image: plainImg },
    { name: 'Chatpata Masala Fries', price: 1.29, image: salsaImg },
    { name: 'Cheese Masala Fries', price: 1.29, image: cheeseImg },
    { name: 'Barbeque Masala Fries', price: 1.29, image: salsaImg },
    { name: 'Chicken Masala Fries', price: 1.29, image: chickenflavourImg },
    { name: 'Salsa Masala Fries', price: 1.29, image: salsaImg },
    { name: 'Greenchilli Masala Fries', price: 1.29, image: greenchilliImg },
    { name: 'Tikka Masala Fries', price: 1.29, image: salsaImg },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Navbar />

      {/* Main Dishes Section */}
      <section className="text-center py-20">
        <h3 className="text-4xl font-extrabold text-gray-800 mb-4">MENU</h3>
        <p>Flavour Up Your Bowl</p>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-4xl my-7 mx-auto">
          {mainDishes.map((dish) => (
            <div key={dish.name} className="bg-white p-6 rounded-lg shadow-md">
              <Image src={dish.image} alt={dish.name} width={500} height={200} />
              <h4 className="text-xl font-semibold mb-2">{dish.name}</h4>
              <span className="font-bold">${dish.price.toFixed(2)}</span>
              <button
                className="mt-4 w-full bg-orange-500 text-white py-2 rounded-md font-semibold hover:bg-orange-600"
                onClick={() => addToCart({ ...dish, quantity: 1 })}  
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Fries Section */}
      <section className="text-center py-20">
        <h3 className="text-4xl font-extrabold text-gray-800 mb-4">Flavoured Fries</h3>
        <p>Deliciously Seasoned</p>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-4xl my-7 mx-auto">
          {fries.map((dish) => (
            <div key={dish.name} className="bg-white p-6 rounded-lg shadow-md">
              <Image src={dish.image} alt={dish.name} width={500} height={200} />
              <h4 className="text-xl font-semibold mb-2">{dish.name}</h4>
              <span className="font-bold">${dish.price.toFixed(2)}</span>
              <button
                className="mt-4 w-full bg-orange-500 text-white py-2 rounded-md font-semibold hover:bg-orange-600"
                onClick={() => addToCart({ ...dish, quantity: 1 })}  
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
      <Footer/>
    </div>
  );
}
