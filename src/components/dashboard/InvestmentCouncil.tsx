"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Define agent types and colors
const agents = [
  { 
    id: 'visionary', 
    name: 'Visionary', 
    role: 'Identifies opportunities and future potential',
    avatar: '/doodles/visionary.svg', 
    color: '#3B82F6', // blue
    position: { x: 0, y: -120 }
  },
  { 
    id: 'skeptic', 
    name: 'Skeptic', 
    role: 'Questions assumptions and identifies risks',
    avatar: '/doodles/skeptic.svg', 
    color: '#EF4444', // red
    position: { x: 114, y: -37 }
  },
  { 
    id: 'analyst', 
    name: 'Analyst', 
    role: 'Evaluates financials and market metrics',
    avatar: '/doodles/analyst.svg', 
    color: '#10B981', // green
    position: { x: 70, y: 97 }
  },
  { 
    id: 'scout', 
    name: 'Scout', 
    role: 'Researches market trends and competitors',
    avatar: '/doodles/scout.svg', 
    color: '#8B5CF6', // purple
    position: { x: -70, y: 97 }
  },
  { 
    id: 'oracle', 
    name: 'Oracle', 
    role: 'Synthesizes insights and predicts outcomes',
    avatar: '/doodles/oracle.svg', 
    color: '#F59E0B', // amber
    position: { x: -114, y: -37 }
  }
];

type Message = {
  id: string;
  agent: string;
  text: string;
  timestamp: Date;
};

type AgentState = {
  id: string;
  confidence: number;
  isSpeaking: boolean;
  recentMessage?: string;
};

const InvestmentCouncil = () => {
  const [startupName, setStartupName] = useState('Quantum AI Solutions');
  const [showDetailedView, setShowDetailedView] = useState(true);
  const [agentStates, setAgentStates] = useState<AgentState[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [consensusRating, setConsensusRating] = useState<string>('Wait');
  const [consensusConfidence, setConsensusConfidence] = useState<number>(70);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<{x: string, y: string, scale: number, opacity: number}[]>([]);
  
  // Initialize agent states with random confidence values after mount
  useEffect(() => {
    setAgentStates(
      agents.map(agent => ({ 
        id: agent.id, 
        confidence: Math.floor(Math.random() * 40) + 60, // Random confidence between 60-100
        isSpeaking: false 
      }))
    );
  }, []);

  // Generate particles on client-side only to prevent hydration mismatch
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 20 }).map(() => ({
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        scale: Math.random() * 0.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.1
      }));
      setParticles(newParticles);
    };
    
    generateParticles();
  }, []);

  // Mock messages for demonstration
  const mockMessages = [
    { agent: 'visionary', text: "Quantum AI Solutions is positioned at the intersection of quantum computing and artificial intelligence, two exponentially growing markets. Their patented algorithms could revolutionize data processing for enterprise clients." },
    { agent: 'skeptic', text: "I'm concerned about the timeline. Quantum computing is still in its infancy for commercial applications. How realistic is their 18-month roadmap to market?" },
    { agent: 'analyst', text: "They've secured $8M in funding with a $40M valuation. Burn rate is approximately $400K/month, giving them a 20-month runway. Their financial projections show breakeven in month 22, which is cutting it close." },
    { agent: 'scout', text: "There are three major competitors in this space: QuantumLeap, Qubits Inc, and AI Quantum Systems. Quantum AI's technology appears to have a 2x performance advantage based on published benchmarks." },
    { agent: 'oracle', text: "Synthesizing our inputs, this venture has a 68% probability of reaching Series B within 24 months. The quantum computing market is projected to grow at 56% CAGR over the next 5 years." },
    { agent: 'visionary', text: "Their founding team has exceptional credentials. The CEO previously sold a machine learning startup to Google, and their CTO published groundbreaking research on quantum algorithms." },
    { agent: 'skeptic', text: "The regulatory landscape for quantum technologies is uncertain. Several countries are implementing export controls on advanced computing technologies, which could impact their global expansion plans." },
    { agent: 'analyst', text: "Customer acquisition costs are estimated at $85K per enterprise client, with a projected lifetime value of $1.2M per client. This 14:1 LTV:CAC ratio is extremely promising if their assumptions hold." },
  ];

  // Simulate conversation after agentStates are initialized
  useEffect(() => {
    if (agentStates.length === 0) return;

    let timeoutId: NodeJS.Timeout;
    let messageIndex = 0;

    const simulateConversation = () => {
      if (messageIndex < mockMessages.length) {
        const mockMessage = mockMessages[messageIndex];
        const agent = agents.find(a => a.id === mockMessage.agent)!;
        
        // Set the speaking agent
        setAgentStates(prev => 
          prev.map(a => ({
            ...a,
            isSpeaking: a.id === agent.id
          }))
        );
        
        // Add message after a small delay to simulate typing
        timeoutId = setTimeout(() => {
          const newMessage = {
            id: `msg-${Date.now()}`,
            agent: agent.id,
            text: mockMessage.text,
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, newMessage]);
          
          // Update agent's confidence and recent message
          setAgentStates(prev => 
            prev.map(a => {
              if (a.id === agent.id) {
                // Adjust confidence randomly within a small range
                const confidenceDelta = Math.floor(Math.random() * 10) - 5; // -5 to +5
                const newConfidence = Math.max(50, Math.min(100, a.confidence + confidenceDelta));
                return {
                  ...a,
                  confidence: newConfidence,
                  recentMessage: mockMessage.text,
                  isSpeaking: false
                };
              }
              return a;
            })
          );
          
          // Move to next message
          messageIndex++;
          
          // Calculate new consensus after each message
          calculateConsensus();
          
          // Continue conversation after a delay
          timeoutId = setTimeout(simulateConversation, 3000);
        }, 1500);
      }
    };
    
    // Start the conversation after initial delay
    timeoutId = setTimeout(simulateConversation, 1000);
    
    return () => clearTimeout(timeoutId);
  }, [agentStates.length]);

  // Calculate consensus based on agent confidences
  const calculateConsensus = () => {
    if (agentStates.length === 0) return;
    
    const totalConfidence = agentStates.reduce((sum, agent) => sum + agent.confidence, 0);
    const avgConfidence = Math.round(totalConfidence / agentStates.length);
    
    // Simple logic for demonstration
    let recommendation = 'Wait';
    if (avgConfidence > 80) recommendation = 'Invest';
    else if (avgConfidence < 60) recommendation = 'Avoid';
    
    setConsensusConfidence(avgConfidence);
    setConsensusRating(recommendation);
  };

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Function to get agent color
  const getAgentColor = (agentId: string) => {
    return agents.find(agent => agent.id === agentId)?.color || '#888';
  };

  // Function to get agent name
  const getAgentName = (agentId: string) => {
    return agents.find(agent => agent.id === agentId)?.name || 'Unknown';
  };

  // Function to get agent avatar
  const getAgentAvatar = (agentId: string) => {
    return agents.find(agent => agent.id === agentId)?.avatar || '👤';
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 shadow-xl">
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 5, 0],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
          className="absolute top-20 left-[10%] w-[40vw] h-[40vw] rounded-full bg-gradient-cosmic opacity-20 blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -5, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2
          }}
          className="absolute bottom-20 right-[10%] w-[35vw] h-[35vw] rounded-full bg-gradient-sunset opacity-20 blur-[120px]"
        />
      </div>
      
      {/* Animated particles - client-side rendered */}
      <div className="absolute inset-0 z-0">
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
      
      <div className="border-b border-white/10 p-4 flex items-center justify-between relative z-10">
        <div>
          <h2 className="text-2xl font-bold text-gradient-primary">AI Investment Council</h2>
          <p className="text-gray-400">Real-time multi-agent analysis for {startupName}</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">View:</span>
            <button 
              onClick={() => setShowDetailedView(true)}
              className={`px-3 py-1 text-sm rounded-md ${showDetailedView ? 'glassmorphism-vibrant text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'} transition-colors`}
            >
              Detailed
            </button>
            <button 
              onClick={() => setShowDetailedView(false)}
              className={`px-3 py-1 text-sm rounded-md ${!showDetailedView ? 'glassmorphism-vibrant text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'} transition-colors`}
            >
              Summary
            </button>
          </div>
          <button className="bg-gradient-vibrant hover-expand text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
            New Analysis
          </button>
        </div>
      </div>
      
      <div className="p-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Round table visualization - always visible */}
          <div className="lg:w-1/2 flex items-center justify-center">
            <div className="relative w-[300px] h-[300px]">
              {/* Table circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full glassmorphism-light border border-white/10 shadow-lg flex items-center justify-center overflow-hidden">
                {/* Pulsing center */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-16 h-16 rounded-full bg-gradient-vibrant flex items-center justify-center"
                >
                  <div className="text-white text-xs font-bold">UNICORN VISION</div>
                </motion.div>
                
                {/* Table lines */}
                {agents.map((agent, index) => (
                  <div 
                    key={`line-${agent.id}`}
                    className="absolute top-1/2 left-1/2 w-1/2 h-[1px] bg-white/10"
                    style={{ 
                      transform: `translate(-50%, -50%) rotate(${index * (360 / agents.length)}deg)` 
                    }}
                  />
                ))}
              </div>
              
              {/* Agents around the table */}
              {agents.map((agent, index) => {
                const agentState = agentStates.find(state => state.id === agent.id);
                if (!agentState) return null;
                
                return (
                  <motion.div
                    key={agent.id}
                    className="absolute"
                    style={{ 
                      top: '50%', 
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      x: agent.position.x,
                      y: agent.position.y,
                    }}
                  >
                    {/* Agent bubble */}
                    <motion.div 
                      animate={{ 
                        scale: agentState.isSpeaking ? [1, 1.1, 1] : 1,
                        boxShadow: agentState.isSpeaking ? `0 0 20px ${agent.color}` : `0 0 1px ${agent.color}`
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: agentState.isSpeaking ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                      className="relative flex flex-col items-center"
                    >
                      <div 
                        className="w-14 h-14 rounded-full flex items-center justify-center relative glassmorphism-light"
                        style={{ 
                          borderColor: `${agent.color}44`
                        }}
                      >
                        <div className="w-10 h-10 relative">
                          <Image 
                            src={agent.avatar} 
                            alt={agent.name} 
                            width={40} 
                            height={40} 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        
                        {/* Confidence indicator */}
                        <div className="absolute -bottom-1 -right-1 glassmorphism-vibrant rounded-full px-1 border border-white/10 text-[10px] font-mono">
                          {agentState.confidence}%
                        </div>
                      </div>
                      <div className="mt-2 text-xs font-medium text-center" style={{ color: agent.color }}>
                        {agent.name}
                      </div>
                      
                      {/* Speaking indicator */}
                      {agentState.isSpeaking && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="absolute top-16 left-1/2 transform -translate-x-1/2 w-40 glassmorphism-light p-2 rounded-lg border border-white/10 shadow-lg z-30 mt-4"
                          style={{ borderColor: `${agent.color}44` }}
                        >
                          <div className="text-xs text-white">
                            <span className="animate-pulse">● </span>
                            Analyzing...
                          </div>
                        </motion.div>
                      )}
                      
                      {/* Last message bubble - only shown when not speaking */}
                      {agentState.recentMessage && !agentState.isSpeaking && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute w-48 max-h-24 overflow-hidden glassmorphism-light p-2 rounded-lg border border-white/10 shadow-lg z-10 text-xs text-gray-300"
                          style={{ 
                            borderColor: `${agent.color}44`,
                            top: index % 2 === 0 ? '-80px' : '60px',
                            // Adjust left position to keep bubble within view
                            left: index === 0 ? '-20px' : 
                                 index === 1 ? '-40px' : 
                                 index === 2 ? '-40px' : 
                                 index === 3 ? '0px' : 
                                 '-10px',
                          }}
                        >
                          {agentState.recentMessage.length > 120 
                            ? `${agentState.recentMessage.slice(0, 120)}...` 
                            : agentState.recentMessage}
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          {/* Right side with messages or summary */}
          <div className="lg:w-1/2">
            {showDetailedView ? (
              <div className="glassmorphism-light rounded-xl border border-white/10 h-[500px] flex flex-col">
                <div className="p-4 border-b border-white/10">
                  <h3 className="text-white font-medium">Council Debate</h3>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <motion.div 
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start space-x-3"
                    >
                      <div 
                        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center glassmorphism-light"
                        style={{ 
                          borderColor: `${getAgentColor(message.agent)}44`
                        }}
                      >
                        <div className="w-6 h-6 relative">
                          <Image 
                            src={agents.find(a => a.id === message.agent)?.avatar || ''}
                            alt={getAgentName(message.agent)}
                            width={24}
                            height={24}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <span className="font-medium text-sm" style={{ color: getAgentColor(message.agent) }}>
                            {getAgentName(message.agent)}
                          </span>
                          <span className="text-gray-500 text-xs ml-2">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className="text-gray-300 text-sm">
                          {message.text}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                
                <div className="p-3 border-t border-white/10">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Ask the council a question..." 
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-4 pr-12 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                    />
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gradient-primary hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="glassmorphism-light rounded-xl border border-white/10 p-6">
                <h3 className="text-xl font-bold text-gradient-primary mb-6">Council Summary</h3>
                
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium">Consensus Recommendation</h4>
                    <div className={`px-3 py-1 rounded-md text-white text-sm font-medium ${
                      consensusRating === 'Invest' ? 'bg-green-500/20 text-green-400' :
                      consensusRating === 'Avoid' ? 'bg-red-500/20 text-red-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {consensusRating}
                    </div>
                  </div>
                  
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${consensusConfidence}%` }}
                      transition={{ duration: 0.8 }}
                      className={`h-full rounded-full ${
                        consensusRating === 'Invest' ? 'bg-gradient-vibrant' :
                        consensusRating === 'Avoid' ? 'bg-gradient-fire' :
                        'bg-gradient-sunset'
                      }`}
                    ></motion.div>
                  </div>
                  <div className="mt-1 text-right text-xs text-gray-400">
                    Confidence: {consensusConfidence}%
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-white font-medium">Agent Confidence Levels</h4>
                  
                  {agentStates.map((state) => {
                    const agent = agents.find(a => a.id === state.id)!;
                    return (
                      <div key={agent.id} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div 
                              className="w-5 h-5 rounded-full mr-2 flex items-center justify-center relative glassmorphism-light"
                              style={{ borderColor: `${agent.color}44` }}
                            >
                              <div className="w-4 h-4 relative">
                                <Image 
                                  src={agent.avatar}
                                  alt={agent.name}
                                  width={16}
                                  height={16}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            </div>
                            <span className="text-sm text-white">{agent.name}</span>
                          </div>
                          <span className="text-xs text-gray-400">{state.confidence}%</span>
                        </div>
                        
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${state.confidence}%` }}
                            transition={{ duration: 0.8 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: agent.color }}
                          ></motion.div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-8 glassmorphism-vibrant rounded-lg border border-white/10 p-4">
                  <h4 className="text-white font-medium mb-2">Key Insights</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      Strong founding team with previous exits and technical expertise
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">•</span>
                      Tight runway with 20 months of funding vs 22-month breakeven projection
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      Technology shows 2x performance advantage over competitors
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-2">•</span>
                      Regulatory uncertainties could impact global expansion plans
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentCouncil; 