/**
 * @fileoverview Card component for web applications.
 * @module @astrofusion/design-system-web
 * @license MIT
 */

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Card variant types.
 */
export type CardVariant = 'solid' | 'glass';

/**
 * Props for the Card component.
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual variant of the card.
   * @default 'solid'
   */
  variant?: CardVariant;
}

/**
 * A container component with solid or glass styling.
 * 
 * @example
 * ```tsx
 * // Solid card (default)
 * <Card>Content here</Card>
 * 
 * // Glass variant for overlays
 * <Card variant="glass">Floating content</Card>
 * ```
 * 
 * @param props - Card component props
 * @returns A styled div element
 */
export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'solid',
  ...props
}) => {
  const baseStyles = 'rounded-xl p-6 transition-all duration-200';
  
  const variants: Record<CardVariant, string> = {
    solid: 'bg-starlight-100 dark:bg-cosmic-800 shadow-lg border border-starlight-300 dark:border-cosmic-700',
    glass: 'bg-surface-glass backdrop-blur-xl border border-starlight-100/10 shadow-2xl',
  };

  return (
    <div
      className={twMerge(clsx(baseStyles, variants[variant], className))}
      {...props}
    >
      {children}
    </div>
  );
};

Card.displayName = 'Card';
