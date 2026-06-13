"use client";

import { Globe, Lightbulb, User, MessageSquare } from "lucide-react";
import MagicBento from "@/components/ui/MagicBento";
import SplitText from "@/components/ui/SplitText";

const services = [
  { 
    title: "Business Sites", 
    icon: <Globe className="w-5 h-5 text-brand-red" />,
    description: "High-converting corporate websites with blazing-fast load times, SEO-first architecture, and enterprise-grade security.",
    label: "Web Development",
    color: "#050505"
  },
  { 
    title: "Startup MVPs", 
    icon: <Lightbulb className="w-5 h-5 text-brand-red" />,
    description: "Rapid prototyping and full-stack development to validate your idea fast. From concept to deployment in weeks, not months.",
    label: "Product Engineering",
    color: "#050505"
  },
  { 
    title: "Portfolios", 
    icon: <User className="w-5 h-5 text-brand-red" />,
    description: "Cinematic personal brands and creative showcases. Motion-driven designs that leave a lasting impression.",
    label: "Creative Design",
    color: "#050505"
  },
  { 
    title: "Chatbots", 
    icon: <MessageSquare className="w-5 h-5 text-brand-red" />,
    description: "AI-powered conversational interfaces that handle support, sales, and onboarding — 24/7, at scale.",
    label: "AI & Automation",
    color: "#050505"
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-brand-dark min-h-[100vh] w-full flex flex-col justify-center py-16">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center w-full">
        <SplitText
          text="Our Expertise."
          className="text-4xl md:text-6xl font-bold text-white tracking-tight block"
          delay={40}
          duration={1.0}
          splitType="chars"
          tag="h2"
        />
        <SplitText
          text="We combine cutting-edge tech with minimalist design to create performant digital identities that scale with your business."
          className="text-white/40 mt-6 max-w-xl mx-auto block"
          delay={25}
          duration={0.8}
          splitType="words"
          tag="p"
        />
      </div>
      
      <MagicBento
        cards={services}
        textAutoHide={false}
        enableStars={true}
        enableSpotlight={true}
        enableBorderGlow={true}
        enableTilt={false}
        enableMagnetism={false}
        clickEffect={true}
        glowColor="192, 0, 0"
        spotlightRadius={350}
        particleCount={8}
      />
    </section>
  );
}
