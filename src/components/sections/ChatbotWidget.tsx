"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X } from "lucide-react";

const TypingIndicator = () => (
  <div className="flex items-center gap-1 bg-white/[0.04] px-4 py-3 rounded-2xl w-fit border border-white/[0.02]">
    <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
    <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
    <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
  </div>
);

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! I'm Jarobot. How can I help you with your project today?" }
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
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

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
    <>
      {/* Floating Action Container */}
      <div className="fixed bottom-8 right-8 z-50 flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center cursor-pointer group focus:outline-none"
          aria-label="Toggle Chatbot"
        >
          {/* Greeting Speech Bubble / Tooltip */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ delay: 1, duration: 0.3 }}
                className="mr-4 glass border-brand-red/30 px-4 py-2.5 rounded-2xl shadow-[0_4px_25px_rgba(192,0,0,0.2)] text-white select-none hidden md:block hover:bg-white/[0.04] transition-colors"
              >
                <div className="text-[10px] font-bold uppercase tracking-wider text-brand-red mb-0.5 text-left">Jarobot Online</div>
                <div className="text-[11px] text-white/80 font-medium text-left">Need help? Ask me anything! 👋</div>
                
                {/* Speech bubble pointer arrow */}
                <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rotate-45 bg-[#0a0a0a] border-r border-t border-white/[0.05]" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Action Button (FAB) - Styled as part of the group */}
          <div className="relative w-14 h-14 sm:w-16 h-16 rounded-full overflow-hidden border border-brand-red/40 bg-black shadow-[0_0_25px_rgba(192,0,0,0.4)] group-hover:shadow-[0_0_35px_rgba(192,0,0,0.7)] group-hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center">
            {/* Pulsing ring for visibility */}
            <div className="absolute -inset-1.5 rounded-full border border-brand-red/30 animate-pulse pointer-events-none" />
            <div className="absolute -inset-3 rounded-full border border-brand-red/10 animate-ping [animation-duration:3s] pointer-events-none" />
            
            <img 
              src="/chatbot-icon.jpg" 
              alt="Jarobot Icon" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
            
            {/* Toggle icon overlay when open */}
            {isOpen && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[2px]">
                <X className="w-6 h-6 text-white" />
              </div>
            )}
          </div>
        </button>
      </div>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-28 right-8 z-50 w-[360px] max-w-[calc(100vw-48px)] h-[520px] max-h-[calc(100vh-140px)] bg-black/90 border border-white/[0.08] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/[0.05] bg-white/[0.01]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-white/10 relative">
                  <img src="/chatbot-icon.jpg" alt="Jarobot" className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#090909]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white uppercase tracking-wider">Jarobot</div>
                  <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest">AI Assistant</div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/[0.05] text-white/40 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message Area */}
            <div 
              ref={chatContainerRef} 
              className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pr-2"
            >
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`text-xs px-4 py-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.role === "user" 
                      ? "bg-brand-red text-white rounded-tr-none font-medium" 
                      : "bg-white/[0.04] text-white/80 border border-white/[0.02] rounded-tl-none"
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

            {/* Input Area */}
            <div className="p-4 border-t border-white/[0.05] bg-white/[0.01]">
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  value={input}
                  disabled={isTyping}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl py-3.5 pl-4 pr-12 text-white text-xs focus:outline-none focus:border-brand-red/30 transition-colors disabled:opacity-50 placeholder:text-white/20"
                  placeholder={isTyping ? "Thinking..." : "Message Jarobot..."}
                />
                <button 
                  onClick={handleSend}
                  disabled={isTyping || !input.trim()}
                  className="absolute right-3 p-1.5 rounded-lg text-white/40 hover:text-brand-red disabled:text-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
