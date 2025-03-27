"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ChartBar, BookOpen, Settings, Menu, X, Search, Bell, ChevronDown } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: ChartBar },
    { name: 'Research', href: '/research', icon: BookOpen },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <header className="bg-black/30 backdrop-blur-lg border-b border-white/10 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-800">
                <span className="text-xl font-bold text-white">U</span>
              </div>
              <span className="text-lg font-bold text-white">UnicornVision</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center text-sm font-medium text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-md hover:bg-white/5"
                >
                  <Icon className="h-4 w-4 mr-1.5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          
          {/* User and actions */}
          <div className="flex items-center space-x-4">
            {/* Search button */}
            <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors hidden sm:flex">
              <Search className="h-5 w-5" />
            </button>
            
            {/* Notifications */}
            <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors hidden sm:flex relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-blue-500" />
            </button>
            
            {/* User menu */}
            <div className="relative">
              <button 
                className="flex items-center space-x-2 text-sm text-white hover:bg-white/5 py-1 px-2 rounded-md transition-colors"
                onClick={() => {}}
              >
                <div className="h-8 w-8 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
                  JS
                </div>
                <div className="hidden sm:block">
                  <div className="flex items-center">
                    <span className="font-medium">John Smith</span>
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </div>
                  <div className="text-xs text-gray-400">Premium Account</div>
                </div>
              </button>
              
              {/* Dropdown menu - hidden by default, would be shown on click */}
            </div>
            
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile navigation menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-white/10 bg-black/30 backdrop-blur-xl"
        >
          <div className="px-4 py-3 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center py-2 px-3 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </header>
  );
} 