/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '@/context/CartContext';

const CheckoutPage: React.FC = () => {
  const { cart, clearCart } = useCart(); // Access the cart from context
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePlaceOrder = async () => {
    if (!name || !contact || !address ) { // Validate city field
      setError('All fields are required.');
      return;
    }

    setLoading(true);
    setError(null);

    const orderDetails = { cart, name, contact, address };

    try {
      // Save order details to localStorage
      localStorage.setItem('orderDetails', JSON.stringify(orderDetails));

      // Make API call to handle the order
      const response = await fetch('/api/place-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderDetails), // Pass all order data
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || 'Failed to place order.');
      }

      // Clear the cart after successful order placement
      clearCart();

      // Redirect to the order summary page
      router.push('/order-summary');
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Navbar />
      <div className="max-w-xl mx-auto py-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-black">Checkout</h2>
        <form onSubmit={(e) => e.preventDefault()} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Full Name"
              className="w-full p-2 border border-gray-300 rounded text-gray-700 placeholder-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Contact Number</label>
            <input
              type="number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
              placeholder="Contact Number"
              className="w-full p-2 border border-gray-300 rounded text-gray-700 placeholder-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder="Shipping Address"
              className="w-full p-2 border border-gray-300 rounded text-gray-700 placeholder-gray-700"
            />
          </div>
          <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">City</label>
              <input
              type="text"
              value="Karachi" // Set the value to Karachi
              readOnly // Make the field uneditable
              className="w-full p-2 border border-gray-300 rounded text-gray-700 placeholder-gray-700"
               />
          </div>

          <button
            type="button"
            onClick={handlePlaceOrder}
            disabled={loading}
            className={`w-full p-3 mt-4 bg-green-600 text-white font-semibold rounded-lg transition duration-300 ${
              loading ? 'cursor-not-allowed bg-green-400' : 'hover:bg-green-700'
            }`}
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>

          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
