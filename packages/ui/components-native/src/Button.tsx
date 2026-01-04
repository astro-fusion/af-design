/**
 * @fileoverview Button component for React Native with NativeWind
 * Uses shared CVA variants from design tokens
 * @module @astrofusion/design-system-native
 * @license MIT
 */

import React from 'react';
import { Pressable, Text, ActivityIndicator, View, type PressableProps } from 'react-native';
import {
  buttonContainerVariants,
  buttonTextVariants,
  type ButtonContainerVariantsProps,
} from '../../../core/tokens/src';
import { cn } from './utils/cn';

/**
 * Props for the Button component.
 */
export interface ButtonProps extends PressableProps, ButtonContainerVariantsProps {
  /**
   * Button label text
   */
  label?: string;
  /**
   * Optional loading state
   */
  isLoading?: boolean;
  /**
   * Additional class names for text
   */
  textClassName?: string;
  /**
   * Optional left icon
   */
  leftIcon?: React.ReactNode;
  /**
   * Optional right icon
   */
  rightIcon?: React.ReactNode;
  /**
   * Children (for complex content)
   */
  children?: React.ReactNode;
}

/**
 * A versatile button component for React Native with NativeWind.
 * 
 * @example
 * ```tsx
 * // Primary button (default)
 * <Button label="Click Me" />
 * 
 * // Glass variant with large size
 * <Button variant="glass" size="lg" label="Submit" />
 * 
 * // With loading state
 * <Button label="Processing" isLoading />
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  className,
  variant,
  size,
  label,
  isLoading,
  textClassName,
  leftIcon,
  rightIcon,
  disabled,
  children,
  ...props
}) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <View className="flex-row items-center">
          <ActivityIndicator size="small" className="mr-2" />
          {label && (
            <Text className={cn(buttonTextVariants({ variant, size }), textClassName)}>
              {label}
            </Text>
          )}
        </View>
      );
    }

    if (children && typeof children !== 'string') {
      return children;
    }

    const textContent = label || (typeof children === 'string' ? children : null);

    return (
      <View className="flex-row items-center">
        {leftIcon && <View className="mr-2">{leftIcon}</View>}
        {textContent && (
          <Text className={cn(buttonTextVariants({ variant, size }), textClassName)}>
            {textContent}
          </Text>
        )}
        {rightIcon && <View className="ml-2">{rightIcon}</View>}
      </View>
    );
  };

  return (
    <Pressable
      className={cn(
        buttonContainerVariants({ variant, size }),
        isLoading && 'opacity-70',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {renderContent()}
    </Pressable>
  );
};

Button.displayName = 'Button';
