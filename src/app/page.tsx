import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import WhyJarosun from "@/components/sections/WhyJarosun";
import TechStack from "@/components/sections/TechStack";
import ChatbotWidget from "@/components/sections/ChatbotWidget";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <Services />
      <WhyJarosun />
      <TechStack />
      <ChatbotWidget />
      <Contact />
      <Footer />
    </main>
  );
}
