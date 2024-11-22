// src/app/about/page.tsx
import Navbar from '@/app/components/Navbar';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      
      <section className="text-center py-20">
        <h3 className="text-3xl font-semibold mb-4">About Us</h3>
        <p className="max-w-2xl mx-auto">
          We are a team of passionate chefs and staff dedicated to bringing you a delightful experience.
        </p>
      </section>
    </div>
  );
}
