import type { Metadata } from "next";
import {
  Inter,
  Cormorant_Garamond,
  Plaster,
} from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
});

const plaster = Plaster({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-plaster",
});

export const metadata: Metadata = {
  title: "Vale",
  description: "Vale Ecommerce Cart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${cormorant.variable} ${plaster.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}