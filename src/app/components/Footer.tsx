import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="p-6 bg-black text-white flex flex-col items-center space-y-4">
      {/* Social Media Icons */}
      <div className="flex justify-center space-x-6">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-600 text-xl"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-600 text-xl"
        >
          <FaTwitter />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-600 text-xl"
        >
          <FaInstagram />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-600 text-xl"
        >
          <FaLinkedinIn />
        </a>
      </div>

      {/* Footer Links */}
      <div className="flex justify-center space-x-6 text-sm">
        <a href="#" className="hover:text-yellow-600">About Us</a>
        <a href="#" className="hover:text-yellow-600">Privacy Policy</a>
        <a href="#" className="hover:text-yellow-600">Terms of Service</a>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-xs">
        © {new Date().getFullYear()} MamaSoups and Beverages. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
