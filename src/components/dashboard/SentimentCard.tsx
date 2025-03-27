"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Gauge, Activity, ChevronUp, ChevronDown, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

interface SentimentData {
  overall: number;  // -100 to 100
  socialMedia: number;
  newsAnalysis: number;
  analystRatings: number;
  technicalIndicators: number;
  topKeywords: Array<{word: string, sentiment: 'positive' | 'negative' | 'neutral'}>;
}

interface SentimentCardProps {
  data: SentimentData;
}

const defaultData: SentimentData = {
  overall: 68,
  socialMedia: 72,
  newsAnalysis: 65,
  analystRatings: 81,
  technicalIndicators: 54,
  topKeywords: [
    { word: 'earnings', sentiment: 'positive' },
    { word: 'growth', sentiment: 'positive' },
    { word: 'innovation', sentiment: 'positive' },
    { word: 'competition', sentiment: 'negative' },
    { word: 'regulation', sentiment: 'negative' },
    { word: 'partnership', sentiment: 'positive' },
    { word: 'investment', sentiment: 'neutral' }
  ]
};

export default function SentimentCard({ data = defaultData }: Partial<SentimentCardProps>) {
  // Helper function to determine sentiment category text
  const getSentimentCategory = (value: number) => {
    if (value >= 75) return 'Very Bullish';
    if (value >= 50) return 'Bullish';
    if (value >= 25) return 'Slightly Bullish';
    if (value > -25) return 'Neutral';
    if (value > -50) return 'Slightly Bearish';
    if (value > -75) return 'Bearish';
    return 'Very Bearish';
  };
  
  // Helper function to determine sentiment color
  const getSentimentColor = (value: number) => {
    if (value >= 50) return 'text-green-400';
    if (value >= 0) return 'text-green-300';
    if (value >= -50) return 'text-red-300';
    return 'text-red-400';
  };
  
  // Helper function to get background color class for gauge
  const getGaugeColor = (value: number) => {
    if (value >= 50) return 'bg-gradient-to-r from-green-500 to-green-400';
    if (value >= 0) return 'bg-gradient-to-r from-green-400 to-yellow-400';
    if (value >= -50) return 'bg-gradient-to-r from-yellow-400 to-red-400';
    return 'bg-gradient-to-r from-red-400 to-red-500';
  };
  
  // Helper function to get sentiment icon
  const getSentimentIcon = (value: number) => {
    if (value >= 25) return <TrendingUp className="w-4 h-4" />;
    if (value <= -25) return <TrendingDown className="w-4 h-4" />;
    return <Activity className="w-4 h-4" />;
  };
  
  // Helper function to get word sentiment color
  const getWordSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'negative':
        return 'text-red-400 bg-red-400/10 border-red-400/20';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

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
            <Brain size={20} className="text-blue-400" />
            AI Sentiment Analysis
          </h3>
          <div className="text-xs bg-blue-500/10 text-blue-300 px-2 py-1 rounded-md flex items-center">
            <AlertCircle size={12} className="mr-1" />
            Real-time
          </div>
        </div>
        
        {/* Main sentiment gauge */}
        <div className="mb-6 bg-black/30 rounded-xl p-5 border border-white/5 text-center">
          <div className="flex justify-center items-center mb-3">
            <Gauge size={28} className={getSentimentColor(data.overall)} />
          </div>
          
          <div className="mb-2">
            <div className={`text-2xl font-bold ${getSentimentColor(data.overall)}`}>
              {getSentimentCategory(data.overall)}
            </div>
            <div className="text-sm text-gray-400">Market Sentiment Score: {data.overall}/100</div>
          </div>
          
          {/* Gauge visualization */}
          <div className="relative h-4 bg-black/50 rounded-full overflow-hidden mt-4 mb-2">
            <div 
              className={`absolute top-0 left-0 h-full ${getGaugeColor(data.overall)}`}
              style={{ width: `${Math.abs(data.overall + 100) / 2}%` }}
            />
            <div className="absolute top-0 left-1/2 h-full border-l border-white/20 -translate-x-px" />
          </div>
          
          <div className="flex justify-between text-xs text-gray-500">
            <span>Bearish</span>
            <span>Neutral</span>
            <span>Bullish</span>
          </div>
        </div>
        
        {/* Sentiment breakdown */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-400 mb-3">Sentiment Breakdown</h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs text-gray-400">Social Media</span>
                <span className={`text-xs font-medium ${getSentimentColor(data.socialMedia)}`}>
                  {data.socialMedia}%
                </span>
              </div>
              <div className="h-1.5 bg-black/50 rounded-full overflow-hidden">
                <div 
                  className={getGaugeColor(data.socialMedia)}
                  style={{ width: `${Math.abs(data.socialMedia + 100) / 2}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs text-gray-400">News Analysis</span>
                <span className={`text-xs font-medium ${getSentimentColor(data.newsAnalysis)}`}>
                  {data.newsAnalysis}%
                </span>
              </div>
              <div className="h-1.5 bg-black/50 rounded-full overflow-hidden">
                <div 
                  className={getGaugeColor(data.newsAnalysis)}
                  style={{ width: `${Math.abs(data.newsAnalysis + 100) / 2}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs text-gray-400">Analyst Ratings</span>
                <span className={`text-xs font-medium ${getSentimentColor(data.analystRatings)}`}>
                  {data.analystRatings}%
                </span>
              </div>
              <div className="h-1.5 bg-black/50 rounded-full overflow-hidden">
                <div 
                  className={getGaugeColor(data.analystRatings)}
                  style={{ width: `${Math.abs(data.analystRatings + 100) / 2}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs text-gray-400">Technical Indicators</span>
                <span className={`text-xs font-medium ${getSentimentColor(data.technicalIndicators)}`}>
                  {data.technicalIndicators}%
                </span>
              </div>
              <div className="h-1.5 bg-black/50 rounded-full overflow-hidden">
                <div 
                  className={getGaugeColor(data.technicalIndicators)}
                  style={{ width: `${Math.abs(data.technicalIndicators + 100) / 2}%` }}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Top sentiment keywords */}
        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-3">Top Topics & Keywords</h4>
          <div className="flex flex-wrap gap-2">
            {data.topKeywords.map((item, index) => (
              <div 
                key={index}
                className={`text-xs px-2 py-1 rounded-md border ${getWordSentimentColor(item.sentiment)}`}
              >
                #{item.word}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
} 