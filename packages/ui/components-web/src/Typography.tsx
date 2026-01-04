/**
 * @fileoverview Typography component with semantic variants
 * @module @astrofusion/design-system-web
 * @license MIT
 */

import React from 'react';
import { textVariants, type TextVariantsProps } from '../../../core/tokens/src';
import { cn } from './utils/cn';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type TextElement = 'p' | 'span' | 'blockquote' | 'label';
type TypographyAs = HeadingLevel | TextElement;

/**
 * Props for the Typography component.
 */
export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    TextVariantsProps {
  /**
   * The element to render
   * @default 'p'
   */
  as?: TypographyAs;
}

/**
 * Mapping of variant to default element
 */
const variantElementMap: Record<NonNullable<TextVariantsProps['variant']>, TypographyAs> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  p: 'p',
  blockquote: 'blockquote',
  lead: 'p',
  large: 'p',
  small: 'span',
  muted: 'span',
  default: 'p',
};

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
 * 
 * // Custom element override
 * <Typography as="label" variant="small">Label</Typography>
 * ```
 */
export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = 'default', color, as, children, ...props }, ref) => {
    const Component = as || variantElementMap[variant ?? 'default'];
    
    return React.createElement(
      Component,
      {
        ref,
        className: cn(textVariants({ variant, color }), className),
        ...props,
      },
      children
    );
  }
);

Typography.displayName = 'Typography';

// Convenience components
export const H1 = React.forwardRef<
  HTMLHeadingElement,
  Omit<TypographyProps, 'variant' | 'as'>
>((props, ref) => <Typography ref={ref} variant="h1" as="h1" {...props} />);
H1.displayName = 'H1';

export const H2 = React.forwardRef<
  HTMLHeadingElement,
  Omit<TypographyProps, 'variant' | 'as'>
>((props, ref) => <Typography ref={ref} variant="h2" as="h2" {...props} />);
H2.displayName = 'H2';

export const H3 = React.forwardRef<
  HTMLHeadingElement,
  Omit<TypographyProps, 'variant' | 'as'>
>((props, ref) => <Typography ref={ref} variant="h3" as="h3" {...props} />);
H3.displayName = 'H3';

export const H4 = React.forwardRef<
  HTMLHeadingElement,
  Omit<TypographyProps, 'variant' | 'as'>
>((props, ref) => <Typography ref={ref} variant="h4" as="h4" {...props} />);
H4.displayName = 'H4';

export const Paragraph = React.forwardRef<
  HTMLParagraphElement,
  Omit<TypographyProps, 'variant' | 'as'>
>((props, ref) => <Typography ref={ref} variant="p" as="p" {...props} />);
Paragraph.displayName = 'Paragraph';

export const Lead = React.forwardRef<
  HTMLParagraphElement,
  Omit<TypographyProps, 'variant' | 'as'>
>((props, ref) => <Typography ref={ref} variant="lead" as="p" {...props} />);
Lead.displayName = 'Lead';

export const Muted = React.forwardRef<
  HTMLSpanElement,
  Omit<TypographyProps, 'variant' | 'as'>
>((props, ref) => <Typography ref={ref} variant="muted" as="span" {...props} />);
Muted.displayName = 'Muted';

export const Blockquote = React.forwardRef<
  HTMLQuoteElement,
  Omit<TypographyProps, 'variant' | 'as'>
>((props, ref) => (
  <Typography ref={ref} variant="blockquote" as="blockquote" {...props} />
));
Blockquote.displayName = 'Blockquote';
