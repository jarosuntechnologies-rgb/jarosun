"use client";

import React from "react";
import Link from "next/link";
import { Globe, MessageSquare, ExternalLink, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-8 h-8 bg-brand-red rounded-sm rotate-45 shadow-[0_0_15px_rgba(255,0,0,0.5)]" />
              <span className="text-2xl font-bold tracking-tighter text-white uppercase italic">
                Jarosun
              </span>
            </Link>
            <p className="text-white/50 max-w-sm mb-6 md:mb-0 leading-relaxed">
              We build premium digital experiences for the next generation of startups. High performance, cinematic design, and scalable architecture.
            </p>
          </div>
          <div className="flex gap-4">
            {[Globe, MessageSquare, ExternalLink, Mail].map((Icon, i) => {
              const hrefs = ["#", "sms:8374367856", "#", "mailto:jarosuntechnologies@gmail.com"];
              return (
                <a
                  key={i}
                  href={hrefs[i]}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-brand-red hover:border-brand-red transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Jarosun Studio. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/30">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
