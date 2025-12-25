'use client';

import React from 'react';
import { Platform } from '../platforms';
import { PlatformSwitcher, usePlatform } from './PlatformSwitcher';
import { CodeViewer, PromptViewer } from './CodeViewer';
import { clsx } from 'clsx';

interface ComponentDocProps {
  component: string;
  title: string;
  description?: string;
  className?: string;
}

/**
 * Full component documentation block with platform switcher, code, and AI prompt
 */
export const ComponentDoc: React.FC<ComponentDocProps> = ({
  component,
  title,
  description,
  className,
}) => {
  const { platform, setPlatform, info } = usePlatform('web');
  const [activeTab, setActiveTab] = React.useState<'code' | 'prompt'>('code');

  return (
    <div className={clsx('rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden', className)}>
      {/* Header */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{description}</p>
        )}
      </div>

      {/* Platform Switcher */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <PlatformSwitcher value={platform} onChange={setPlatform} />
      </div>

      {/* Tab Buttons */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('code')}
          className={clsx(
            'flex-1 px-4 py-3 text-sm font-medium transition-colors',
            activeTab === 'code'
              ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-750'
          )}
        >
          📄 Source Code
        </button>
        <button
          onClick={() => setActiveTab('prompt')}
          className={clsx(
            'flex-1 px-4 py-3 text-sm font-medium transition-colors',
            activeTab === 'prompt'
              ? 'bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-750'
          )}
        >
          🤖 AI Prompt
        </button>
      </div>

      {/* Content */}
      <div>
        {activeTab === 'code' && (
          <CodeViewer component={component} platform={platform} />
        )}
        {activeTab === 'prompt' && (
          <PromptViewer platform={platform} components={[component]} />
        )}
      </div>
    </div>
  );
};
