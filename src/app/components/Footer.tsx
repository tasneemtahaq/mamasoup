import React from 'react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="p-6 bg-black text-white flex flex-col items-center space-y-4">
      {/* Social Media Icons */}
      <div className="flex justify-center space-x-6">
        <a
          href="https://facebook.com/mamasoupsandbeverages/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-orange-500 text-xl"
        >
          <FaFacebookF />
        </a>
       
        <a
          href="https://instagram.com/mamasoups/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-orange-500 text-xl"
        >
          <FaInstagram />
        </a>
      
      </div>

      {/* Footer Links */}
      <div className="flex justify-center space-x-6 text-sm">
        <a href="#" className="hover:text-orange-500">About Us</a>
        <a href="#" className="hover:text-orange-500">Privacy Policy</a>
        <a href="#" className="hover:text-orange-500">Terms of Service</a>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-xs">
        © {new Date().getFullYear()} MamaSoups and Beverages. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
