"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import Button from './ui/Button';
import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const [stars, setStars] = useState<{ width: number; height: number; left: string; top: string }[]>([]);
  
  // Generate stars on client-side only to prevent hydration mismatch
  useEffect(() => {
    const generateStars = () => {
      const newStars = Array.from({ length: 40 }).map(() => ({
        width: 1 + Math.random() * 2,
        height: 1 + Math.random() * 2,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }));
      setStars(newStars);
    };
    
    generateStars();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#010b28]">
      {/* Subtle blue radial gradients - reduced opacity for better text visibility */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-[10%] right-[20%] w-[35vw] h-[35vh] bg-blue-500 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[20%] left-[15%] w-[30vw] h-[30vh] bg-blue-700 rounded-full blur-[140px]"></div>
        <div className="absolute top-[45%] left-[40%] w-[2vw] h-[2vh] bg-blue-300 rounded-full blur-[15px]"></div>
        <div className="absolute top-[25%] right-[35%] w-[3vw] h-[3vh] bg-blue-400 rounded-full blur-[20px]"></div>
        <div className="absolute bottom-[35%] right-[25%] w-[1.5vw] h-[1.5vh] bg-blue-200 rounded-full blur-[8px]"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mt-16 md:mt-20">
        {/* Blue highlight label */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10 md:mb-16"
        >
          <span className="inline-block py-2 px-8 rounded-full bg-blue-500/10 text-blue-400 font-medium text-sm tracking-wide border border-blue-500/30">
            AI-POWERED INVESTMENT RESEARCH
          </span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative text-center"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight drop-shadow-md">
            From idea to
          </h1>
          <div className="relative mt-[-0.5rem] md:mt-[-1rem]">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight drop-shadow-md relative">
              <span className="text-blue-500">investment</span>
              <span className="text-white">,</span>
              <span className="text-blue-500 ml-2 md:ml-4">fast</span>
              <span className="text-white">.</span>
              
              {/* Blue underline for both "investment" and "fast" */}
              <div className="absolute h-1 bg-blue-500 rounded-full left-0 right-[25%] -bottom-1 sm:-bottom-1.5 md:-bottom-2"></div>
            </h1>
          </div>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-lg md:text-xl text-white/80 mt-12 mb-12 md:mb-16 max-w-3xl mx-auto drop-shadow-md"
        >
          UnicornVision is the complete fundamental research terminal for investors, powered by AI. Trusted by the world's leading public market investors.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex flex-col sm:flex-row sm:gap-6 justify-center"
        >
          <Link 
            href="/dashboard" 
            className="mb-4 sm:mb-0 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-lg flex items-center justify-center group transition-all shadow-xl shadow-blue-900/20"
          >
            Get Started Free
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link 
            href="/about" 
            className="px-8 py-4 bg-[#172554]/60 backdrop-blur-sm hover:bg-[#172554]/80 text-white rounded-lg font-medium text-lg transition-all shadow-lg"
          >
            View Plans
          </Link>
        </motion.div>
      </div>
      
      {/* Chart card on the right - moved and resized for better positioning */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute top-[20%] right-[10%] w-36 h-36 bg-[#0f1c3f]/70 rounded-xl overflow-hidden backdrop-blur-md hidden lg:block border border-blue-500/20 shadow-xl rotate-6"
      >
        <div className="p-4 h-full flex items-center justify-center">
          <svg viewBox="0 0 36 36" className="w-20 h-20">
            <path
              fill="none"
              stroke="#ef4444"
              strokeWidth="3"
              strokeLinecap="round"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              strokeDasharray="60, 100"
            />
            <path
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
              strokeLinecap="round"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              strokeDasharray="40, 100"
              transform="rotate(180, 18, 18)"
            />
          </svg>
        </div>
      </motion.div>
      
      {/* Additional decorative floating card */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-[25%] left-[12%] w-32 h-32 bg-[#0f1c3f]/70 rounded-xl overflow-hidden backdrop-blur-md hidden lg:block border border-blue-500/20 shadow-xl -rotate-6"
      >
        <div className="p-4 h-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
      </motion.div>
      
      {/* Stars/dots background */}
      <div className="absolute inset-0 z-0">
        {stars.map((star, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0] }}
            transition={{
              repeat: Infinity,
              duration: 3 + Math.random() * 7,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
            className="absolute bg-white rounded-full"
            style={{
              width: star.width,
              height: star.height,
              left: star.left,
              top: star.top,
              opacity: 0
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Animated counter component
const CounterStat = ({ number, suffix = "", label }: { number: number, suffix?: string, label: string }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(counterRef, { once: true });
  
  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const end = number;
    const duration = 2000;
    const startTime = Date.now();
    
    const timer = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const currentCount = Math.floor(progress * (end - start) + start);
      
      if (progress === 1) {
        clearInterval(timer);
      }
      
      setCount(currentCount);
    }, 20);
    
    return () => clearInterval(timer);
  }, [isInView, number]);
  
  return (
    <motion.div
      ref={counterRef}
      className="flex flex-col items-center px-5 py-3 rounded-xl glassmorphism-light"
      whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.2)" }}
      transition={{ duration: 0.3 }}
    >
      <motion.span 
        className="text-3xl md:text-4xl font-bold text-gradient-primary flex items-center"
      >
        {count}{suffix}
      </motion.span>
      <span className="text-sm text-gray-300 mt-1">{label}</span>
    </motion.div>
  );
};

export default Hero; 