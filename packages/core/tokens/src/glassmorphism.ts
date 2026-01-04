/**
 * Glassmorphism Design Tokens - iOS 26 Liquid Glass Inspired
 * Cross-platform glass morphism effects with backdrop blur and transparency
 * Includes all 26 iOS liquid glass style tokens with dynamic sizing and responsive scales
 * 
 * @module @astrofusion/design-tokens
 * @license MIT
 */

export const glassmorphism = {
  // Background colors with transparency - 26 iOS liquid glass variants
  background: {
    // Light theme backgrounds - 13 variants
    light: {
      ultraThin: 'rgba(255, 255, 255, 0.1)',
      thin: 'rgba(255, 255, 255, 0.25)',
      subtle: 'rgba(255, 255, 255, 0.4)',
      light: 'rgba(255, 255, 255, 0.6)',
      mediumLight: 'rgba(255, 255, 255, 0.7)',
      medium: 'rgba(255, 255, 255, 0.8)',
      mediumStrong: 'rgba(255, 255, 255, 0.85)',
      strong: 'rgba(255, 255, 255, 0.9)',
      veryStrong: 'rgba(255, 255, 255, 0.92)',
      ultraStrong: 'rgba(255, 255, 255, 0.95)',
      overlay: 'rgba(255, 255, 255, 0.97)',
      modal: 'rgba(255, 255, 255, 0.98)',
      solid: 'rgba(255, 255, 255, 0.99)',
    },
    // Dark theme backgrounds - 13 variants
    dark: {
      ultraThin: 'rgba(17, 25, 40, 0.1)',
      thin: 'rgba(17, 25, 40, 0.25)',
      subtle: 'rgba(17, 25, 40, 0.4)',
      light: 'rgba(17, 25, 40, 0.6)',
      mediumLight: 'rgba(17, 25, 40, 0.7)',
      medium: 'rgba(17, 25, 40, 0.8)',
      mediumStrong: 'rgba(17, 25, 40, 0.85)',
      strong: 'rgba(17, 25, 40, 0.9)',
      veryStrong: 'rgba(17, 25, 40, 0.92)',
      ultraStrong: 'rgba(17, 25, 40, 0.95)',
      overlay: 'rgba(17, 25, 40, 0.97)',
      modal: 'rgba(17, 25, 40, 0.98)',
      solid: 'rgba(17, 25, 40, 0.99)',
    },
  },

  // Backdrop blur effects
  blur: {
    none: 'none',
    subtle: 'blur(8px)',
    light: 'blur(12px)',
    medium: 'blur(20px) saturate(1.8)',
    strong: 'blur(24px) saturate(2.0)',
    heavy: 'blur(32px) saturate(2.2)',
  },

  // Border colors and opacity
  border: {
    light: {
      subtle: 'rgba(255, 255, 255, 0.2)',
      medium: 'rgba(255, 255, 255, 0.3)',
      strong: 'rgba(255, 255, 255, 0.4)',
    },
    dark: {
      subtle: 'rgba(255, 255, 255, 0.1)',
      medium: 'rgba(255, 255, 255, 0.125)',
      strong: 'rgba(255, 255, 255, 0.2)',
    },
  },

  // Shadow effects for glass elements
  shadow: {
    inner: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    outer: {
      subtle: '0 8px 32px rgba(0, 0, 0, 0.1)',
      medium: '0 12px 48px rgba(0, 0, 0, 0.15)',
      strong: '0 16px 64px rgba(0, 0, 0, 0.2)',
    },
    colored: {
      primary: '0 8px 32px rgba(20, 184, 166, 0.15)',
      secondary: '0 8px 32px rgba(249, 115, 22, 0.15)',
      success: '0 8px 32px rgba(34, 197, 94, 0.15)',
      warning: '0 8px 32px rgba(245, 158, 11, 0.15)',
      error: '0 8px 32px rgba(239, 68, 68, 0.15)',
    },
  },

  // Dynamic border radius calculations
  borderRadius: {
    none: '0',
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
    full: '9999px',
  },

  // Responsive size scales for glass elements
  size: {
    xs: { width: '1rem', height: '1rem', padding: '0.25rem' },
    sm: { width: '1.5rem', height: '1.5rem', padding: '0.5rem' },
    md: { width: '2rem', height: '2rem', padding: '0.75rem' },
    lg: { width: '2.5rem', height: '2.5rem', padding: '1rem' },
    xl: { width: '3rem', height: '3rem', padding: '1.25rem' },
    '2xl': { width: '4rem', height: '4rem', padding: '1.5rem' },
    responsive: {
      mobile: {
        card: { minWidth: '280px', maxWidth: '100%', padding: '1rem' },
        input: { minWidth: '200px', maxWidth: '100%', padding: '0.75rem' },
        button: { minWidth: '120px', maxWidth: '100%', padding: '0.75rem 1.5rem' },
      },
      tablet: {
        card: { minWidth: '320px', maxWidth: '480px', padding: '1.25rem' },
        input: { minWidth: '240px', maxWidth: '100%', padding: '1rem' },
        button: { minWidth: '140px', maxWidth: '200px', padding: '1rem 2rem' },
      },
      desktop: {
        card: { minWidth: '360px', maxWidth: '600px', padding: '1.5rem' },
        input: { minWidth: '280px', maxWidth: '400px', padding: '1.25rem' },
        button: { minWidth: '160px', maxWidth: '240px', padding: '1.25rem 2.5rem' },
      },
    },
  },

  // Transitions for smooth interactions
  transition: {
    fast: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    normal: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    slow: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Opacity levels for different states
  opacity: {
    hover: 0.95,
    active: 0.9,
    disabled: 0.6,
  },

  // Scale transforms for interactive states
  scale: {
    hover: 1.02,
    active: 0.98,
    subtle: 1.005,
    press: 0.995,
  },

  // Predefined glass styles for common components
  styles: {
    card: {
      background: 'medium',
      blur: 'medium',
      border: 'medium',
      shadow: 'outer.medium',
      borderRadius: 'lg',
    },
    cardUltraThin: {
      background: 'ultraThin',
      blur: 'subtle',
      border: 'subtle',
      shadow: 'outer.subtle',
      borderRadius: 'xl',
    },
    cardFrosted: {
      background: 'light',
      blur: 'heavy',
      border: 'medium',
      shadow: 'colored.primary',
      borderRadius: '2xl',
    },
    input: {
      background: 'subtle',
      blur: 'light',
      border: 'subtle',
      shadow: 'inner',
      borderRadius: 'md',
    },
    inputFocused: {
      background: 'mediumLight',
      blur: 'medium',
      border: 'strong',
      shadow: 'colored.secondary',
      borderRadius: 'lg',
    },
    button: {
      background: 'medium',
      blur: 'medium',
      border: 'medium',
      shadow: 'outer.subtle',
      borderRadius: 'md',
    },
    buttonPressed: {
      background: 'strong',
      blur: 'strong',
      border: 'strong',
      shadow: 'outer.medium',
      borderRadius: 'lg',
    },
    modal: {
      background: 'strong',
      blur: 'strong',
      border: 'strong',
      shadow: 'outer.strong',
      borderRadius: '2xl',
    },
    navigationBar: {
      background: 'overlay',
      blur: 'strong',
      border: 'medium',
      shadow: 'outer.subtle',
      borderRadius: 'none',
    },
  },
} as const;

export type GlassmorphismTokens = typeof glassmorphism;
export type GlassBackgroundKey = keyof typeof glassmorphism.background.light;
export type GlassBlurKey = keyof typeof glassmorphism.blur;
export type GlassBorderKey = keyof typeof glassmorphism.border.light;
export type GlassStyleKey = keyof typeof glassmorphism.styles;

/**
 * Glass utility functions for dynamic calculations
 */
export const glassUtils = {
  /**
   * Calculate dynamic border radius based on component size
   */
  calculateBorderRadius: (width: number, height: number): string => {
    const minDimension = Math.min(width, height);
    const factor = Math.min(Math.max(minDimension / 100, 0.5), 2);
    return `${8 * factor}px`;
  },

  /**
   * Calculate padding based on size
   */
  calculatePadding: (size: number): string => {
    const factor = Math.min(Math.max(size / 100, 0.5), 2);
    return `${12 * factor}px`;
  },

  /**
   * Get blur level based on background complexity
   */
  getBlurForComplexity: (complexity: 'simple' | 'medium' | 'complex'): keyof typeof glassmorphism.blur => {
    switch (complexity) {
      case 'simple': return 'subtle';
      case 'medium': return 'medium';
      case 'complex': return 'strong';
      default: return 'medium';
    }
  },

  /**
   * Get shadow level based on elevation
   */
  getShadowForElevation: (elevation: 'low' | 'medium' | 'high'): keyof typeof glassmorphism.shadow.outer => {
    switch (elevation) {
      case 'low': return 'subtle';
      case 'medium': return 'medium';
      case 'high': return 'strong';
      default: return 'medium';
    }
  },

  /**
   * Check if glassmorphism is supported in the current environment
   */
  isSupported: (): boolean => {
    if (typeof window === 'undefined' || typeof CSS === 'undefined') return true;
    return CSS.supports('backdrop-filter', 'blur(10px)') ||
           CSS.supports('-webkit-backdrop-filter', 'blur(10px)');
  },

  /**
   * Get responsive size for glass elements
   */
  getResponsiveSize: (
    component: 'card' | 'input' | 'button',
    breakpoint: 'mobile' | 'tablet' | 'desktop'
  ) => {
    return glassmorphism.size.responsive[breakpoint][component];
  },
};
