/**
 * CVA-based variant definitions shared by both web and native platforms
 * Provides type-safe styling variants for glass morphism components
 * 
 * @module @astrofusion/design-tokens
 * @license MIT
 */

import { cva, type VariantProps } from 'class-variance-authority';

// ============================================================================
// Typography Variants
// ============================================================================

export const textVariants = cva('', {
  variants: {
    variant: {
      default: 'text-base text-foreground',
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      p: 'leading-7 [&:not(:first-child)]:mt-6',
      lead: 'text-xl text-muted-foreground',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-none',
      muted: 'text-sm text-muted-foreground',
      blockquote: 'mt-6 border-l-2 pl-6 italic',
    },
    color: {
      default: '',
      primary: 'text-primary',
      secondary: 'text-secondary-foreground',
      muted: 'text-muted-foreground',
      accent: 'text-accent-foreground',
      destructive: 'text-destructive',
      white: 'text-white',
    },
  },
  defaultVariants: {
    variant: 'default',
    color: 'default',
  },
});

export type TextVariantsProps = VariantProps<typeof textVariants>;

// ============================================================================
// Button Variants
// ============================================================================

// Container styles (Layout, background, borders)
export const buttonContainerVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary shadow hover:bg-primary/90',
        destructive: 'bg-destructive shadow-sm hover:bg-destructive/90',
        outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        glass: 'bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg hover:bg-white/20 dark:hover:bg-white/10',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// Text/Content styles (Color, size, weight)
export const buttonTextVariants = cva('text-sm font-medium', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      destructive: 'text-destructive-foreground',
      outline: 'text-foreground',
      secondary: 'text-secondary-foreground',
      ghost: 'text-foreground',
      link: 'text-primary underline',
      glass: 'text-foreground',
    },
    size: {
      default: '',
      sm: 'text-xs',
      lg: '',
      icon: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export type ButtonContainerVariantsProps = VariantProps<typeof buttonContainerVariants>;
export type ButtonTextVariantsProps = VariantProps<typeof buttonTextVariants>;

// ============================================================================
// Box Variants (with Vedic Planetary Colors)
// ============================================================================

export const boxVariants = cva('', {
  variants: {
    variant: {
      default: 'bg-background text-foreground',
      card: 'rounded-xl border bg-card text-card-foreground shadow',
      glass: 'bg-white/10 dark:bg-slate-900/60 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg rounded-xl',
      // Vedic Planetary Colors (Pastel Light / Distinct Dark)
      yellow: 'rounded-xl border border-yellow-100 bg-yellow-50 text-slate-900 dark:bg-yellow-950 dark:border-yellow-900/50 dark:text-yellow-100', // Jupiter (Guru)
      white: 'rounded-xl border border-slate-200 bg-slate-50 text-slate-900 dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100', // Moon (Chandra)
      red: 'rounded-xl border border-red-100 bg-red-50 text-slate-900 dark:bg-red-950 dark:border-red-900/50 dark:text-red-100', // Mars (Mangal)
      green: 'rounded-xl border border-green-100 bg-green-50 text-slate-900 dark:bg-green-950 dark:border-green-900/50 dark:text-green-100', // Mercury (Budha)
      pink: 'rounded-xl border border-pink-100 bg-pink-50 text-slate-900 dark:bg-pink-950 dark:border-pink-900/50 dark:text-pink-100', // Venus (Shukra)
      orange: 'rounded-xl border border-orange-100 bg-orange-50 text-slate-900 dark:bg-orange-950 dark:border-orange-900/50 dark:text-orange-100', // Sun (Surya)
      blue: 'rounded-xl border border-blue-100 bg-blue-50 text-slate-900 dark:bg-blue-950 dark:border-blue-900/50 dark:text-blue-100', // Jupiter (Alt)
      black: 'rounded-xl border border-slate-300 bg-slate-100 text-slate-900 dark:bg-slate-950 dark:border-slate-600 dark:text-slate-100', // Saturn (Shani)
      darkBlue: 'rounded-xl border border-slate-300 bg-slate-100 text-slate-900 dark:bg-slate-950 dark:border-slate-600 dark:text-slate-100', // Rahu
      brown: 'rounded-xl border border-amber-200 bg-amber-50 text-slate-900 dark:bg-amber-950 dark:border-amber-800/50 dark:text-amber-100', // Ketu
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type BoxVariantsProps = VariantProps<typeof boxVariants>;

// ============================================================================
// Card Variants
// ============================================================================

export const cardVariants = cva('rounded-xl transition-all duration-200', {
  variants: {
    variant: {
      default: 'bg-card text-card-foreground shadow-md border border-border',
      solid: 'bg-starlight-100 dark:bg-cosmic-800 shadow-lg border border-starlight-300 dark:border-cosmic-700',
      glass: 'bg-white/10 dark:bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl',
      glassFrosted: 'bg-white/40 dark:bg-slate-900/70 backdrop-blur-2xl border border-white/30 shadow-xl',
      glassUltraThin: 'bg-white/5 dark:bg-slate-900/30 backdrop-blur-sm border border-white/5 shadow-lg',
    },
    padding: {
      none: 'p-0',
      sm: 'p-3',
      md: 'p-6',
      lg: 'p-8',
    },
  },
  defaultVariants: {
    variant: 'default',
    padding: 'md',
  },
});

export type CardVariantsProps = VariantProps<typeof cardVariants>;

// ============================================================================
// Input Variants
// ============================================================================

export const inputVariants = cva(
  'flex w-full rounded-md border text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-input bg-transparent shadow-sm',
        glass: 'bg-white/10 dark:bg-white/5 backdrop-blur-md border-white/20 dark:border-white/10 focus:bg-white/20 dark:focus:bg-white/10',
        filled: 'bg-muted border-transparent focus:bg-background focus:border-input',
      },
      inputSize: {
        sm: 'h-8 px-3',
        md: 'h-9 px-3',
        lg: 'h-10 px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
    },
  }
);

export type InputVariantsProps = VariantProps<typeof inputVariants>;

// ============================================================================
// Divider Variants
// ============================================================================

export const dividerVariants = cva('shrink-0 bg-border', {
  variants: {
    orientation: {
      horizontal: 'h-[1px] w-full',
      vertical: 'h-full w-[1px]',
    },
    variant: {
      default: 'bg-border',
      glass: 'bg-white/20 dark:bg-white/10',
      strong: 'bg-foreground/20',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    variant: 'default',
  },
});

export type DividerVariantsProps = VariantProps<typeof dividerVariants>;
