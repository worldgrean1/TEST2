'use client';

import {
  Phone,
  MessageSquare,
  MapPin,
  Send,
  Users,
  Mail,
  SunMedium,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/hooks/useTheme';
import { useEffect, useState, useRef } from 'react';
import { TypingTextAnimation } from '@/components/animations/text/TypingTextAnimation';

// Official Brand CSS from Brand Guidelines
const brandCSS = `
  /* Official GREAN WORLD Brand Colors - 60-30-10 Rule */
  :root {
    --grean-primary: #3dd56d;
    --grean-secondary: #2bb757;
    --grean-accent: #23a455;
  }

  /* Official Brand Typography Classes */
  .typography-display {
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.02em;
  }

  .typography-h1 {
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.01em;
  }

  .typography-h2 {
    font-weight: 600;
    line-height: 1.25;
  }

  .typography-h3 {
    font-weight: 600;
    line-height: 1.3;
  }

  .typography-body {
    font-weight: 400;
    line-height: 1.6;
  }

  .typography-small {
    font-weight: 500;
    line-height: 1.4;
  }

  /* GreenContact Animation Keyframes */
  @keyframes slideInFromLeft {
    0% {
      opacity: 0;
      transform: translateX(-100px) scale(0.95);
    }
    100% {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
  }

  @keyframes slideInFromRight {
    0% {
      opacity: 0;
      transform: translateX(100px) scale(0.95);
    }
    100% {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
  }

  @keyframes fadeInScale {
    0% {
      opacity: 0;
      transform: scale(0.8);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes slideOutToLeft {
    0% {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
    100% {
      opacity: 0;
      transform: translateX(-100px) scale(0.95);
    }
  }

  @keyframes slideOutToRight {
    0% {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
    100% {
      opacity: 0;
      transform: translateX(100px) scale(0.95);
    }
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  /* Animation Classes */
  .card-slide-in-left {
    animation: slideInFromLeft 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }

  .card-slide-in-right {
    animation: slideInFromRight 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }

  .card-fade-in-scale {
    animation: fadeInScale 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }

  .card-slide-out-left {
    animation: slideOutToLeft 0.6s cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards;
  }

  .card-slide-out-right {
    animation: slideOutToRight 0.6s cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards;
  }

  .card-pulse {
    animation: pulse 2s infinite;
  }

  /* Initial hidden state */
  .card-hidden {
    opacity: 0;
    transform: translateY(80px) scale(0.95);
  }

  /* Form field animations */
  .field-fade-in {
    animation: fadeInScale 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }
`;

// Custom hook for intersection observer
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasAnimated, options]);

  return { ref, isIntersecting, hasAnimated };
};

// Component props type
interface GreenContactProps {
  noSeam?: boolean;
}

export default function GreenContact({ noSeam = false }: GreenContactProps) {
  const { effectiveTheme, isDark, isLight } = useTheme();

  // Animation states for different sections
  const contactForm = useIntersectionObserver();
  const contactInfo = useIntersectionObserver();
  const formFields = useIntersectionObserver();
  const contactButtons = useIntersectionObserver();

  // Separate ref for the form element
  const formRef = useRef<HTMLFormElement>(null);

  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  // Enhanced client-side validation with better error messages
  const validateForm = (data: any) => {
    const errors: string[] = [];

    // Name validation
    if (!data.name || data.name.toString().trim().length < 2) {
      errors.push('📝 Full name is required (minimum 2 characters)');
    }

    // Email validation with improved regex
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!data.email || !emailRegex.test(data.email.toString().trim())) {
      errors.push('📧 Please enter a valid email address (e.g., name@example.com)');
    }

    // Subject validation
    if (!data.subject || data.subject.toString().trim().length < 3) {
      errors.push('💬 Subject is required (minimum 3 characters)');
    }

    // Interest validation
    if (!data.interest) {
      errors.push('🎯 Please select what you are interested in from the dropdown');
    }

    // Message validation
    if (!data.message || data.message.toString().trim().length < 10) {
      errors.push('✍️ Message is required (minimum 10 characters to help us understand your needs)');
    }

    // Phone validation (if provided)
    if (data.phone && data.phone.toString().trim().length > 0) {
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{7,}$/;
      if (!phoneRegex.test(data.phone.toString().trim())) {
        errors.push('📞 Please enter a valid phone number (optional field)');
      }
    }

    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        interest: formData.get('interest'),
        message: formData.get('message'),
      };

      // Client-side validation
      const validationErrors = validateForm(data);
      if (validationErrors.length > 0) {
        setSubmitStatus('error');
        setSubmitMessage(`Please fix the following issues:\n\n${validationErrors.join('\n')}`);
        setIsSubmitting(false);
        return;
      }

      // Show sending message with progress indicator
      setSubmitMessage('🚀 Sending your message... Please wait a moment.');

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('🎉 Message sent successfully!\n\n✅ We will get back to you within 24 hours\n📧 Check your email for confirmation\n💚 Thank you for choosing GREAN WORLD!');
        formRef.current?.reset();

        // Auto-hide success message after 12 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
          setSubmitMessage('');
        }, 12000);
      } else {
        setSubmitStatus('error');
        if (response.status === 400) {
          setSubmitMessage(`❌ Form validation failed\n\n${result.error || 'Please check your input and try again.'}\n\n💡 Make sure all required fields are filled correctly.`);
        } else if (response.status === 500) {
          setSubmitMessage('❌ Server error occurred\n\nPlease try again later or contact us directly:\n📧 info@greanworld.com\n📞 (+251) 913 330000');
        } else {
          setSubmitMessage(`❌ ${result.error || 'Failed to send message'}\n\n🔄 Please try again or contact us directly if the problem persists.`);
        }
      }
    } catch (error) {
      setSubmitStatus('error');
      if (error instanceof TypeError && error.message.includes('fetch')) {
        setSubmitMessage('🌐 Network connection error\n\n📡 Please check your internet connection and try again.\n\n💡 If you continue to have issues, contact us directly:\n📧 info@greanworld.com\n📞 (+251) 913 330000');
      } else {
        setSubmitMessage('⚠️ An unexpected error occurred\n\n🔄 Please try again in a moment.\n\n📞 Need immediate assistance?\nCall us at (+251) 913 330000\n📧 Email: info@greanworld.com');
      }
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Inject brand CSS
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = brandCSS;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <section
      id="green-contact"
      className="relative w-full min-h-screen flex flex-col justify-center px-4 sm:px-6 py-8 sm:py-12 lg:py-16"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #011428 0%, #021428 50%, #012818 100%)'
          : 'linear-gradient(135deg, hsl(120, 30%, 98%) 0%, hsl(140, 25%, 95%) 25%, hsl(160, 20%, 92%) 50%, hsl(120, 15%, 94%) 75%, hsl(100, 20%, 96%) 100%)',
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-10 w-32 h-32 rounded-full opacity-20 animate-pulse ${
          isDark ? 'bg-[#3DD56D]' : 'bg-[#2bb757]'
        }`}></div>
        <div className={`absolute top-40 right-20 w-24 h-24 rounded-full opacity-15 animate-bounce ${
          isDark ? 'bg-[#3DD56D]' : 'bg-[#2bb757]'
        }`} style={{ animationDelay: '1s' }}></div>
        <div className={`absolute bottom-32 left-1/4 w-20 h-20 rounded-full opacity-10 animate-pulse ${
          isDark ? 'bg-[#3DD56D]' : 'bg-[#2bb757]'
        }`} style={{ animationDelay: '2s' }}></div>
        <div className={`absolute bottom-20 right-1/3 w-28 h-28 rounded-full opacity-25 animate-bounce ${
          isDark ? 'bg-[#3DD56D]' : 'bg-[#2bb757]'
        }`} style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Contact Hero Section - Compact for Desktop */}
      <div className="max-w-6xl mx-auto text-center mb-8 lg:mb-12 relative z-10">
        <div className={`inline-flex items-center rounded-full px-6 py-3 text-sm font-medium mb-6 shadow-xl typography-small backdrop-blur-sm ${
          isDark
            ? 'bg-[#3DD56D]/20 text-[#3DD56D] border border-[#3DD56D]/30'
            : 'bg-[#2bb757]/20 text-[#2bb757] border border-[#2bb757]/30'
        }`}>
          <Mail className="mr-2 h-5 w-5" /> Contact Us
        </div>
        <div className="mb-6">
          <h1 className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight text-center ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            <TypingTextAnimation
              text="Let's Connect & Transform Energy Together"
              speed="medium"
              className="inline-block"
            />
          </h1>
        </div>
        <p
          className={`typography-body text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-8 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          Ready to power your future with sustainable energy? Our expert team is here to guide you through solar solutions,
          clean cooking technologies, and energy consulting services.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
          <a href="#contact-form" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-lg font-bold px-8 py-4 text-white shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 min-h-[48px] touch-friendly bg-gradient-to-r from-[#3DD56D] to-[#2bb757] hover:from-[#2bb757] hover:to-[#3DD56D] focus:ring-[#3DD56D]">
              <Send className="mr-2 h-5 w-5" /> Send a Message
            </button>
          </a>
          <a href="tel:+251913330000" className="w-full sm:w-auto">
            <button
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-lg font-bold px-8 py-4 border-2 shadow-xl hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 min-h-[48px] touch-friendly border-[#3DD56D] text-[#3DD56D] hover:bg-[#3DD56D]/10 hover:scale-105 focus:ring-[#3DD56D] backdrop-blur-sm ${
                isDark ? 'bg-slate-800/80' : 'bg-white/80'
              }`}
            >
              <Phone className="mr-2 h-5 w-5" /> Call Now
            </button>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex-1">
        {/* Professional Layout: Form on Left, Contact Info + Map on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Contact Form Section - Left Side */}
          <div
            ref={contactForm.ref}
            className={`rounded-3xl p-6 sm:p-8 shadow-2xl hover:shadow-3xl overflow-hidden relative group transition-all duration-500 backdrop-blur-sm h-full flex flex-col ${
              isDark
                ? 'bg-gradient-to-br from-slate-800/90 to-slate-900/70 border border-slate-700/50'
                : 'bg-gradient-to-br from-white/95 to-green-50/80 border border-green-200/50'
            } ${
              contactForm.hasAnimated
                ? (contactForm.isIntersecting ? 'card-slide-in-left' : 'card-slide-out-left')
                : 'card-hidden'
            }`}
          >
            {/* Enhanced decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#3DD56D]/5 via-transparent to-[#2bb757]/5 opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#3DD56D]/20 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#2bb757]/15 to-transparent rounded-full blur-xl"></div>

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center mb-6">
                <div
                  className={`p-3 rounded-2xl mr-4 shadow-lg backdrop-blur-sm ${
                    isDark
                      ? 'bg-gradient-to-br from-[#3DD56D]/30 to-[#2bb757]/20 text-[#3DD56D]'
                      : 'bg-gradient-to-br from-[#2bb757]/30 to-[#3DD56D]/20 text-[#2bb757]'
                  }`}
                >
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <h2
                    className={`text-2xl lg:text-3xl font-bold mb-1 ${
                      isDark ? 'text-white' : 'text-small-title'
                    }`}
                  >
                    Send us a message
                  </h2>
                  <p
                    className={`text-sm ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    ⚡ Quick response within 24 hours guaranteed
                  </p>
                </div>
              </div>
              <form
                id="contact-form"
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-4 flex-1 flex flex-col"
                noValidate
              >
                {/* Full Name and Email Address Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-white font-semibold" htmlFor="name">
                      Full Name
                    </label>
                    <div className="relative group">
                      <input
                        className="flex w-full border px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3DD56D] focus:border-[#3DD56D] transition-all duration-300 h-12 pl-10 rounded-lg shadow-sm text-white placeholder:text-gray-400 bg-slate-800/80 border-slate-600/60"
                        id="name"
                        placeholder="Your name"
                        required
                        name="name"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 group-focus-within:text-[#3DD56D] transition-colors text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-semibold text-sm text-white" htmlFor="email">
                      Email Address
                    </label>
                    <div className="relative group">
                      <input
                        className="flex w-full border px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3DD56D] focus:border-[#3DD56D] transition-all duration-300 h-12 pl-10 rounded-lg shadow-sm text-white placeholder:text-gray-400 bg-slate-800/80 border-slate-600/60"
                        id="email"
                        placeholder="Your email"
                        required
                        type="email"
                        name="email"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 group-focus-within:text-[#3DD56D] transition-colors text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                          <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Phone Number and Subject Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <label className="font-semibold text-sm text-white" htmlFor="phone">
                      Phone Number
                    </label>
                    <div className="relative group">
                      <input
                        className="flex w-full border px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3DD56D] focus:border-[#3DD56D] transition-all duration-300 h-12 pl-10 rounded-lg shadow-sm text-white placeholder:text-gray-400 bg-slate-800/80 border-slate-600/60"
                        id="phone"
                        placeholder="Your phone (optional)"
                        name="phone"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 group-focus-within:text-[#3DD56D] transition-colors text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-semibold text-sm text-white" htmlFor="subject">
                      Subject
                    </label>
                    <div className="relative group">
                      <input
                        className="flex w-full border px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3DD56D] focus:border-[#3DD56D] transition-all duration-300 h-12 pl-10 rounded-lg shadow-sm text-white placeholder:text-gray-400 bg-slate-800/80 border-slate-600/60"
                        id="subject"
                        placeholder="How can we help?"
                        required
                        name="subject"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 group-focus-within:text-[#3DD56D] transition-colors text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                          <circle cx="12" cy="12" r="4"></circle>
                          <path d="M12 2v2"></path>
                          <path d="M12 20v2"></path>
                          <path d="m4.93 4.93 1.41 1.41"></path>
                          <path d="m17.66 17.66 1.41 1.41"></path>
                          <path d="M2 12h2"></path>
                          <path d="M20 12h2"></path>
                          <path d="m6.34 17.66-1.41 1.41"></path>
                          <path d="m19.07 4.93-1.41 1.41"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                {/* I'm Interested In Dropdown */}
                <div className="space-y-2">
                  <label className="font-semibold text-sm text-white" htmlFor="interest">
                    I'm Interested In
                  </label>
                  <div className="relative group">
                    <select
                      className="flex w-full border px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3DD56D] focus:border-[#3DD56D] transition-all duration-300 h-12 pl-10 pr-10 rounded-lg shadow-sm appearance-none text-white bg-slate-800/80 border-slate-600/60"
                      id="interest"
                      name="interest"
                      required
                    >
                      <option value="">Select your interest...</option>
                      <option value="solar-energy-solutions">Solar Energy Solutions</option>
                      <option value="clean-cooking-stoves">Clean Cooking Stoves</option>
                      <option value="energy-consulting">Energy Consulting</option>
                      <option value="business-partnership">Business Partnership</option>
                      <option value="general-inquiry">General Inquiry</option>
                    </select>
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 group-focus-within:text-[#3DD56D] transition-colors pointer-events-none text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <circle cx="12" cy="12" r="4"></circle>
                        <path d="M12 2v2"></path>
                        <path d="M12 20v2"></path>
                        <path d="m4.93 4.93 1.41 1.41"></path>
                        <path d="m17.66 17.66 1.41 1.41"></path>
                        <path d="M2 12h2"></path>
                        <path d="M20 12h2"></path>
                        <path d="m6.34 17.66-1.41 1.41"></path>
                        <path d="m19.07 4.93-1.41 1.41"></path>
                      </svg>
                    </div>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="m6 9 6 6 6-6"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                {/* Your Message Textarea */}
                <div className="space-y-2 flex-1">
                  <label className="font-semibold text-sm text-white" htmlFor="message">
                    Your Message
                  </label>
                  <div className="relative group h-full">
                    <textarea
                      className="flex w-full border px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3DD56D] focus-visible:ring-offset-2 transition-all duration-300 h-full min-h-[160px] pl-10 pt-3 rounded-lg shadow-sm resize-none text-white placeholder:text-gray-400 bg-slate-800/80 border-slate-600/60"
                      id="message"
                      name="message"
                      placeholder="Tell us more about your needs..."
                      required
                    ></textarea>
                    <div className="absolute left-3 top-3 group-focus-within:text-[#3DD56D] transition-colors text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="m22 2-7 20-4-9-9-4Z"></path>
                        <path d="M22 2 11 13"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                {/* Status Messages */}
                {submitStatus !== 'idle' && (
                  <div className={`p-4 rounded-lg border transition-all duration-300 ${
                    submitStatus === 'success'
                      ? isDark
                        ? 'bg-green-900/20 border-green-500/30 text-green-300'
                        : 'bg-green-50 border-green-200 text-green-800'
                      : isDark
                        ? 'bg-red-900/20 border-red-500/30 text-red-300'
                        : 'bg-red-50 border-red-200 text-red-800'
                  }`}>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        {submitStatus === 'success' ? (
                          <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium whitespace-pre-line">
                          {submitMessage}
                        </div>
                        {submitStatus === 'success' && (
                          <div className={`mt-2 text-xs ${
                            isDark ? 'text-green-400' : 'text-green-600'
                          }`}>
                            💡 Tip: Check your email for a confirmation message from our team.
                          </div>
                        )}
                        {submitStatus === 'error' && (
                          <div className={`mt-2 text-xs ${
                            isDark ? 'text-red-400' : 'text-red-600'
                          }`}>
                            💡 Need immediate help? Call us at (+251) 913 330000 or email info@greanworld.com
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          setSubmitStatus('idle');
                          setSubmitMessage('');
                        }}
                        className={`ml-2 flex-shrink-0 p-1 rounded-full hover:bg-opacity-20 transition-colors ${
                          submitStatus === 'success'
                            ? 'hover:bg-green-500'
                            : 'hover:bg-red-500'
                        }`}
                        title="Close message"
                      >
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-lg font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 text-white w-full group relative overflow-hidden rounded-full h-14 shadow-lg hover:shadow-xl bg-gradient-to-r from-[#3DD56D] to-[#2bb757] hover:from-[#2bb757] hover:to-[#3DD56D] focus-visible:ring-[#3DD56D] hover:scale-105"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    <span className="relative z-10 flex items-center justify-center text-base font-medium">
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <span className="ml-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                              <path d="m22 2-7 20-4-9-9-4Z"></path>
                              <path d="M22 2 11 13"></path>
                            </svg>
                          </span>
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Contact Information & Map Section - Right Side */}
          <div
            ref={contactInfo.ref}
            className={`space-y-6 h-full flex flex-col ${
              contactInfo.hasAnimated
                ? (contactInfo.isIntersecting ? 'card-slide-in-right' : 'card-slide-out-right')
                : 'card-hidden'
            }`}
          >
            {/* Contact Information Card */}
            <div
              className={`rounded-3xl p-6 shadow-2xl hover:shadow-3xl relative overflow-hidden group transition-all duration-500 backdrop-blur-sm ${
                isDark
                  ? 'bg-gradient-to-br from-slate-800/90 to-slate-900/70 border border-slate-700/50'
                  : 'bg-gradient-to-br from-white/95 to-green-50/80 border border-green-200/50'
              }`}
            >
              {/* Enhanced decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#3DD56D]/5 via-transparent to-[#2bb757]/5 opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#3DD56D]/20 to-transparent rounded-full blur-xl"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-[#2bb757]/15 to-transparent rounded-full blur-lg"></div>

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center mb-6">
                  <div
                    className={`p-4 rounded-2xl mr-4 shadow-lg backdrop-blur-sm ${
                      isDark
                        ? 'bg-gradient-to-br from-[#3DD56D]/30 to-[#2bb757]/20 text-[#3DD56D]'
                        : 'bg-gradient-to-br from-[#2bb757]/30 to-[#3DD56D]/20 text-[#2bb757]'
                    }`}
                  >
                    <MapPin className="h-7 w-7" />
                  </div>
                  <div>
                    <h3
                      className={`text-2xl lg:text-3xl font-bold mb-2 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      Contact Information
                    </h3>
                    <p
                      className={`text-base ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      🌍 Reach us anytime, anywhere
                    </p>
                  </div>
                </div>

                {/* Contact Details - Enhanced Layout */}
                <div className="space-y-6">
                  {/* Location */}
                  <div className="flex items-start group hover:scale-105 transition-transform duration-300">
                    <div
                      className={`p-4 rounded-xl mr-4 mt-1 shadow-lg backdrop-blur-sm group-hover:shadow-xl transition-all duration-300 ${
                        isDark
                          ? 'bg-gradient-to-br from-slate-700/80 to-slate-800/60 border border-slate-600/50'
                          : 'bg-gradient-to-br from-green-100/80 to-green-50/60 border border-green-200/50'
                      }`}
                    >
                      <MapPin className="h-6 w-6 text-[#3DD56D]" />
                    </div>
                    <div className="flex-1">
                      <p
                        className={`font-semibold text-lg mb-3 ${
                          isDark ? 'text-white' : 'text-green-900'
                        }`}
                      >
                        📍 Our Location
                      </p>
                      <p
                        className={`text-sm leading-relaxed font-medium ${
                          isDark ? 'text-gray-300' : 'text-green-700'
                        }`}
                      >
                        Kirkos Sub City Wereda 02, Deberezeit road, Sierra Leone street, Tegene Building (Global Hotel), 6th floor Addis Ababa, Ethiopia
                      </p>
                    </div>
                  </div>

                  {/* Email Us and Call Us - Side by Side */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Email Us */}
                    <div className="flex items-start group hover:scale-105 transition-transform duration-300">
                      <div
                        className={`p-4 rounded-xl mr-3 mt-1 shadow-lg backdrop-blur-sm group-hover:shadow-xl transition-all duration-300 ${
                          isDark
                            ? 'bg-gradient-to-br from-slate-700/80 to-slate-800/60 border border-slate-600/50'
                            : 'bg-gradient-to-br from-green-100/80 to-green-50/60 border border-green-200/50'
                        }`}
                      >
                        <Mail className="h-6 w-6 text-[#3DD56D]" />
                      </div>
                      <div className="flex-1">
                        <p
                          className={`font-semibold text-lg mb-3 ${
                            isDark ? 'text-white' : 'text-green-900'
                          }`}
                        >
                          📧 Email Us
                        </p>
                        <p
                          className={`text-sm mb-2 font-medium ${
                            isDark ? 'text-gray-300' : 'text-green-700'
                          }`}
                        >
                          <a
                            href="mailto:info@greanworld.com"
                            className="hover:text-[#3DD56D] transition-colors border-b border-dashed hover:border-[#3DD56D] border-gray-400"
                          >
                            info@greanworld.com
                          </a>
                        </p>
                        <p
                          className={`text-sm mb-3 font-medium ${
                            isDark ? 'text-gray-300' : 'text-green-700'
                          }`}
                        >
                          <a
                            href="mailto:sileshi@greanworld.com"
                            className="hover:text-[#3DD56D] transition-colors border-b border-dashed hover:border-[#3DD56D] border-gray-400"
                          >
                            sileshi@greanworld.com
                          </a>
                        </p>
                        <p
                          className={`text-sm ${
                            isDark ? 'text-gray-400' : 'text-green-600'
                          }`}
                        >
                          ⚡ Response within 24 hours
                        </p>
                      </div>
                    </div>

                    {/* Call Us */}
                    <div className="flex items-start group hover:scale-105 transition-transform duration-300">
                      <div
                        className={`p-4 rounded-xl mr-3 mt-1 shadow-lg backdrop-blur-sm group-hover:shadow-xl transition-all duration-300 ${
                          isDark
                            ? 'bg-gradient-to-br from-slate-700/80 to-slate-800/60 border border-slate-600/50'
                            : 'bg-gradient-to-br from-green-100/80 to-green-50/60 border border-green-200/50'
                        }`}
                      >
                        <Phone className="h-6 w-6 text-[#3DD56D]" />
                      </div>
                      <div className="flex-1">
                        <p
                          className={`font-semibold text-lg mb-3 ${
                            isDark ? 'text-white' : 'text-green-900'
                          }`}
                        >
                          📞 Call Us
                        </p>
                        <p
                          className={`text-sm mb-2 font-medium ${
                            isDark ? 'text-gray-300' : 'text-green-700'
                          }`}
                        >
                          <a
                            href="tel:+251913330000"
                            className="hover:text-[#3DD56D] transition-colors border-b border-dashed hover:border-[#3DD56D] border-gray-400"
                          >
                            (+251) 913 330000
                          </a>
                        </p>

                        <p
                          className={`text-sm ${
                            isDark ? 'text-gray-400' : 'text-green-600'
                          }`}
                        >
                          🕒 Mon-Fri: 8am - 5pm
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="flex items-start group hover:scale-105 transition-transform duration-300">
                    <div
                      className={`p-4 rounded-xl mr-4 mt-1 shadow-lg backdrop-blur-sm group-hover:shadow-xl transition-all duration-300 ${
                        isDark
                          ? 'bg-gradient-to-br from-slate-700/80 to-slate-800/60 border border-slate-600/50'
                          : 'bg-gradient-to-br from-green-100/80 to-green-50/60 border border-green-200/50'
                      }`}
                    >
                      <Users className="h-6 w-6 text-[#3DD56D]" />
                    </div>
                    <div className="flex-1">
                      <p
                        className={`font-semibold text-lg mb-3 ${
                          isDark ? 'text-white' : 'text-green-900'
                        }`}
                      >
                        🌐 Follow Us
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        <p
                          className={`text-sm font-medium ${
                            isDark ? 'text-gray-300' : 'text-green-700'
                          }`}
                        >
                          <a
                            href="https://linkedin.com/company/greanworld"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#3DD56D] transition-colors border-b border-dashed hover:border-[#3DD56D] border-gray-400"
                          >
                            LinkedIn: @greanworld
                          </a>
                        </p>
                        <p
                          className={`text-sm font-medium ${
                            isDark ? 'text-gray-300' : 'text-green-700'
                          }`}
                        >
                          <a
                            href="https://twitter.com/GreanWorld"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#3DD56D] transition-colors border-b border-dashed hover:border-[#3DD56D] border-gray-400"
                          >
                            Twitter: @GreanWorld
                          </a>
                        </p>
                        <p
                          className={`text-sm font-medium ${
                            isDark ? 'text-gray-300' : 'text-green-700'
                          }`}
                        >
                          <a
                            href="https://facebook.com/greanworld.et"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#3DD56D] transition-colors border-b border-dashed hover:border-[#3DD56D] border-gray-400"
                          >
                            Facebook: @greanworld.et
                          </a>
                        </p>
                        <p
                          className={`text-sm font-medium ${
                            isDark ? 'text-gray-300' : 'text-green-700'
                          }`}
                        >
                          <a
                            href="https://instagram.com/greanworldet"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#3DD56D] transition-colors border-b border-dashed hover:border-[#3DD56D] border-gray-400"
                          >
                            Instagram: @greanworldet
                          </a>
                        </p>
                      </div>
                      <p
                        className={`text-sm mt-3 ${
                          isDark ? 'text-gray-400' : 'text-green-600'
                        }`}
                      >
                        🚀 Stay updated with our latest news
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Map Card */}
            <div
              className={`rounded-3xl p-4 shadow-2xl hover:shadow-3xl relative overflow-hidden group transition-all duration-500 backdrop-blur-sm flex-1 ${
                isDark
                  ? 'bg-gradient-to-br from-slate-800/90 to-slate-900/70 border border-slate-700/50'
                  : 'bg-gradient-to-br from-white/95 to-green-50/80 border border-green-200/50'
              }`}
            >
              {/* Enhanced decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#3DD56D]/5 via-transparent to-[#2bb757]/5 opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#3DD56D]/20 to-transparent rounded-full blur-lg"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-[#2bb757]/15 to-transparent rounded-full blur-md"></div>

              <div className="relative z-10">
                {/* Map Header */}
                <div className="flex items-center mb-4">
                  <div
                    className={`p-3 rounded-2xl mr-3 shadow-lg backdrop-blur-sm ${
                      isDark
                        ? 'bg-gradient-to-br from-blue-600/80 to-blue-700/60'
                        : 'bg-gradient-to-br from-blue-500/90 to-blue-600/70'
                    }`}
                  >
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3
                      className={`text-lg font-bold mb-1 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      GREAN WORLD HQ
                    </h3>
                    <p
                      className={`text-xs ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      🗺️ Our headquarters location
                    </p>
                  </div>
                </div>

                {/* Custom Interactive Map */}
                <div
                  className={`relative flex-1 min-h-[300px] rounded-2xl overflow-hidden shadow-lg border-2 transition-all duration-300 hover:shadow-xl cursor-pointer group ${
                    isDark
                      ? 'border-slate-600/50 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900'
                      : 'border-green-200/50 bg-gradient-to-br from-green-100 via-green-50 to-blue-50'
                  }`}
                  onClick={() => window.open('https://www.google.com/maps/place/8.993709903183268,38.759761667193374/@8.993709903183268,38.759761667193374,17z', '_blank')}
                >
                  {/* Map Background Pattern */}
                  <div
                    className={`absolute inset-0 opacity-30 ${
                      isDark ? 'bg-slate-600' : 'bg-green-200'
                    }`}
                    style={{
                      backgroundImage: `
                        linear-gradient(${isDark ? '#475569' : '#16a34a'} 1px, transparent 1px),
                        linear-gradient(90deg, ${isDark ? '#475569' : '#16a34a'} 1px, transparent 1px)
                      `,
                      backgroundSize: '25px 25px',
                    }}
                  />

                  {/* Decorative Map Elements */}
                  <div className="absolute inset-0">
                    {/* Street-like lines */}
                    <div className={`absolute top-1/4 left-0 right-0 h-1 ${isDark ? 'bg-slate-500/40' : 'bg-green-300/60'} transform rotate-12`}></div>
                    <div className={`absolute top-3/4 left-0 right-0 h-1 ${isDark ? 'bg-slate-500/40' : 'bg-green-300/60'} transform -rotate-6`}></div>
                    <div className={`absolute top-0 bottom-0 left-1/3 w-1 ${isDark ? 'bg-slate-500/40' : 'bg-green-300/60'} transform rotate-3`}></div>
                    <div className={`absolute top-0 bottom-0 right-1/4 w-1 ${isDark ? 'bg-slate-500/40' : 'bg-green-300/60'} transform -rotate-2`}></div>
                  </div>

                  {/* Central Location Marker */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="relative">
                      {/* Pulsing rings */}
                      <div className="absolute top-0 left-0 w-16 h-16 bg-[#3DD56D]/30 rounded-full animate-ping"></div>
                      <div className="absolute top-2 left-2 w-12 h-12 bg-[#3DD56D]/50 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>

                      {/* Main marker */}
                      <div className="relative w-16 h-16 bg-gradient-to-br from-[#3DD56D] to-[#2bb757] rounded-full flex items-center justify-center shadow-2xl border-4 border-white group-hover:scale-110 transition-transform duration-300">
                        <MapPin className="h-8 w-8 text-white drop-shadow-lg" />
                      </div>

                      {/* Company badge */}
                      <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold shadow-lg border-2 whitespace-nowrap ${
                        isDark
                          ? 'bg-slate-800 text-[#3DD56D] border-[#3DD56D]/50'
                          : 'bg-white text-[#2bb757] border-[#2bb757]/50'
                      }`}>
                        GREAN WORLD HQ
                      </div>
                    </div>
                  </div>

                  {/* Location Information Panel */}
                  <div className={`absolute top-4 left-4 right-4 backdrop-blur-sm rounded-xl p-4 shadow-lg border transition-all duration-300 ${
                    isDark
                      ? 'bg-slate-800/90 border-slate-600/50 text-white'
                      : 'bg-white/90 border-green-200/50 text-gray-900'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-1 text-[#3DD56D]">GREAN WORLD HQ</h4>
                        <p className={`text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          Kirkos Sub City, Addis Ababa, Ethiopia
                        </p>
                        <div className="flex items-center space-x-4 text-xs">
                          <span className={`flex items-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            <MapPin className="h-3 w-3 mr-1" />
                            8°59'37.4"N 38°45'35.1"E
                          </span>
                        </div>
                      </div>

                      {/* Directions button */}
                      <div className="ml-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open('https://www.google.com/maps/dir/?api=1&destination=8.993709903183268,38.759761667193374', '_blank');
                          }}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
                            isDark
                              ? 'bg-[#3DD56D] text-slate-900 hover:bg-[#2bb757]'
                              : 'bg-[#2bb757] text-white hover:bg-[#3DD56D]'
                          }`}
                        >
                          Directions
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Bar */}
                  <div className={`absolute bottom-4 left-4 right-4 backdrop-blur-sm rounded-xl p-3 shadow-lg border transition-all duration-300 ${
                    isDark
                      ? 'bg-slate-800/90 border-slate-600/50'
                      : 'bg-white/90 border-green-200/50'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open('https://www.google.com/maps/place/8.993709903183268,38.759761667193374/@8.993709903183268,38.759761667193374,17z', '_blank');
                          }}
                          className={`text-xs px-3 py-1 rounded-lg transition-colors ${
                            isDark
                              ? 'text-blue-400 hover:bg-blue-400/20'
                              : 'text-blue-600 hover:bg-blue-100'
                          }`}
                        >
                          View larger map
                        </button>
                      </div>

                      <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Click to open in Google Maps
                      </div>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    isDark
                      ? 'bg-gradient-to-br from-[#3DD56D]/10 to-[#2bb757]/5'
                      : 'bg-gradient-to-br from-[#2bb757]/10 to-[#3DD56D]/5'
                  }`}></div>


                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
