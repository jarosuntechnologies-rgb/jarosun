import { Zap, Shield, Rocket, Clock, Globe, CheckCircle2 } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const features = [
  { icon: Zap, title: "Performance" },
  { icon: Shield, title: "Security" },
  { icon: Rocket, title: "Scalability" },
  { icon: Clock, title: "Speed" },
  { icon: Globe, title: "SEO" },
  { icon: CheckCircle2, title: "Quality" },
];

export default function WhyJarosun() {
  return (
    <section className="py-32 px-6 bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-10 leading-tight">
                Precision Engineering.
              </h2>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-white/40 text-lg leading-relaxed mb-12">
                We focus on the essentials: speed, reliability, and security. 
                Our minimalist approach ensures your product is clean, 
                maintainable, and ready for growth.
              </p>
            </Reveal>
            <div className="grid grid-cols-2 gap-10">
              <Reveal delay={0.4}>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">1</div>
                  <div className="text-[10px] text-brand-red uppercase font-bold tracking-[0.2em]">Deployment Website</div>
                </div>
              </Reveal>
              <Reveal delay={0.5}>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">99%</div>
                  <div className="text-[10px] text-brand-red uppercase font-bold tracking-[0.2em]">Uptime</div>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {features.map((f, i) => (
              <Reveal key={i} delay={0.2 + (i * 0.1)}>
                <div className="flex items-start gap-4">
                  <f.icon className="w-5 h-5 text-brand-red mt-1 shrink-0 opacity-50" />
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1">{f.title}</h4>
                    <p className="text-xs text-white/30 leading-relaxed">High-standards delivery.</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
