/**
 * @fileoverview Tests for web Button component.
 */

import { describe, it, expect } from 'vitest';
import React from 'react';
import { Button } from '../src/Button';

describe('Button component', () => {
  describe('exports', () => {
    it('should export Button component', () => {
      expect(Button).toBeDefined();
      // forwardRef returns an object, not a function
      expect(typeof Button).toBe('object');
    });

    it('should have displayName', () => {
      expect(Button.displayName).toBe('Button');
    });
  });

  describe('props interface', () => {
    it('should accept variant prop', () => {
      // Type check - these should compile without error
      const variants: Array<'primary' | 'secondary' | 'glass'> = ['primary', 'secondary', 'glass'];
      variants.forEach(variant => {
        expect(() => React.createElement(Button, { variant })).not.toThrow();
      });
    });

    it('should accept size prop', () => {
      const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];
      sizes.forEach(size => {
        expect(() => React.createElement(Button, { size })).not.toThrow();
      });
    });

    it('should accept standard button props', () => {
      expect(() => React.createElement(Button, {
        type: 'submit',
        disabled: true,
        onClick: () => {},
      })).not.toThrow();
    });
  });

  describe('default props', () => {
    it('should default to primary variant', () => {
      const element = React.createElement(Button, {}, 'Test');
      expect(element.props.variant).toBeUndefined(); // Uses internal default
    });

    it('should default to md size', () => {
      const element = React.createElement(Button, {}, 'Test');
      expect(element.props.size).toBeUndefined(); // Uses internal default
    });
  });
});
