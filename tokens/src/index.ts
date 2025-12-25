import colors from './colors.json';
import typography from './typography.json';
import spacing from './spacing.json';

export const tokens = {
  colors,
  typography,
  spacing
};

export type DesignTokens = typeof tokens;
