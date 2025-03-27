"use client";

import Navbar from '../components/ui/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Dashboard from '../components/Dashboard';
import AiFeatures from '@/components/AiFeatures';
import DataComparison from '@/components/DataComparison';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <Hero />
      <Features />
      <Dashboard />
      <AiFeatures />
      <DataComparison />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}
