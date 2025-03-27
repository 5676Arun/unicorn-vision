"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import Link from 'next/link';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 px-4 py-5 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0a0a0a]/60 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/5'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="relative h-10 w-10 flex items-center justify-center"
              animate={{ 
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 10,
                ease: "easeInOut" 
              }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="8" fill="#111111"/>
                <path d="M12 20H16V28H12V20Z" fill="white"/>
                <path d="M20 14H24V28H20V14Z" fill="white"/>
                <path d="M28 10H32V28H28V10Z" fill="white"/>
              </svg>
            </motion.div>
            <h1 className="text-2xl font-bold text-white">
              UnicornVision
            </h1>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-10">
            <DesktopNavMenu />
          </div>
          
          <div className="hidden md:flex items-center gap-3">
            <Button variant="link" size="sm" className="text-white hover:text-white/80">Contact Sales</Button>
            <Link href="/dashboard">
              <Button size="sm" className="bg-white hover:bg-gray-100 text-black hover:text-black font-medium rounded-md px-5">Dashboard</Button>
            </Link>
          </div>

          <button 
            className="block md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"} />
            </svg>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[72px] left-0 right-0 z-40 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/5 md:hidden"
          >
            <div className="container mx-auto py-6 px-4 flex flex-col gap-5">
              <MobileNavMenu onItemClick={() => setIsMobileMenuOpen(false)} />
              <div className="flex flex-col gap-3 pt-4">
                <Button variant="link" size="sm" className="text-white hover:text-white/80 justify-start">Contact Sales</Button>
                <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button size="sm" className="bg-white hover:bg-gray-100 text-black hover:text-black font-medium w-full">Dashboard</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const DesktopNavMenu = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <>
      <NavDropdown 
        label="Products" 
        isActive={activeDropdown === 'products'}
        onMouseEnter={() => setActiveDropdown('products')}
        onMouseLeave={() => setActiveDropdown(null)}
      />
      <NavLink href="#pricing" label="Pricing" />
      <NavDropdown 
        label="Resources" 
        isActive={activeDropdown === 'resources'}
        onMouseEnter={() => setActiveDropdown('resources')}
        onMouseLeave={() => setActiveDropdown(null)}
      />
    </>
  );
};

const MobileNavMenu = ({ onItemClick }: { onItemClick: () => void }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <>
      <MobileNavDropdown 
        label="Products" 
        isOpen={openDropdown === 'products'}
        onClick={() => setOpenDropdown(openDropdown === 'products' ? null : 'products')}
      />
      <MobileNavLink href="#pricing" onClick={onItemClick}>Pricing</MobileNavLink>
      <MobileNavDropdown 
        label="Resources" 
        isOpen={openDropdown === 'resources'}
        onClick={() => setOpenDropdown(openDropdown === 'resources' ? null : 'resources')}
      />
    </>
  );
};

const NavLink = ({ href, label }: { href: string; label: string }) => {
  return (
    <Link
      href={href}
      className="text-white hover:text-white/80 transition-colors relative text-sm font-medium"
    >
      {label}
    </Link>
  );
};

const NavDropdown = ({ 
  label, 
  isActive, 
  onMouseEnter, 
  onMouseLeave 
}: { 
  label: string; 
  isActive: boolean; 
  onMouseEnter: () => void; 
  onMouseLeave: () => void;
}) => {
  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button className="flex items-center gap-1 text-white hover:text-white/80 transition-colors text-sm font-medium">
        {label}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className={`h-4 w-4 transition-transform ${isActive ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 mt-2 w-64 bg-[#111] border border-white/5 rounded-md shadow-lg overflow-hidden z-50"
        >
          {/* Dropdown content here */}
        </motion.div>
      )}
    </div>
  );
};

const MobileNavLink = ({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-white hover:text-white/80 transition-colors py-3 border-b border-white/10 text-sm font-medium"
    >
      {children}
    </Link>
  );
};

const MobileNavDropdown = ({ 
  label, 
  isOpen, 
  onClick 
}: { 
  label: string; 
  isOpen: boolean; 
  onClick: () => void;
}) => {
  return (
    <div className="border-b border-white/10">
      <button 
        onClick={onClick}
        className="flex items-center justify-between w-full py-3 text-white text-sm font-medium"
      >
        {label}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="py-2 pl-4">
              {/* Dropdown links here */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar; 