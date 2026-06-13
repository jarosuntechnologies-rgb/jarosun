"use client";

import React from "react";
import { motion } from "framer-motion";

interface CircularTextProps {
  text: string;
  radius?: number;
  fontSize?: string;
  className?: string;
}

export default function CircularText({ text, radius = 50, fontSize = "12px", className = "" }: CircularTextProps) {
  const letters = text.split("");
  const deg = 360 / letters.length;

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: radius * 2, height: radius * 2 }}
    >
      {letters.map((letter, i) => (
        <span
          key={i}
          className="absolute"
          style={{
            fontSize,
            transform: `rotate(${i * deg}deg) translateY(-${radius}px)`,
            transformOrigin: "center center",
          }}
        >
          {letter}
        </span>
      ))}
    </motion.div>
  );
}
