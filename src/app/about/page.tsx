// src/app/about/page.tsx
import Navbar from '@/app/components/Navbar';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      
      <section className="text-center py-20">
        <h3 className="text-3xl font-semibold mb-4">About Us</h3>
        <p className="max-w-2xl mx-auto text-center font-serif" >
          
Welcome to Mama Soups, where tradition meets taste! Established over 40 years ago by my beloved father, Late Saifuddin, our journey began on chilly winter nights in Karachi with a simple yet heartwarming menu: Chicken soup seasoned with eggs, paired with our signature spiced Slims.<br></br>

What started as a humble winter tradition quickly grew into a beloved name across the city, celebrated for its consistent flavors and comforting recipes. Today, we carry forward this legacy, staying true to the original taste while introducing exciting new items like flavored fries, pani puri, and our famous pizza fries.

At Mama Soups, we are all about serving happiness in every bite. Whether you are craving nostalgia or looking to explore something new, we are here to make your food experience unforgettable.<br></br>
<br></br> For more information please navigate to Contact Section.
        </p>
      </section>
    </div>
  );
}
