/**
 * @fileoverview Typography component for React Native with NativeWind
 * @module @astrofusion/design-system-native
 * @license MIT
 */

import React from 'react';
import { Text, type TextProps } from 'react-native';
import { textVariants, type TextVariantsProps } from '../../../core/tokens/src';
import { cn } from './utils/cn';

/**
 * Props for the Typography component.
 */
export interface TypographyProps extends TextProps, TextVariantsProps {}

/**
 * A flexible typography component with semantic variants.
 * 
 * @example
 * ```tsx
 * // Heading variants
 * <Typography variant="h1">Main Title</Typography>
 * <Typography variant="h2">Section Title</Typography>
 * 
 * // Paragraph with color
 * <Typography variant="p" color="muted">Description text</Typography>
 * ```
 */
export const Typography: React.FC<TypographyProps> = ({
  className,
  variant = 'default',
  color,
  children,
  ...props
}) => {
  return (
    <Text
      className={cn(textVariants({ variant, color }), className)}
      {...props}
    >
      {children}
    </Text>
  );
};

Typography.displayName = 'Typography';

// Convenience components
export const H1: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h1" {...props} />
);
H1.displayName = 'H1';

export const H2: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h2" {...props} />
);
H2.displayName = 'H2';

export const H3: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h3" {...props} />
);
H3.displayName = 'H3';

export const H4: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h4" {...props} />
);
H4.displayName = 'H4';

export const Paragraph: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="p" {...props} />
);
Paragraph.displayName = 'Paragraph';

export const Lead: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="lead" {...props} />
);
Lead.displayName = 'Lead';

export const Muted: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="muted" {...props} />
);
Muted.displayName = 'Muted';
