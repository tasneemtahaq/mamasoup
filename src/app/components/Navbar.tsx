// src/app/components/Navbar.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/context/CartContext';

const Navbar = () => {
  const { cart } = useCart();
  const cartItemCount = cart.length;

  return (
    <header className="bg-gray-900 text-white py-5 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="flex items-center">
          <Image src="/image/mamasoup.png" alt="Mama Soup Logo" width={100} height={100} />
        </div>
        <nav className="flex space-x-8">
          <Link href="/" className="text-lg font-semibold hover:text-orange-500">Home</Link>
          <Link href="/about" className="text-lg font-semibold hover:text-orange-500">About</Link>
          <Link href="/menu" className="text-lg font-semibold hover:text-orange-500">Menu</Link>
          <Link href="/contact" className="text-lg font-semibold hover:text-orange-500">Contact</Link>
        </nav>
        <div className="flex space-x-6 items-center">
          <Link href="/cart" className="relative">
            <ShoppingCartIcon className="h-6 w-6 text-orange-500 hover:text-white" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                {cartItemCount}
              </span>
            )}
          </Link>
          <Link href="/login">
            <UserIcon className="h-6 w-6 text-orange-500 hover:text-white" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
