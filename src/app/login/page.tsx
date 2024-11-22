// src/app/login/page.tsx
import Navbar from '@/app/components/Navbar';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      
      <section className="text-center py-20">
        <h3 className="text-3xl font-semibold mb-4">Login</h3>
        <input type="email" placeholder="Email" className="mt-4 p-2 border rounded w-64" />
        <input type="password" placeholder="Password" className="mt-4 p-2 border rounded w-64" />
        <button className="mt-6 bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600">
          Login
        </button>
      </section>
    </div>
  );
}
