/**
 * Utility function for merging class names
 * Compatible with both Tailwind CSS and NativeWind
 * 
 * @module @astrofusion/design-system-web
 * @license MIT
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names with Tailwind CSS conflict resolution
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
