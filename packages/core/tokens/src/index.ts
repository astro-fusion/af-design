/**
 * @fileoverview Design tokens for the AstroFusion Design System.
 * These tokens serve as the single source of truth for all platforms.
 * @module @astrofusion/design-tokens
 * @license MIT
 */

import colors from './colors.json';
import typography from './typography.json';
import spacing from './spacing.json';

/**
 * Complete design token collection.
 * @typedef {Object} DesignTokens
 * @property {typeof colors} colors - Color palette tokens
 * @property {typeof typography} typography - Typography tokens
 * @property {typeof spacing} spacing - Spacing scale tokens
 */
export const tokens = {
  colors,
  typography,
  spacing
};

/**
 * TypeScript type for the complete token set.
 */
export type DesignTokens = typeof tokens;

/**
 * Color tokens type.
 */
export type ColorTokens = typeof colors;

/**
 * Typography tokens type.
 */
export type TypographyTokens = typeof typography;

/**
 * Spacing tokens type.
 */
export type SpacingTokens = typeof spacing;
