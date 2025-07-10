'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  interest: string;
  message: string;
}

interface StaticContactFormProps {
  className?: string;
}

export function StaticContactForm({ className = '' }: StaticContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    interest: 'Solar Home Systems',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const interestOptions = [
    'Solar Home Systems',
    'Commercial Solar Solutions',
    'Clean Cooking Technology',
    'Energy Storage Systems',
    'Technical Support',
    'Partnership Opportunities',
    'Investment Opportunities',
    'General Inquiry'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateEmailBody = () => {
    return `
Subject: ${formData.subject}
Interest: ${formData.interest}
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Message:
${formData.message}

---
Sent from GREAN WORLD Contact Form
Date: ${new Date().toLocaleString()}
    `.trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create mailto link for static hosting
      const emailBody = generateEmailBody();
      const mailtoLink = `mailto:info@greanworld.com?subject=${encodeURIComponent(`[GREAN WORLD Contact] ${formData.subject} - ${formData.interest}`)}&body=${encodeURIComponent(emailBody)}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Show success message
      setSubmitStatus('success');
      
      // Reset form after delay
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          interest: 'Solar Home Systems',
          message: ''
        });
        setSubmitStatus('idle');
      }, 3000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDirectContact = (method: 'email' | 'phone' | 'whatsapp') => {
    switch (method) {
      case 'email':
        window.location.href = 'mailto:info@greanworld.com';
        break;
      case 'phone':
        window.location.href = 'tel:+251913330000';
        break;
      case 'whatsapp':
        window.open('https://wa.me/251913330000', '_blank');
        break;
    }
  };

  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name and Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#3dd56d] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="Your full name"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#3dd56d] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        {/* Phone and Interest Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#3dd56d] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="+251 XXX XXXXXX"
            />
          </div>
          
          <div>
            <label htmlFor="interest" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Area of Interest *
            </label>
            <select
              id="interest"
              name="interest"
              value={formData.interest}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#3dd56d] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {interestOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#3dd56d] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="Brief subject of your inquiry"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#3dd56d] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-vertical"
            placeholder="Please describe your inquiry in detail..."
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-[#3dd56d] to-[#2bb757] text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-[#3dd56d]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Opening Email Client...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Message via Email
            </>
          )}
        </motion.button>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg text-green-800 dark:text-green-300"
          >
            ✅ Email client opened! Please send the email to complete your inquiry.
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg text-red-800 dark:text-red-300"
          >
            ❌ Unable to open email client. Please contact us directly using the methods below.
          </motion.div>
        )}
      </form>

      {/* Direct Contact Options */}
      <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Alternative Contact Methods
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => handleDirectContact('email')}
            className="flex items-center gap-2 p-3 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-[#3dd56d]"
          >
            <Mail className="w-5 h-5" />
            <div className="text-left">
              <div className="font-medium">Email</div>
              <div className="text-sm">info@greanworld.com</div>
            </div>
          </button>
          
          <button
            onClick={() => handleDirectContact('phone')}
            className="flex items-center gap-2 p-3 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-[#3dd56d]"
          >
            <Phone className="w-5 h-5" />
            <div className="text-left">
              <div className="font-medium">Phone</div>
              <div className="text-sm">+251 913 330000</div>
            </div>
          </button>
          
          <button
            onClick={() => handleDirectContact('whatsapp')}
            className="flex items-center gap-2 p-3 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-[#3dd56d]"
          >
            <ExternalLink className="w-5 h-5" />
            <div className="text-left">
              <div className="font-medium">WhatsApp</div>
              <div className="text-sm">+251 913 330000</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
