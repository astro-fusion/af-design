/**
 * @fileoverview Tests for design tokens.
 */

import { describe, it, expect } from 'vitest';
import { tokens } from '../src/index';

describe('@astrofusion/design-tokens', () => {
  describe('tokens structure', () => {
    it('should export a tokens object', () => {
      expect(tokens).toBeDefined();
      expect(typeof tokens).toBe('object');
    });

    it('should have colors property', () => {
      expect(tokens.colors).toBeDefined();
    });

    it('should have typography property', () => {
      expect(tokens.typography).toBeDefined();
    });

    it('should have spacing property', () => {
      expect(tokens.spacing).toBeDefined();
    });
  });

  describe('colors', () => {
    it('should have cosmic color palette', () => {
      expect(tokens.colors.cosmic).toBeDefined();
      expect(tokens.colors.cosmic['900']).toBe('#0f0c29');
      expect(tokens.colors.cosmic['600']).toBe('#2f2a5c');
    });

    it('should have starlight color palette', () => {
      expect(tokens.colors.starlight).toBeDefined();
      expect(tokens.colors.starlight['100']).toBe('#ffffff');
    });

    it('should have surface tokens', () => {
      expect(tokens.colors.surface).toBeDefined();
      expect(tokens.colors.surface.glass).toBe('rgba(255, 255, 255, 0.1)');
    });
  });

  describe('typography', () => {
    it('should have fontFamily definitions', () => {
      expect(tokens.typography.fontFamily).toBeDefined();
      expect(tokens.typography.fontFamily.sans).toContain('Inter');
    });

    it('should have fontSize scale', () => {
      expect(tokens.typography.fontSize).toBeDefined();
      expect(tokens.typography.fontSize.base).toBe('1rem');
    });
  });

  describe('spacing', () => {
    it('should have spacing scale', () => {
      expect(tokens.spacing['0']).toBe('0px');
      expect(tokens.spacing['4']).toBe('1rem');
    });
  });
});
