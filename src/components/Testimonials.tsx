"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating?: number;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "UnicornVision transformed our investment strategy. We've seen a 38% increase in successful investments and significantly decreased the time spent on initial startup assessment.",
    author: "Sarah Johnson",
    role: "Investment Director",
    company: "Nexus Ventures",
    rating: 5,
    avatar: "SJ"
  },
  {
    quote: "The risk identification feature is incredibly accurate. It flagged several potential issues in a startup that we would have otherwise missed, saving us from a poor investment decision.",
    author: "Michael Chen",
    role: "Angel Investor",
    company: "TechAngels Network",
    rating: 5,
    avatar: "MC"
  },
  {
    quote: "As a VC firm, we rely on data-driven decisions. UnicornVision provides us with comprehensive analysis that would typically require multiple analysts and days of research.",
    author: "Emily Rodriguez",
    role: "Managing Partner",
    company: "Horizon Capital",
    rating: 4,
    avatar: "ER"
  },
  {
    quote: "The competitor analysis feature gives us invaluable market insights. Understanding relative positioning has been crucial for our investment strategy.",
    author: "James Wilson",
    role: "Portfolio Manager",
    company: "InnoFund Partners",
    rating: 5,
    avatar: "JW"
  }
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1 mt-2">
      {[...Array(5)].map((_, i) => (
        <svg 
          key={i} 
          className={`h-4 w-4 ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`} 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="py-24 relative overflow-hidden bg-[#0a0a0a]" id="testimonials">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          ref={containerRef}
        >
          <motion.span 
            className="inline-block text-xs py-1 px-3 rounded-full border border-white/20 uppercase tracking-widest font-semibold mb-4 bg-white/5 text-white"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Testimonials
          </motion.span>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Trusted by Leading Investors
          </h2>
          <p className="text-lg text-gray-200">
            See what investment professionals are saying about our AI-powered platform.
          </p>
        </motion.div>
        
        <div className="relative h-[450px] md:h-[350px]">
          <AnimatePresence mode="wait">
            {testimonials.map((testimonial, index) => (
              index === activeIndex && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <div className="relative bg-[#111]/80 backdrop-blur-xl rounded-2xl p-8 md:p-10 shadow-xl border border-white/10 h-full flex flex-col justify-between overflow-hidden group">
                    {/* Background effects */}
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative">
                      <div className="flex mb-4">
                        {[...Array(3)].map((_, i) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * i, duration: 0.3 }}
                            className="h-2 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-1"
                          />
                        ))}
                      </div>
                      
                      <motion.p 
                        className="text-lg md:text-xl text-gray-100 leading-relaxed mb-6 relative"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        <span className="text-5xl text-blue-500/20 font-serif absolute -top-6 -left-2">"</span>
                        {testimonial.quote}
                        <span className="text-5xl text-blue-500/20 font-serif absolute -bottom-10 right-0">"</span>
                      </motion.p>
                    </div>
                    
                    <motion.div 
                      className="flex items-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      <div className="mr-4 h-12 w-12 rounded-full bg-gradient-to-br from-blue-500/50 to-purple-500/50 flex items-center justify-center text-white font-medium">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-white">{testimonial.author}</p>
                        <p className="text-sm text-gray-300">{testimonial.role}, {testimonial.company}</p>
                        {testimonial.rating && <StarRating rating={testimonial.rating} />}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
        
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative h-3 w-12 rounded-full transition-all duration-300 overflow-hidden ${
                index === activeIndex ? 'bg-blue-500/20' : 'bg-gray-700/40'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            >
              {index === activeIndex && (
                <motion.div 
                  className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 5, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Background decorations */}
      <div className="absolute -z-10 top-1/4 left-0 transform -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px]" />
      <div className="absolute -z-10 bottom-1/4 right-0 transform translate-x-1/3 w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-[150px]" />
      
      {/* Animated accent */}
      <div className="absolute top-[20%] right-[10%] w-1 h-20 bg-gradient-to-b from-blue-500/60 to-transparent rounded-full blur-sm"></div>
      <div className="absolute bottom-[30%] left-[15%] w-1 h-16 bg-gradient-to-b from-purple-500/60 to-transparent rounded-full blur-sm"></div>
    </section>
  );
};

export default Testimonials; 