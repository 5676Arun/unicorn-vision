"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ResearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [sentimentResults, setSentimentResults] = useState<null | {
    overall: number;
    articles: { 
      id: string;
      title: string; 
      summary: string; 
      source: string; 
      url: string;
      imageUrl: string;
      time: string; 
      sentiment: 'positive' | 'negative' | 'neutral'; 
      score: number 
    }[];
    keywords: { 
      word: string; 
      sentiment: 'positive' | 'negative' | 'neutral'; 
      weight: number 
    }[];
  }>(null);
  
  // Sample recent searches
  const recentSearches = [
    'Tesla earnings impact',
    'Startup funding trends',
    'AI investments',
    'Unicorn valuation'
  ];
  
  const fetchSentimentAnalysis = async (query: string) => {
    try {
      const response = await fetch(`/api/sentiment?query=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching sentiment analysis:', error);
      throw error;
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsAnalyzing(true);
    
    try {
      const results = await fetchSentimentAnalysis(searchQuery);
      setSentimentResults(results);
    } catch (error) {
      console.error('Error in sentiment analysis:', error);
      // Show error to user
      alert('Failed to analyze sentiment. Please try again later.');
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const getSentimentColor = (score: number) => {
    if (score >= 0.6) return 'text-green-500';
    if (score >= 0.2) return 'text-green-400';
    if (score > -0.2) return 'text-blue-400';
    if (score > -0.6) return 'text-red-400';
    return 'text-red-500';
  };
  
  const getSentimentBg = (sentiment: 'positive' | 'negative' | 'neutral') => {
    if (sentiment === 'positive') return 'bg-green-500/20 text-green-400';
    if (sentiment === 'negative') return 'bg-red-500/20 text-red-400';
    return 'bg-blue-500/20 text-blue-400';
  };

  const getAnalysisText = (score: number) => {
    if (score >= 50) 
      return 'Strongly Positive: The sentiment analysis indicates highly favorable market perception.';
    if (score >= 10) 
      return 'Moderately Positive: The sentiment is generally favorable with some cautionary signals.';
    if (score >= -10)
      return 'Neutral: The sentiment is balanced between positive and negative indicators.';
    if (score >= -50)
      return 'Moderately Negative: The sentiment shows some concerning signals that warrant attention.';
    return 'Strongly Negative: The sentiment analysis indicates significant market concerns.';
  };
  
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Research & Sentiment Analysis</h1>
        <p className="text-gray-400 mt-2">
          Analyze market sentiment and research investment opportunities
        </p>
      </div>
      
      {/* Search Section */}
      <div className="bg-[#111] rounded-xl border border-white/10 shadow-lg p-6 mb-8">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Enter a company, topic, or news query</label>
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                placeholder="e.g. Tesla earnings outlook, Startup funding, AI investments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 rounded-lg font-medium flex items-center justify-center ${
                  isAnalyzing 
                    ? 'bg-blue-500/50 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
                disabled={isAnalyzing}
                type="submit"
              >
                {isAnalyzing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Analyze Sentiment
                  </>
                )}
              </motion.button>
            </div>
          </div>
          
          {/* Recent Searches */}
          <div>
            <div className="text-sm text-gray-400 mb-2">Recent searches:</div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  type="button"
                  className="px-3 py-1.5 bg-[#1a1a1a] text-sm text-gray-300 rounded-md hover:bg-[#222] transition-colors"
                  onClick={() => setSearchQuery(search)}
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>
      
      {/* Results Section */}
      {sentimentResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Sentiment Score */}
          <div className="lg:col-span-1 bg-[#111] rounded-xl border border-white/10 shadow-lg overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">Sentiment Analysis</h2>
            </div>
            
            <div className="p-5">
              <div className="flex flex-col items-center mb-6">
                <div className="relative w-40 h-40">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Background circle */}
                    <circle cx="50" cy="50" r="45" fill="transparent" stroke="#1f2937" strokeWidth="10" />
                    
                    {/* Sentiment score arc */}
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="45" 
                      fill="transparent" 
                      stroke={
                        sentimentResults.overall >= 60 ? "#22c55e" : 
                        sentimentResults.overall >= 20 ? "#4ade80" : 
                        sentimentResults.overall > -20 ? "#3b82f6" : 
                        sentimentResults.overall > -60 ? "#f87171" : 
                        "#ef4444"
                      } 
                      strokeWidth="10" 
                      strokeDasharray={`${(sentimentResults.overall + 100) * 1.413 / 2} 282.6`} 
                      strokeDashoffset="0" 
                      transform="rotate(-90 50 50)" 
                    />
                    
                    {/* Inner white circle */}
                    <circle cx="50" cy="50" r="35" fill="#111" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className={`text-4xl font-bold ${getSentimentColor(sentimentResults.overall / 100)}`}>
                        {((sentimentResults.overall + 100) / 2).toFixed(0)}
                      </div>
                      <div className="text-gray-400 text-xs">Sentiment Score</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <h3 className="text-white font-medium mb-2">Analysis</h3>
                <p className="text-gray-300 text-sm">{getAnalysisText(sentimentResults.overall)}</p>
              </div>
              
              <div>
                <h3 className="text-white font-medium mb-3">Key Factors</h3>
                <div className="space-y-2">
                  {sentimentResults.keywords.map((keyword, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">{keyword.word}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getSentimentBg(keyword.sentiment)}`}>
                        {(keyword.weight * 100).toFixed(0)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* News Headlines */}
          <div className="lg:col-span-2 bg-[#111] rounded-xl border border-white/10 shadow-lg overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">Recent News & Analysis</h2>
            </div>
            
            <div className="p-5 space-y-4">
              {sentimentResults.articles.map((news, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-[#1a1a1a] p-4 rounded-lg border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-white font-medium">{news.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getSentimentBg(news.sentiment)}`}>
                      {news.sentiment}
                    </span>
                  </div>
                  
                  {news.summary && (
                    <p className="text-gray-400 text-sm mt-2 mb-3">{news.summary}</p>
                  )}
                  
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <div className="flex items-center">
                      <span>{news.source}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(news.time).toLocaleDateString()}</span>
                    </div>
                    
                    <a 
                      href={news.url && news.url !== 'https://example.com/news' 
                        ? news.url 
                        : `https://www.google.com/search?q=${encodeURIComponent(news.title)}`
                      }
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                      onClick={(e) => {
                        // Log the URL for debugging
                        console.log('Opening URL:', news.url);
                        
                        // If URL is missing or invalid, use Google search as fallback
                        if (!news.url || news.url === 'https://example.com/news') {
                          e.preventDefault();
                          const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(news.title)}`;
                          console.log('Falling back to search URL:', searchUrl);
                          window.open(searchUrl, '_blank');
                        }
                      }}
                    >
                      Read more
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
} 