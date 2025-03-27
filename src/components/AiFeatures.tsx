"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const AiFeatures = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section ref={ref} className="py-20 md:py-28 overflow-hidden bg-[#0a0a0a] relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[#0a0a0a] bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:32px_32px] opacity-20"></div>
      
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/5 via-orange-900/5 to-[#0a0a0a] z-0"></div>
      
      {/* Animated background accents */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-red-600/5 blur-[100px]"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-orange-600/5 blur-[100px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              {/* AI Visualization */}
              <motion.div 
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative bg-[#111] rounded-xl border border-white/10 shadow-2xl shadow-red-500/10 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent"></div>
                
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-orange-500 rounded flex items-center justify-center text-xs text-white font-bold relative">
                      <span className="relative z-10">AI</span>
                      <div className="absolute inset-0 bg-white/20 rounded animate-pulse"></div>
                    </div>
                    <div className="text-sm text-white font-medium">AI Copilot</div>
                  </div>
                </div>
                
                <div className="p-6">
                  {/* AI Chat interface */}
                  <div className="bg-[#0d0d0d] rounded-lg p-4 mb-6">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, delay: 0.6 }}
                      className="rounded-lg p-3 bg-[#181818] mb-4 border border-white/5"
                    >
                      <p className="text-white text-sm flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Summarize the impact of Tesla's energy business
                      </p>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="flex items-start gap-3 mb-4"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-xs text-white font-bold shrink-0 mt-1 shadow-lg shadow-red-500/20">T</div>
                      <div>
                        <div className="text-sm text-white font-medium mb-2 flex items-center">
                          Tesla, Inc. (TSLA)
                          <span className="ml-2 px-1.5 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-md">Analyzing</span>
                        </div>
                        
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                          transition={{ duration: 0.5, delay: 1 }}
                        >
                          <table className="w-full text-xs border-collapse">
                            <thead>
                              <tr className="text-gray-300 border-b border-white/10">
                                <th className="text-left py-2">Metric</th>
                                <th className="py-2">Dec '19</th>
                                <th className="py-2">Dec '20</th>
                                <th className="py-2">Dec '21</th>
                                <th className="py-2">Dec '22</th>
                                <th className="py-2">Dec '23</th>
                                <th className="py-2">Dec '24</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="text-white">
                                <td className="py-2 text-left text-gray-300">Energy Generation and Storage Revenue ($M)</td>
                                <td className="py-2">1,531</td>
                                <td className="py-2">1,994</td>
                                <td className="py-2">2,789</td>
                                <td className="py-2">3,909</td>
                                <td className="py-2">6,035</td>
                                <td className="py-2">10,086</td>
                              </tr>
                            </tbody>
                          </table>
                        </motion.div>
                        
                        {/* Chart */}
                        <motion.div 
                          initial={{ opacity: 0, scaleY: 0 }}
                          animate={isInView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
                          transition={{ duration: 0.7, delay: 1.2 }}
                          style={{ transformOrigin: "bottom" }}
                          className="h-40 mt-4 mb-3 relative"
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-red-500/5 to-transparent rounded"></div>
                          <div className="flex justify-between items-end h-full">
                            {[
                              { year: '19', height: '15%', value: '1,531' },
                              { year: '20', height: '20%', value: '1,994' },
                              { year: '21', height: '28%', value: '2,789' },
                              { year: '22', height: '38%', value: '3,909' },
                              { year: '23', height: '60%', value: '6,035' },
                              { year: '24', height: '100%', value: '10,086' }
                            ].map((item, index) => (
                              <motion.div 
                                key={index}
                                className="flex flex-col items-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.3, delay: 1.2 + (index * 0.1) }}
                              >
                                <div className="relative">
                                  <div className={`w-12 bg-gradient-to-t from-red-600 to-red-400 h-[${item.height}] rounded-t-sm relative group`}>
                                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    {index === 5 && (
                                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-600 to-orange-500 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap font-bold shadow-lg">
                                        {item.value}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="text-[10px] text-gray-300 mt-1">Dec '{item.year}</div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                        
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                          transition={{ duration: 0.5, delay: 1.8 }}
                          className="bg-[#181818] p-3 rounded-lg border border-white/5 text-sm text-gray-200"
                        >
                          <p>Tesla's energy business has grown exponentially with a <span className="text-red-400 font-medium">45.8% CAGR</span> from 2019 to 2024, becoming an increasingly important revenue driver.</p>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              
              {/* Decorative glow */}
              <div className="absolute -inset-10 bg-gradient-to-r from-red-500/5 via-red-500/10 to-orange-500/5 rounded-full blur-3xl opacity-30 -z-10 animate-pulse"></div>
              
              {/* Decorative elements */}
              <motion.div
                animate={{ 
                  rotate: [0, 10, 0, -10, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -right-10 -top-10 w-24 h-24 rounded-full border border-red-500/10 z-0"
              ></motion.div>
              
              <motion.div
                animate={{ 
                  rotate: [0, -10, 0, 10, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -left-5 -bottom-5 w-16 h-16 rounded-full border border-orange-500/10 z-0"
              ></motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2 max-w-2xl"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-block mb-5">
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="inline-block text-xs py-1 px-3 rounded-full border border-red-500/20 uppercase tracking-widest font-semibold text-white bg-red-500/10"
              >
                AI POWERED
              </motion.span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-300">
              Leverage AI to your benefit
            </h2>
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
              AI tools and automations to save you time in the research process. Let's leave the paperwork for the robots and the thinking for the humans. By combining a traditional user interface with AI tools, UnicornVision is the all-in-one research platform you will love.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                { icon: '🤖', title: 'AI-Powered Analysis', text: 'Get instant insights on financial data without manual work' },
                { icon: '⚡', title: 'Lightning Fast', text: 'Receive answers in seconds, not hours or days' },
                { icon: '📊', title: 'Visual Reports', text: 'Data automatically transformed into easy-to-understand visuals' }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <div className="text-2xl">{feature.icon}</div>
                  <div>
                    <h3 className="font-medium text-white">{feature.title}</h3>
                    <p className="text-gray-300 text-sm">{feature.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(239, 68, 68, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden text-white bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 px-8 py-4 rounded-md font-medium group"
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
        </div>
      </div>
    </section>
  );
};

export default AiFeatures; 