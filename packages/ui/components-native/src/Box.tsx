/**
 * @fileoverview Box component for React Native with NativeWind
 * @module @astrofusion/design-system-native
 * @license MIT
 */

import React from 'react';
import { View, type ViewProps } from 'react-native';
import { boxVariants, type BoxVariantsProps } from '../../../core/tokens/src';
import { cn } from './utils/cn';

/**
 * Props for the Box component.
 */
export interface BoxProps extends ViewProps, BoxVariantsProps {}

/**
 * A flexible container component with glass morphism and Vedic planetary color variants.
 * 
 * @example
 * ```tsx
 * // Default box
 * <Box><Text>Content</Text></Box>
 * 
 * // Glass variant
 * <Box variant="glass"><Text>Frosted content</Text></Box>
 * 
 * // Vedic planetary colors
 * <Box variant="yellow"><Text>Jupiter (Guru)</Text></Box>
 * ```
 */
export const Box: React.FC<BoxProps> = ({
  className,
  variant,
  children,
  ...props
}) => {
  return (
    <View className={cn(boxVariants({ variant }), className)} {...props}>
      {children}
    </View>
  );
};

Box.displayName = 'Box';
