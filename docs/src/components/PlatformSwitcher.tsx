'use client';

import React, { useState } from 'react';
import { Platform, PLATFORMS, getPlatformInfo } from '../platforms';
import { clsx } from 'clsx';

interface PlatformSwitcherProps {
  value: Platform;
  onChange: (platform: Platform) => void;
  className?: string;
}

/**
 * Platform switcher component - allows users to select between Web, React Native, iOS, Android
 */
export const PlatformSwitcher: React.FC<PlatformSwitcherProps> = ({
  value,
  onChange,
  className,
}) => {
  return (
    <div className={clsx('flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg', className)}>
      {PLATFORMS.map((platform) => (
        <button
          key={platform.id}
          onClick={() => onChange(platform.id)}
          className={clsx(
            'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all',
            value === platform.id
              ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          )}
        >
          <span>{platform.icon}</span>
          <span className="hidden sm:inline">{platform.name}</span>
        </button>
      ))}
    </div>
  );
};

/**
 * Hook for managing platform state
 */
export function usePlatform(defaultPlatform: Platform = 'web') {
  const [platform, setPlatform] = useState<Platform>(defaultPlatform);
  const info = getPlatformInfo(platform);
  
  return {
    platform,
    setPlatform,
    info,
  };
}
