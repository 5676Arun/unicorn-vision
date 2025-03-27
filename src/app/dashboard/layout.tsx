"use client";

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ChatbotButton from '@/components/dashboard/ChatbotButton';

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <DashboardLayout>
        {children}
      </DashboardLayout>
      
      {/* Floating chatbot button - shared across all dashboard pages */}
      <ChatbotButton />
    </div>
  );
} 