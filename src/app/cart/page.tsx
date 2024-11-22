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
              <div key={index} className="flex items-center justify-between bg-white p-4 mb-4 rounded shadow-md">
                <div className="flex items-center">
                  <Image src={dish.image} alt={dish.name} width={50} height={50} />
                  <span className="ml-4 font-semibold">{dish.name}</span>
                </div>
                <span className="text-gray-700">${(dish.price * dish.quantity).toFixed(2)}</span>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2">
                    {/* Decrement button */}
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                      onClick={() => decrementItem(dish.name)}
                    >
                      -
                    </button>
                    <span className="text-gray-700">Qty: {dish.quantity}</span>
                    {/* Increment button */}
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                      onClick={() => incrementItem(dish.name)}
                    >
                      +
                    </button>
                  </div>

                  {/* Remove button */}
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    onClick={() => removeFromCart(dish.name)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Display Cart Total */}
            <div className="flex justify-between bg-white p-4 mt-8 rounded shadow-md text-xl font-semibold">
              <span>Total:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            {/* Checkout Button */}
            <div className="mt-8 text-center">
              <Link href="/checkout">
                <button className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600">
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
