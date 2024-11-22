// src/app/order-summary/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Item {
  name: string;
  quantity: number;
  price: number;
}

interface OrderDetails {
  items: Item[];
  total: number;
  estimatedDeliveryTime: string;
}

const OrderSummaryPage = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    items: [],
    total: 0,
    estimatedDeliveryTime: '',
  });
  const [orderStatus, setOrderStatus] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const mockOrderDetails: OrderDetails = {
      items: [
        { name: 'Chicken CornSoup (Single)', quantity: 1, price: 12.99 },
        { name: 'Slims', quantity: 2, price: 2.49 },
      ],
      total: 17.97,
      estimatedDeliveryTime: '45 minutes',
    };
    setOrderDetails(mockOrderDetails);
  }, []);

  const handlePlaceOrder = async () => {
    try {
      const response = await fetch('/api/place-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'John Doe', // Replace with actual form data
          contact: '+1234567890', // Replace with actual contact number
          address: '123 Street, City', // Replace with actual address
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setOrderStatus(`Error: ${errorData.error}`);
        return;
      }

      const data = await response.json();
      setOrderStatus(data.message);
    } catch (error) {
      console.error("Error placing order:", error);
      setOrderStatus("Server error while placing the order.");
    }
  };

  return (
    <div className="max-w-xl mx-auto py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Order Summary</h2>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Your Order</h3>
        <ul>
          {orderDetails.items.map((item, index) => (
            <li key={index} className="flex justify-between mb-2">
              <span>{item.name} x{item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <hr className="my-4" />
        <div className="flex justify-between">
          <span className="font-bold">Total:</span>
          <span className="font-bold">${orderDetails.total.toFixed(2)}</span>
        </div>
        <div className="mt-4">
          <span className="font-semibold">Estimated Delivery Time: </span>
          <span>{orderDetails.estimatedDeliveryTime}</span>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="w-full bg-blue-600 text-white py-2 rounded-md mt-6"
        >
          Place Order
        </button>

        {orderStatus && <p className="mt-4">{orderStatus}</p>}

        <button
          onClick={() => router.push('/')}
          className="w-full bg-green-600 text-white py-2 rounded-md mt-6"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default OrderSummaryPage;
