/**
 * @fileoverview Card component for React Native with NativeWind
 * @module @astrofusion/design-system-native
 * @license MIT
 */

import React from 'react';
import { View, type ViewProps } from 'react-native';
import { cardVariants, type CardVariantsProps } from '../../../core/tokens/src';
import { cn } from './utils/cn';

/**
 * Props for the Card component.
 */
export interface CardProps extends ViewProps, CardVariantsProps {
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
 * <Card><Text>Content here</Text></Card>
 * 
 * // Glass variant
 * <Card variant="glass"><Text>Floating content</Text></Card>
 * ```
 */
export const Card: React.FC<CardProps> = ({
  className,
  variant,
  padding,
  header,
  footer,
  children,
  ...props
}) => {
  return (
    <View
      className={cn(cardVariants({ variant, padding }), className)}
      {...props}
    >
      {header && (
        <View className="border-b border-inherit pb-4 mb-4">{header}</View>
      )}
      {children}
      {footer && (
        <View className="border-t border-inherit pt-4 mt-4">{footer}</View>
      )}
    </View>
  );
};

Card.displayName = 'Card';

/**
 * Card Header component
 */
export const CardHeader: React.FC<ViewProps> = ({ className, ...props }) => (
  <View className={cn('flex-col space-y-1.5', className)} {...props} />
);
CardHeader.displayName = 'CardHeader';

/**
 * Card Content component
 */
export const CardContent: React.FC<ViewProps> = ({ className, ...props }) => (
  <View className={cn('pt-0', className)} {...props} />
);
CardContent.displayName = 'CardContent';

/**
 * Card Footer component
 */
export const CardFooter: React.FC<ViewProps> = ({ className, ...props }) => (
  <View className={cn('flex-row items-center pt-0', className)} {...props} />
);
CardFooter.displayName = 'CardFooter';
