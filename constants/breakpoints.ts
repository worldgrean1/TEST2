/**
 * Centralized Breakpoint Constants
 * 
 * These breakpoints are aligned with Tailwind CSS breakpoints
 * and should be used consistently across the application.
 * 
 * @see https://tailwindcss.com/docs/responsive-design
 */

export const BREAKPOINTS = {
  xxs: 320,  // 1st generation extra small phones
  xs: 475,   // Extra small devices (large phones)
  sm: 640,   // Small devices (large phones)
  md: 768,   // Medium devices (tablets)
  lg: 1024,  // Large devices (desktops)
  xl: 1280,  // Extra large devices
  '2xl': 1536 // 2X large devices
} as const;

/**
 * Breakpoint type for TypeScript support
 */
export type BreakpointKey = keyof typeof BREAKPOINTS;

/**
 * Helper functions for breakpoint detection
 */
export const breakpointHelpers = {
  /**
   * Check if current width is mobile (below md breakpoint)
   */
  isMobile: (width: number): boolean => width < BREAKPOINTS.md,
  
  /**
   * Check if current width is tablet (md to lg)
   */
  isTablet: (width: number): boolean => 
    width >= BREAKPOINTS.md && width < BREAKPOINTS.lg,
  
  /**
   * Check if current width is desktop (lg and above)
   */
  isDesktop: (width: number): boolean => width >= BREAKPOINTS.lg,
  
  /**
   * Get the current breakpoint key based on width
   * Returns the active breakpoint for the given width
   */
  getCurrentBreakpoint: (width: number): BreakpointKey => {
    if (width < BREAKPOINTS.xxs) return 'xxs';    // 0-319px: Below xxs threshold
    if (width < BREAKPOINTS.xs) return 'xxs';     // 320-474px: xxs breakpoint active
    if (width < BREAKPOINTS.sm) return 'xs';      // 475-639px: xs breakpoint active
    if (width < BREAKPOINTS.md) return 'sm';      // 640-767px: sm breakpoint active
    if (width < BREAKPOINTS.lg) return 'md';      // 768-1023px: md breakpoint active
    if (width < BREAKPOINTS.xl) return 'lg';      // 1024-1279px: lg breakpoint active
    if (width < BREAKPOINTS['2xl']) return 'xl';  // 1280-1535px: xl breakpoint active
    return '2xl';                                 // 1536px+: 2xl breakpoint active
  }
};

/**
 * Legacy constants for backward compatibility
 * @deprecated Use BREAKPOINTS object instead
 */
export const MOBILE_BREAKPOINT = BREAKPOINTS.md; // 768px
export const TABLET_MIN = BREAKPOINTS.md; // 768px
export const TABLET_MAX = BREAKPOINTS.lg - 1; // 1023px
export const DESKTOP_MIN = BREAKPOINTS.lg; // 1024px

/**
 * Media query strings for CSS-in-JS solutions
 */
export const mediaQueries = {
  xxs: `(min-width: ${BREAKPOINTS.xxs}px)`,
  xs: `(min-width: ${BREAKPOINTS.xs}px)`,
  sm: `(min-width: ${BREAKPOINTS.sm}px)`,
  md: `(min-width: ${BREAKPOINTS.md}px)`,
  lg: `(min-width: ${BREAKPOINTS.lg}px)`,
  xl: `(min-width: ${BREAKPOINTS.xl}px)`,
  '2xl': `(min-width: ${BREAKPOINTS['2xl']}px)`,

  // Max-width queries
  maxXxs: `(max-width: ${BREAKPOINTS.xxs - 1}px)`,
  maxXs: `(max-width: ${BREAKPOINTS.xs - 1}px)`,
  maxSm: `(max-width: ${BREAKPOINTS.sm - 1}px)`,
  maxMd: `(max-width: ${BREAKPOINTS.md - 1}px)`,
  maxLg: `(max-width: ${BREAKPOINTS.lg - 1}px)`,
  maxXl: `(max-width: ${BREAKPOINTS.xl - 1}px)`,
  max2xl: `(max-width: ${BREAKPOINTS['2xl'] - 1}px)`,
  
  // Range queries
  mobile: `(max-width: ${BREAKPOINTS.md - 1}px)`, // Below md
  tablet: `(min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg - 1}px)`, // md to lg
  desktop: `(min-width: ${BREAKPOINTS.lg}px)` // lg and above
} as const;
