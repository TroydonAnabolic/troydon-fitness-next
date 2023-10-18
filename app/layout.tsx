import "./globals.css";
import "react-day-picker/dist/style.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import NavBar from "./NavBar";
import Footer from "./Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Troydon Fitness in NZ",
  description: "Personal Training services",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dracula">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <NavBar />
          <main className="flex-1 p-4">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
