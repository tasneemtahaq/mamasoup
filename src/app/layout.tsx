// src/app/layout.tsx
import '@/app/globals.css';
import { CartProvider } from '@/context/CartContext';
import { ReactNode } from 'react';


interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
                    {children}  {/* Render the page content below the Navbar */}
        </CartProvider>
      </body>
    </html>
  );
}
