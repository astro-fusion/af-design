import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'solid' | 'glass';
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'solid',
  ...props
}) => {
  const baseStyles = 'rounded-xl p-6 transition-all duration-200';
  
  const variants = {
    solid: 'bg-starlight-100 dark:bg-cosmic-800 shadow-lg border border-starlight-300 dark:border-cosmic-700',
    glass: 'bg-surface-glass backdrop-blur-xl border border-starlight-100/10 shadow-2xl',
  };

  return (
    <div
      className={twMerge(clsx(baseStyles, variants[variant], className))}
      {...props}
    >
      {children}
    </div>
  );
};
