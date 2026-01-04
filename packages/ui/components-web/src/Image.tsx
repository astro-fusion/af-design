/**
 * @fileoverview Image component with loading states and fallback
 * @module @astrofusion/design-system-web
 * @license MIT
 */

import React, { useState } from 'react';
import { cn } from './utils/cn';

/**
 * Props for the Image component.
 */
export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * Fallback content when image fails to load
   */
  fallback?: React.ReactNode;
  /**
   * Aspect ratio (width/height)
   */
  aspectRatio?: '1/1' | '16/9' | '4/3' | '3/2' | '21/9' | 'auto';
  /**
   * Object fit behavior
   */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  /**
   * Border radius
   */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

const roundedMap: Record<NonNullable<ImageProps['rounded']>, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-full',
};

const aspectRatioMap: Record<NonNullable<ImageProps['aspectRatio']>, string> = {
  '1/1': 'aspect-square',
  '16/9': 'aspect-video',
  '4/3': 'aspect-[4/3]',
  '3/2': 'aspect-[3/2]',
  '21/9': 'aspect-[21/9]',
  auto: 'aspect-auto',
};

const objectFitMap: Record<NonNullable<ImageProps['objectFit']>, string> = {
  cover: 'object-cover',
  contain: 'object-contain',
  fill: 'object-fill',
  none: 'object-none',
  'scale-down': 'object-scale-down',
};

/**
 * An image component with loading states and fallback support.
 * 
 * @example
 * ```tsx
 * // Basic image
 * <Image src="/photo.jpg" alt="Photo" />
 * 
 * // With aspect ratio and rounded corners
 * <Image 
 *   src="/photo.jpg" 
 *   alt="Photo" 
 *   aspectRatio="16/9" 
 *   rounded="lg"
 * />
 * 
 * // With fallback
 * <Image 
 *   src="/photo.jpg" 
 *   alt="Photo" 
 *   fallback={<div>Failed to load</div>}
 * />
 * ```
 */
export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      className,
      src,
      alt,
      fallback,
      aspectRatio,
      objectFit = 'cover',
      rounded = 'md',
      onError,
      onLoad,
      ...props
    },
    ref
  ) => {
    const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setStatus('error');
      onError?.(e);
    };

    const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setStatus('loaded');
      onLoad?.(e);
    };

    if (status === 'error' && fallback) {
      return <>{fallback}</>;
    }

    return (
      <div
        className={cn(
          'relative overflow-hidden bg-muted',
          aspectRatio && aspectRatioMap[aspectRatio],
          roundedMap[rounded]
        )}
      >
        {status === 'loading' && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
            <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <img
          ref={ref}
          src={src}
          alt={alt}
          onError={handleError}
          onLoad={handleLoad}
          className={cn(
            'w-full h-full transition-opacity duration-300',
            objectFitMap[objectFit],
            status === 'loading' ? 'opacity-0' : 'opacity-100',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Image.displayName = 'Image';

/**
 * Avatar component - circular image with fallback initials
 */
export interface AvatarProps extends Omit<ImageProps, 'rounded' | 'aspectRatio'> {
  /**
   * Size of the avatar
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Initials to show as fallback
   */
  initials?: string;
}

const avatarSizeMap: Record<NonNullable<AvatarProps['size']>, string> = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-12 w-12 text-lg',
  xl: 'h-16 w-16 text-xl',
};

export const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
  ({ className, size = 'md', initials, src, alt, ...props }, ref) => {
    const [hasError, setHasError] = useState(false);

    if (!src || hasError) {
      return (
        <div
          className={cn(
            'flex items-center justify-center rounded-full bg-primary text-primary-foreground font-medium',
            avatarSizeMap[size],
            className
          )}
        >
          {initials || alt?.charAt(0)?.toUpperCase() || '?'}
        </div>
      );
    }

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        onError={() => setHasError(true)}
        className={cn(
          'rounded-full object-cover',
          avatarSizeMap[size],
          className
        )}
        {...props}
      />
    );
  }
);

Avatar.displayName = 'Avatar';
