"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  
}

interface OrderDetails {
  cart: CartItem[];
  name: string;
  contact: string;
  address: string;
}

const OrderSummaryPage: React.FC = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Retrieve order details from localStorage
    const savedOrderDetails = localStorage.getItem("orderDetails");
    if (savedOrderDetails) {
      setOrderDetails(JSON.parse(savedOrderDetails));
    } else {
      // If no order details, redirect to home after a brief delay
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
    setIsLoading(false);
  }, [router]);

  // Dynamically calculate estimated delivery time
  const calculateEstimatedDeliveryTime = () => {
    const randomMinutes = Math.floor(Math.random() * (60 - 30 + 1)) + 30;
    return `${randomMinutes} minutes`;
  };

  if (isLoading) {
    return <p className="text-center mt-12">Loading...</p>;
  }

  if (!orderDetails) {
    return (
      <div className="text-center mt-12">
        <p>No order found. Redirecting to home...</p>
      </div>
    );
  }

  const { cart, name, contact, address } = orderDetails;
  const estimatedDeliveryTime = calculateEstimatedDeliveryTime();
  const orderTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Navbar />
      <div className="max-w-xl mx-auto py-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-black">
          Order Confirmation
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
          <h3 className="text-xl font-semibold mb-4">Customer Details</h3>
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Contact:</strong> {contact}
          </p>
          <p>
            <strong>Address:</strong> {address}
          </p>

          <hr />

          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between mb-2">
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>

          <hr />

          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>${orderTotal.toFixed(2)}</span>
          </div>

          <div className="mt-6">
            <p className="text-center text-green-600 font-semibold">
              Thank you for your order! 🎉<br></br>
              Your Order is placed for Cash on Delivery
            </p>
            <p className="text-center">
              Your order will be delivered in approximately{" "}
              <strong>{estimatedDeliveryTime}</strong>.
            </p>
          </div>

          <button
            onClick={() => router.push("/")}
            className="w-full bg-green-600 text-white py-2 rounded-lg mt-6 hover:bg-green-700 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryPage;
