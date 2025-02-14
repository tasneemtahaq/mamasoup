"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image, { StaticImageData } from "next/image";
import { useCart } from "@/context/CartContext";

// Assume the cart context exports a type for Dish with quantity required:
export interface Dish {
  name: string;
  price: number;
  image: StaticImageData;
  quantity: number; // required in the cart
}

// Extend the cart Dish type to add options for the menu
export interface MenuDish extends Dish {
  // options is only used in the menu display
  options?: {
    label: string;
    price: number;
  }[];
}

// Props for a menu section
interface SectionProps {
  title: string;
  subtitle?: string;
  dishes: MenuDish[];
}

const MenuSection: React.FC<SectionProps> = ({ title, subtitle, dishes }) => {
  const { addToCart } = useCart();

  return (
    <section className="text-center py-10">
      <h3 className="text-4xl font-extrabold text-gray-800 mb-2">{title}</h3>
      {subtitle && <p className="text-2xl font-bold text-orange-500">{subtitle}</p>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto my-8">
        {dishes.map((dish) => (
          <DishCard key={dish.name} dish={dish} addToCart={addToCart} />
        ))}
      </div>
    </section>
  );
};

interface DishCardProps {
  dish: MenuDish;
  addToCart: (dish: Dish) => void;
}

const DishCard: React.FC<DishCardProps> = ({ dish, addToCart }) => {
  // Local state to track the selected option index if options exist
  const [selectedOption, setSelectedOption] = useState<number>(0);

  // If options exist, use the selected option's price; otherwise, use dish.price.
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
        <div className="mt-2">
          {dish.options.map((option, index) => (
            <label key={index} className="mr-4 text-sm">
              <input
                type="radio"
                name={`${dish.name}-option`}
                className="mr-1"
                checked={selectedOption === index}
                onChange={() => setSelectedOption(index)}
              />
              {option.label} (Rs. {option.price.toFixed(2)})
            </label>
          ))}
          <span className="block font-bold text-lg text-gray-700 mt-2">
            Selected: Rs. {displayPrice.toFixed(2)}
          </span>
        </div>
      ) : (
        <span className="block font-bold text-lg text-gray-700">
          Rs. {displayPrice.toFixed(2)}
        </span>
      )}

      <button
        className="mt-4 w-full bg-orange-500 text-white py-2 rounded-md font-semibold hover:bg-orange-600 transition-colors"
        onClick={() => {
          // Build an object that satisfies the cart's Dish type:
          const dishToAdd: MenuDish = {
            ...dish,
            name: dish.options
              ? `${dish.name} (${dish.options[selectedOption].label})`
              : dish.name,
            price: displayPrice,
            // Force quantity to be a number (default to 1)
            quantity: dish.quantity !== undefined ? dish.quantity : 1,
          };
          addToCart(dishToAdd);
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

// Import images using ES module imports instead of require()
import soupImg from "@/app/components/soup.jpg";
import eggImg from "@/app/components/egg.jpg";
import slimsImg from "@/app/components/slims.jpg";
import crackersImg from "@/app/components/crackers.jpg";
import plainImg from "@/app/components/plain.jpg";
import salsaImg from "@/app/components/salsa.jpg";
import cheeseImg from "@/app/components/cheese.jpg";
import greenchilliImg from "@/app/components/greenchilli.jpg";
import chickenflavourImg from "@/app/components/chickenflavour.jpg";
import cheesedipImg from "@/app/components/cheesedip.jpeg";
import mayodipImg from "@/app/components/mayodip.jpeg";
import panipuriImg from "@/app/components/panipuri.jpeg";
import meethipuriImg from "@/app/components/meethipuri.jpeg";

// The main MenuPage component
export default function MenuPage() {
  // For main dishes, we can set a default quantity (e.g. 0) since they’re not in the cart yet.
  const mainDishes: MenuDish[] = [
    { name: "Chicken CornSoup (Single)", price: 100, image: soupImg, quantity: 0 },
    { name: "Chicken CornSoup (Family)", price: 350, image: soupImg, quantity: 0 },
    { name: "Add Boiled Egg", price: 40, image: eggImg, quantity: 0 },
    { name: "Add Slims", price: 30, image: slimsImg, quantity: 0 },
    { name: "Add Crackers", price: 30, image: crackersImg, quantity: 0 },
  ];

  // Fries with options for size
  const fries: MenuDish[] = [
    {
      name: "Plain Salted Fries",
      price: 120, // default; will be overridden by selected option
      image: plainImg,
      quantity: 0,
      options: [
        { label: "Small", price: 70 },
        { label: "Large", price: 120 },
      ],
    },
    {
      name: "Chatpata Masala Fries",
      price: 120,
      image: salsaImg,
      quantity: 0,
      options: [
        { label: "Small", price: 70 },
        { label: "Large", price: 120 },
      ],
    },
    {
      name: "Cheese Masala Fries",
      price: 120,
      image: cheeseImg,
      quantity: 0,
      options: [
        { label: "Small", price: 70 },
        { label: "Large", price: 120 },
      ],
    },
    {
      name: "Greenchilli Masala Fries",
      price: 120,
      image: greenchilliImg,
      quantity: 0,
      options: [
        { label: "Small", price: 70 },
        { label: "Large", price: 120 },
      ],
    },
    {
      name: "Barbeque Masala Fries",
      price: 120,
      image: salsaImg,
      quantity: 0,
      options: [
        { label: "Small", price: 70 },
        { label: "Large", price: 120 },
      ],
    },
    {
      name: "Salsa Masala Fries",
      price: 120,
      image: salsaImg,
      quantity: 0,
      options: [
        { label: "Small", price: 70 },
        { label: "Large", price: 120 },
      ],
    },
    {
      name: "Tikka Masala Fries",
      price: 120,
      image: salsaImg,
      quantity: 0,
      options: [
        { label: "Small", price: 70 },
        { label: "Large", price: 120 },
      ],
    },
    {
      name: "Chicken Masala Fries",
      price: 120,
      image: chickenflavourImg,
      quantity: 0,
      options: [
        { label: "Small", price: 70 },
        { label: "Large", price: 120 },
      ],
    },
    // Dips (without options) – ensure quantity is provided
    { name: "Spicy Cheese Dip", price: 120, image: cheesedipImg, quantity: 0 },
    { name: "Mayo Garlic Dip", price: 120, image: mayodipImg, quantity: 0 },
  ];

  const streetplate: MenuDish[] = [
    { name: "Pani Puri", price: 180, image: panipuriImg, quantity: 0 },
    { name: "Meethi Puri", price: 180, image: meethipuriImg, quantity: 0 },
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