/**
 * @fileoverview Enhanced Card component with glass morphism variants
 * @module @astrofusion/design-system-web
 * @license MIT
 */

import React from 'react';
import { cardVariants, type CardVariantsProps } from '../../../core/tokens/src';
import { cn } from './utils/cn';

/**
 * Props for the Card component.
 */
export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    CardVariantsProps {
  /**
   * Optional header content
   */
  header?: React.ReactNode;
  /**
   * Optional footer content
   */
  footer?: React.ReactNode;
}

/**
 * A container component with solid or glass styling.
 * 
 * @example
 * ```tsx
 * // Default card
 * <Card>Content here</Card>
 * 
 * // Glass variant for overlays
 * <Card variant="glass">Floating content</Card>
 * 
 * // Frosted glass with header
 * <Card variant="glassFrosted" header={<h2>Title</h2>}>
 *   Card content
 * </Card>
 * ```
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { className, variant, padding, header, footer, children, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding }), className)}
        {...props}
      >
        {header && (
          <div className="border-b border-inherit pb-4 mb-4">{header}</div>
        )}
        {children}
        {footer && (
          <div className="border-t border-inherit pt-4 mt-4">{footer}</div>
        )}
      </div>
    );
  }
);

Card.displayName = 'Card';

/**
 * Card Header component
 */
export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

/**
 * Card Title component
 */
export const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

/**
 * Card Description component
 */
export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

/**
 * Card Content component
 */
export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

/**
 * Card Footer component
 */
export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';
