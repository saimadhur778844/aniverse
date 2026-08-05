import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import QueryProvider from "@/providers/QueryProvider";

import { AuthProvider } from "@/context/AuthContext/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext/WishlistContext";

import { Toaster } from "sonner";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aniverse",
  description: "Anime Marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                {children}
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </QueryProvider>

        <Toaster
          position="top-right"
          richColors
          closeButton
          duration={3000}
          theme="dark"
        />
      </body>
    </html>
  );
}