/**
 * @fileoverview Tests for web Card component.
 */

import { describe, it, expect } from 'vitest';
import React from 'react';
import { Card } from '../src/Card';

describe('Card component', () => {
  describe('exports', () => {
    it('should export Card component', () => {
      expect(Card).toBeDefined();
      // forwardRef returns an object, not a function
      expect(typeof Card).toBe('object');
    });

    it('should have displayName', () => {
      expect(Card.displayName).toBe('Card');
    });
  });

  describe('props interface', () => {
    it('should accept variant prop', () => {
      const variants: Array<'solid' | 'glass'> = ['solid', 'glass'];
      variants.forEach(variant => {
        expect(() => React.createElement(Card, { variant })).not.toThrow();
      });
    });

    it('should accept standard div props', () => {
      expect(() => React.createElement(Card, {
        id: 'test-card',
        className: 'custom-class',
        onClick: () => {},
      })).not.toThrow();
    });

    it('should accept children', () => {
      const element = React.createElement(Card, {}, 'Content');
      expect(element.props.children).toBe('Content');
    });
  });
});
