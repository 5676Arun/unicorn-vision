"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function PortfolioPage() {
  // Sample data for portfolio tracking
  const [portfolioData, setPortfolioData] = useState([
    { id: 1, name: 'Apple Inc.', ticker: 'AAPL', shares: 25, buyPrice: 150.75, currentPrice: 172.30, sector: 'Technology' },
    { id: 2, name: 'Tesla Inc.', ticker: 'TSLA', shares: 10, buyPrice: 800.00, currentPrice: 735.50, sector: 'Automotive' },
    { id: 3, name: 'Microsoft Corp.', ticker: 'MSFT', shares: 15, buyPrice: 245.20, currentPrice: 290.15, sector: 'Technology' },
    { id: 4, name: 'Amazon.com Inc.', ticker: 'AMZN', shares: 5, buyPrice: 3200.00, currentPrice: 3410.25, sector: 'E-Commerce' },
    { id: 5, name: 'Google (Alphabet)', ticker: 'GOOGL', shares: 8, buyPrice: 2100.50, currentPrice: 2320.75, sector: 'Technology' },
  ]);
  
  // Calculate portfolio metrics
  const calculateMetrics = () => {
    let totalValue = 0;
    let totalInvested = 0;
    let totalGainLoss = 0;
    
    portfolioData.forEach(stock => {
      const stockValue = stock.shares * stock.currentPrice;
      const investedValue = stock.shares * stock.buyPrice;
      
      totalValue += stockValue;
      totalInvested += investedValue;
      totalGainLoss += (stockValue - investedValue);
    });
    
    return {
      totalValue: totalValue.toFixed(2),
      totalInvested: totalInvested.toFixed(2),
      totalGainLoss: totalGainLoss.toFixed(2),
      percentageChange: ((totalGainLoss / totalInvested) * 100).toFixed(2)
    };
  };
  
  const metrics = calculateMetrics();
  
  // Sample data for sector allocation chart
  const sectorAllocation = [
    { sector: 'Technology', percentage: 65 },
    { sector: 'Automotive', percentage: 15 },
    { sector: 'E-Commerce', percentage: 20 },
  ];
  
  // UI state for the add stock modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newStock, setNewStock] = useState({
    name: '',
    ticker: '',
    shares: 0,
    buyPrice: 0,
    currentPrice: 0,
    sector: ''
  });
  
  const handleAddStock = () => {
    setPortfolioData([
      ...portfolioData, 
      { 
        id: portfolioData.length + 1, 
        ...newStock 
      }
    ]);
    
    // Reset form and close modal
    setNewStock({
      name: '',
      ticker: '',
      shares: 0,
      buyPrice: 0,
      currentPrice: 0,
      sector: ''
    });
    setIsAddModalOpen(false);
  };
  
  return (
    <div className="p-6">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Portfolio Tracker</h1>
          <p className="text-gray-400 mt-2">Manage and analyze your investments</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-glow-sm transition-all flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Investment
        </motion.button>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#111] rounded-xl border border-white/10 shadow-lg p-5"
        >
          <div className="text-sm text-gray-400 mb-2">Total Value</div>
          <div className="text-2xl font-bold text-white">${metrics.totalValue}</div>
          <div className="mt-2 text-xs text-gray-500">Updated just now</div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-[#111] rounded-xl border border-white/10 shadow-lg p-5"
        >
          <div className="text-sm text-gray-400 mb-2">Total Invested</div>
          <div className="text-2xl font-bold text-white">${metrics.totalInvested}</div>
          <div className="mt-2 text-xs text-gray-500">Cost basis</div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-[#111] rounded-xl border border-white/10 shadow-lg p-5"
        >
          <div className="text-sm text-gray-400 mb-2">Total Gain/Loss</div>
          <div className={`text-2xl font-bold ${parseFloat(metrics.totalGainLoss) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {parseFloat(metrics.totalGainLoss) >= 0 ? '+' : ''}{metrics.totalGainLoss}
          </div>
          <div className={`mt-2 text-xs ${parseFloat(metrics.percentageChange) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {parseFloat(metrics.percentageChange) >= 0 ? '+' : ''}{metrics.percentageChange}%
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-[#111] rounded-xl border border-white/10 shadow-lg p-5"
        >
          <div className="text-sm text-gray-400 mb-2">Sentiment Score</div>
          <div className="text-2xl font-bold text-blue-400">72/100</div>
          <div className="mt-2 text-xs text-blue-300">AI-generated score</div>
        </motion.div>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-2 bg-[#111] rounded-xl border border-white/10 shadow-lg overflow-hidden"
        >
          <div className="p-4 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Your Investments</h2>
            <div className="flex space-x-2">
              <select className="bg-[#1a1a1a] border border-white/10 rounded-md text-sm text-gray-300 p-1.5">
                <option>All Assets</option>
                <option>Stocks</option>
                <option>Crypto</option>
                <option>ETFs</option>
              </select>
              <button className="p-1.5 bg-[#1a1a1a] border border-white/10 rounded-md text-gray-300 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 text-sm border-b border-white/10">
                  <th className="p-4">Name</th>
                  <th className="p-4">Shares</th>
                  <th className="p-4">Avg. Buy</th>
                  <th className="p-4">Current</th>
                  <th className="p-4">Gain/Loss</th>
                  <th className="p-4">Sentiment</th>
                </tr>
              </thead>
              <tbody>
                {portfolioData.map((stock) => {
                  const gainLoss = (stock.currentPrice - stock.buyPrice) * stock.shares;
                  const percentChange = ((stock.currentPrice - stock.buyPrice) / stock.buyPrice) * 100;
                  
                  return (
                    <tr key={stock.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold mr-3">
                            {stock.ticker.substring(0, 1)}
                          </div>
                          <div>
                            <div className="text-white font-medium">{stock.name}</div>
                            <div className="text-gray-500 text-xs">{stock.ticker}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-white">{stock.shares}</td>
                      <td className="p-4 text-white">${stock.buyPrice}</td>
                      <td className="p-4 text-white">${stock.currentPrice}</td>
                      <td className={`p-4 ${gainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        ${gainLoss.toFixed(2)} ({percentChange.toFixed(2)}%)
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="h-2 w-20 bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${percentChange >= 10 ? 'bg-green-500' : percentChange >= 0 ? 'bg-blue-500' : 'bg-red-500'}`}
                              style={{ width: `${Math.abs(Math.min(Math.max(percentChange, -20), 20)) / 0.4}%` }}
                            ></div>
                          </div>
                          <div className={`ml-2 text-xs ${percentChange >= 10 ? 'text-green-400' : percentChange >= 0 ? 'text-blue-400' : 'text-red-400'}`}>
                            {percentChange >= 10 ? 'Bullish' : percentChange >= 0 ? 'Neutral' : 'Bearish'}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
        
        {/* Allocation Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-[#111] rounded-xl border border-white/10 shadow-lg overflow-hidden"
        >
          <div className="p-4 border-b border-white/10">
            <h2 className="text-xl font-bold text-white">Sector Allocation</h2>
          </div>
          
          <div className="p-5">
            <div className="flex justify-center mb-6">
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Circular chart segments */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1f2937" strokeWidth="20" />
                  
                  {/* Technology Sector - Blue */}
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="transparent" 
                    stroke="#3b82f6" 
                    strokeWidth="20" 
                    strokeDasharray={`${sectorAllocation[0].percentage * 2.51} 251`} 
                    strokeDashoffset="0" 
                    transform="rotate(-90 50 50)" 
                  />
                  
                  {/* Automotive Sector - Purple */}
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="transparent" 
                    stroke="#8b5cf6" 
                    strokeWidth="20" 
                    strokeDasharray={`${sectorAllocation[1].percentage * 2.51} 251`} 
                    strokeDashoffset={`${-sectorAllocation[0].percentage * 2.51}`} 
                    transform="rotate(-90 50 50)" 
                  />
                  
                  {/* E-Commerce Sector - Teal */}
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="transparent" 
                    stroke="#06b6d4" 
                    strokeWidth="20" 
                    strokeDasharray={`${sectorAllocation[2].percentage * 2.51} 251`} 
                    strokeDashoffset={`${-(sectorAllocation[0].percentage + sectorAllocation[1].percentage) * 2.51}`} 
                    transform="rotate(-90 50 50)" 
                  />
                  
                  {/* Inner white circle */}
                  <circle cx="50" cy="50" r="30" fill="#111" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-white text-2xl font-bold">$100.5k</div>
                    <div className="text-blue-400 text-xs">Total Assets</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              {sectorAllocation.map((sector, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className={`w-3 h-3 rounded-full mr-2 ${
                        index === 0 ? 'bg-blue-500' : 
                        index === 1 ? 'bg-purple-500' : 
                        'bg-cyan-500'
                      }`}
                    ></div>
                    <span className="text-gray-300 text-sm">{sector.sector}</span>
                  </div>
                  <span className="text-white font-medium">{sector.percentage}%</span>
                </div>
              ))}
            </div>
            
            <div className="mt-5 pt-5 border-t border-white/10">
              <button className="w-full text-center py-2 text-blue-400 hover:text-blue-300 text-sm">
                View Detailed Breakdown
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Add Stock Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#111] border border-white/10 rounded-xl shadow-2xl p-6 max-w-md w-full mx-4"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Add New Investment</h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1">Stock Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Apple Inc." 
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white"
                  value={newStock.name}
                  onChange={(e) => setNewStock({...newStock, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-1">Ticker Symbol</label>
                <input 
                  type="text" 
                  placeholder="e.g. AAPL" 
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white"
                  value={newStock.ticker}
                  onChange={(e) => setNewStock({...newStock, ticker: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Shares</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 10" 
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white"
                    value={newStock.shares || ""}
                    onChange={(e) => setNewStock({...newStock, shares: parseFloat(e.target.value)})}
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Buy Price</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 150.00" 
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white"
                    value={newStock.buyPrice || ""}
                    onChange={(e) => setNewStock({...newStock, buyPrice: parseFloat(e.target.value)})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Current Price</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 155.00" 
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white"
                    value={newStock.currentPrice || ""}
                    onChange={(e) => setNewStock({...newStock, currentPrice: parseFloat(e.target.value)})}
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Sector</label>
                  <select 
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white"
                    value={newStock.sector}
                    onChange={(e) => setNewStock({...newStock, sector: e.target.value})}
                  >
                    <option value="">Select Sector</option>
                    <option value="Technology">Technology</option>
                    <option value="Automotive">Automotive</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Finance">Finance</option>
                    <option value="Healthcare">Healthcare</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex space-x-3">
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="flex-1 py-2 rounded-lg border border-white/10 text-gray-300 hover:bg-white/5"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddStock}
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Add Investment
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
} 