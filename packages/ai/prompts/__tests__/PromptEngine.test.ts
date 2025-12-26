/**
 * @fileoverview Tests for PromptEngine.
 */

import { describe, it, expect } from 'vitest';
import { PromptEngine, Platform } from '../src/index';

describe('PromptEngine', () => {
  describe('createContext', () => {
    it('should generate a prompt string', () => {
      const prompt = PromptEngine.createContext();
      expect(typeof prompt).toBe('string');
      expect(prompt.length).toBeGreaterThan(0);
    });

    it('should include platform-specific content for web', () => {
      const prompt = PromptEngine.createContext({ platform: 'web' });
      expect(prompt).toContain('Web');
      expect(prompt).toContain('React');
    });

    it('should include platform-specific content for react-native', () => {
      const prompt = PromptEngine.createContext({ platform: 'react-native' });
      expect(prompt).toContain('React Native');
    });

    it('should include platform-specific content for ios', () => {
      const prompt = PromptEngine.createContext({ platform: 'ios' });
      expect(prompt).toContain('SwiftUI');
    });

    it('should include platform-specific content for android', () => {
      const prompt = PromptEngine.createContext({ platform: 'android' });
      expect(prompt).toContain('Compose');
    });

    it('should include component rules when specified', () => {
      const prompt = PromptEngine.createContext({
        platform: 'web',
        components: ['Button'],
      });
      expect(prompt).toContain('Button');
    });

    it('should apply mystical tone', () => {
      const prompt = PromptEngine.createContext({ tone: 'mystical' });
      expect(prompt).toContain('mystical');
    });

    it('should apply technical tone', () => {
      const prompt = PromptEngine.createContext({ tone: 'technical' });
      expect(prompt).toContain('Precise');
    });
  });

  describe('getComponentPrompt', () => {
    it('should return Button prompt for web', () => {
      const prompt = PromptEngine.getComponentPrompt('Button', 'web');
      expect(prompt).toContain('Button');
    });

    it('should return fallback for unknown component', () => {
      const prompt = PromptEngine.getComponentPrompt('Unknown', 'web');
      expect(prompt).toContain('No rules');
    });
  });

  describe('utility methods', () => {
    it('should return all platforms', () => {
      const platforms = PromptEngine.getPlatforms();
      expect(platforms).toContain('web');
      expect(platforms).toContain('react-native');
      expect(platforms).toContain('ios');
      expect(platforms).toContain('android');
    });

    it('should return all components', () => {
      const components = PromptEngine.getComponents();
      expect(components).toContain('Button');
      expect(components).toContain('Card');
    });
  });
});
