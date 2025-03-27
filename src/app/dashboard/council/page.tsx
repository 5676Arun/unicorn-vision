"use client";

import React from 'react';
import InvestmentCouncil from '@/components/dashboard/InvestmentCouncil';

export default function CouncilPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">AI Investment Council</h1>
        <p className="text-gray-400 mt-2">Multi-agent AI system that debates startup investment opportunities</p>
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        <InvestmentCouncil />
      </div>
    </div>
  );
} 