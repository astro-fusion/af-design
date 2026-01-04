/**
 * Utility function for merging class names
 * Compatible with NativeWind
 * 
 * @module @astrofusion/design-system-native
 * @license MIT
 */

import { clsx, type ClassValue } from 'clsx';

/**
 * Merge class names for NativeWind
 * Note: NativeWind doesn't need tailwind-merge since it compiles at build time
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
