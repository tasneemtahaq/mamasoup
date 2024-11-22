// CartContext.tsx
"use client"

import { createContext, useContext, useState, ReactNode } from 'react';
import { StaticImageData } from 'next/image';

interface Dish {
  name: string;
  price: number;
  image: StaticImageData | string;
  quantity: number;
}

interface CartContextType {
  cart: Dish[];
  addToCart: (dish: Dish) => void;
  incrementItem: (dishName: string) => void;
  decrementItem: (dishName: string) => void;
  removeFromCart: (dishName: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Dish[]>([]);

  const addToCart = (dish: Dish) => {
    setCart((prevCart) => {
      const existingDish = prevCart.find((item) => item.name === dish.name);
      if (existingDish) {
        return prevCart.map((item) =>
          item.name === dish.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...dish, quantity: dish.quantity || 1 }];
    });
  };

  const incrementItem = (dishName: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.name === dishName ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementItem = (dishName: string) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.name === dishName
            ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (dishName: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.name !== dishName));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, incrementItem, decrementItem, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
