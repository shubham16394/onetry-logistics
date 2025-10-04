import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OneTry Logistics - Tried Once. Trusted Forever.",
  description: "OneTry Logistics offers safe, damage-free, and on-time logistics solutions at competitive prices. Backed by over 26 years of experience and a trusted network across India.",
  icons: {
    icon: '/onetry.jpg',
    shortcut: '/onetry.jpg',
    apple: '/onetry.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
