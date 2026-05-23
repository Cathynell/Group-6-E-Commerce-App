import './globals.css';
import { Metadata } from 'next';
import { Inter, JetBrains_Mono, Cormorant_Garamond, Plaster } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const plaster = Plaster({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-plaster',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Vale Shopping',
  description: 'A high-fidelity, modern, interactive e-commerce platform shopping cart and checkout interface for Vale Shopping with advanced widgets, coupon codes, and shipping estimates.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${cormorant.variable} ${plaster.variable}`}>
      <body className="antialiased min-h-screen text-[#4B433D] bg-[#F9F6F0]">
        {children}
      </body>
    </html>
  );
}
