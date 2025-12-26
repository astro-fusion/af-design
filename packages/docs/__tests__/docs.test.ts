/**
 * @fileoverview Tests for documentation utilities.
 */

import { describe, it, expect } from 'vitest';
import {
  PLATFORMS,
  getPlatformInfo,
  getComponentSource,
  getPlatformPrompt,
  getFullPrompt,
} from '../src/index';

describe('@astrofusion/design-docs', () => {
  describe('PLATFORMS', () => {
    it('should export platform list', () => {
      expect(PLATFORMS).toBeDefined();
      expect(PLATFORMS.length).toBe(4);
    });

    it('should include web platform', () => {
      const web = PLATFORMS.find(p => p.id === 'web');
      expect(web).toBeDefined();
      expect(web?.name).toBe('Web');
    });

    it('should include react-native platform', () => {
      const rn = PLATFORMS.find(p => p.id === 'react-native');
      expect(rn).toBeDefined();
    });
  });

  describe('getPlatformInfo', () => {
    it('should return platform info for web', () => {
      const info = getPlatformInfo('web');
      expect(info.id).toBe('web');
      expect(info.language).toBe('tsx');
    });

    it('should return platform info for ios', () => {
      const info = getPlatformInfo('ios');
      expect(info.language).toBe('swift');
    });

    it('should return platform info for android', () => {
      const info = getPlatformInfo('android');
      expect(info.language).toBe('kotlin');
    });
  });

  describe('getComponentSource', () => {
    it('should return Button source for web', () => {
      const source = getComponentSource('Button', 'web');
      expect(source).toContain('Button');
      expect(source).toContain('import');
    });

    it('should return Button source for react-native', () => {
      const source = getComponentSource('Button', 'react-native');
      expect(source).toContain('design-system-native');
    });

    it('should return Button source for ios', () => {
      const source = getComponentSource('Button', 'ios');
      expect(source).toContain('AFButton');
    });

    it('should return Button source for android', () => {
      const source = getComponentSource('Button', 'android');
      expect(source).toContain('AFButton');
      expect(source).toContain('Composable');
    });

    it('should return fallback for unknown component', () => {
      const source = getComponentSource('Unknown', 'web');
      expect(source).toContain('No source');
    });
  });

  describe('getPlatformPrompt', () => {
    it('should return prompt for each platform', () => {
      const platforms = ['web', 'react-native', 'ios', 'android'] as const;
      platforms.forEach(platform => {
        const prompt = getPlatformPrompt(platform);
        expect(prompt.length).toBeGreaterThan(0);
        expect(prompt).toContain('DESIGN TOKENS');
      });
    });
  });

  describe('getFullPrompt', () => {
    it('should combine platform and component prompts', () => {
      const prompt = getFullPrompt('web', ['Button', 'Card']);
      expect(prompt).toContain('COMPONENT RULES');
      expect(prompt).toContain('Button');
      expect(prompt).toContain('Card');
    });
  });
});
