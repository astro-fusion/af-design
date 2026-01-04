/**
 * @fileoverview TextField component for React Native with NativeWind
 * @module @astrofusion/design-system-native
 * @license MIT
 */

import React from 'react';
import { View, Text, TextInput, type TextInputProps } from 'react-native';
import { inputVariants, type InputVariantsProps } from '../../../core/tokens/src';
import { cn } from './utils/cn';

/**
 * Props for the TextField component.
 */
export interface TextFieldProps extends TextInputProps, Omit<InputVariantsProps, 'inputSize'> {
  /**
   * Label for the input
   */
  label?: string;
  /**
   * Helper text below the input
   */
  helperText?: string;
  /**
   * Error message (replaces helperText when present)
   */
  error?: string;
  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Full width input
   */
  fullWidth?: boolean;
  /**
   * Container class name
   */
  containerClassName?: string;
}

const sizeMap = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-3 text-base',
  lg: 'h-12 px-4 text-lg',
};

/**
 * A text input component with glass morphism styling.
 * 
 * @example
 * ```tsx
 * // Basic input
 * <TextField placeholder="Enter text" />
 * 
 * // Glass variant with label
 * <TextField variant="glass" label="Email" />
 * 
 * // With error state
 * <TextField label="Password" error="Password is required" />
 * ```
 */
export const TextField: React.FC<TextFieldProps> = ({
  className,
  containerClassName,
  variant,
  size = 'md',
  label,
  helperText,
  error,
  fullWidth,
  editable = true,
  ...props
}) => {
  const hasError = Boolean(error);

  return (
    <View className={cn('flex-col gap-1.5', fullWidth && 'w-full', containerClassName)}>
      {label && (
        <Text className="text-sm font-medium text-foreground">
          {label}
        </Text>
      )}
      <TextInput
        editable={editable}
        className={cn(
          inputVariants({ variant }),
          sizeMap[size],
          hasError && 'border-destructive',
          !editable && 'opacity-50',
          fullWidth && 'w-full',
          className
        )}
        {...props}
      />
      {(error || helperText) && (
        <Text
          className={cn(
            'text-xs',
            error ? 'text-destructive' : 'text-muted-foreground'
          )}
        >
          {error || helperText}
        </Text>
      )}
    </View>
  );
};

TextField.displayName = 'TextField';
