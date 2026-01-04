/**
 * @fileoverview Divider component for React Native with NativeWind
 * @module @astrofusion/design-system-native
 * @license MIT
 */

import React from 'react';
import { View, Text, type ViewProps } from 'react-native';
import { dividerVariants, type DividerVariantsProps } from '@astrofusion/design-tokens';
import { cn } from './utils/cn';

/**
 * Props for the Divider component.
 */
export interface DividerProps extends ViewProps, DividerVariantsProps {
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
export const Divider: React.FC<DividerProps> = ({
  className,
  orientation = 'horizontal',
  variant,
  label,
  ...props
}) => {
  if (label && orientation === 'horizontal') {
    return (
      <View
        className={cn('flex-row items-center', className)}
        {...props}
      >
        <View className={cn(dividerVariants({ orientation, variant }), 'flex-1')} />
        <Text className="mx-4 text-xs text-muted-foreground uppercase tracking-wider">
          {label}
        </Text>
        <View className={cn(dividerVariants({ orientation, variant }), 'flex-1')} />
      </View>
    );
  }

  return (
    <View
      accessibilityRole="none"
      className={cn(dividerVariants({ orientation, variant }), className)}
      {...props}
    />
  );
};

Divider.displayName = 'Divider';
