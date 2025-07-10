'use client';

import * as React from 'react';
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes';
import { useTheme } from '@/hooks/useTheme';

// Brand-compatible theme provider that maintains existing API
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // For now, keep using next-themes but prepare for migration
  // TODO: Gradually migrate to BrandThemeProvider
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

// Brand theme hook that wraps the main useTheme hook for backward compatibility
// This eliminates duplication while maintaining the existing API
export function useBrandTheme() {
  const { isDark, theme, setTheme, mounted } = useTheme();

  return {
    isDarkMode: isDark, // Map isDark to isDarkMode for backward compatibility
    theme: theme || 'light',
    setTheme,
    mounted
  };
}
