"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navItems = [
    { icon: '📊', name: 'Dashboard', href: '/dashboard' },
    { icon: '🔍', name: 'Research', href: '/dashboard/research' },
    { icon: '🤖', name: 'AI Council', href: '/dashboard/council' },
    { icon: '📈', name: 'Portfolio', href: '/dashboard/portfolio' },
    { icon: '📝', name: 'Watchlist', href: '/dashboard/watchlist' },
    { icon: '⚙️', name: 'Settings', href: '/dashboard/settings' },
  ];

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname?.startsWith(href);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Animated background gradients */}
      <div className="fixed inset-0 -z-10 bg-[#0a0a0a]">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-hero-pattern" />
      </div>
      
      {/* Sidebar */}
      <motion.div 
        initial={{ width: isSidebarOpen ? 240 : 80 }}
        animate={{ width: isSidebarOpen ? 240 : 80 }}
        transition={{ duration: 0.3 }}
        className="relative z-20 h-full glassmorphism-dark border-r border-blue-500/20"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center p-4 h-16 border-b border-blue-500/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-vibrant rounded-md flex items-center justify-center text-white font-bold text-xl shadow-lg">
                UV
              </div>
              {isSidebarOpen && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-gradient-primary font-semibold"
                >
                  UnicornVision
                </motion.span>
              )}
            </div>
            <div className="ml-auto">
              <button 
                onClick={toggleSidebar}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {isSidebarOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 py-6 overflow-y-auto">
            <ul className="space-y-1 px-3">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>
                    <motion.div
                      whileHover={{ 
                        x: 5,
                        boxShadow: "0 0 15px 2px rgba(37, 99, 235, 0.3)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center p-3 rounded-lg text-gray-300 hover:text-white transition-all ${
                        isActive(item.href) 
                          ? 'bg-gradient-vibrant text-white' 
                          : 'hover:bg-white/5 sleek-underline'
                      }`}
                    >
                      <div className="flex-shrink-0 w-6 h-6 text-white">
                        {item.icon}
                      </div>
                      {isSidebarOpen && (
                        <motion.span 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="ml-3 text-sm font-medium"
                        >
                          {item.name}
                        </motion.span>
                      )}
                      {isActive(item.href) && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute left-0 w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-700 rounded-full"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* User Profile */}
          <div className="p-4 border-t border-blue-500/20">
            <div className="flex items-center p-2 rounded-lg hover-lift hover:bg-white/5 transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-gradient-vibrant flex items-center justify-center text-white font-medium shadow-md">
                JD
              </div>
              {isSidebarOpen && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="ml-3"
                >
                  <div className="text-sm font-medium text-white">John Doe</div>
                  <div className="text-xs text-gradient-primary">Premium Plan</div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        {/* Top navbar */}
        <div className="h-16 border-b border-blue-500/20 glassmorphism-dark backdrop-blur-lg flex items-center px-6 sticky top-0 z-10">
          <div className="flex-1">
            <div className="relative max-w-md">
              <input 
                type="text" 
                placeholder="Search companies, markets..." 
                className="w-full glassmorphism-light border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all hover:bg-white/5"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px 2px rgba(37, 99, 235, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="relative text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:glassmorphism-vibrant sleek-underline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-gradient-vibrant rounded-full animate-pulse"></span>
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px 2px rgba(37, 99, 235, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:glassmorphism-vibrant sleek-underline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </motion.button>
          </div>
        </div>
        
        {/* Page content */}
        <main className="flex-1 relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 