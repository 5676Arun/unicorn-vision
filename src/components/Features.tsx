"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative hover-lift"
    >
      <div className="absolute -inset-0.5 bg-gradient-vibrant rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-500"></div>
      <div className="relative glassmorphism-light rounded-xl p-6 border border-white/10 shadow-xl transition-all duration-500 overflow-hidden group-hover:border-white/20">
        {/* Animated background glow */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-cosmic rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
        
        <div className="glassmorphism-vibrant rounded-lg p-4 w-14 h-14 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <motion.div 
            className="text-white"
            animate={{ rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            {icon}
          </motion.div>
        </div>
        
        <h3 className="text-xl font-bold mb-3 group-hover:text-gradient-primary transition-colors">{title}</h3>
        <p className="text-gray-300">{description}</p>
        
        <div className="absolute bottom-0 right-0 w-full h-1.5 bg-gradient-vibrant opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
      </div>
    </motion.div>
  );
};

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [particles, setParticles] = useState<{x: string, y: string, scale: number, opacity: number}[]>([]);

  // Generate particles on client-side only to prevent hydration mismatch
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 10 }).map(() => ({
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        scale: Math.random() * 0.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.1
      }));
      setParticles(newParticles);
    };
    
    generateParticles();
  }, []);

  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Success Probability Prediction",
      description: "Our AI model analyzes historical startup data to calculate the likelihood of success with high accuracy.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Comprehensive Data Analysis",
      description: "Gather insights from various sources including funding, team composition, market traction, and industry trends.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Risk & Strength Analysis",
      description: "Identify potential risks and strengths in startups using advanced natural language processing models.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Competitor Analysis",
      description: "Compare your target startup with similar companies to understand their relative position in the market.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Investment Recommendations",
      description: "Get clear investment recommendations with justification based on comprehensive data analysis.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      ),
      title: "Market Trend Analysis",
      description: "Understand market dynamics and evaluate whether industry demand is growing or declining.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  return (
    <section className="py-24 relative overflow-hidden" id="features">
      {/* Background gradients */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 5, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
        className="absolute -z-10 -top-40 -left-40 w-[80vw] h-[80vw] rounded-full bg-gradient-cosmic opacity-10 blur-[120px]"
      />

      {/* Orange accent gradient */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
        className="absolute -z-10 -bottom-40 -right-40 w-[60vw] h-[60vw] rounded-full bg-gradient-to-r from-orange-500 to-red-500 opacity-10 blur-[120px]"
      />

      {/* Particle effects - client-side rendered */}
      <div className="absolute inset-0 -z-10">
        {particles.map((particle, index) => (
          <motion.div
            key={index}
            className="absolute w-1 h-1 rounded-full bg-white"
            initial={{
              x: particle.x,
              y: particle.y,
              scale: particle.scale,
              opacity: particle.opacity
            }}
            animate={{
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              opacity: [0.1, 0.5, 0.1],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.span 
            className="inline-block glassmorphism-vibrant text-sm py-1 px-4 rounded-full border border-white/10 uppercase tracking-widest font-semibold mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-white">
              Features
            </span>
          </motion.span>

          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient-primary">
            Powerful Tools for Investor Decision Making
          </h2>
          <p className="text-lg text-gray-300">
            Our AI-powered platform combines cutting-edge technology with financial expertise to help you make smarter investment decisions.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </motion.div>
      </div>

      {/* Animated accents */}
      <div className="absolute top-[20%] left-[10%] w-1 h-20 bg-gradient-to-b from-orange-500/60 to-transparent rounded-full blur-sm"></div>
      <div className="absolute bottom-[30%] right-[15%] w-1 h-16 bg-gradient-vibrant rounded-full blur-sm"></div>
    </section>
  );
};

export default Features; 