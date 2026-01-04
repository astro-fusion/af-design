/**
 * @fileoverview Box component with Vedic planetary color variants
 * @module @astrofusion/design-system-web
 * @license MIT
 */

import React from 'react';
import { boxVariants, type BoxVariantsProps } from '../../../core/tokens/src';
import { cn } from './utils/cn';

/**
 * Props for the Box component.
 */
export interface BoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BoxVariantsProps {
  /**
   * The element type to render
   * @default 'div'
   */
  as?: React.ElementType;
}

/**
 * A flexible container component with glass morphism and Vedic planetary color variants.
 * 
 * @example
 * ```tsx
 * // Default box
 * <Box>Content</Box>
 * 
 * // Glass variant
 * <Box variant="glass">Frosted content</Box>
 * 
 * // Vedic planetary colors
 * <Box variant="yellow">Jupiter (Guru)</Box>
 * <Box variant="red">Mars (Mangal)</Box>
 * <Box variant="orange">Sun (Surya)</Box>
 * ```
 */
export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ className, variant, as: Component = 'div', children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(boxVariants({ variant }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Box.displayName = 'Box';
