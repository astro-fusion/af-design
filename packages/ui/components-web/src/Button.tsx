/**
 * @fileoverview Enhanced Button component for web applications
 * Uses CVA for shared variant logic with native platform
 * @module @astrofusion/design-system-web
 * @license MIT
 */

import React from 'react';
import {
  buttonContainerVariants,
  buttonTextVariants,
  type ButtonContainerVariantsProps,
} from '@astrofusion/design-tokens';
import { cn } from './utils/cn';

/**
 * Props for the Button component.
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonContainerVariantsProps {
  /**
   * Optional loading state
   */
  isLoading?: boolean;
  /**
   * Optional left icon
   */
  leftIcon?: React.ReactNode;
  /**
   * Optional right icon
   */
  rightIcon?: React.ReactNode;
}

/**
 * A versatile button component with iOS 26 liquid glass styling support.
 * 
 * @example
 * ```tsx
 * // Primary button (default)
 * <Button>Click Me</Button>
 * 
 * // Glass variant with large size
 * <Button variant="glass" size="lg">Submit</Button>
 * 
 * // With icons
 * <Button leftIcon={<IconStar />}>Favorite</Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          buttonContainerVariants({ variant, size }),
          buttonTextVariants({ variant, size }),
          isLoading && 'opacity-70 cursor-wait',
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : leftIcon ? (
          <span className="mr-2">{leftIcon}</span>
        ) : null}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
