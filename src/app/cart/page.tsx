"use client";

import Navbar from '@/app/components/Navbar';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

export default function CartPage() {
  const { cart, incrementItem, decrementItem, removeFromCart } = useCart();

  // Calculate the total cart price
  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      <section className="text-center py-20">
        <h3 className="text-3xl font-semibold mb-4">Your Cart</h3>
        {cart.length === 0 ? (
          <p>Your cart is currently empty.</p>
        ) : (
          <div className="max-w-4xl mx-auto">
            {cart.map((dish, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center justify-between bg-white p-4 mb-4 rounded-lg shadow-md">
                <div className="flex items-center mb-4 md:mb-0">
                  <Image src={dish.image} alt={dish.name} width={50} height={50} />
                  <span className="ml-4 font-semibold">{dish.name}</span>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between w-full md:w-auto">
                  <span className="text-gray-700 mb-2 md:mb-0 md:mr-4">Rs.{(dish.price * dish.quantity).toFixed(2)}</span>
                  <div className="flex items-center space-x-3 mb-2 md:mb-0">
                    <button
                      className="bg-gray-300 text-gray-800 font-semibold text-lg px-3 py-1 rounded-full hover:bg-gray-400 transition duration-300"
                      onClick={() => decrementItem(dish.name)}
                    >
                      <span className="font-bold">-</span>
                    </button>
                    <span className="text-gray-700 text-lg">Qty: {dish.quantity}</span>
                    <button
                      className="bg-gray-300 text-gray-800 font-semibold text-lg px-3 py-1 rounded-full hover:bg-gray-400 transition duration-300"
                      onClick={() => incrementItem(dish.name)}
                    >
                      <span className="font-bold">+</span>
                    </button>
                  </div>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300"
                    onClick={() => removeFromCart(dish.name)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between bg-white p-4 mt-8 rounded-lg shadow-md text-xl font-semibold">
              <span>Total:</span>
              <span>Rs.{cartTotal.toFixed(2)}</span>
            </div>

            <div className="mt-8 text-center">
              <Link href="/checkout">
                <button className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition duration-300">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
