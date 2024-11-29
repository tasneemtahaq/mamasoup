"use client";

import Navbar from "@/app/components/Navbar";

interface ContactInfoProps {
  label: string;
  buttonText: string;
  link: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ label, buttonText, link }) => {
  return (
    <div className="my-4">
      <span className="block font-semibold text-lg">{label}</span>
      <a
        href={link}
        className="inline-block mt-2 bg-orange-500 text-white py-2 px-6 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors"
      >
        {buttonText}
      </a>
    </div>
  );
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      
      <section className="text-center py-20 px-4">
        <h3 className="text-3xl font-semibold mb-6">Contact Us</h3>
        <p className="max-w-2xl mx-auto text-xl mb-6">
          We’d love to hear from you! Please use the buttons below to reach out to us.
        </p>

        {/* Contact Info with Call and Email Buttons */}
        <div className="max-w-3xl mx-auto">
          <ContactInfo
            label="Phone"
            buttonText="Call Now"
            link="tel:03332287497"
          />
          <ContactInfo
            label="Email"
            buttonText="Email Us"
            link="mailto:mamasoup@gmail.com"
          />
        </div>

       
      </section>
    </div>
  );
}
