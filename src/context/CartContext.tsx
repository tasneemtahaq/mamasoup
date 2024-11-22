"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { StaticImageData } from 'next/image';

// Dish type with quantity field
interface Dish {
  name: string;
  price: number;
  image: StaticImageData;
  quantity: number; // Required for keeping track of item quantity
}

// Context Type for Cart
interface CartContextType {
  cart: Dish[];
  addToCart: (dish: Dish) => void;
  incrementItem: (dishName: string) => void;
  decrementItem: (dishName: string) => void;
  removeFromCart: (dishName: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Dish[]>([]);

  // Add or update an item in the cart
  const addToCart = (dish: Dish) => {
    setCart((prevCart) => {
      const existingDish = prevCart.find((item) => item.name === dish.name);

      if (existingDish) {
        // If item already in cart, increment its quantity
        return prevCart.map((item) =>
          item.name === dish.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      // If item is not in the cart, add it with quantity: 1 if missing
      return [...prevCart, { ...dish, quantity: dish.quantity || 1 }];
    });
  };

  // Increment the quantity of an item in the cart
  const incrementItem = (dishName: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.name === dishName ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrement the quantity of an item in the cart
  const decrementItem = (dishName: string) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.name === dishName
            ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }  // Ensure quantity doesn't go below 1
            : item
        )
        .filter((item) => item.quantity > 0)  // Remove items with quantity 0
    );
  };

  // Remove an item completely from the cart
  const removeFromCart = (dishName: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.name !== dishName));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, incrementItem, decrementItem, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access the cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
