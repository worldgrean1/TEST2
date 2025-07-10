import * as React from 'react';
import { BREAKPOINTS, breakpointHelpers } from '../constants/breakpoints';

// Using centralized breakpoint system aligned with Tailwind CSS
const MOBILE_BREAKPOINT = BREAKPOINTS.md; // 768px

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(breakpointHelpers.isMobile(window.innerWidth));
    };
    mql.addEventListener('change', onChange);
    setIsMobile(breakpointHelpers.isMobile(window.innerWidth));
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return !!isMobile;
}
