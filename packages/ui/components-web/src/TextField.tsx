/**
 * @fileoverview TextField component with glass morphism variants
 * @module @astrofusion/design-system-web
 * @license MIT
 */

import React from 'react';
import { inputVariants, type InputVariantsProps } from '@astrofusion/design-tokens';
import { cn } from './utils/cn';

/**
 * Props for the TextField component.
 */
export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    InputVariantsProps {
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
   * Left addon element
   */
  leftAddon?: React.ReactNode;
  /**
   * Right addon element
   */
  rightAddon?: React.ReactNode;
  /**
   * Full width input
   */
  fullWidth?: boolean;
}

/**
 * A text input component with glass morphism styling.
 * 
 * @example
 * ```tsx
 * // Basic input
 * <TextField placeholder="Enter text" />
 * 
 * // Glass variant with label
 * <TextField variant="glass" label="Email" type="email" />
 * 
 * // With error state
 * <TextField label="Password" error="Password is required" />
 * ```
 */
export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      variant,
      inputSize,
      label,
      helperText,
      error,
      leftAddon,
      rightAddon,
      fullWidth,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || React.useId();
    const hasError = Boolean(error);

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftAddon && (
            <div className="absolute left-3 flex items-center pointer-events-none text-muted-foreground">
              {leftAddon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            className={cn(
              inputVariants({ variant, inputSize }),
              leftAddon && 'pl-10',
              rightAddon && 'pr-10',
              hasError && 'border-destructive focus-visible:ring-destructive',
              fullWidth && 'w-full',
              className
            )}
            {...props}
          />
          {rightAddon && (
            <div className="absolute right-3 flex items-center pointer-events-none text-muted-foreground">
              {rightAddon}
            </div>
          )}
        </div>
        {(error || helperText) && (
          <p
            id={error ? `${inputId}-error` : `${inputId}-helper`}
            className={cn(
              'text-xs',
              error ? 'text-destructive' : 'text-muted-foreground'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';

/**
 * Textarea component with glass morphism variants
 */
export interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    Omit<InputVariantsProps, 'inputSize'> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,
      variant,
      label,
      helperText,
      error,
      fullWidth,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const textareaId = id || React.useId();
    const hasError = Boolean(error);

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          aria-invalid={hasError}
          className={cn(
            inputVariants({ variant }),
            'min-h-[80px] py-2',
            hasError && 'border-destructive focus-visible:ring-destructive',
            fullWidth && 'w-full',
            className
          )}
          {...props}
        />
        {(error || helperText) && (
          <p
            className={cn(
              'text-xs',
              error ? 'text-destructive' : 'text-muted-foreground'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
