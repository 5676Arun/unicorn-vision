"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Dashboard = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section ref={ref} className="py-20 md:py-28 overflow-hidden bg-[#0a0a0a] relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[#0a0a0a] bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:32px_32px] opacity-20"></div>
      
      {/* Animated background accents */}
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-blue-600/5 blur-[100px]"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-purple-600/5 blur-[100px]"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
          <motion.div 
            className="w-full md:w-1/2 max-w-2xl"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-block mb-5">
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="inline-block text-xs py-1 px-3 rounded-full border border-blue-500/20 uppercase tracking-widest font-semibold text-white bg-blue-500/10"
              >
                FEATURES
              </motion.span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-300">
              Visualize your research flow
            </h2>
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
              Speed to insights in your research process. Quickly understand company financials, screen for new investments, summarize content, visualize data, compare ideas and organize dashboards.
            </p>
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden text-white bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 px-8 py-4 rounded-md font-medium group"
            >
              <span className="relative z-10 flex items-center">
                Get Started
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
              <div className="absolute inset-0 w-full h-full bg-white/10 blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              {/* Dashboard visualization */}
              <motion.div 
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative bg-[#111] rounded-xl border border-white/10 shadow-2xl shadow-blue-500/10 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent"></div>
                
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-400 rounded flex items-center justify-center text-xs text-white font-bold">M</div>
                    <div>
                      <div className="text-sm text-white font-medium">Financial Data for Meta Platforms, Inc.</div>
                      <div className="text-xs text-gray-300">NasdaqGS: META</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex gap-4 border-b border-white/10 pb-4">
                    <button className="text-white text-xs px-3 py-1 rounded-full bg-blue-500/30 hover:bg-blue-500/40 transition-colors">Overview</button>
                    <button className="text-white/80 text-xs px-3 py-1 rounded-full hover:bg-white/10 transition-colors">Financials</button>
                    <button className="text-white/80 text-xs px-3 py-1 rounded-full hover:bg-white/10 transition-colors">Investor relations</button>
                    <button className="text-white/80 text-xs px-3 py-1 rounded-full hover:bg-white/10 transition-colors">Estimates</button>
                  </div>
                </div>
                
                <div className="p-6">
                  {/* Chart */}
                  <div className="h-64 bg-[#0c0c0c] rounded-lg mb-6 overflow-hidden relative group">
                    <div className="absolute top-4 left-4 flex flex-col gap-1 z-10">
                      <div className="text-xs text-gray-300">MAX: $39.48</div>
                      <div className="text-xs text-gray-300">AVG: $18.43</div>
                      <div className="text-xs text-gray-300">MIN: $5.07</div>
                    </div>
                    
                    {/* Grid lines */}
                    <div className="absolute inset-0 flex flex-col justify-between">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-px w-full bg-white/5"></div>
                      ))}
                    </div>
                    
                    {/* SVG Chart - We'll create an animated version */}
                    <svg
                      viewBox="0 0 500 200"
                      className="w-full h-full relative z-10"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      
                      {/* Background gradient area */}
                      <motion.path
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        d="M0,100 C50,80 100,140 150,110 C200,80 250,70 300,90 C350,110 400,160 450,90 C480,60 500,70 500,70 L500,200 L0,200 Z"
                        fill="url(#chartGradient)"
                      />
                      
                      {/* Animated line */}
                      <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                        transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                        d="M0,100 C50,80 100,140 150,110 C200,80 250,70 300,90 C350,110 400,160 450,90 C480,60 500,70 500,70"
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      
                      {/* Animated dot */}
                      <motion.circle 
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                        transition={{ duration: 0.5, delay: 2 }}
                        cx="500" 
                        cy="70" 
                        r="4" 
                        fill="#3B82F6" 
                        className="pulse-animation"
                      />
                    </svg>
                    
                    {/* Hover marker */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute h-full w-px bg-blue-500/20 left-1/2 top-0"></div>
                      <div className="absolute w-3 h-3 rounded-full bg-blue-500 border-2 border-white left-1/2 transform -translate-x-1/2" style={{ top: '35%' }}></div>
                    </div>
                    
                    <div className="absolute right-4 bottom-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-xs px-3 py-1.5 rounded">
                      $21.62
                    </div>
                  </div>
                  
                  {/* Metrics table */}
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <motion.div 
                      whileHover={{ y: -2, backgroundColor: '#131313' }}
                      className="bg-[#0d0d0d] p-3 rounded transition-colors"
                    >
                      <div className="text-gray-300 mb-1">Revenue 3Y CAGR</div>
                      <div className="text-white font-bold">22.3%</div>
                    </motion.div>
                    <motion.div 
                      whileHover={{ y: -2, backgroundColor: '#131313' }}
                      className="bg-[#0d0d0d] p-3 rounded transition-colors"
                    >
                      <div className="text-gray-300 mb-1">EV/EBITDA</div>
                      <div className="text-white font-bold">16.7x</div>
                    </motion.div>
                    <motion.div 
                      whileHover={{ y: -2, backgroundColor: '#131313' }}
                      className="bg-[#0d0d0d] p-3 rounded transition-colors"
                    >
                      <div className="text-gray-300 mb-1">Gross Margin</div>
                      <div className="text-white font-bold">80.9%</div>
                    </motion.div>
                    <motion.div 
                      whileHover={{ y: -2, backgroundColor: '#131313' }}
                      className="bg-[#0d0d0d] p-3 rounded transition-colors"
                    >
                      <div className="text-gray-300 mb-1">FCF Yield</div>
                      <div className="text-white font-bold">3.2%</div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              
              {/* Decorative glow */}
              <div className="absolute -inset-10 bg-gradient-to-r from-blue-500/5 via-blue-500/10 to-blue-500/5 rounded-full blur-3xl opacity-30 -z-10 animate-pulse"></div>
              
              {/* Decorative floating elements */}
              <motion.div 
                animate={{ 
                  y: ['-5px', '5px', '-5px'],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-5 right-10 w-20 h-20 bg-blue-500/5 rounded-full blur-xl"
              ></motion.div>
              
              <motion.div 
                animate={{ 
                  y: ['5px', '-5px', '5px'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-5 left-10 w-16 h-16 bg-purple-500/5 rounded-full blur-xl"
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Add CSS for the pulse animation */}
      <style jsx>{`
        .pulse-animation {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
          }
          
          70% {
            transform: scale(1.5);
            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
          }
          
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
          }
        }
      `}</style>
    </section>
  );
};

export default Dashboard; 