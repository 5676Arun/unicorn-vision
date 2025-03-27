"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/ThemeProvider';

export default function SettingsPage() {
  // User profile state
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    profileImage: '/profile-placeholder.jpg'
  });
  
  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    priceAlerts: true,
    newsDigest: false,
    marketReports: true,
    sentimentChanges: true
  });
  
  // Use theme provider
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  // App preferences state
  const [preferences, setPreferences] = useState({
    defaultPage: 'dashboard',
    dataRefreshInterval: '5min'
  });
  
  // API keys state
  const [apiKeys, setApiKeys] = useState([
    { name: 'Financial Data API', key: 'fd_sk_••••••••••••••••', status: 'active' },
    { name: 'News Aggregator API', key: 'na_sk_••••••••••••••••', status: 'active' }
  ]);
  
  // Toggle handlers
  const handleToggle = (setting: string) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting as keyof typeof notificationSettings]
    });
  };
  
  // Theme change handler now uses the ThemeProvider
  const handleThemeChange = (newTheme: 'dark' | 'light' | 'system') => {
    setTheme(newTheme);
  };
  
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 mt-2">Manage your account and application preferences</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="col-span-1 bg-[#111] rounded-xl border border-white/10 shadow-lg overflow-hidden"
        >
          <div className="p-4 border-b border-white/10">
            <h2 className="text-xl font-bold text-white">Profile</h2>
          </div>
          
          <div className="p-5">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                JD
              </div>
              <button className="mt-4 text-sm text-blue-400 hover:text-blue-300">
                Change Profile Photo
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1">Full Name</label>
                <input 
                  type="text" 
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-1">Email Address</label>
                <input 
                  type="email" 
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-1">Password</label>
                <input 
                  type="password" 
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white"
                  value="••••••••••••"
                  readOnly
                />
                <button className="mt-2 text-sm text-blue-400 hover:text-blue-300">
                  Change Password
                </button>
              </div>
            </div>
            
            <div className="mt-6">
              <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                Save Changes
              </button>
            </div>
          </div>
        </motion.div>
        
        {/* Notifications Settings */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="col-span-1 bg-[#111] rounded-xl border border-white/10 shadow-lg overflow-hidden"
        >
          <div className="p-4 border-b border-white/10">
            <h2 className="text-xl font-bold text-white">Notifications</h2>
          </div>
          
          <div className="p-5">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Email Alerts</h3>
                  <p className="text-gray-400 text-sm mt-1">Receive important alerts via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={notificationSettings.emailAlerts}
                    onChange={() => handleToggle('emailAlerts')}
                  />
                  <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Price Alerts</h3>
                  <p className="text-gray-400 text-sm mt-1">Notifications for price movements</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={notificationSettings.priceAlerts}
                    onChange={() => handleToggle('priceAlerts')}
                  />
                  <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Daily News Digest</h3>
                  <p className="text-gray-400 text-sm mt-1">Daily summary of relevant news</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={notificationSettings.newsDigest}
                    onChange={() => handleToggle('newsDigest')}
                  />
                  <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Market Reports</h3>
                  <p className="text-gray-400 text-sm mt-1">Weekly market analysis reports</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={notificationSettings.marketReports}
                    onChange={() => handleToggle('marketReports')}
                  />
                  <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Sentiment Changes</h3>
                  <p className="text-gray-400 text-sm mt-1">Alerts for major sentiment shifts</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={notificationSettings.sentimentChanges}
                    onChange={() => handleToggle('sentimentChanges')}
                  />
                  <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
            
            <div className="mt-6">
              <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                Save Preferences
              </button>
            </div>
          </div>
        </motion.div>
        
        {/* App Settings */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="col-span-1 bg-[#111] rounded-xl border border-white/10 shadow-lg overflow-hidden"
        >
          <div className="p-4 border-b border-white/10">
            <h2 className="text-xl font-bold text-white">App Settings</h2>
          </div>
          
          <div className="p-5">
            <div className="space-y-5">
              <div>
                <h3 className="text-white font-medium mb-2">Theme</h3>
                <div className="grid grid-cols-3 gap-3">
                  <button 
                    onClick={() => handleThemeChange('dark')} 
                    className={`p-3 rounded-lg flex flex-col items-center ${
                      theme === 'dark' 
                        ? 'bg-blue-600' 
                        : 'bg-[#1a1a1a] hover:bg-[#222]'
                    }`}
                  >
                    <div className="w-8 h-8 bg-gray-800 rounded-full mb-2 border border-gray-700"></div>
                    <span className="text-sm text-gray-300">Dark</span>
                  </button>
                  
                  <button 
                    onClick={() => handleThemeChange('light')} 
                    className={`p-3 rounded-lg flex flex-col items-center ${
                      theme === 'light' 
                        ? 'bg-blue-600' 
                        : 'bg-[#1a1a1a] hover:bg-[#222]'
                    }`}
                  >
                    <div className="w-8 h-8 bg-gray-200 rounded-full mb-2 border border-gray-300"></div>
                    <span className="text-sm text-gray-300">Light</span>
                  </button>
                  
                  <button 
                    onClick={() => handleThemeChange('system')} 
                    className={`p-3 rounded-lg flex flex-col items-center ${
                      theme === 'system' 
                        ? 'bg-blue-600' 
                        : 'bg-[#1a1a1a] hover:bg-[#222]'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full mb-2 border border-gray-700 bg-gradient-to-r from-gray-800 to-gray-200"></div>
                    <span className="text-sm text-gray-300">System</span>
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-white font-medium mb-2">Default Landing Page</h3>
                <select 
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white"
                  value={preferences.defaultPage}
                  onChange={(e) => setPreferences({...preferences, defaultPage: e.target.value})}
                >
                  <option value="dashboard">Dashboard</option>
                  <option value="portfolio">Portfolio</option>
                  <option value="research">Research</option>
                  <option value="council">AI Council</option>
                </select>
              </div>
              
              <div>
                <h3 className="text-white font-medium mb-2">Data Refresh Interval</h3>
                <select 
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white"
                  value={preferences.dataRefreshInterval}
                  onChange={(e) => setPreferences({...preferences, dataRefreshInterval: e.target.value})}
                >
                  <option value="1min">Every minute</option>
                  <option value="5min">Every 5 minutes</option>
                  <option value="15min">Every 15 minutes</option>
                  <option value="30min">Every 30 minutes</option>
                  <option value="1hour">Every hour</option>
                  <option value="manual">Manual refresh only</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 pt-5 border-t border-white/10">
              <h3 className="text-white font-medium mb-3">API Connections</h3>
              
              {apiKeys.map((api, index) => (
                <div key={index} className="flex justify-between items-center mb-3 p-3 bg-[#1a1a1a] rounded-lg">
                  <div>
                    <div className="text-white">{api.name}</div>
                    <div className="text-gray-400 text-sm">{api.key}</div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    api.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {api.status}
                  </div>
                </div>
              ))}
              
              <button className="mt-3 w-full py-2 bg-[#1a1a1a] hover:bg-[#222] text-white rounded-lg border border-white/10">
                <span className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add New API Key
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 