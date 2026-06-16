"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const TypingIndicator = () => (
  <div className="flex items-center gap-1 bg-white/[0.05] px-4 py-3 rounded-2xl w-fit">
    <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
    <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
    <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
  </div>
);

export default function ChatbotWidget() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of conversation
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = { role: "user", text: input };
    const updatedMessages = [...messages, userMessage];
    
    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages(prev => [...prev, { role: "bot", text: data.reply }]);
      } else {
        setMessages(prev => [
          ...prev,
          { role: "bot", text: "Sorry, I'm having trouble responding right now. Please try again." }
        ]);
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [
        ...prev,
        { role: "bot", text: "Network connection issue. Please check your internet connection." }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section className="py-32 px-6 bg-[#080808]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24">
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Intelligent <span className="text-brand-red">Automation.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-white/40 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
              Intelligent support solutions and lead capture bots integrated 
              seamlessly into your workflow.
            </p>
          </Reveal>
        </div>

        <div className="flex-1 w-full max-w-sm">
          <div className="aspect-[3/4] rounded-3xl bg-white/[0.02] border border-white/[0.05] p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-8 border-b border-white/[0.05] pb-6">
              <div className="w-10 h-10 rounded-full bg-brand-red flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-bold text-white uppercase tracking-widest">Jarobot</div>
                <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Ready</div>
              </div>
            </div>

            <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-4 mb-6 scrollbar-hide pr-1">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`text-xs px-4 py-3 rounded-2xl max-w-[80%] ${
                    m.role === "user" ? "bg-white text-black" : "bg-white/[0.05] text-white/60"
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <TypingIndicator />
                </div>
              )}
            </div>

            <div className="relative">
              <input 
                type="text" 
                value={input}
                disabled={isTyping}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl py-3 px-5 text-white text-xs focus:outline-none focus:border-white/20 transition-colors disabled:opacity-50"
                placeholder={isTyping ? "Jarobot is thinking..." : "Type a message..."}
              />
              <button 
                onClick={handleSend}
                disabled={isTyping || !input.trim()}
                className="absolute right-3 top-2.5 text-white/40 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
