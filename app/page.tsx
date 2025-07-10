"use client"

import { useState, useEffect } from "react"
import ResponsiveInverterWrapper from "@/components/inverter/responsive-wrapper"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { LEDTextDisplay } from "@/components/ui/LEDTextDisplay"
import { VerticalLEDTextDisplay } from "@/components/ui/VerticalLEDTextDisplay"
import { useTheme } from "@/hooks/useTheme"
import { TypingTextAnimation } from "@/components/animations/text/TypingTextAnimation"
import { Zap } from "lucide-react"
import { useRouter } from "next/navigation"

// Official Brand CSS from brand guidelines
const brandCSS = `
  :root {
    --grean-primary: #3dd56d;
    --grean-secondary: #2bb757;
    --grean-accent: #23a455;
  }

  html, body {
    min-height: 100vh;
    min-height: 100dvh;
    margin: 0;
    padding: 0;
  }

  html {
    background: #ffffff;
  }

  html.dark {
    background: #020617;
  }

  .light body {
    background: #ffffff !important;
  }

  .dark body {
    background: #020617 !important;
  }

  .dark {
    color-scheme: dark;
  }

  /* Ensure dark mode backgrounds persist */
  .dark * {
    --tw-bg-opacity: 1;
  }
`;

// Refactored Header Component with Logo and LED Test Display
interface HeaderProps {
  scrolled: boolean
}

function Header({ scrolled }: HeaderProps) {
  const { isDark } = useTheme()

  return (
    <motion.header
      className="py-2 xxs:py-3 px-2 xxs:px-4 sm:px-6 transition-all duration-500 bg-transparent"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Container with left padding to avoid Vertical LED overlap on tablet+ */}
      <div className="max-w-7xl mx-auto md:pl-16 lg:pl-20 xl:pl-24">
        {/* Single horizontal row - Logo and LED Display always side by side */}
        <div className="flex items-center gap-1 xxs:gap-2 sm:gap-4">
          {/* Logo Section - Fixed width */}
          <div className="flex-shrink-0">
            <Link href="/">
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="logo-container relative mr-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="logo-glow-effect"></div>
                  <div className="relative w-6 h-6 xxs:w-8 xxs:h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 logo-spin">
                    <Image
                      src="/logos/grean-world-logo.png"
                      alt="GREAN WORLD Logo"
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                    <motion.div
                      className={`absolute inset-0 rounded-full ${
                        isDark ? 'bg-green-500/20' : 'bg-green-600/20'
                      }`}
                      animate={{
                        opacity: [0.2, 0.5, 0.2],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: 'easeInOut',
                      }}
                    />
                  </div>
                </motion.div>
                <div className="hidden sm:block">
                  <motion.div
                    className="flex flex-col"
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center">
                      <span className="text-green-500 text-sm xxs:text-lg sm:text-xl md:text-2xl font-bold tracking-wide">
                        GREAN
                      </span>
                      <span className={`text-sm xxs:text-lg sm:text-xl md:text-2xl font-bold tracking-wide ml-1 ${
                        isDark ? 'text-gray-200' : 'text-gray-800'
                      }`}>
                        WORLD
                      </span>
                    </div>
                    <span className={`text-xs xxs:text-xs sm:text-sm font-medium tracking-wider ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      ENERGY TECHNOLOGY
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          </div>

          {/* LED Text Display - Only visible on mobile, hidden on tablet+ where Vertical LED is shown */}
          <div className="flex-1 min-w-0 md:hidden">
            <LEDTextDisplay
              messages={[
                'GREAN WORLD ENERGY TECHNOLOGY • INTELLIGENT SYSTEMS',
                'SOLAR • INVERTERS • ENERGY STORAGE • SMART SOLUTIONS',
                'GREAN WORLD ENERGY TECHNOLOGY PLC',
                'SUSTAINABLE ENERGY FOR ETHIOPIA AND BEYOND',
              ]}
              compact={true}
            />
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default function HomePage() {
  const { isDark } = useTheme()
  const router = useRouter()
  const [inverterOn, setInverterOn] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Loading state management
  const [isLoading, setIsLoading] = useState(true)
  const [loadingComplete, setLoadingComplete] = useState(false)
  const [mounted, setMounted] = useState(false)

  const handleInverterChange = (on: boolean) => {
    setInverterOn(on)

    // Enable scrolling when inverter is activated
    if (on) {
      document.documentElement.setAttribute('data-page', 'main-scrollable')
      document.body.setAttribute('data-page', 'main-scrollable')
    } else {
      document.documentElement.removeAttribute('data-page')
      document.body.removeAttribute('data-page')
    }
  }

  // Inject official brand CSS
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = brandCSS;
    document.head.appendChild(styleElement);

    return () => {
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  // Component mounting effect and cleanup
  useEffect(() => {
    setMounted(true);

    // Reset inverter state when returning to main page (e.g., from Power Off)
    setInverterOn(false);

    // Ensure scrolling is disabled initially
    document.documentElement.removeAttribute('data-page');
    document.body.removeAttribute('data-page');
  }, []);

  // Initialize loading effect
  useEffect(() => {
    if (!mounted) return;

    const timer = setTimeout(() => {
      setIsLoading(false);
      setLoadingComplete(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, [mounted]);

  // Handle scroll detection for header and inverter redirect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Debug logging
      console.log('Scroll detected:', {
        inverterOn,
        scrollY: window.scrollY,
        shouldRedirect: inverterOn && window.scrollY > 0
      })

      // If inverter is started and activated, redirect to /green page on any scroll
      if (inverterOn && window.scrollY > 0) {
        console.log('Redirecting to /green...')
        router.push('/green')
      }
    }

    // Also listen for wheel events as backup
    const handleWheel = () => {
      if (inverterOn) {
        console.log('Wheel event detected with inverter on, redirecting...')
        router.push('/green')
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('wheel', handleWheel, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('wheel', handleWheel)
    }
  }, [inverterOn, router])

  // Handle mobile detection for responsive Hero height
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
    }

    // Set initial value
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Early return while mounting to prevent flicker
  if (!mounted) {
    return (
      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center ${
          isDark ? 'bg-[#020617]' : 'bg-white'
        }`}
      />
    );
  }

  return (
    <div
      className={`h-screen w-full flex flex-col overflow-hidden ${
        isDark ? 'bg-[#020617]' : 'bg-white'
      }`}
    >
      {/* Loading Screen Animation */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed inset-0 z-[100] flex items-center justify-center ${
              isDark ? 'bg-[#020617]' : 'bg-white'
            }`}
          >
            <div className="flex flex-col items-center">
              {/* Animated Logo */}
              <motion.div
                className="relative mb-8"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.div
                  className="relative w-32 h-32"
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
                    scale: {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }}
                >
                  {/* Glow effect */}
                  <div className={`absolute inset-0 rounded-full ${
                    isDark
                      ? 'bg-gradient-to-r from-[#3DD56D]/20 to-[#2bb757]/20'
                      : 'bg-gradient-to-r from-[#3DD56D]/30 to-[#2bb757]/30'
                  } blur-xl animate-pulse`} />
                  <Image
                    src="/images/grean-logo-icon.png"
                    alt="GREAN WORLD Logo"
                    width={128}
                    height={128}
                    className="relative z-10 object-contain drop-shadow-2xl"
                    style={{
                      background: 'transparent'
                    }}
                  />
                </motion.div>
              </motion.div>

              {/* Company Name */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <h1 className="text-2xl xxs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-none mb-3">
                  <span className="text-[var(--grean-primary)]">GREAN</span>
                  <span className={isDark ? 'text-white' : 'text-black'}>WORLD</span>
                </h1>
                <p className={`text-sm xxs:text-lg sm:text-xl leading-relaxed tracking-wide ${isDark ? 'text-slate-300' : 'text-black'}`}>
                  ENERGY TECHNOLOGY PLC
                </p>
              </motion.div>

              {/* Loading Animation */}
              <motion.div
                className="mt-8 sm:mt-12 flex space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 bg-[#3DD56D] rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>

              {/* Loading Text */}
              <motion.p
                className={`mt-4 sm:mt-6 text-base sm:text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                Initializing Energy Systems...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vertical LED Text Display with JSON Configuration (180° rotation) - Only on tablet and larger */}
      {loadingComplete && (
        <VerticalLEDTextDisplay
          messages={[
            'TRANSFORMING ETHIOPIA\'S ENERGY LANDSCAPE WITH SUSTAINABLE SOLUTIONS',
            'SOLAR INSTALLATIONS • ENERGY STORAGE • SMART GRID TECHNOLOGY',
            'POWERING 20 GREEN VILLAGES BY 2030 • REDUCING CARBON FOOTPRINT',
            'GREAN WORLD ENERGY TECHNOLOGY PLC • CONTACT: +251-913-330000 | +251-910-212989',
          ]}
        />
      )}

      {/* Header Section - Refactored with Logo and LED Display */}
      {loadingComplete && (
        <header className="w-full flex-shrink-0 relative z-50">
          <Header scrolled={scrolled} />
        </header>
      )}

      {/* Main Content Area - Flexible container with proper spacing and left padding for vertical LED */}
      {loadingComplete && (
        <main className="flex-1 flex flex-col min-h-0 gap-6 overflow-hidden md:pl-16 lg:pl-20 xl:pl-24">
        {/* Hero Section - Responsive height: 150px mobile, 250px desktop */}
        <AnimatePresence>
          {inverterOn && (
            <motion.section
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: inverterOn ? (isMobile ? "150px" : "250px") : 0,
                opacity: 1
              }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
                height: { duration: 0.6 },
              }}
              className="w-full flex items-center justify-center overflow-hidden flex-shrink-0 leading-[1.85rem]"
              style={{
                minHeight: inverterOn ? (isMobile ? "150px" : "250px") : "0px",
                maxHeight: inverterOn ? (isMobile ? "150px" : "250px") : "0px",
                flex: inverterOn ? (isMobile ? "0 0 150px" : "0 0 250px") : "0",
              }}
            >
              {/* Hero Content */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="w-full max-w-4xl mx-auto px-2 sm:px-4 md:px-6"
              >
                <div className="flex flex-col items-center text-center">
                  <h1 className={`text-lg xxs:text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight sm:leading-none tracking-tight mb-3 sm:mb-4 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 ${
                    isDark ? 'text-white' : 'text-slate-800'
                  }`}>
                    <span className="inline-block">
                      <TypingTextAnimation
                        text="Intelligent Energy Systems"
                        speed="medium"
                      />
                    </span>
                    <Zap className={`w-4 h-4 xxs:w-6 xxs:h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 ${
                      isDark ? 'text-green-500' : 'text-[#2bb757]'
                    }`} />
                  </h1>
                  <p className={`hidden sm:block text-xs xxs:text-sm xs:text-base sm:text-lg md:text-xl leading-relaxed max-w-xs xs:max-w-sm sm:max-w-2xl md:max-w-3xl mx-auto px-2 sm:px-0 ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    <span className={`${
                      isDark ? 'text-green-400' : 'text-[#2bb757] font-semibold'
                    }`}>
                      <TypingTextAnimation
                        text="At GREAN WORLD"
                        speed="medium"
                      />
                    </span>{' '}
                    Energy Technology, we deliver intelligent energy systems built for
                    reliability, efficiency, and a{' '}
                    <span className={`${
                      isDark ? 'text-green-400' : 'text-[#2bb757] font-semibold'
                    }`}>
                      sustainable future.
                    </span>
                  </p>
                </div>
              </motion.div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Inverter Section */}
        <motion.section
          className="w-full flex items-center justify-center flex-1 min-h-0"
          animate={{
            scale: inverterOn ? 0.95 : 1,
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          <ResponsiveInverterWrapper
            inverterOn={inverterOn}
            onInverterChange={handleInverterChange}
            gridConnected={true}
            solarConnected={true}
            batteryConnected={true}
            loadPercentage={45}
            efficiency={97}
            inputVoltage={48}
            outputVoltage={230}
            frequency={50}
            batteryLevel={85}
            batteryCharging={false}
            totalEnergyGenerated={23.5}
            temperature={42}
            fanSpeed={65}
            mode="normal"
          />
        </motion.section>

        {/* Contact Section */}
        <motion.section
          className="w-full flex items-center justify-center flex-shrink-0 h-24 md:h-32"
          animate={{
            scale: inverterOn ? 0.95 : 1,
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          {/* Contact Content */}
          <div className="w-full px-1 xxs:px-2 xs:px-3 sm:px-4 py-1 xxs:py-2 xs:py-3">
            {/* Enhanced Contact Layout with Modern Styling */}
            <div className={`relative flex items-center justify-between max-w-6xl mx-auto rounded-2xl p-3 sm:p-4 backdrop-blur-sm border transition-all duration-300 hover:shadow-lg ${
              isDark
                ? 'bg-slate-900/60 border-[#3DD56D]/20 hover:border-[#3DD56D]/40'
                : 'bg-white/80 border-[#2bb757]/30 hover:border-[#2bb757]/50'
            }`}>
              {/* Animated Background Gradient */}
              <div className={`absolute inset-0 rounded-2xl opacity-20 ${
                isDark
                  ? 'bg-gradient-to-r from-[#3DD56D]/10 via-transparent to-[#2bb757]/10'
                  : 'bg-gradient-to-r from-[#2bb757]/10 via-transparent to-[#3DD56D]/10'
              }`} />

              {/* Left: Enhanced QR Code */}
              <div className="relative flex items-center gap-1 xxs:gap-2 xs:gap-3 z-10">
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* QR Code Glow Effect */}
                  <div className={`absolute -inset-1 rounded-xl blur opacity-50 group-hover:opacity-75 transition-all duration-300 ${
                    isDark
                      ? 'bg-gradient-to-r from-[#3DD56D] to-[#2bb757]'
                      : 'bg-gradient-to-r from-[#2bb757] to-[#3DD56D]'
                  }`} />
                  <img
                    src="/images/qr-greanworld.png"
                    alt="GREAN WORLD QR Code"
                    className="relative w-12 h-12 xxs:w-16 xxs:h-16 xs:w-20 xs:h-20 md:w-24 md:h-24 rounded-xl shadow-xl group-hover:shadow-2xl transition-all duration-300"
                    style={{ background: 'white' }}
                  />
                  {/* QR Code Scan Animation */}
                  <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    isDark ? 'bg-[#3DD56D]/10' : 'bg-[#2bb757]/10'
                  }`} />
                </motion.div>
                <div className="hidden lg:block">
                  <motion.p
                    className={`text-xs xs:text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    Contact GREAN WORLD
                  </motion.p>
                  <motion.p
                    className={`text-xs font-medium ${isDark ? 'text-[#3DD56D]' : 'text-[#2bb757]'}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    📱 Scan to Contact
                  </motion.p>
                </div>
              </div>

              {/* Center: Enhanced Contact Info */}
              <div className="relative flex items-center gap-1 xxs:gap-2 sm:gap-4 lg:gap-6 z-10">
                {/* Phone Contact Card */}
                <motion.div
                  className="flex items-center gap-1 xxs:gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div
                    className={`relative w-5 h-5 xxs:w-6 xxs:h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-lg ${
                      isDark
                        ? 'bg-gradient-to-br from-[#3DD56D] to-[#2bb757]'
                        : 'bg-gradient-to-br from-[#2bb757] to-[#3DD56D]'
                    }`}
                    whileHover={{ rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Phone Icon Glow */}
                    <div className={`absolute inset-0 rounded-full blur opacity-50 ${
                      isDark
                        ? 'bg-gradient-to-br from-[#3DD56D] to-[#2bb757]'
                        : 'bg-gradient-to-br from-[#2bb757] to-[#3DD56D]'
                    }`} />
                    <svg className="relative w-2 h-2 xxs:w-3 xxs:h-3 sm:w-4 sm:h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </motion.div>
                  <div>
                    <p className={`hidden sm:block text-xs font-bold uppercase tracking-wider ${
                      isDark ? 'text-[#3DD56D]' : 'text-[#2bb757]'
                    }`}>📞 PHONE</p>
                    <div className="flex flex-col">
                      <span className={`text-xs sm:text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        +251 913 330000
                      </span>
                      <span className={`hidden md:block text-xs font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        (+251) 910 212989
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Email Contact Card */}
                <motion.div
                  className="hidden md:flex items-center gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div
                    className={`relative w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                      isDark
                        ? 'bg-gradient-to-br from-[#3DD56D] to-[#2bb757]'
                        : 'bg-gradient-to-br from-[#2bb757] to-[#3DD56D]'
                    }`}
                    whileHover={{ rotate: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Email Icon Glow */}
                    <div className={`absolute inset-0 rounded-full blur opacity-50 ${
                      isDark
                        ? 'bg-gradient-to-br from-[#3DD56D] to-[#2bb757]'
                        : 'bg-gradient-to-br from-[#2bb757] to-[#3DD56D]'
                    }`} />
                    <svg className="relative w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </motion.div>
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-wider ${
                      isDark ? 'text-[#3DD56D]' : 'text-[#2bb757]'
                    }`}>✉️ EMAIL</p>
                    <div className="flex flex-col">
                      <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        info@greanworld.com
                      </span>
                      <span className={`text-xs font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        sileshi@greanworld.com
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right: Enhanced Social Links */}
              <div className="relative flex items-center gap-1 xxs:gap-1 xs:gap-2 z-10">
                {/* Social Media Label */}
                <div className="hidden lg:block mr-2">
                  <p className={`text-xs font-bold uppercase tracking-wider ${
                    isDark ? 'text-[#3DD56D]' : 'text-[#2bb757]'
                  }`}>🌐 FOLLOW</p>
                </div>

                {/* Facebook */}
                <motion.a
                  href="https://facebook.com/greanworld.et"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative w-6 h-6 xxs:w-7 xxs:h-7 xs:w-8 xs:h-8 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                    isDark
                      ? 'bg-gradient-to-br from-[#3DD56D] to-[#2bb757] hover:from-[#2bb757] hover:to-[#3DD56D]'
                      : 'bg-gradient-to-br from-[#2bb757] to-[#3DD56D] hover:from-[#3DD56D] hover:to-[#2bb757]'
                  }`}
                  title="Facebook: @greanworld.et"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {/* Social Icon Glow */}
                  <div className={`absolute inset-0 rounded-full blur opacity-50 ${
                    isDark
                      ? 'bg-gradient-to-br from-[#3DD56D] to-[#2bb757]'
                      : 'bg-gradient-to-br from-[#2bb757] to-[#3DD56D]'
                  }`} />
                  <svg className="relative w-3 h-3 xs:w-4 xs:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </motion.a>

                {/* Twitter */}
                <motion.a
                  href="https://twitter.com/GreanWorld"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative w-6 h-6 xxs:w-7 xxs:h-7 xs:w-8 xs:h-8 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                    isDark
                      ? 'bg-gradient-to-br from-[#3DD56D] to-[#2bb757] hover:from-[#2bb757] hover:to-[#3DD56D]'
                      : 'bg-gradient-to-br from-[#2bb757] to-[#3DD56D] hover:from-[#3DD56D] hover:to-[#2bb757]'
                  }`}
                  title="Twitter: @GreanWorld"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className={`absolute inset-0 rounded-full blur opacity-50 ${
                    isDark
                      ? 'bg-gradient-to-br from-[#3DD56D] to-[#2bb757]'
                      : 'bg-gradient-to-br from-[#2bb757] to-[#3DD56D]'
                  }`} />
                  <svg className="relative w-3 h-3 xs:w-4 xs:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </motion.a>

                {/* LinkedIn */}
                <motion.a
                  href="https://linkedin.com/company/greanworld"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hidden sm:flex relative w-6 h-6 xxs:w-7 xxs:h-7 xs:w-8 xs:h-8 rounded-full items-center justify-center shadow-lg transition-all duration-300 ${
                    isDark
                      ? 'bg-gradient-to-br from-[#3DD56D] to-[#2bb757] hover:from-[#2bb757] hover:to-[#3DD56D]'
                      : 'bg-gradient-to-br from-[#2bb757] to-[#3DD56D] hover:from-[#3DD56D] hover:to-[#2bb757]'
                  }`}
                  title="LinkedIn: @greanworld"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className={`absolute inset-0 rounded-full blur opacity-50 ${
                    isDark
                      ? 'bg-gradient-to-br from-[#3DD56D] to-[#2bb757]'
                      : 'bg-gradient-to-br from-[#2bb757] to-[#3DD56D]'
                  }`} />
                  <svg className="relative w-3 h-3 xs:w-4 xs:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </motion.a>

                {/* Instagram */}
                <motion.a
                  href="https://instagram.com/greanworldet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hidden sm:flex relative w-6 h-6 xxs:w-7 xxs:h-7 xs:w-8 xs:h-8 rounded-full items-center justify-center shadow-lg transition-all duration-300 ${
                    isDark
                      ? 'bg-gradient-to-br from-[#3DD56D] to-[#2bb757] hover:from-[#2bb757] hover:to-[#3DD56D]'
                      : 'bg-gradient-to-br from-[#2bb757] to-[#3DD56D] hover:from-[#3DD56D] hover:to-[#2bb757]'
                  }`}
                  title="Instagram: @greanworldet"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className={`absolute inset-0 rounded-full blur opacity-50 ${
                    isDark
                      ? 'bg-gradient-to-br from-[#3DD56D] to-[#2bb757]'
                      : 'bg-gradient-to-br from-[#2bb757] to-[#3DD56D]'
                  }`} />
                  <svg className="relative w-3 h-3 xs:w-4 xs:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </motion.a>
              </div>
            </div>
          </div>
        </motion.section>
        </main>
      )}
    </div>
  )
}
