"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "@/context/CartContext";

// Reusable Input Component
interface FormInputProps {
  label: string;
  type: string;
  value: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  value,
  onChange,
  placeholder = "",
  required = false,
  readOnly = false,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      readOnly={readOnly}
      className={`w-full p-3 border ${
        readOnly ? "bg-gray-100 border-gray-300" : "border-gray-300"
      } rounded text-gray-700 placeholder-gray-500`}
    />
  </div>
);

const CheckoutPage: React.FC = () => {
  const { cart, clearCart } = useCart();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePlaceOrder = async () => {
    if (!name || !contact || !address) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError(null);

    const orderDetails = { cart, name, contact, address, city: "Karachi" };

    try {
      localStorage.setItem("orderDetails", JSON.stringify(orderDetails));

      const response = await fetch("/api/place-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderDetails),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Failed to place order.");
      }

      clearCart();
      router.push("/order-summary");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
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
          <FormInput
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            required
          />
          <FormInput
            label="Contact Number"
            type="number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Contact Number"
            required
          />
          <FormInput
            label="Address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="House No./ Street / Area"
            required
          />
          <FormInput
            label="City"
            type="text"
            value="Karachi"
            readOnly
          />
          <button
            type="button"
            onClick={handlePlaceOrder}
            disabled={loading}
            className={`w-full p-3 mt-4 bg-orange-600 text-white font-semibold rounded-lg transition duration-300 ${
              loading ? "cursor-not-allowed bg-orange-400" : "hover:bg-orange-500"
            }`}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
          {error && <p className="text-orange-500 text-center mt-4">{error}</p>}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
