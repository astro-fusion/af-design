/**
 * Tailwind CSS Plugin for AstroFusion Glass Design System
 * Provides custom utilities for glassmorphism effects
 * 
 * @module @astrofusion/design-tokens
 * @license MIT
 */

import plugin from 'tailwindcss/plugin';
import { glassmorphism } from './glassmorphism';

/**
 * AstroFusion Glass Tailwind Plugin
 * Adds custom glass utilities and CSS custom properties
 */
export const afGlassPlugin = plugin(
  function({ addUtilities, addBase, theme }) {
    // Add CSS custom properties for glass tokens
    addBase({
      ':root': {
        // Glass backgrounds (light)
        '--glass-bg-ultra-thin': glassmorphism.background.light.ultraThin,
        '--glass-bg-thin': glassmorphism.background.light.thin,
        '--glass-bg-subtle': glassmorphism.background.light.subtle,
        '--glass-bg-light': glassmorphism.background.light.light,
        '--glass-bg-medium': glassmorphism.background.light.medium,
        '--glass-bg-strong': glassmorphism.background.light.strong,
        '--glass-bg-overlay': glassmorphism.background.light.overlay,
        '--glass-bg-modal': glassmorphism.background.light.modal,
        // Glass borders (light)
        '--glass-border-subtle': glassmorphism.border.light.subtle,
        '--glass-border-medium': glassmorphism.border.light.medium,
        '--glass-border-strong': glassmorphism.border.light.strong,
        // Glass shadows
        '--glass-shadow-subtle': glassmorphism.shadow.outer.subtle,
        '--glass-shadow-medium': glassmorphism.shadow.outer.medium,
        '--glass-shadow-strong': glassmorphism.shadow.outer.strong,
        // Transitions
        '--glass-transition-fast': glassmorphism.transition.fast,
        '--glass-transition-normal': glassmorphism.transition.normal,
        '--glass-transition-slow': glassmorphism.transition.slow,
      },
      '.dark': {
        // Glass backgrounds (dark)
        '--glass-bg-ultra-thin': glassmorphism.background.dark.ultraThin,
        '--glass-bg-thin': glassmorphism.background.dark.thin,
        '--glass-bg-subtle': glassmorphism.background.dark.subtle,
        '--glass-bg-light': glassmorphism.background.dark.light,
        '--glass-bg-medium': glassmorphism.background.dark.medium,
        '--glass-bg-strong': glassmorphism.background.dark.strong,
        '--glass-bg-overlay': glassmorphism.background.dark.overlay,
        '--glass-bg-modal': glassmorphism.background.dark.modal,
        // Glass borders (dark)
        '--glass-border-subtle': glassmorphism.border.dark.subtle,
        '--glass-border-medium': glassmorphism.border.dark.medium,
        '--glass-border-strong': glassmorphism.border.dark.strong,
      },
    });

    // Add glass background utilities
    addUtilities({
      '.bg-glass-ultra-thin': {
        backgroundColor: 'var(--glass-bg-ultra-thin)',
      },
      '.bg-glass-thin': {
        backgroundColor: 'var(--glass-bg-thin)',
      },
      '.bg-glass-subtle': {
        backgroundColor: 'var(--glass-bg-subtle)',
      },
      '.bg-glass-light': {
        backgroundColor: 'var(--glass-bg-light)',
      },
      '.bg-glass-medium': {
        backgroundColor: 'var(--glass-bg-medium)',
      },
      '.bg-glass-strong': {
        backgroundColor: 'var(--glass-bg-strong)',
      },
      '.bg-glass-overlay': {
        backgroundColor: 'var(--glass-bg-overlay)',
      },
      '.bg-glass-modal': {
        backgroundColor: 'var(--glass-bg-modal)',
      },
    });

    // Add glass border utilities
    addUtilities({
      '.border-glass-subtle': {
        borderColor: 'var(--glass-border-subtle)',
      },
      '.border-glass-medium': {
        borderColor: 'var(--glass-border-medium)',
      },
      '.border-glass-strong': {
        borderColor: 'var(--glass-border-strong)',
      },
    });

    // Add glass shadow utilities
    addUtilities({
      '.shadow-glass-subtle': {
        boxShadow: 'var(--glass-shadow-subtle)',
      },
      '.shadow-glass-medium': {
        boxShadow: 'var(--glass-shadow-medium)',
      },
      '.shadow-glass-strong': {
        boxShadow: 'var(--glass-shadow-strong)',
      },
    });

    // Add backdrop blur utilities with saturation
    addUtilities({
      '.backdrop-glass-subtle': {
        backdropFilter: glassmorphism.blur.subtle,
        WebkitBackdropFilter: glassmorphism.blur.subtle,
      },
      '.backdrop-glass-light': {
        backdropFilter: glassmorphism.blur.light,
        WebkitBackdropFilter: glassmorphism.blur.light,
      },
      '.backdrop-glass-medium': {
        backdropFilter: glassmorphism.blur.medium,
        WebkitBackdropFilter: glassmorphism.blur.medium,
      },
      '.backdrop-glass-strong': {
        backdropFilter: glassmorphism.blur.strong,
        WebkitBackdropFilter: glassmorphism.blur.strong,
      },
      '.backdrop-glass-heavy': {
        backdropFilter: glassmorphism.blur.heavy,
        WebkitBackdropFilter: glassmorphism.blur.heavy,
      },
    });

    // Add complete glass card utility
    addUtilities({
      '.glass-card': {
        backgroundColor: 'var(--glass-bg-medium)',
        backdropFilter: glassmorphism.blur.medium,
        WebkitBackdropFilter: glassmorphism.blur.medium,
        border: '1px solid var(--glass-border-medium)',
        boxShadow: 'var(--glass-shadow-medium)',
        borderRadius: glassmorphism.borderRadius.xl,
        transition: 'var(--glass-transition-normal)',
      },
      '.glass-card-frosted': {
        backgroundColor: 'var(--glass-bg-light)',
        backdropFilter: glassmorphism.blur.heavy,
        WebkitBackdropFilter: glassmorphism.blur.heavy,
        border: '1px solid var(--glass-border-medium)',
        boxShadow: glassmorphism.shadow.colored.primary,
        borderRadius: glassmorphism.borderRadius['2xl'],
        transition: 'var(--glass-transition-normal)',
      },
      '.glass-input': {
        backgroundColor: 'var(--glass-bg-subtle)',
        backdropFilter: glassmorphism.blur.light,
        WebkitBackdropFilter: glassmorphism.blur.light,
        border: '1px solid var(--glass-border-subtle)',
        boxShadow: glassmorphism.shadow.inner,
        borderRadius: glassmorphism.borderRadius.md,
        transition: 'var(--glass-transition-fast)',
      },
      '.glass-button': {
        backgroundColor: 'var(--glass-bg-medium)',
        backdropFilter: glassmorphism.blur.medium,
        WebkitBackdropFilter: glassmorphism.blur.medium,
        border: '1px solid var(--glass-border-medium)',
        boxShadow: 'var(--glass-shadow-subtle)',
        borderRadius: glassmorphism.borderRadius.md,
        transition: 'var(--glass-transition-fast)',
      },
      '.glass-modal': {
        backgroundColor: 'var(--glass-bg-strong)',
        backdropFilter: glassmorphism.blur.strong,
        WebkitBackdropFilter: glassmorphism.blur.strong,
        border: '1px solid var(--glass-border-strong)',
        boxShadow: 'var(--glass-shadow-strong)',
        borderRadius: glassmorphism.borderRadius['2xl'],
        transition: 'var(--glass-transition-normal)',
      },
    });

    // Add interactive state utilities
    addUtilities({
      '.glass-hover': {
        '&:hover': {
          opacity: String(glassmorphism.opacity.hover),
          transform: `scale(${glassmorphism.scale.hover})`,
        },
      },
      '.glass-active': {
        '&:active': {
          opacity: String(glassmorphism.opacity.active),
          transform: `scale(${glassmorphism.scale.active})`,
        },
      },
    });
  },
  {
    theme: {
      extend: {
        colors: {
          glass: {
            'ultra-thin': 'var(--glass-bg-ultra-thin)',
            'thin': 'var(--glass-bg-thin)',
            'subtle': 'var(--glass-bg-subtle)',
            'light': 'var(--glass-bg-light)',
            'medium': 'var(--glass-bg-medium)',
            'strong': 'var(--glass-bg-strong)',
            'overlay': 'var(--glass-bg-overlay)',
            'modal': 'var(--glass-bg-modal)',
          },
        },
        borderColor: {
          glass: {
            'subtle': 'var(--glass-border-subtle)',
            'medium': 'var(--glass-border-medium)',
            'strong': 'var(--glass-border-strong)',
          },
        },
        boxShadow: {
          'glass-subtle': 'var(--glass-shadow-subtle)',
          'glass-medium': 'var(--glass-shadow-medium)',
          'glass-strong': 'var(--glass-shadow-strong)',
        },
        transitionProperty: {
          glass: 'background-color, border-color, box-shadow, transform, opacity, backdrop-filter',
        },
      },
    },
  }
);

export default afGlassPlugin;
