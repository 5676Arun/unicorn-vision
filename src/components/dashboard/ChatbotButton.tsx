"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
}

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'bot', text: 'Hello! How can I help you with your investment research today?' }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleSendMessage = () => {
    if (inputValue.trim()) {
      // Add user message
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputValue,
        sender: 'user'
      };
      
      setMessages([...messages, newMessage]);
      setInputValue('');
      
      // Simulate bot response after a short delay
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "I'm analyzing that for you. Our AI models suggest focusing on emerging tech companies with strong fundamentals in the current market conditions.",
          sender: 'bot'
        };
        
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Example investment suggestions
  const suggestions = [
    "Market trends in tech",
    "Analyze NVDA stock",
    "Compare ETF performance",
    "AI sector growth forecast"
  ];
  
  return (
    <>
      {/* Chat overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={toggleChat}
          />
        )}
      </AnimatePresence>
      
      {/* Chat modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="fixed bottom-24 right-8 md:right-10 w-80 sm:w-96 h-[32rem] rounded-2xl overflow-hidden backdrop-blur-xl z-50 shadow-2xl border border-blue-500/30 bg-[#0a0a0a]/90"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Chat header */}
            <div className="relative z-10 p-4 border-b border-blue-500/20 bg-gradient-to-r from-blue-600 to-blue-800 flex items-center">
              <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white text-lg mr-3 shadow-inner">
                🤖
              </div>
              <div>
                <h3 className="font-medium text-white">UnicornVision Assistant</h3>
                <p className="text-xs text-white/70">Always here to help</p>
              </div>
              <button 
                onClick={toggleChat} 
                className="ml-auto text-white/70 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Chat messages */}
            <div className="flex flex-col h-[calc(100%-8rem)] p-4 overflow-y-auto">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-xl p-3 ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-tr-none shadow-md'
                        : 'bg-[#1a1a1a] text-gray-200 rounded-tl-none shadow-md border border-white/5'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Suggestions */}
            <div className="px-4 mb-2">
              <div className="bg-[#1a1a1a] rounded-lg p-2 border border-blue-500/20">
                <p className="text-xs text-white/70 mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="text-xs bg-blue-600/30 hover:bg-blue-600/50 text-white px-2 py-1 rounded-md transition-colors"
                      onClick={() => {
                        setInputValue(suggestion);
                        inputRef.current?.focus();
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Input area */}
            <div className="p-4 border-t border-blue-500/20">
              <div className="flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className="flex-1 bg-[#1a1a1a] text-white text-sm rounded-lg border border-white/10 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition"
                  placeholder="Type your question here..."
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  className="ml-2 w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Floating button - improved positioning and visibility with pulse animation */}
      <motion.button
        onClick={toggleChat}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", duration: 0.5, delay: 0.5 }}
        whileHover={{ scale: 1.05, boxShadow: "0 0 25px 5px rgba(37, 99, 235, 0.5)" }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-40 bg-gradient-to-r from-blue-600 to-blue-800 w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl shadow-2xl border-2 border-blue-500/30"
      >
        <span className="absolute w-full h-full rounded-full animate-ping bg-blue-600 opacity-20"></span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </motion.button>
    </>
  );
} 