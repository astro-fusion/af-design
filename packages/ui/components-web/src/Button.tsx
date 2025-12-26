/**
 * @fileoverview Button component for web applications.
 * @module @astrofusion/design-system-web
 * @license MIT
 */

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Button variant types.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'glass';

/**
 * Button size types.
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Props for the Button component.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual variant of the button.
   * @default 'primary'
   */
  variant?: ButtonVariant;
  
  /**
   * Size of the button.
   * @default 'md'
   */
  size?: ButtonSize;
}

/**
 * A versatile button component with multiple variants and sizes.
 * 
 * @example
 * ```tsx
 * // Primary button (default)
 * <Button>Click Me</Button>
 * 
 * // Glass variant with large size
 * <Button variant="glass" size="lg">Submit</Button>
 * ```
 * 
 * @param props - Button component props
 * @returns A styled button element
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-cosmic-600 text-starlight-100 hover:bg-cosmic-700 focus:ring-cosmic-600',
    secondary: 'bg-starlight-200 text-cosmic-900 hover:bg-starlight-300 focus:ring-starlight-200',
    glass: 'bg-surface-glass backdrop-blur-md border border-starlight-100/20 text-starlight-100 hover:bg-surface-glass-dark',
  };

  const sizes: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
      {...props}
    >
      {children}
    </button>
  );
};

Button.displayName = 'Button';
