'use client';

import React, { useState } from 'react';
import { Platform, getPlatformInfo } from '../platforms';
import { getComponentSource, getComponentPrompt, getFullPrompt } from '../registry';
import { clsx } from 'clsx';

interface CodeViewerProps {
  component: string;
  platform: Platform;
  className?: string;
}

/**
 * Code viewer with copy functionality
 */
export const CodeViewer: React.FC<CodeViewerProps> = ({
  component,
  platform,
  className,
}) => {
  const [copied, setCopied] = useState(false);
  const source = getComponentSource(component, platform);
  const info = getPlatformInfo(platform);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(source);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={clsx('relative rounded-lg overflow-hidden', className)}>
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <span className="text-sm text-gray-400">
          {component}{info.fileExtension}
        </span>
        <button
          onClick={handleCopy}
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          {copied ? '✓ Copied!' : 'Copy Code'}
        </button>
      </div>
      <pre className="p-4 bg-gray-900 text-gray-100 text-sm overflow-x-auto">
        <code>{source}</code>
      </pre>
    </div>
  );
};

interface PromptViewerProps {
  platform: Platform;
  components?: string[];
  className?: string;
}

/**
 * AI Prompt viewer with copy functionality
 */
export const PromptViewer: React.FC<PromptViewerProps> = ({
  platform,
  components = [],
  className,
}) => {
  const [copied, setCopied] = useState(false);
  const prompt = getFullPrompt(platform, components);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={clsx('relative rounded-lg overflow-hidden', className)}>
      <div className="flex items-center justify-between px-4 py-2 bg-purple-900 border-b border-purple-800">
        <span className="text-sm text-purple-300">
          🤖 AI System Prompt
        </span>
        <button
          onClick={handleCopy}
          className="text-sm text-purple-300 hover:text-white transition-colors"
        >
          {copied ? '✓ Copied!' : 'Copy for AI'}
        </button>
      </div>
      <pre className="p-4 bg-purple-950 text-purple-100 text-sm overflow-x-auto whitespace-pre-wrap">
        <code>{prompt}</code>
      </pre>
    </div>
  );
};
