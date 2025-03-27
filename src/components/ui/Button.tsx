"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'link';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
}: ButtonProps) => {
  const baseStyles = 'rounded-lg font-medium transition-all duration-200 flex items-center justify-center';
  
  const variantStyles = {
    primary: 'bg-primary text-primary-foreground hover:opacity-90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border border-border bg-transparent hover:bg-secondary/10',
    link: 'bg-transparent hover:bg-transparent p-0'
  };
  
  const sizeStyles = {
    sm: 'text-sm py-2 px-3',
    md: 'text-base py-2.5 px-4',
    lg: 'text-lg py-3 px-6'
  };

  return (
    <motion.button
      whileTap={{ scale: variant === 'link' ? 0.99 : 0.98 }}
      whileHover={{ scale: variant === 'link' ? 1.01 : 1.02 }}
      className={`${baseStyles} ${variantStyles[variant]} ${variant !== 'link' ? sizeStyles[size] : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default Button; 