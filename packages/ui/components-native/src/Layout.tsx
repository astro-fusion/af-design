/**
 * @fileoverview Layout components for React Native with NativeWind
 * @module @astrofusion/design-system-native
 * @license MIT
 */

import React from 'react';
import { View, type ViewProps } from 'react-native';
import { cn } from './utils/cn';

/**
 * Common flex props
 */
interface FlexProps extends ViewProps {
  /**
   * Gap between items (Tailwind spacing scale)
   */
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  /**
   * Align items on cross axis
   */
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  /**
   * Justify content on main axis
   */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  /**
   * Whether to wrap items
   */
  wrap?: boolean;
  /**
   * Reverse the direction
   */
  reverse?: boolean;
  /**
   * Full width container
   */
  fullWidth?: boolean;
}

const alignMap: Record<NonNullable<FlexProps['align']>, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

const justifyMap: Record<NonNullable<FlexProps['justify']>, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

const gapMap: Record<NonNullable<FlexProps['gap']>, string> = {
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
  8: 'gap-8',
  10: 'gap-10',
  12: 'gap-12',
};

/**
 * Row component - horizontal flex container
 */
export const Row: React.FC<FlexProps> = ({
  className,
  gap = 4,
  align,
  justify,
  wrap,
  reverse,
  fullWidth,
  children,
  ...props
}) => {
  return (
    <View
      className={cn(
        'flex',
        reverse ? 'flex-row-reverse' : 'flex-row',
        gapMap[gap],
        align && alignMap[align],
        justify && justifyMap[justify],
        wrap && 'flex-wrap',
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
};

Row.displayName = 'Row';

/**
 * Column component - vertical flex container
 */
export const Column: React.FC<FlexProps> = ({
  className,
  gap = 4,
  align,
  justify,
  wrap,
  reverse,
  fullWidth,
  children,
  ...props
}) => {
  return (
    <View
      className={cn(
        'flex',
        reverse ? 'flex-col-reverse' : 'flex-col',
        gapMap[gap],
        align && alignMap[align],
        justify && justifyMap[justify],
        wrap && 'flex-wrap',
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
};

Column.displayName = 'Column';

/**
 * Center component - centers content both horizontally and vertically
 */
export const Center: React.FC<ViewProps> = ({ className, ...props }) => (
  <View className={cn('flex items-center justify-center', className)} {...props} />
);

Center.displayName = 'Center';

/**
 * Spacer component - flexible spacer for flex layouts
 */
export const Spacer: React.FC<ViewProps> = ({ className, ...props }) => (
  <View className={cn('flex-1', className)} {...props} />
);

Spacer.displayName = 'Spacer';
