"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const DataComparison = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Sample comparison data
  const comparisonData = [
    { metric: 'Revenue Growth (5yr)', unicornvision: 18.4, traditional: 5.2 },
    { metric: 'Time to Insight', unicornvision: 2, traditional: 8 },
    { metric: 'Success Rate (%)', unicornvision: 92, traditional: 67 },
    { metric: 'Cost Savings (%)', unicornvision: 35, traditional: 0 },
    { metric: 'Analyst Productivity', unicornvision: 'High', traditional: 'Low' },
  ];

  return (
    <section ref={ref} className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[#0a0a0a] bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:32px_32px] opacity-20"></div>
      
      {/* Animated gradients */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-red-500/5 blur-[120px]"
      ></motion.div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 3, delay: 1.5, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-orange-500/5 blur-[120px]"
      ></motion.div>
      
      {/* Background grid lines */}
      <div className="absolute inset-0">
        <div className="h-full w-full border-t border-white/5"></div>
        <div className="h-full w-full border-b border-white/5"></div>
        <div className="grid grid-cols-4 h-full">
          <div className="border-l border-white/5 h-full"></div>
          <div className="border-l border-white/5 h-full"></div>
          <div className="border-l border-white/5 h-full"></div>
          <div className="border-l border-white/5 h-full"></div>
          <div className="border-l border-white/5 h-full"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs py-1 px-3 rounded-full border border-orange-500/20 uppercase tracking-widest font-semibold text-white bg-orange-500/10 mb-4"
          >
            Unmatched Results
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-300"
          >
            See how we compare
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-300"
          >
            UnicornVision delivers superior results compared to traditional research methods. Our AI-powered platform dramatically reduces time to insight while improving accuracy.
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 md:p-8 overflow-hidden shadow-xl shadow-red-500/5"
        >
          {/* Inner gradient glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-orange-500/5"></div>
          
          <div className="mb-10 flex justify-between items-center">
            <div className="flex items-center space-x-10">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full mr-2"></div>
                <span className="text-white font-medium">UnicornVision</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-600 rounded-full mr-2"></div>
                <span className="text-gray-400 font-medium">Traditional Methods</span>
              </div>
            </div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="text-xs text-white font-medium py-1.5 px-3 bg-white/5 rounded-md cursor-pointer hover:bg-white/10 transition-colors flex items-center"
            >
              <span>View Full Analysis</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>
          </div>
          
          <div className="space-y-8">
            {comparisonData.map((item, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                className="relative"
              >
                <div className="flex justify-between mb-1.5">
                  <span className="text-gray-300 font-medium">{item.metric}</span>
                  <div className="flex space-x-6">
                    <span className="text-white font-semibold min-w-[60px] text-right">
                      {typeof item.unicornvision === 'number' 
                        ? (item.metric.includes('%') ? `${item.unicornvision}%` : item.unicornvision) 
                        : item.unicornvision}
                    </span>
                    <span className="text-gray-400 font-medium min-w-[60px] text-right">
                      {typeof item.traditional === 'number' 
                        ? (item.metric.includes('%') ? `${item.traditional}%` : item.traditional) 
                        : item.traditional}
                    </span>
                  </div>
                </div>
                
                <div className="relative h-6 bg-white/5 rounded-md overflow-hidden">
                  {typeof item.unicornvision === 'number' && typeof item.traditional === 'number' && (
                    <>
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${Math.min(100, (item.traditional / Math.max(item.unicornvision, item.traditional)) * 100)}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: 0.6 + (index * 0.1) }}
                        className="absolute inset-y-0 left-0 bg-gray-600 rounded-md z-0"
                      ></motion.div>
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${Math.min(100, (item.unicornvision / Math.max(item.unicornvision, item.traditional)) * 100)}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: 0.8 + (index * 0.1) }}
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-md z-10"
                      >
                        <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity"></div>
                      </motion.div>
                    </>
                  )}
                  
                  {(typeof item.unicornvision !== 'number' || typeof item.traditional !== 'number') && (
                    <div className="flex h-full">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={isInView ? { width: '70%' } : { width: 0 }}
                        transition={{ duration: 1, delay: 0.8 + (index * 0.1) }}
                        className="bg-gradient-to-r from-red-500 to-orange-500 rounded-l-md h-full relative"
                      >
                        <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity"></div>
                      </motion.div>
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={isInView ? { width: '30%' } : { width: 0 }}
                        transition={{ duration: 1, delay: 0.6 + (index * 0.1) }}
                        className="bg-gray-600 rounded-r-md h-full"
                      ></motion.div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-12 -right-12 w-32 h-32 border border-white/5 rounded-full"></div>
          <div className="absolute -bottom-5 -left-5 w-20 h-20 border border-white/5 rounded-full"></div>
        </motion.div>
        
        <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(239, 68, 68, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden text-white bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 px-8 py-4 rounded-md font-medium group"
            >
              <span className="relative z-10 flex items-center">
                Try UnicornVision Today
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
              <div className="absolute inset-0 w-full h-full bg-white/10 blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.button>
            
            <p className="text-gray-400 text-sm mt-4">14-day free trial. No credit card required.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DataComparison; 