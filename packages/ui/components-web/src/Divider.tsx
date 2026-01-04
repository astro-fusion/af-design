/**
 * @fileoverview Divider component with glass morphism variants
 * @module @astrofusion/design-system-web
 * @license MIT
 */

import React from 'react';
import { dividerVariants, type DividerVariantsProps } from '../../../core/tokens/src';
import { cn } from './utils/cn';

/**
 * Props for the Divider component.
 */
export interface DividerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    DividerVariantsProps {
  /**
   * Optional label to display in the divider
   */
  label?: string;
}

/**
 * A separator component with glass morphism variants.
 * 
 * @example
 * ```tsx
 * // Horizontal divider
 * <Divider />
 * 
 * // Glass variant
 * <Divider variant="glass" />
 * 
 * // Vertical divider
 * <Divider orientation="vertical" />
 * 
 * // With label
 * <Divider label="OR" />
 * ```
 */
export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation = 'horizontal', variant, label, ...props }, ref) => {
    if (label && orientation === 'horizontal') {
      return (
        <div
          ref={ref}
          className={cn('relative flex items-center', className)}
          {...props}
        >
          <div className={cn(dividerVariants({ orientation, variant }), 'flex-1')} />
          <span className="mx-4 text-xs text-muted-foreground uppercase tracking-wider">
            {label}
          </span>
          <div className={cn(dividerVariants({ orientation, variant }), 'flex-1')} />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="separator"
        className={cn(dividerVariants({ orientation, variant }), className)}
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';
