'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface VerticalLEDTextDisplayProps {
  messages: string[];
}

// JSON Configuration from provided data
const LED_CONFIG = {
  "timestamp": "2025-07-09T18:27:44.447Z",
  "component": "VerticalLEDTextDisplay",
  "configuration": {
    "rotation": 180,
    "messages": [
      "TRANSFORMING ETHIOPIA'S ENERGY LANDSCAPE WITH SUSTAINABLE SOLUTIONS",
      "SOLAR INSTALLATIONS • ENERGY STORAGE • SMART GRID TECHNOLOGY",
      "POWERING 20 GREEN VILLAGES BY 2030 • REDUCING CARBON FOOTPRINT",
      "GREAN WORLD ENERGY TECHNOLOGY PLC • CONTACT: +251-913-330000 | +251-910-212989"
    ],
    "displaySettings": {
      "textColor": "#00ff9d",
      "backgroundColor": "#001418",
      "borderColor": "#00ff9d",
      "writingMode": "vertical-rl",
      "textOrientation": "sideways",
      "animationDuration": "60s",
      "animationType": "verticalScrollReversed"
    },
    "dimensions": {
      "width": {
        "mobile": "hidden",
        "tablet": "w-16",
        "desktop": "w-20",
        "xl": "w-24"
      },
      "position": "fixed left-0 top-0 bottom-0",
      "zIndex": 40
    }
  },
  "metadata": {
    "exportedBy": "GREAN WORLD Energy Technology",
    "version": "1.0.0",
    "description": "LED Text Display Configuration Export"
  }
};

export function VerticalLEDTextDisplay({
  messages,
}: VerticalLEDTextDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Simple CSS-based vertical scrolling animation - reversed direction (top to bottom)
  useEffect(() => {
    if (!contentRef.current) return;

    const content = contentRef.current;

    // Set up CSS animation using config duration
    const animationDuration = LED_CONFIG.configuration.displaySettings.animationDuration;
    content.style.animation = `verticalScrollReversed ${animationDuration} linear infinite`;

    // Add the keyframes if they don't exist
    if (!document.querySelector('#vertical-scroll-reversed-keyframes')) {
      const style = document.createElement('style');
      style.id = 'vertical-scroll-reversed-keyframes';
      style.textContent = `
        @keyframes verticalScrollReversed {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      // Clean up animation
      content.style.animation = '';
    };
  }, [messages]);

  // Use messages from JSON config or fallback to props
  const configMessages = LED_CONFIG.configuration.messages;
  const displayMessages = configMessages.length > 0 ? configMessages : messages;

  // Combine all messages and repeat for seamless scrolling
  const displayText = displayMessages.join(' • ') + ' • ' + displayMessages.join(' • ') + ' • ' + displayMessages.join(' • ');

  return (
    <motion.div
      className="fixed left-0 top-0 bottom-0 w-12 md:w-16 lg:w-20 xl:w-24 z-40 overflow-hidden bg-[#001418] border-r border-[#00ff9d]/30 shadow-lg hidden md:block"
      // Note: Width matches header padding - md:w-16 = md:pl-16, lg:w-20 = lg:pl-20, xl:w-24 = xl:pl-24
      initial={{ opacity: 0, x: -50 }}
      animate={{
        opacity: 1,
        x: 0,
        rotate: LED_CONFIG.configuration.rotation
      }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        rotate: { duration: 0.5, ease: "easeInOut" }
      }}
      style={{
        left: '0px',
        top: '0px',
        bottom: '0px',
        margin: '0px',
        padding: '0px',
        position: 'fixed',
        transformOrigin: 'center center',
        backgroundColor: LED_CONFIG.configuration.displaySettings.backgroundColor,
        borderColor: LED_CONFIG.configuration.displaySettings.borderColor,
      }}
    >
      {/* Digital screen background effect - Horizontal gradient for vertical display */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00261e]/20 to-transparent"></div>
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundSize: '256px 256px'
      }}></div>

      {/* Scan line effect - Horizontal movement for vertical display (right to left - reversed) */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00ff9d]/5 to-transparent"
        animate={{
          x: ['100%', '-100%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Main content container */}
      <div
        ref={containerRef}
        className="led-text-container w-full h-full overflow-hidden relative"
        style={{
          width: '100%',
          height: '100%',
          margin: '0px',
          padding: '0px',
        }}
      >
        <div
          ref={contentRef}
          className="absolute w-full h-full text-sm md:text-base lg:text-lg xl:text-xl font-led tracking-wider digital-text"
          style={{
            color: LED_CONFIG.configuration.displaySettings.textColor,
            textShadow: `0 0 5px ${LED_CONFIG.configuration.displaySettings.textColor}, 0 0 10px ${LED_CONFIG.configuration.displaySettings.textColor}40`,
            writingMode: LED_CONFIG.configuration.displaySettings.writingMode as any,
            textOrientation: LED_CONFIG.configuration.displaySettings.textOrientation as any,
            transform: 'rotate(180deg)',
            whiteSpace: 'nowrap',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            letterSpacing: '1px',
            fontWeight: 'bold',
          }}
        >
          <span className="digital-chars" style={{
            fontFamily: 'Digital-7, Courier New, monospace',
          }}>{displayText}</span>
        </div>
      </div>

      {/* Minimal top and bottom gradient fade for seamless loop */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-[#001418] to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-[#001418] to-transparent z-10"></div>

      {/* Digital screen reflection - Horizontal gradient for vertical display */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00ff9d]/5 to-transparent pointer-events-none"></div>
    </motion.div>
  );
}


