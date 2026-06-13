"use client";

import React from "react";
import LogoLoop, { LogoItem } from "@/components/ui/LogoLoop";

const modernStackLogos: LogoItem[] = [
  { src: "/Technologies%20Used/React%20Logo.png", alt: "React" },
  { src: "/Technologies%20Used/NODEJS%20Logo.png", alt: "Node.js" },
  { src: "/Technologies%20Used/Python%20Logo.png", alt: "Python" },
  { src: "/Technologies%20Used/Django%20Logo.png", alt: "Django" },
  { src: "/Technologies%20Used/JS%20Logo.png", alt: "JavaScript" },
  { src: "/Technologies%20Used/TS%20Logo.png", alt: "TypeScript" }
];

export default function TechStack() {
  return (
    <section id="tech" className="py-24 px-6 bg-[#080808] relative overflow-hidden">
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white/80 mb-16 uppercase tracking-[0.3em]">
          Modern Stack
        </h2>
        
        <div className="-mx-6">
          <LogoLoop 
            logos={modernStackLogos}
            speed={40} 
            logoHeight={100}
            gap={100}
            className="py-12 relative z-0" 
            fadeOut={true}
            fadeOutColor="#080808"
            renderItem={(item, key) => {
              const isNode = (item as any).alt === 'Node.js';
              return (
                <div key={key} className="h-[var(--logoloop-logoHeight)] flex items-center justify-center">
                  <img 
                    src={(item as any).src} 
                    alt={(item as any).alt} 
                    className={`w-auto object-contain opacity-60 transition-all duration-300 hover:opacity-100 cursor-pointer drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] ${isNode ? 'h-[65%] hover:scale-110' : 'h-full hover:scale-110'}`} 
                  />
                </div>
              );
            }}
          />
        </div>
      </div>
    </section>
  );
}
