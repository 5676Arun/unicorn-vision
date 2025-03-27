"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, TrendingUp, DollarSign, Activity, PieChart } from 'lucide-react';

interface StockItem {
  name: string;
  ticker: string;
  price: number;
  change: number;
  percentage: number;
}

interface PortfolioCardProps {
  totalValue: number;
  dailyChange: number;
  dailyPercentage: number;
  allTimeReturn: number;
  allTimePercentage: number;
  stocks: StockItem[];
}

export default function PortfolioCard({
  totalValue = 24680.42,
  dailyChange = 356.12,
  dailyPercentage = 1.46,
  allTimeReturn = 8720.35,
  allTimePercentage = 54.7,
  stocks = [
    { name: "Apple Inc.", ticker: "AAPL", price: 189.84, change: 2.34, percentage: 1.25 },
    { name: "NVIDIA Corp", ticker: "NVDA", price: 890.42, change: 23.65, percentage: 2.73 },
    { name: "Microsoft", ticker: "MSFT", price: 410.34, change: -3.21, percentage: -0.78 },
    { name: "Amazon.com", ticker: "AMZN", price: 178.75, change: 1.54, percentage: 0.87 },
    { name: "Meta Platforms", ticker: "META", price: 474.99, change: -2.83, percentage: -0.59 }
  ]
}: Partial<PortfolioCardProps>) {
  // Generate data points for the sparkline chart
  const generateSparklineData = () => {
    const points = [];
    let value = 100;
    for (let i = 0; i < 20; i++) {
      value += Math.random() * 10 - 5;
      points.push(value);
    }
    return points;
  };

  const sparklineData = generateSparklineData();
  const min = Math.min(...sparklineData);
  const max = Math.max(...sparklineData);
  const range = max - min;

  // Generate SVG path for sparkline
  const generateSparklinePath = () => {
    const width = 100;
    const height = 40;
    
    return sparklineData.map((point, i) => {
      const x = (i / (sparklineData.length - 1)) * width;
      const y = height - ((point - min) / range) * height;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  const isPositiveDay = dailyChange >= 0;
  const isPositiveAllTime = allTimeReturn >= 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-gray-900/90 to-gray-950/90 border border-white/5 rounded-xl shadow-xl overflow-hidden h-full"
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <PieChart size={20} className="text-blue-400" />
            Portfolio Overview
          </h3>
          <button className="text-xs bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 px-3 py-1 rounded-full transition-all">
            Manage
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-black/30 rounded-lg p-4 border border-white/5">
            <div className="text-sm text-gray-400 mb-1 flex items-center">
              <DollarSign size={14} className="mr-1" />
              Total Value
            </div>
            <div className="text-2xl font-bold text-white">
              ${totalValue.toLocaleString()}
            </div>
            <div className={`text-sm mt-1 flex items-center ${isPositiveDay ? 'text-green-400' : 'text-red-400'}`}>
              {isPositiveDay ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
              ${Math.abs(dailyChange).toLocaleString()} ({dailyPercentage.toFixed(2)}%)
            </div>
          </div>
          
          <div className="bg-black/30 rounded-lg p-4 border border-white/5">
            <div className="text-sm text-gray-400 mb-1 flex items-center">
              <TrendingUp size={14} className="mr-1" />
              All Time Return
            </div>
            <div className={`text-2xl font-bold ${isPositiveAllTime ? 'text-green-400' : 'text-red-400'}`}>
              {isPositiveAllTime ? '+' : '-'}${Math.abs(allTimeReturn).toLocaleString()}
            </div>
            <div className={`text-sm mt-1 ${isPositiveAllTime ? 'text-green-400' : 'text-red-400'}`}>
              {isPositiveAllTime ? '+' : '-'}{Math.abs(allTimePercentage).toFixed(2)}% total gain
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-400 flex items-center">
              <Activity size={14} className="mr-1" />
              Performance
            </h4>
            <div className="flex gap-2">
              <button className="text-xs bg-white/5 hover:bg-white/10 text-white px-2 py-0.5 rounded transition-all">1D</button>
              <button className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded transition-all">1W</button>
              <button className="text-xs bg-white/5 hover:bg-white/10 text-white px-2 py-0.5 rounded transition-all">1M</button>
              <button className="text-xs bg-white/5 hover:bg-white/10 text-white px-2 py-0.5 rounded transition-all">1Y</button>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-black/30 to-black/40 rounded-lg p-4 h-24 flex items-center justify-center border border-white/5 relative">
            {/* Sparkline chart */}
            <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
              <path
                d={generateSparklinePath()}
                fill="none"
                stroke={isPositiveDay ? "#4ADE80" : "#F87171"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={`${generateSparklinePath()} L 100 40 L 0 40 Z`}
                fill={isPositiveDay ? "url(#gradientGreen)" : "url(#gradientRed)"}
                opacity="0.2"
              />
              <defs>
                <linearGradient id="gradientGreen" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4ADE80" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#4ADE80" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="gradientRed" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F87171" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#F87171" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-3">Top Holdings</h4>
          <div className="space-y-3">
            {stocks.map((stock) => (
              <div 
                key={stock.ticker}
                className="flex items-center justify-between py-2 border-b border-white/5 hover:bg-white/5 transition-colors rounded px-2 -mx-2"
              >
                <div>
                  <div className="font-medium text-white">{stock.ticker}</div>
                  <div className="text-xs text-gray-400">{stock.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-white">${stock.price.toLocaleString()}</div>
                  <div className={`text-xs flex items-center ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {stock.change >= 0 ? <ArrowUpRight size={12} className="mr-0.5" /> : <ArrowDownRight size={12} className="mr-0.5" />}
                    {stock.change >= 0 ? '+' : ''}{stock.percentage.toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <button className="text-xs text-blue-400 hover:text-blue-300 hover:underline transition-all">
              View all holdings →
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 