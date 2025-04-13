// src/app/layout.tsx
import '@/app/globals.css';
import { CartProvider } from '@/context/CartContext';
import { ReactNode } from 'react';
import { Montserrat } from 'next/font/google';
import { BioRhyme_Expanded } from 'next/font/google';

const fonts = BioRhyme_Expanded({
  weight: '400', 
  subsets: ['latin'],
});
const NotificationBar: React.FC = () => (
  <div className="fixed top-0 left-0 w-full bg-gray-900 text-white text-sm text-center py-1 z-50 font-medium">
    <marquee   className={fonts.className}
    behavior="scroll" 
    direction="left" 
    scrollamount="5">
      We are taking online Orders from 5:00 PM to 10:30 PM only
    </marquee>
  </div>
);


const font = Montserrat({
  weight: ['200'],
  subsets: ['latin'],
});


interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={font.className}>
      <body>
        <CartProvider>
          <NotificationBar/>
                    {children}  {/* Render the page content below the Navbar */}
        </CartProvider>
      </body>
    </html>
  );
}
