"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCartIcon, UserIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

const Navbar = () => {
  const { cart } = useCart();
  const cartItemCount = cart.length;

  // State for toggling the mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Links for the navbar
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/menu", label: "Menu" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <header className="bg-gray-900  text-white py-5 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="flex items-center">
          <Image src="/image/mamasoup.png" alt="Mama Soup Logo" width={100} height={100} />
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden sm:flex space-x-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-lg font-semibold hover:text-orange-500">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="sm:hidden flex items-center">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            aria-label="Toggle menu"
          >
            <Bars3Icon className="h-6 w-6 text-orange-500 hover:text-white" />
          </button>
        </div>

        {/* Desktop and Mobile Cart and Login */}
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-gray-800 text-white px-6 py-4">
          <div className="space-y-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-lg font-semibold hover:text-orange-500 block">
                {link.label}
              </Link>
            ))}
          
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
