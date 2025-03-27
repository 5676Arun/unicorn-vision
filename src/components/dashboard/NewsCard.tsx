"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, ExternalLink, Clock, TrendingUp, TrendingDown, Bookmark, Share2 } from 'lucide-react';
import Image from 'next/image';

interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  imageUrl?: string;
  summary?: string;
  url: string;
}

interface NewsCardProps {
  news: NewsItem[];
}

const defaultNews: NewsItem[] = [
  {
    id: '1',
    title: 'NVIDIA Reports Record Q2 Revenue, Surpassing Analyst Expectations',
    source: 'Financial Times',
    time: '2 hours ago',
    sentiment: 'positive',
    imageUrl: 'https://placehold.co/600x400/2563eb/FFFFFF?text=NVIDIA',
    summary: 'NVIDIA reported a 122% year-over-year increase in revenue, primarily driven by unprecedented demand for AI chips.',
    url: '#'
  },
  {
    id: '2',
    title: 'Fed Signals Potential Rate Cuts as Inflation Pressures Ease',
    source: 'Wall Street Journal',
    time: '5 hours ago',
    sentiment: 'positive',
    url: '#'
  },
  {
    id: '3',
    title: 'Tech Stocks Fall Amid Rising Bond Yields and Profit Taking',
    source: 'Bloomberg',
    time: '7 hours ago',
    sentiment: 'negative',
    url: '#'
  },
  {
    id: '4',
    title: 'New AI Regulation Framework Proposed by EU Commission',
    source: 'Reuters',
    time: '10 hours ago',
    sentiment: 'neutral',
    url: '#'
  },
  {
    id: '5',
    title: "Apple's Latest Product Line Fails to Impress Investors",
    source: 'CNBC',
    time: '12 hours ago',
    sentiment: 'negative',
    url: '#'
  }
];

export default function NewsCard({ news = defaultNews }: Partial<NewsCardProps>) {
  // Get the featured news item (first one)
  const featuredNews = news[0];
  
  // Helper function to render sentiment icon
  const renderSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp size={14} className="text-green-400" />;
      case 'negative':
        return <TrendingDown size={14} className="text-red-400" />;
      default:
        return null;
    }
  };
  
  // Helper function to get sentiment text color
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-400';
      case 'negative':
        return 'text-red-400';
      default:
        return 'text-gray-400';
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
            <Newspaper size={20} className="text-blue-400" />
            Market News
          </h3>
          <button className="text-xs bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 px-3 py-1 rounded-full transition-all">
            All News
          </button>
        </div>
        
        {/* Featured news with image */}
        <div className="mb-6 bg-black/30 rounded-xl overflow-hidden border border-white/5">
          {featuredNews.imageUrl && (
            <div className="relative h-40 w-full">
              <Image
                src={featuredNews.imageUrl}
                alt={featuredNews.title}
                fill
                style={{ objectFit: 'cover' }}
                className="group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            </div>
          )}
          
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <span className="text-xs font-medium text-gray-400">{featuredNews.source}</span>
                <span className="text-xs text-gray-500 flex items-center">
                  <Clock size={12} className="mr-1" />
                  {featuredNews.time}
                </span>
              </div>
              <span className={`text-xs flex items-center ${getSentimentColor(featuredNews.sentiment)}`}>
                {renderSentimentIcon(featuredNews.sentiment)}
                <span className="ml-1 capitalize">{featuredNews.sentiment}</span>
              </span>
            </div>
            
            <h4 className="text-base font-medium text-white mb-2 line-clamp-2">
              {featuredNews.title}
            </h4>
            
            {featuredNews.summary && (
              <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                {featuredNews.summary}
              </p>
            )}
            
            <div className="flex justify-between items-center">
              <a 
                href={featuredNews.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:text-blue-300 flex items-center transition-colors"
              >
                Read Full Article
                <ExternalLink size={12} className="ml-1" />
              </a>
              
              <div className="flex space-x-2">
                <button className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Bookmark size={16} />
                </button>
                <button className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Share2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* News list */}
        <div className="space-y-4">
          {news.slice(1).map((item) => (
            <div 
              key={item.id}
              className="group hover:bg-white/5 p-3 rounded-lg -mx-2 transition-colors border border-transparent hover:border-white/10"
            >
              <div className="flex justify-between items-start mb-1.5">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-gray-400">{item.source}</span>
                  <span className="text-xs text-gray-500 flex items-center">
                    <Clock size={12} className="mr-1" />
                    {item.time}
                  </span>
                </div>
                <span className={`text-xs flex items-center ${getSentimentColor(item.sentiment)}`}>
                  {renderSentimentIcon(item.sentiment)}
                </span>
              </div>
              
              <h4 className="text-sm font-medium text-white mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors">
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {item.title}
                </a>
              </h4>
              
              <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Bookmark size={14} />
                </button>
                <button className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Share2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
} 