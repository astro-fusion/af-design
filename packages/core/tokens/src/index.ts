/**
 * @fileoverview Design tokens for the AstroFusion Design System.
 * These tokens serve as the single source of truth for all platforms.
 * @module @astrofusion/design-tokens
 * @license MIT
 */

import colors from './colors.json';
import typography from './typography.json';
import spacing from './spacing.json';

// Core tokens
export const tokens = {
  colors,
  typography,
  spacing
};

export type DesignTokens = typeof tokens;
export type ColorTokens = typeof colors;
export type TypographyTokens = typeof typography;
export type SpacingTokens = typeof spacing;

// Glassmorphism tokens
export {
  glassmorphism,
  glassUtils,
  type GlassmorphismTokens,
  type GlassBackgroundKey,
  type GlassBlurKey,
  type GlassBorderKey,
  type GlassStyleKey,
} from './glassmorphism';

// CVA-based variants (shared between web and native)
export {
  // Typography
  textVariants,
  type TextVariantsProps,
  // Button
  buttonContainerVariants,
  buttonTextVariants,
  type ButtonContainerVariantsProps,
  type ButtonTextVariantsProps,
  // Box
  boxVariants,
  type BoxVariantsProps,
  // Card
  cardVariants,
  type CardVariantsProps,
  // Input
  inputVariants,
  type InputVariantsProps,
  // Divider
  dividerVariants,
  type DividerVariantsProps,
} from './variants';

// Tailwind CSS plugin
export { afGlassPlugin, default as tailwindPlugin } from './tailwind-plugin';

