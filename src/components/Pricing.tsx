"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const Pricing = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const plans = [
    {
      name: "Basic",
      price: "Free",
      description: "Perfect to get started and explore the platform",
      features: [
        "Unlimited stock watchlists",
        "Basic financial data",
        "3 AI queries per day",
        "News aggregation",
        "Community forum access"
      ],
      highlighted: false,
      cta: "Get Started Free",
      ctaColor: "bg-gradient-to-r from-gray-500 to-gray-600"
    },
    {
      name: "Pro",
      price: "$29",
      period: "per month",
      description: "Everything you need for serious investing",
      features: [
        "All Basic features",
        "Unlimited AI queries",
        "Access to premium data sources",
        "Excel/CSV export",
        "Advanced chart patterns",
        "Technical indicators",
        "Custom alerts"
      ],
      highlighted: true,
      cta: "Start 14-Day Free Trial",
      ctaColor: "bg-gradient-to-r from-red-600 to-orange-500"
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For professional investors and teams",
      features: [
        "All Pro features",
        "API access",
        "Dedicated account manager",
        "Custom data integrations",
        "Team collaboration",
        "SSO authentication",
        "Audit logs"
      ],
      highlighted: false,
      cta: "Contact Sales",
      ctaColor: "bg-gradient-to-r from-blue-600 to-indigo-600"
    }
  ];

  return (
    <section ref={ref} id="pricing" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[#0a0a0a] bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:32px_32px] opacity-20"></div>
      
      {/* Background glow effects */}
      <motion.div 
        animate={{ 
          opacity: [0.4, 0.6, 0.4],
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
        className="absolute top-40 -left-40 w-80 h-80 bg-red-500/10 rounded-full blur-[100px]"
      />
      
      <motion.div 
        animate={{ 
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
        className="absolute bottom-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-[100px]"
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs py-1 px-3 rounded-full border border-red-500/20 uppercase tracking-widest font-semibold text-white bg-red-500/10 mb-4"
          >
            Pricing Plans
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-300"
          >
            Find the perfect plan for your needs
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-300"
          >
            Choose the plan that works best for you. All plans include a 14-day free trial with no credit card required.
          </motion.p>
          
          {/* Switch Annual/Monthly */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 inline-flex items-center bg-white/5 p-1 rounded-full"
          >
            <button className="px-4 py-2 text-sm rounded-full bg-gradient-to-r from-red-600 to-orange-500 text-white font-medium">
              Monthly
            </button>
            <button className="px-4 py-2 text-sm rounded-full text-gray-300 font-medium hover:text-white transition-colors">
              Annual
            </button>
          </motion.div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
              className={`relative rounded-2xl overflow-hidden ${plan.highlighted ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              {/* Card Background with Gradient Border */}
              <div className={`absolute inset-0 rounded-2xl ${plan.highlighted ? 'bg-gradient-to-b from-red-500/30 via-red-500/5 to-transparent' : 'bg-white/5'} p-[1px]`}>
                <div className="absolute inset-[1px] bg-[#0f0f0f] rounded-2xl"></div>
              </div>
              
              {/* Popular Badge */}
              {plan.highlighted && (
                <div className="absolute top-0 right-0">
                  <div className="relative bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold py-1 px-3 rounded-bl-lg rounded-tr-lg">
                    MOST POPULAR
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-white/20 rounded-bl-lg rounded-tr-lg"
                    ></motion.div>
                  </div>
                </div>
              )}
              
              <div className="relative p-8 h-full flex flex-col">
                <h3 className="text-white text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.period && <span className="text-gray-400 ml-1">{plan.period}</span>}
                </div>
                <p className="text-gray-300 mb-6">{plan.description}</p>
                
                <div className="flex-grow">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <motion.li 
                        key={idx} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) + (idx * 0.05) }}
                        className="flex items-start"
                      >
                        <svg className="h-5 w-5 text-green-400 shrink-0 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <span className="text-gray-300">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                <Link href="/dashboard">
                  <motion.button 
                    whileHover={{ scale: 1.03, boxShadow: `0 10px 25px -5px rgba(239, 68, 68, ${plan.highlighted ? '0.3' : '0.1'})` }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 px-6 rounded-lg font-medium text-white relative overflow-hidden group ${plan.ctaColor}`}
                  >
                    <span className="relative z-10">{plan.cta}</span>
                    <div className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </motion.button>
                </Link>
                
                {/* Decorative elements */}
                {plan.highlighted && (
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, 0, -10, 0],
                    }}
                    transition={{
                      duration: 12,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -right-8 -top-8 w-16 h-16 rounded-full border border-red-500/10 z-0"
                  ></motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Enterprise Custom Plan */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 relative p-8 bg-[#0f0f0f] rounded-2xl border border-white/10 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-orange-500/5"></div>
          
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:max-w-lg">
              <h3 className="text-2xl font-bold text-white mb-4">Need something different?</h3>
              <p className="text-gray-300 mb-6">
                We offer custom solutions for larger teams and enterprises. Contact our sales team to discuss your specific needs and get a tailored quote.
              </p>
              <ul className="grid grid-cols-2 gap-x-8 gap-y-3 mb-8">
                {[
                  "Custom data sources",
                  "Dedicated support",
                  "Volume discounts",
                  "SLA guarantees",
                  "Enterprise SSO",
                  "Custom training"
                ].map((feature, idx) => (
                  <motion.li 
                    key={idx} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.4, delay: 0.9 + (idx * 0.05) }}
                    className="flex items-start"
                  >
                    <svg className="h-5 w-5 text-green-400 shrink-0 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-gray-300">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="shrink-0"
            >
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-4 rounded-lg font-medium text-white group"
              >
                <span className="relative z-10 flex items-center">
                  Contact Sales
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
                <div className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.button>
            </motion.div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-12 -right-12 w-32 h-32 border border-white/5 rounded-full"></div>
          <div className="absolute -bottom-8 -left-8 w-24 h-24 border border-white/5 rounded-full"></div>
        </motion.div>
        
        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="text-3xl font-bold text-white mb-4"
            >
              Frequently Asked Questions
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="text-gray-300"
            >
              Still have questions? Contact our <a href="#" className="text-red-400 hover:text-red-300 transition-colors">support team</a>
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                question: "How does the 14-day free trial work?",
                answer: "You can sign up for any plan and try all features for 14 days without being charged. No credit card required during the trial period."
              },
              {
                question: "Can I change plans later?",
                answer: "Yes, you can upgrade, downgrade, or cancel your plan at any time through your account settings."
              },
              {
                question: "Is there a limit to AI queries?",
                answer: "Free accounts are limited to 3 AI queries per day. Pro and Enterprise plans offer unlimited AI queries."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and for Enterprise plans, we can also support invoicing."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 1.2 + (index * 0.1) }}
                className="p-6 bg-[#0f0f0f] rounded-xl border border-white/10"
              >
                <h4 className="text-white font-medium text-lg mb-3">{faq.question}</h4>
                <p className="text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing; 