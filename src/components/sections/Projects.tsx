"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Brain, BarChart3, ShoppingBag } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SplitText from "@/components/ui/SplitText";

interface Project {
  title: string;
  description: string;
  category: string;
  tags: string[];
  icon: React.ReactNode;
  link: string;
  bgGradient: string;
}

const projects: Project[] = [
  {
    title: "Pulse AI",
    description: "Enterprise conversational intelligence and customer support automation handling millions of messages with intelligent caching.",
    category: "AI & Automation",
    tags: ["Next.js", "Gemini API", "Pinecone", "Tailwind CSS"],
    icon: <Brain className="w-6 h-6 text-brand-red" />,
    link: "#",
    bgGradient: "from-red-950/20 via-black to-black border-red-500/10 hover:border-brand-red/30",
  },
  {
    title: "Nova Analytics",
    description: "Real-time metrics, analytics, and business intelligence portal featuring collaborative workspace tools and high-fidelity reporting.",
    category: "Custom Dashboards",
    tags: ["React", "TypeScript", "Node.js", "Chart.js"],
    icon: <BarChart3 className="w-6 h-6 text-brand-red" />,
    link: "#",
    bgGradient: "from-zinc-950/20 via-black to-black border-white/5 hover:border-white/20",
  },
  {
    title: "Vertex Store",
    description: "An immersive, cinematic luxury e-commerce storefront with optimized WebGL product previews and custom payment gateways.",
    category: "E-Commerce",
    tags: ["Next.js", "Three.js", "Stripe", "Framer Motion"],
    icon: <ShoppingBag className="w-6 h-6 text-brand-red" />,
    link: "#",
    bgGradient: "from-red-950/10 via-black to-black border-white/5 hover:border-brand-red/25",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6 bg-[#050505] relative overflow-hidden">
      {/* Background visual element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-red/5 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20 text-center">
          <Reveal delay={0.1}>
            <div className="inline-block px-3 py-1 rounded-full bg-brand-red/10 text-brand-red text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
              Our Portfolio
            </div>
          </Reveal>
          
          <SplitText
            text="Featured Projects."
            className="text-4xl md:text-6xl font-bold text-white tracking-tight block"
            delay={40}
            duration={1.0}
            splitType="chars"
            tag="h2"
          />
          
          <SplitText
            text="A curated selection of our latest high-performance applications and cinematic web solutions."
            className="text-white/40 mt-6 max-w-xl mx-auto block text-base md:text-lg"
            delay={25}
            duration={0.8}
            splitType="words"
            tag="p"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Reveal key={index} delay={0.2 + index * 0.15}>
              <div 
                className={`group h-full relative rounded-3xl p-8 bg-gradient-to-br ${project.bgGradient} border backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center">
                      {project.icon}
                    </div>
                    <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-brand-red transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-white/50 text-sm leading-relaxed mb-8">
                    {project.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag, tagIdx) => (
                      <span 
                        key={tagIdx} 
                        className="text-[10px] font-medium text-white/60 bg-white/[0.02] border border-white/[0.05] px-2.5 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link 
                    href={project.link}
                    className="inline-flex items-center gap-2 text-xs font-bold text-white tracking-widest uppercase group/btn hover:text-brand-red transition-colors duration-300"
                  >
                    <span>Explore Project</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
