"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

// Define dish types
export interface Dish {
  name: string;
  price: number;
  image: string; // Using string paths from public folder
  quantity: number;
}

export interface MenuDish extends Dish {
  options?: {
    label: string;
    price: number;
  }[];
}

// DishCard component
interface DishCardProps {
  dish: MenuDish;
  addToCart: (dish: Dish) => void;
}

const DishCard: React.FC<DishCardProps> = ({ dish, addToCart }) => {
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const displayPrice = dish.options ? dish.options[selectedOption].price : dish.price;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <Image
        src={dish.image}
        alt={dish.name}
        width={300}
        height={200}
        className="rounded-md object-cover"
      />
      <h4 className="text-lg font-semibold mt-3">{dish.name}</h4>
      {dish.options ? (
        <div className="mt-2 space-y-1">
          {dish.options.map((option, index) => (
            <label key={index} className="flex items-center text-sm">
              <span>{option.label}</span>
              <input
                type="radio"
                name={`${dish.name}-option`}
                className="accent-orange-500 mx-2"
                checked={selectedOption === index}
                onChange={() => setSelectedOption(index)}
              />
              <span>(Rs. {option.price.toFixed(2)})</span>
            </label>
          ))}
        </div>
      ) : (
        <span className="block font-bold text-lg text-gray-700">
          Rs. {displayPrice.toFixed(2)}
        </span>
      )}
      <button
        className="mt-4 w-full bg-orange-500 text-white py-2 rounded-md font-semibold hover:bg-orange-600 transition-colors"
        onClick={() => {
          const dishToAdd: MenuDish = {
            ...dish,
            name: dish.options
              ? `${dish.name} (${dish.options[selectedOption].label})`
              : dish.name,
            price: displayPrice,
            quantity: dish.quantity || 1,
          };
          addToCart(dishToAdd);
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

// MenuSection component
interface SectionProps {
  title: string;
  dishes: MenuDish[];
}

const MenuSection: React.FC<SectionProps> = ({ title, dishes }) => {
  const { addToCart } = useCart();
  return (
    <section className="py-10">
      <h3 className="text-4xl font-extrabold text-gray-800 text-center mb-6">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {dishes.map((dish) => (
          <DishCard key={dish.name} dish={dish} addToCart={addToCart} />
        ))}
      </div>
    </section>
  );
};

// Image paths from /public/images
const soupImg = "/image/soup.jpg";
const eggImg = "/image/egg.jpg";
const slimsImg = "/image/slims.jpg";
const crackersImg = "/image/crackers.jpg";
const friesredImg = "/image/friesred.jpg";
const friesgreenImg = "/image/friesgreen.jpg";
const friesyellImg = "/image/friesyell.jpg";
const frieswhiteImg = "/image/frieswhite.jpg";
const cheesedipImg = "/image/cheesedip.jpeg";
const mayodipImg = "/image/mayodip.jpeg";
const panipuriImg = "/image/panipuri.jpeg";
const meethipuriImg = "/image/meethipuri.jpeg";
const appleImg = "/image/apple.jpg";
const lemonImg = "/image/lemon.jpg";
const lycheeImg = "/image/lychee.jpg";
const rasberryImg = "/image/rasberry.jpg";
const icecreamsodaImg = "/image/icecreamsoda.jpg";
const peachImg = "/image/peach.jpg";
const pineappleImg = "/image/pineapple.jpg";
const roseImg = "/image/rose.jpg";
const orangeImg = "/image/orange.jpg";
const mangImg = "/image/mango.jpg";
const vimtoImg = "/image/vimto.jpg";
const blueberryImg = "/image/blueberry.jpg";

// Define menu items for each category
const menuItems: { [key: string]: MenuDish[] } = {
  Soup: [
    { name: "Chicken CornSoup (Single)", price: 100, image: soupImg, quantity: 0 },
    { name: "Chicken CornSoup (Family)", price: 350, image: soupImg, quantity: 0 },
    { name: "Add Boiled Egg", price: 40, image: eggImg, quantity: 0 },
    { name: "Add Slims", price: 30, image: slimsImg, quantity: 0 },
    { name: "Add Crackers", price: 30, image: crackersImg, quantity: 0 },
  ],
  "Flavoured Fries": [
    {
      name: "Salted",
      price: 120,
      image: friesredImg,
      quantity: 0,
      options: [
        { label: "Small", price: 70 },
        { label: "Large", price: 120 },
      ],
    },
    {
      name: "Chatpata",
      price: 120,
      image: friesredImg,
      quantity: 0,
      options: [
        { label: "Small", price: 70 },
        { label: "Large", price: 120 },
      ],
    },
    {
      name: "Cheese",
      price: 120,
      image: friesyellImg,
      quantity: 0,
      options: [
        { label: "Small", price: 70 },
        { label: "Large", price: 120 },
      ],
    },
    {
      name: "Greenchilli",
      price: 120,
      image: friesgreenImg,
      quantity: 0,
      options: [
        { label: "Small", price: 70 },
        { label: "Large", price: 120 },
      ],
    },
    {
      name: "Barbeque",
      price: 120,
      image: friesredImg, // Using salsaImg as a placeholder for Barbeque
      quantity: 0,
      options: [
        { label: "Small", price: 70 },
        { label: "Large", price: 120 },
      ],
    },
    {
      name: "Salsa",
      price: 120,
      image: friesredImg,
      quantity: 0,
      options: [
        { label: "Small", price: 70 },
        { label: "Large", price: 120 },
      ],
    },
    {
      name: "Tikka",
      price: 120,
      image: friesredImg,
      quantity: 0,
      options: [
        { label: "Small", price: 70 },
        { label: "Large", price: 120 },
      ],
    },
    {
      name: "Chicken",
      price: 120,
      image: frieswhiteImg,
      quantity: 0,
      options: [
        { label: "Small", price: 70 },
        { label: "Large", price: 120 },
      ],
    },
    { name: "Spicy Cheese Dip", price: 120, image: cheesedipImg, quantity: 0 },
    { name: "Mayo Garlic Dip", price: 120, image: mayodipImg, quantity: 0 },
  ],
  "Street Plate": [
    { name: "Pani Puri", price: 180, image: panipuriImg, quantity: 0 },
    { name: "Meethi Puri", price: 180, image: meethipuriImg, quantity: 0 },
  ],
  Soda: [
    { name: "Apple", price: 100, image: appleImg, quantity: 0 },
    { name: "Blueberry", price: 100, image: blueberryImg, quantity: 0 },
    { name: "Vimto", price: 100, image: vimtoImg, quantity: 0 },
    { name: "Lemon", price: 100, image: lemonImg, quantity: 0 },
    { name: "Lychee", price: 100, image: lycheeImg, quantity: 0 },
    { name: "Rasberry", price: 100, image: rasberryImg, quantity: 0 },
    { name: "Icecream Soda", price: 100, image: icecreamsodaImg, quantity: 0 },
    { name: "Peach", price: 100, image: peachImg, quantity: 0 },
    { name: "Pineapple", price: 100, image: pineappleImg, quantity: 0 },
    { name: "Rose", price: 100, image: roseImg, quantity: 0 },
    { name: "Orange", price: 100, image: orangeImg, quantity: 0 },
    { name: "Mango", price: 100, image: mangImg, quantity: 0 },
  ],
 
};

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState<string>("Soup");

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Navbar />
      <div className="flex justify-center space-x-4 py-4 bg-white shadow-md sticky top-0 z-50">
        {Object.keys(menuItems).map((category) => (
          <div
            key={category}
            className={`px-4 py-2 font-semibold cursor-pointer ${
              activeTab === category ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-600"
            }`}
            onClick={() => setActiveTab(category)}
          >
            {category}
          </div>
        ))}
      </div>
      <div className="p-6 max-w-6xl mx-auto">
        {Object.keys(menuItems).map(
          (category) =>
            activeTab === category && (
              <MenuSection key={category} title={category} dishes={menuItems[category]} />
            )
        )}
      </div>
      <Footer />
    </div>
  );
}
