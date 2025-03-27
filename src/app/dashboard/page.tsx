"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, PieChart, TrendingUp, Bell, Search, Settings, Calendar, ArrowRight } from 'lucide-react';
import Header from '../../components/Header';
import PortfolioCard from '../../components/dashboard/PortfolioCard';
import NewsCard from '../../components/dashboard/NewsCard';
import SentimentCard from '../../components/dashboard/SentimentCard';
import ChatbotButton from '../../components/dashboard/ChatbotButton';

export default function DashboardPage() {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-black text-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">Investment Dashboard</h1>
            <p className="text-gray-400 mt-1">Get real-time insights and market analysis</p>
          </div>
          
          <div className="flex space-x-2">
            <div className="relative w-56">
              <input 
                type="text" 
                placeholder="Search assets..." 
                className="w-full bg-black/30 border border-white/10 rounded-lg py-2 px-4 pl-10 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
            </div>
            
            <button className="p-2 bg-black/30 border border-white/10 rounded-lg text-gray-400 hover:text-white hover:bg-black/50 transition-colors">
              <Bell size={20} />
            </button>
            
            <button className="p-2 bg-black/30 border border-white/10 rounded-lg text-gray-400 hover:text-white hover:bg-black/50 transition-colors">
              <Settings size={20} />
            </button>
          </div>
        </div>
        
        {/* Quick Stats */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <motion.div 
            variants={itemVariants}
            className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-500/20 rounded-xl p-4 shadow-xl"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <BarChart3 size={24} className="text-blue-400" />
              </div>
              <span className="text-xs font-medium bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">+2.5%</span>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Market Cap</h3>
            <div className="text-2xl font-bold">$48.7T</div>
            <div className="flex items-center mt-2 text-xs text-gray-400">
              <span className="text-green-400 flex items-center">
                <TrendingUp size={14} className="mr-1" /> $1.2T
              </span>
              <span className="ml-2">vs last week</span>
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 border border-purple-500/20 rounded-xl p-4 shadow-xl"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <PieChart size={24} className="text-purple-400" />
              </div>
              <span className="text-xs font-medium bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">+3.8%</span>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Trading Volume</h3>
            <div className="text-2xl font-bold">$187.3B</div>
            <div className="flex items-center mt-2 text-xs text-gray-400">
              <span className="text-green-400 flex items-center">
                <TrendingUp size={14} className="mr-1" /> $7.2B
              </span>
              <span className="ml-2">vs yesterday</span>
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="bg-gradient-to-br from-green-900/40 to-green-800/20 border border-green-500/20 rounded-xl p-4 shadow-xl"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Calendar size={24} className="text-green-400" />
              </div>
              <span className="text-xs font-medium bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">Today</span>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Earnings Reports</h3>
            <div className="text-2xl font-bold">18 Companies</div>
            <div className="flex items-center mt-2 text-xs text-blue-400 cursor-pointer hover:underline">
              View calendar <ArrowRight size={12} className="ml-1" />
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="bg-gradient-to-br from-amber-900/40 to-amber-800/20 border border-amber-500/20 rounded-xl p-4 shadow-xl"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <TrendingUp size={24} className="text-amber-400" />
              </div>
              <span className="text-xs font-medium bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">-0.8%</span>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">S&P 500</h3>
            <div className="text-2xl font-bold">5,236.47</div>
            <div className="flex items-center mt-2 text-xs text-gray-400">
              <span className="text-red-400">-41.24 points</span>
              <span className="ml-2">today</span>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Portfolio Section */}
          <div className="xl:col-span-2">
            <PortfolioCard />
          </div>
          
          {/* Sentiment Analysis */}
          <div>
            <SentimentCard />
          </div>
          
          {/* News Section */}
          <div className="xl:col-span-3">
            <NewsCard />
          </div>
        </div>
      </main>
      
      {/* Chatbot Button */}
      <ChatbotButton />
    </div>
  );
} 