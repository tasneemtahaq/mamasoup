/* eslint-disable @typescript-eslint/no-require-imports */
"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image, { StaticImageData } from "next/image";
import { useCart } from "@/context/CartContext";

interface Dish {
  name: string;
  price: number;
  image: StaticImageData;
  quantity?: number;
}

interface SectionProps {
  title: string;
  subtitle?: string;
  dishes: Dish[];
}

const MenuSection: React.FC<SectionProps> = ({ title, subtitle, dishes }) => {
  const { addToCart } = useCart();

  return (
    <section className="text-center py-10">
      <h3 className="text-4xl font-extrabold text-gray-800 mb-2">{title}</h3>
      {subtitle && <p className="text-2xl font-bold text-orange-500">{subtitle}</p>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto my-8">
        {dishes.map((dish) => (
          <div
            key={dish.name}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <Image
              src={dish.image}
              alt={dish.name}
              width={300}
              height={200}
              className="rounded-md object-cover"
            />
            <h4 className="text-lg font-semibold mt-3">{dish.name}</h4>
            <span className="block font-bold text-lg text-gray-700">Rs. {dish.price.toFixed(2)}</span>
            <button
              className="mt-4 w-full bg-orange-500 text-white py-2 rounded-md font-semibold hover:bg-orange-600 transition-colors"
              onClick={() => addToCart({ ...dish, quantity: 1 })}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default function MenuPage() {
  const mainDishes: Dish[] = [
    { name: "Chicken CornSoup (Single)", price: 120, image: require('@/app/components/soup.jpg') },
    { name: "Chicken CornSoup (Family)", price: 400, image: require('@/app/components/soup.jpg') },
    { name: "Add Boiled Egg", price: 50, image: require('@/app/components/egg.jpg') },
    { name: "Add Slims ", price: 30, image: require('@/app/components/slims.jpg') },
    { name: "Add Crackers", price: 30, image: require('@/app/components/crackers.jpg') },
  ];

  const fries: Dish[] = [
    { name: "Plain Salted Fries", price: 100, image: require('@/app/components/plain.jpg') },
    { name: "Chatpata Masala Fries", price: 120, image: require('@/app/components/salsa.jpg') },
    { name: "Cheese Masala Fries", price: 120, image: require('@/app/components/cheese.jpg') },
    { name: "Greenchilli Masala Fries", price: 120, image: require('@/app/components/greenchilli.jpg') },
    { name: "Barbeque Masala Fries", price: 120, image: require('@/app/components/salsa.jpg') },
    { name: "Salsa Masala Fries", price: 120, image: require('@/app/components/salsa.jpg') },
    { name: "Tikka Masala Fries", price: 120, image: require('@/app/components/salsa.jpg') },
    { name: "Chicken Masala Fries", price: 120, image: require('@/app/components/chickenflavour.jpg') },
    { name: "Spicy Cheese Dip", price: 120, image: require('@/app/components/cheesedip.jpeg') },
    { name: "Mayo Garlic Dip", price: 120, image: require('@/app/components/mayodip.jpeg') },
  ];

  const streetplate: Dish[] = [
    { name: "Pani Puri", price: 100, image: require('@/app/components/panipuri.jpeg') },
    { name: "Meethi Puri", price: 120, image: require('@/app/components/meethipuri.jpeg') },
    { name: "Dahi Puri", price: 120, image: require('@/app/components/meethipuri.jpeg') },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Navbar />
      <MenuSection title="Main Menu" subtitle="Flavour Up Your Bowl" dishes={mainDishes} />
      <MenuSection title="Flavoured Fries" subtitle="Crispy, Tasty & Irresistible" dishes={fries} />
      <MenuSection title="Street Plates" subtitle="Indulge Your Cravings" dishes={streetplate} />
      <Footer />
    </div>
  );
}
