"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Check, AlertCircle, Loader2, MessageSquare } from "lucide-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setErrorMessage(data.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Could not connect to the server. Please check your internet connection.");
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-32 px-6 bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="space-y-8 flex flex-col justify-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight">
                Let's build <br />
                <span className="text-brand-red">together.</span>
              </h2>
              <p className="text-white/40 text-lg leading-relaxed max-w-sm mt-6">
                Ready to start your next project? Get in touch and let's discuss 
                how we can help you scale.
              </p>
            </div>
            <div className="flex flex-col gap-4 mt-6">
              <a 
                href="mailto:jarosuntechnologies@gmail.com" 
                className="flex items-center gap-4 text-white hover:text-brand-red transition-colors cursor-pointer group w-fit"
              >
                <Mail className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" />
                <span className="font-bold text-sm tracking-widest uppercase">jarosuntechnologies@gmail.com</span>
              </a>
              <a 
                href="sms:8374367856" 
                className="flex items-center gap-4 text-white hover:text-brand-red transition-colors cursor-pointer group w-fit"
              >
                <MessageSquare className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" />
                <span className="font-bold text-sm tracking-widest uppercase">Message: 8374367856</span>
              </a>
            </div>
          </div>

          <div className="relative min-h-[400px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center text-center p-8 md:p-12 rounded-3xl bg-white/[0.01] border border-white/[0.05] shadow-[0_0_50px_rgba(255,255,255,0.01)] min-h-[400px] w-full"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(34,197,94,0.15)]">
                    <Check className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Message Sent!</h3>
                  <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-8">
                    Thank you for reaching out. We have received your inquiry and our team will get back to you shortly.
                  </p>
                  <button 
                    onClick={() => setStatus("idle")}
                    className="bg-white text-black hover:bg-brand-red hover:text-white py-4 px-8 rounded-xl font-bold uppercase tracking-widest text-xs transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  onSubmit={handleSubmit} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8 w-full"
                >
                  {status === "error" && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                    >
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold">Error Sending Message</div>
                        <p className="text-red-400/80 mt-1">{errorMessage}</p>
                      </div>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Name</div>
                      <input 
                        required
                        type="text"
                        disabled={status === "sending"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl py-4 px-6 text-white text-sm focus:outline-none focus:border-white/20 transition-colors disabled:opacity-50" 
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Email</div>
                      <input 
                        required
                        type="email"
                        disabled={status === "sending"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl py-4 px-6 text-white text-sm focus:outline-none focus:border-white/20 transition-colors disabled:opacity-50" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Message</div>
                    <textarea 
                      required
                      rows={4} 
                      disabled={status === "sending"}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl py-4 px-6 text-white text-sm focus:outline-none focus:border-white/20 transition-colors disabled:opacity-50" 
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full bg-white text-black py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-brand-red hover:text-white transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <span>Send Message</span>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
