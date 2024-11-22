// src/app/contact/page.tsx
import Navbar from '@/app/components/Navbar';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      
      <section className="text-center py-20">
        <h3 className="text-3xl font-semibold mb-4">Contact Us</h3>
        <p className="max-w-2xl mx-auto">
          We’d love to hear from you! Reach out for any questions or reservations.
        </p>
        <button className="mt-6 bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600">
          Get in Touch
        </button>
      </section>
    </div>
  );
}
