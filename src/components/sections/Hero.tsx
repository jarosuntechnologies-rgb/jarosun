"use client";

import React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

import dynamic from "next/dynamic";

const Antigravity = dynamic(() => import("@/components/ui/Antigravity"), {
  ssr: false,
});

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden bg-brand-dark">
      <div className="absolute inset-0 z-0">
        <Antigravity
          count={500}
          magnetRadius={14}
          ringRadius={10}
          waveSpeed={0.4}
          waveAmplitude={1}
          particleSize={0.7}
          lerpSpeed={0.08}
          color="#ff0000"
          autoAnimate={true}
          particleVariance={1}
          rotationSpeed={0}
          depthFactor={1}
          pulseSpeed={3}
          particleShape="sphere"
          fieldStrength={10}
        />
      </div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 xl:gap-20 items-center relative z-10">
          <div>
            <Reveal delay={0.1}>
              <div className="inline-block px-3 py-1 rounded-full bg-brand-red/10 text-brand-red text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
                Premium Web Studio
              </div>
            </Reveal>
            
            <div className="overflow-hidden mb-7 pb-4">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight"
              >
                Transforming ideas into
                <span className="text-brand-red"> digital realities.</span>
              </motion.h1>
            </div>

            <Reveal delay={0.3}>
              <p className="text-base md:text-lg text-white/50 mb-12 max-w-2xl leading-relaxed">
                {"Jarosun Technologies isn’t in the business of building technology; we’re in the business of creating opportunities. Guided by innovative thinking and bolstered by expert knowledge, we design smart digital solutions for companies looking to evolve, expand, and succeed in today’s fast-paced world. From cutting-edge software and cloud technologies to disruptive digital experiences, it is our passion to bring your grand ambitions to life."}
              </p>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="flex flex-wrap gap-5">
                <Link 
                  href="/start-project"
                  className="bg-brand-red text-white px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-brand-red-dark transition-all flex items-center justify-center text-center"
                >
                  Start Project
                </Link>
                <Link 
                  href="/#projects"
                  className="border border-white/10 text-white/60 px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-white/5 hover:text-white transition-all flex items-center justify-center text-center"
                >
                  Our Projects
                </Link>
              </div>
            </Reveal>
          </div>

          <motion.div 
            style={{ y }} 
            className="relative z-10 flex items-center justify-center p-12 -translate-y-16"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="w-full max-w-[18rem] md:max-w-[30rem] aspect-square relative group"
            >
              <img 
                src="/Jarosun.png" 
                alt="Jarosun Logo" 
                className="w-full h-full object-contain filter brightness-0 invert opacity-90 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              />
            </motion.div>
          </motion.div>
        </div>
    </section>
  );
}
