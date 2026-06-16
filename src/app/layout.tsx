import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import ChatbotWidget from "@/components/sections/ChatbotWidget";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jarosun | Premium Web Development & Digital Experiences",
  description: "Jarosun builds high-performance websites, custom dashboards, and intelligent chatbots for startups and modern businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${outfit.variable} ${geistMono.variable} font-sans bg-black text-white antialiased`}>
        {children}
        <ChatbotWidget />
      </body>
    </html>
  );
}
