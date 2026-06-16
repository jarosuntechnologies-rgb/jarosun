"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, AlertCircle, Loader2, Send, FileText } from "lucide-react";

const projectTypes = [
  "Business Website",
  "Startup Landing",
  "E-commerce Site",
  "Custom Dashboard",
  "Chatbot / Automation",
  "Other",
];

const budgetRanges = [
  "Less than $2,500",
  "$2,500 - $5,000",
  "$5,000 - $10,000",
  "$10,000+",
];

const timelines = [
  "Less than 1 Month",
  "1 to 2 Months",
  "2 to 3 Months",
  "3+ Months",
];

export default function StartProject() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    projectType: false,
    budget: false,
    timeline: false,
    description: false,
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleNameChange = (val: string) => {
    setName(val);
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: false }));
    }
    if (status === "error") setStatus("idle");
  };

  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: false }));
    }
    if (status === "error") setStatus("idle");
  };

  const handleProjectTypeSelect = (val: string) => {
    setProjectType(val);
    if (errors.projectType) {
      setErrors((prev) => ({ ...prev, projectType: false }));
    }
    if (status === "error") setStatus("idle");
  };

  const handleBudgetSelect = (val: string) => {
    setBudget(val);
    if (errors.budget) {
      setErrors((prev) => ({ ...prev, budget: false }));
    }
    if (status === "error") setStatus("idle");
  };

  const handleTimelineSelect = (val: string) => {
    setTimeline(val);
    if (errors.timeline) {
      setErrors((prev) => ({ ...prev, timeline: false }));
    }
    if (status === "error") setStatus("idle");
  };

  const handleDescriptionChange = (val: string) => {
    setDescription(val);
    if (errors.description) {
      setErrors((prev) => ({ ...prev, description: false }));
    }
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
      name: !name.trim(),
      email: !email.trim(),
      projectType: !projectType,
      budget: !budget,
      timeline: !timeline,
      description: !description.trim(),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      setErrorMessage("Please fill out all required fields highlighted below.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/start-project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          company,
          projectType,
          budget,
          timeline,
          description,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
      } else {
        setErrorMessage(data.error || "Submission failed. Please try again.");
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Network connection error. Check your connection and try again.");
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white py-16 px-6 relative overflow-hidden flex flex-col justify-between">
      {/* Background glow */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-brand-red/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-brand-red/5 blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto w-full relative z-10 flex-1 flex flex-col justify-center">
        {/* Header Navigation */}
        <div className="mb-10 flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors group text-sm"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-6 h-6 bg-brand-red rounded-sm rotate-45 shadow-[0_0_10px_rgba(255,0,0,0.5)]" />
            <span className="text-xl font-bold tracking-tighter uppercase italic">Jarosun</span>
          </Link>
        </div>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="glass border-white/[0.05] p-8 md:p-16 rounded-3xl text-center shadow-[0_0_50px_rgba(255,0,0,0.02)] min-h-[450px] flex flex-col items-center justify-center"
            >
              <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(34,197,94,0.15)]">
                <Check className="w-10 h-10 text-green-500" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Project Form Submitted!</h1>
              <p className="text-white/40 text-base leading-relaxed max-w-md mb-10">
                Thank you for submitting your project requirements. The details have been sent to our inbox and saved in Google Drive. Our team will review them and reach out within 24 hours.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/"
                  className="bg-brand-red text-white py-4 px-8 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-brand-red-dark transition-all"
                >
                  Return Home
                </Link>
                <button
                  onClick={() => {
                    setName("");
                    setEmail("");
                    setCompany("");
                    setProjectType("");
                    setBudget("");
                    setTimeline("");
                    setDescription("");
                    setErrors({
                      name: false,
                      email: false,
                      projectType: false,
                      budget: false,
                      timeline: false,
                      description: false,
                    });
                    setStatus("idle");
                  }}
                  className="border border-white/10 text-white/60 py-4 px-8 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-white/5 hover:text-white transition-all"
                >
                  Submit New Form
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form-container"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-10 text-center md:text-left">
                <div className="flex items-center gap-2 text-brand-red font-bold text-xs uppercase tracking-[0.2em] mb-3 justify-center md:justify-start">
                  <FileText className="w-4 h-4" />
                  Step into the Future
                </div>
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-none">
                  Tell us about your <span className="text-brand-red">project.</span>
                </h1>
                <p className="text-white/40 mt-3 text-sm md:text-base max-w-xl">
                  Fill out this requirements form and we will analyze your goals, stack preferences, and scope. The data is securely processed and logged.
                </p>
              </div>

              {status === "error" && (
                <div className="mb-8 flex items-start gap-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold">Error Processing Form</div>
                    <p className="text-red-400/80 mt-1">{errorMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-10">
                {/* 1. Basic Info */}
                <div className="space-y-6">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-white/30 font-bold border-b border-white/5 pb-2">1. Your Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest block">
                        Name *
                      </label>
                      <input 
                        required
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        disabled={status === "submitting"}
                        onChange={(e) => handleNameChange(e.target.value)}
                        className={`w-full bg-white/[0.02] border rounded-xl py-4 px-6 text-white text-sm focus:outline-none focus:border-brand-red/30 transition-colors disabled:opacity-50 placeholder:text-white/10 ${
                          errors.name ? "border-red-500/50 focus:border-red-500" : "border-white/[0.05]"
                        }`} 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest block">
                        Email *
                      </label>
                      <input 
                        required
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        disabled={status === "submitting"}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        className={`w-full bg-white/[0.02] border rounded-xl py-4 px-6 text-white text-sm focus:outline-none focus:border-brand-red/30 transition-colors disabled:opacity-50 placeholder:text-white/10 ${
                          errors.email ? "border-red-500/50 focus:border-red-500" : "border-white/[0.05]"
                        }`} 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest block">Company / Organization</label>
                    <input 
                      type="text"
                      placeholder="My Startup LLC (optional)"
                      value={company}
                      disabled={status === "submitting"}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl py-4 px-6 text-white text-sm focus:outline-none focus:border-brand-red/30 transition-colors disabled:opacity-50 placeholder:text-white/10" 
                    />
                  </div>
                </div>

                {/* 2. Project Specifications */}
                <div className="space-y-6">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-white/30 font-bold border-b border-white/5 pb-2">2. Specifications</h3>
                  
                  {/* Project Type Selection */}
                  <div className="space-y-3">
                    <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest block">
                      What are we building? * {errors.projectType && <span className="text-red-500 lowercase font-normal italic font-sans ml-2">(Selection required)</span>}
                    </label>
                    <div className={`flex flex-wrap gap-3 p-1 rounded-2xl transition-colors ${errors.projectType ? "border border-red-500/30 bg-red-500/[0.01]" : ""}`}>
                      {projectTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          disabled={status === "submitting"}
                          onClick={() => handleProjectTypeSelect(type)}
                          className={`py-3 px-5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            projectType === type 
                              ? "bg-brand-red text-white border border-brand-red" 
                              : `bg-white/[0.02] border text-white/60 hover:text-white hover:border-white/10 ${
                                  errors.projectType ? "border-red-500/20" : "border-white/[0.05]"
                                }`
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget & Timeline selection side-by-side */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    <div className="space-y-3">
                      <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest block">
                        Estimated Budget * {errors.budget && <span className="text-red-500 lowercase font-normal italic font-sans ml-2">(Selection required)</span>}
                      </label>
                      <div className={`grid grid-cols-2 gap-3 p-1 rounded-2xl transition-colors ${errors.budget ? "border border-red-500/30 bg-red-500/[0.01]" : ""}`}>
                        {budgetRanges.map((range) => (
                          <button
                            key={range}
                            type="button"
                            disabled={status === "submitting"}
                            onClick={() => handleBudgetSelect(range)}
                            className={`py-3 px-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer text-center ${
                              budget === range 
                                ? "bg-brand-red text-white border border-brand-red" 
                                : `bg-white/[0.02] border text-white/60 hover:text-white hover:border-white/10 ${
                                    errors.budget ? "border-red-500/20" : "border-white/[0.05]"
                                  }`
                            }`}
                          >
                            {range}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest block">
                        Desired Timeline * {errors.timeline && <span className="text-red-500 lowercase font-normal italic font-sans ml-2">(Selection required)</span>}
                      </label>
                      <div className={`grid grid-cols-2 gap-3 p-1 rounded-2xl transition-colors ${errors.timeline ? "border border-red-500/30 bg-red-500/[0.01]" : ""}`}>
                        {timelines.map((time) => (
                          <button
                            key={time}
                            type="button"
                            disabled={status === "submitting"}
                            onClick={() => handleTimelineSelect(time)}
                            className={`py-3 px-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer text-center ${
                              timeline === time 
                                ? "bg-brand-red text-white border border-brand-red" 
                                : `bg-white/[0.02] border text-white/60 hover:text-white hover:border-white/10 ${
                                    errors.timeline ? "border-red-500/20" : "border-white/[0.05]"
                                  }`
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Description */}
                <div className="space-y-6">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-white/30 font-bold border-b border-white/5 pb-2">3. Requirements</h3>
                  <div className="space-y-2">
                    <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest block">
                      Detailed Requirements *
                    </label>
                    <textarea 
                      required
                      rows={6}
                      placeholder="Please detail your feature requirements, design preferences, required integrations, and any other relevant goals..."
                      value={description}
                      disabled={status === "submitting"}
                      onChange={(e) => handleDescriptionChange(e.target.value)}
                      className={`w-full bg-white/[0.02] border rounded-xl py-4 px-6 text-white text-sm focus:outline-none focus:border-brand-red/30 transition-colors disabled:opacity-50 placeholder:text-white/10 resize-none leading-relaxed ${
                        errors.description ? "border-red-500/50 focus:border-red-500" : "border-white/[0.05]"
                      }`} 
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button 
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full bg-white text-black py-5 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-brand-red hover:text-white transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-6 shadow-[0_4px_20px_rgba(255,255,255,0.05)] hover:shadow-[0_4px_25px_rgba(192,0,0,0.2)]"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Requirements</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="max-w-3xl mx-auto w-full text-center text-[10px] text-white/20 tracking-wider uppercase pt-12 relative z-10 border-t border-white/[0.02] mt-16">
        &copy; {new Date().getFullYear()} Jarosun Studio. End-to-End Precision Engineering.
      </div>
    </main>
  );
}
